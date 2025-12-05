import { describe, it, expect } from "vitest";
import { cn } from "@/utils/cn";
import { useDebounce } from "@/hooks/useDebounce";

describe("cn utility", () => {
  it("should merge class names correctly", () => {
    const result = cn("text-red-500", "bg-blue-500");
    expect(result).toContain("text-red-500");
    expect(result).toContain("bg-blue-500");
  });

  it("should handle conditional classes", () => {
    const result = cn("base-class", false && "hidden", "visible");
    expect(result).toContain("base-class");
    expect(result).toContain("visible");
    expect(result).not.toContain("hidden");
  });
});

// Note: useDebounce is a hook and should be tested with React Testing Library
// This is a placeholder test file structure
