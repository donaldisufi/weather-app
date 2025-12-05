import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should debounce value updates", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    expect(result.current).toBe("initial");

    // Update value
    rerender({ value: "updated", delay: 500 });

    // Value should not change immediately
    expect(result.current).toBe("initial");

    // Fast-forward time by 499ms (just before delay)
    vi.advanceTimersByTime(499);
    expect(result.current).toBe("initial");

    // Fast-forward time by 1ms more (total 500ms)
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("updated");
  });

  it("should reset timer on rapid value changes", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Rapidly change values
    rerender({ value: "value1", delay: 500 });
    vi.advanceTimersByTime(200);

    rerender({ value: "value2", delay: 500 });
    vi.advanceTimersByTime(200);

    rerender({ value: "value3", delay: 500 });
    vi.advanceTimersByTime(200);

    // Value should still be initial
    expect(result.current).toBe("initial");

    // Wait for full delay after last change
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe("value3");
  });

  it("should handle different delay values", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 1000 },
      }
    );

    rerender({ value: "updated", delay: 1000 });

    vi.advanceTimersByTime(999);
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("updated");
  });

  it("should cleanup timeout on unmount", () => {
    const { unmount } = renderHook(() => useDebounce("value", 500));

    const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

    unmount();

    // Should have called clearTimeout (for cleanup)
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it("should handle number values", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 0, delay: 500 },
      }
    );

    rerender({ value: 100, delay: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe(100);
  });

  it("should handle object values", async () => {
    const obj1 = { name: "London" };
    const obj2 = { name: "Paris" };

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: obj1, delay: 500 },
      }
    );

    rerender({ value: obj2, delay: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toEqual(obj2);
  });
});
