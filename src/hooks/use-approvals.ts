"use client";

import { useState, useEffect, useCallback } from "react";
import { ApprovalRequest } from "@/types/api";
import { fetchApprovals, approveAction, rejectAction } from "@/lib/api";

export function useApprovals() {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadApprovals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchApprovals("pending");
      setApprovals(data);
    } catch (err: any) {
      setError(err.message || "Failed to load approvals");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApprovals();
    const interval = setInterval(loadApprovals, 5000);
    return () => clearInterval(interval);
  }, [loadApprovals]);

  const handleApprove = async (id: string, comment?: string) => {
    try {
      const updated = await approveAction(id, { approved: true, comment });
      setApprovals((prev) => prev.filter((a) => a.id !== id && a.task_id !== id));
      return updated;
    } catch (err: any) {
      console.error("Approve action error:", err);
      throw err;
    }
  };

  const handleReject = async (id: string, comment?: string) => {
    try {
      const updated = await rejectAction(id, { approved: false, comment });
      setApprovals((prev) => prev.filter((a) => a.id !== id && a.task_id !== id));
      return updated;
    } catch (err: any) {
      console.error("Reject action error:", err);
      throw err;
    }
  };

  return {
    approvals,
    isLoading,
    error,
    reloadApprovals: loadApprovals,
    handleApprove,
    handleReject,
  };
}
