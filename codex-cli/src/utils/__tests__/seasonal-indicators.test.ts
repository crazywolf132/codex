import { getCurrentSeason, getSeasonalFrames, getSeasonName } from "../seasonal-indicators";
import { describe, it, expect, afterEach, vi } from "vitest";

describe("Seasonal Indicators", () => {
  // Helper to mock specific dates
  function mockDate(isoDate: string) {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(isoDate));
  }

  // Restore the original Date after each test
  afterEach(() => {
    vi.useRealTimers();
  });

  describe("getCurrentSeason", () => {
    it("should detect Easter season", () => {
      mockDate("2023-04-01T12:00:00Z");
      const season = getCurrentSeason();
      expect(season).toBeDefined();
      expect(season?.name).toBe("Easter");
    });

    it("should detect Halloween season", () => {
      mockDate("2023-10-15T12:00:00Z");
      const season = getCurrentSeason();
      expect(season).toBeDefined();
      expect(season?.name).toBe("Halloween");
    });

    it("should detect Christmas season", () => {
      mockDate("2023-12-25T12:00:00Z");
      const season = getCurrentSeason();
      expect(season).toBeDefined();
      expect(season?.name).toBe("Christmas");
    });

    it("should return undefined for non-seasonal dates", () => {
      mockDate("2023-06-15T12:00:00Z");
      const season = getCurrentSeason();
      expect(season).toBeUndefined();
    });
  });

  describe("getSeasonalFrames", () => {
    it("should return Easter frames during Easter", () => {
      mockDate("2023-04-01T12:00:00Z");
      const frames = getSeasonalFrames();
      expect(frames).toContain("🐰    ");
      expect(frames).toContain("🥚    ");
    });

    it("should return Halloween frames during Halloween", () => {
      mockDate("2023-10-15T12:00:00Z");
      const frames = getSeasonalFrames();
      expect(frames).toContain("🎃    ");
      expect(frames).toContain("👻    ");
    });

    it("should return Christmas frames during Christmas", () => {
      mockDate("2023-12-25T12:00:00Z");
      const frames = getSeasonalFrames();
      expect(frames).toContain("🎄    ");
      expect(frames).toContain("🎅    ");
    });

    it("should return default frames for non-seasonal dates", () => {
      mockDate("2023-06-15T12:00:00Z");
      const frames = getSeasonalFrames();
      expect(frames).toContain("( ●    )");
      expect(frames).toContain("(●     )");
    });
  });

  describe("getSeasonName", () => {
    it("should return 'Easter' during Easter season", () => {
      mockDate("2023-04-01T12:00:00Z");
      expect(getSeasonName()).toBe("Easter");
    });

    it("should return 'Halloween' during Halloween season", () => {
      mockDate("2023-10-15T12:00:00Z");
      expect(getSeasonName()).toBe("Halloween");
    });

    it("should return 'Christmas' during Christmas season", () => {
      mockDate("2023-12-25T12:00:00Z");
      expect(getSeasonName()).toBe("Christmas");
    });

    it("should return 'Default' for non-seasonal dates", () => {
      mockDate("2023-06-15T12:00:00Z");
      expect(getSeasonName()).toBe("Default");
    });
  });
});
