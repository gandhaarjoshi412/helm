"use client";

import { useState, useEffect, useCallback } from "react";
import { SystemMetricsResponse } from "@/types/api";
import { fetchSystemMetrics } from "@/lib/api";

export function useSystemMetrics(projectId?: string) {
  const [metrics, setMetrics] = useState<SystemMetricsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadMetrics = useCallback(async () => {
    try {
      const data = await fetchSystemMetrics(projectId);
      setMetrics(data);
    } catch (_err) {
      // Silently keep previous data
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    queueMicrotask(() => {
      loadMetrics();
    });
    const interval = setInterval(loadMetrics, 10000);
    return () => clearInterval(interval);
  }, [loadMetrics]);

  return { metrics, isLoading, reloadMetrics: loadMetrics };
}
