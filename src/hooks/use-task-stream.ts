"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AgentEvent, PhaseName } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const API_KEY = process.env.NEXT_PUBLIC_HELM_API_KEY || "";

export interface TaskStreamState {
  events: AgentEvent[];
  currentPhase: PhaseName | string;
  status: "idle" | "connecting" | "running" | "waiting_approval" | "completed" | "failed";
  pendingApproval: AgentEvent | null;
  selfCorrectionCount: number;
  testsCount: { passed: number; failed: number; total: number };
  modifiedFiles: string[];
  lastError: string | null;
  isConnected: boolean;
}

export function useTaskStream(taskId: string | null | undefined) {
  const [state, setState] = useState<TaskStreamState>({
    events: [],
    currentPhase: "ask",
    status: "idle",
    pendingApproval: null,
    selfCorrectionCount: 0,
    testsCount: { passed: 0, failed: 0, total: 0 },
    modifiedFiles: [],
    lastError: null,
    isConnected: false,
  });

  const eventSourceRef = useRef<EventSource | null>(null);

  const resetState = useCallback(() => {
    setState({
      events: [],
      currentPhase: "ask",
      status: "idle",
      pendingApproval: null,
      selfCorrectionCount: 0,
      testsCount: { passed: 0, failed: 0, total: 0 },
      modifiedFiles: [],
      lastError: null,
      isConnected: false,
    });
  }, []);

  useEffect(() => {
    if (!taskId) {
      queueMicrotask(() => {
        setState((prev) =>
          prev.status === "idle"
            ? prev
            : {
                events: [],
                currentPhase: "idle",
                status: "idle",
                pendingApproval: null,
                selfCorrectionCount: 0,
                testsCount: { passed: 0, failed: 0, total: 0 },
                modifiedFiles: [],
                lastError: null,
                isConnected: false,
              }
        );
      });
      return;
    }

    queueMicrotask(() => {
      setState({
        events: [],
        currentPhase: "recon",
        status: "connecting",
        pendingApproval: null,
        selfCorrectionCount: 0,
        testsCount: { passed: 0, failed: 0, total: 0 },
        modifiedFiles: [],
        lastError: null,
        isConnected: false,
      });
    });

    const tokenQuery = API_KEY ? `?token=${encodeURIComponent(API_KEY)}` : "";
    const url = `${API_BASE_URL}/api/tasks/${taskId}/events${tokenQuery}`;
    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.onopen = () => {
      setState((prev) => ({
        ...prev,
        isConnected: true,
        status: prev.status === "connecting" ? "running" : prev.status,
      }));
    };

    const handleIncomingEvent = (eventData: string) => {
      try {
        const parsed: AgentEvent = JSON.parse(eventData);

        setState((prev) => {
          // Avoid duplicate events if replayed
          if (prev.events.some((e) => e.id === parsed.id)) {
            return prev;
          }

          const nextEvents = [...prev.events, parsed];
          let nextPhase = prev.currentPhase;
          let nextStatus = prev.status;
          let nextApproval = prev.pendingApproval;
          let nextSelfCorrectionCount = prev.selfCorrectionCount;
          const nextTests = { ...prev.testsCount };
          const nextFiles = [...prev.modifiedFiles];

          if (parsed.phase) {
            nextPhase = parsed.phase;
          }

          if (parsed.type === "phase_started" && parsed.phase) {
            nextPhase = parsed.phase;
          }

          if (parsed.type === "self_correction") {
            nextSelfCorrectionCount += 1;
            nextPhase = "self_correct";
          }

          if (parsed.type === "test_completed") {
            nextTests.total += 1;
            if (parsed.status === "success") {
              nextTests.passed += 1;
            } else if (parsed.status === "error" || parsed.status === "warning") {
              nextTests.failed += 1;
            }
          }

          if (parsed.type === "file_modified" || parsed.tool_name === "edit_file" || parsed.tool_name === "apply_patch") {
            const filePath = parsed.metadata?.file_path || parsed.tool_input?.file_path || parsed.title;
            if (filePath && typeof filePath === "string" && !nextFiles.includes(filePath)) {
              nextFiles.push(filePath);
            }
          }

          if (parsed.type === "approval_required") {
            nextApproval = parsed;
            nextStatus = "waiting_approval";
          } else if (parsed.type === "approval_resolved") {
            nextApproval = null;
            nextStatus = "running";
          } else if (parsed.type === "run_completed") {
            nextStatus = "completed";
            nextPhase = "completed";
          } else if (parsed.type === "run_failed" || parsed.phase === "cancelled") {
            nextStatus = "failed";
            nextPhase = parsed.phase || "failed";
          }

          return {
            ...prev,
            events: nextEvents,
            currentPhase: nextPhase,
            status: nextStatus,
            pendingApproval: nextApproval,
            selfCorrectionCount: nextSelfCorrectionCount,
            testsCount: nextTests,
            modifiedFiles: nextFiles,
          };
        });
      } catch (err) {
        console.error("[SSE Parse Error]", err, eventData);
      }
    };

    // Generic onmessage
    es.onmessage = (e) => {
      handleIncomingEvent(e.data);
    };

    // Listen to specific named events
    const eventTypes = [
      "run_started",
      "phase_started",
      "phase_completed",
      "context_search",
      "file_read",
      "file_modified",
      "tool_started",
      "tool_completed",
      "command_started",
      "command_completed",
      "test_started",
      "test_completed",
      "agent_message",
      "verification_started",
      "verification_completed",
      "self_correction",
      "review_started",
      "review_completed",
      "approval_required",
      "approval_resolved",
      "run_completed",
      "run_failed",
    ];

    eventTypes.forEach((type) => {
      es.addEventListener(type, (e: MessageEvent) => {
        handleIncomingEvent(e.data);
      });
    });

    es.onerror = (_err) => {
      setState((prev) => ({
        ...prev,
        isConnected: false,
      }));
    };

    return () => {
      es.close();
      eventSourceRef.current = null;
    };
  }, [taskId, resetState]);

  return state;
}
