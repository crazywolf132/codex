/**
 * Seasonal indicators for the thinking animation
 * Provides different spinner animations based on the current season/holiday
 */

/**
 * Represents a seasonal period with start and end dates
 */
interface Season {
  name: string;
  startMonth: number; // 0-11 (January is 0)
  startDay: number;
  endMonth: number;
  endDay: number;
  frames: string[];
}

// Define seasonal periods with their custom frames
const SEASONS: Season[] = [
  {
    name: "Easter",
    // Easter is variable, but typically around March-April
    // Using a fixed range for simplicity
    startMonth: 2, // March
    startDay: 15,
    endMonth: 3, // April
    endDay: 25,
    frames: [
      "🐰    ",
      " 🐰   ",
      "  🐰  ",
      "   🐰 ",
      "    🐰",
      "   🐰 ",
      "  🐰  ",
      " 🐰   ",
      "🐰    ",
      "🥚    ",
    ],
  },
  {
    name: "Halloween",
    startMonth: 9, // October
    startDay: 1,
    endMonth: 9,
    endDay: 31,
    frames: [
      "🎃    ",
      " 🎃   ",
      "  🎃  ",
      "   🎃 ",
      "    🎃",
      "   🎃 ",
      "  🎃  ",
      " 🎃   ",
      "🎃    ",
      "👻    ",
    ],
  },
  {
    name: "Christmas",
    startMonth: 11, // December
    startDay: 1,
    endMonth: 11,
    endDay: 31,
    frames: [
      "🎄    ",
      " 🎄   ",
      "  🎄  ",
      "   🎄 ",
      "    🎄",
      "   🎄 ",
      "  🎄  ",
      " 🎄   ",
      "🎄    ",
      "🎅    ",
    ],
  },
];

// Default frames (standard bouncing ball animation)
const DEFAULT_FRAMES = [
  "( ●    )",
  "(  ●   )",
  "(   ●  )",
  "(    ● )",
  "(     ●)",
  "(    ● )",
  "(   ●  )",
  "(  ●   )",
  "( ●    )",
  "(●     )",
];

/**
 * Checks if the current date falls within a seasonal period
 * @param date The date to check
 * @param season The season to check against
 * @returns True if the date is within the season
 */
function isDateInSeason(date: Date, season: Season): boolean {
  const month = date.getMonth();
  const day = date.getDate();

  // Handle seasons that span across year boundary (like Christmas to New Year)
  if (season.startMonth > season.endMonth) {
    return (
      (month > season.startMonth || (month === season.startMonth && day >= season.startDay)) ||
      (month < season.endMonth || (month === season.endMonth && day <= season.endDay))
    );
  }

  // Handle seasons within the same year
  return (
    (month > season.startMonth || (month === season.startMonth && day >= season.startDay)) &&
    (month < season.endMonth || (month === season.endMonth && day <= season.endDay))
  );
}

/**
 * Gets the current active season based on the date
 * @param date Optional date to check (defaults to current date)
 * @returns The active season or undefined if no season is active
 */
export function getCurrentSeason(date: Date = new Date()): Season | undefined {
  return SEASONS.find((season) => isDateInSeason(date, season));
}

/**
 * Gets the appropriate spinner frames based on the current date
 * @param date Optional date to check (defaults to current date)
 * @returns Array of spinner frames to use
 */
export function getSeasonalFrames(date: Date = new Date()): string[] {
  const currentSeason = getCurrentSeason(date);
  return currentSeason ? currentSeason.frames : DEFAULT_FRAMES;
}

/**
 * Gets the name of the current season
 * @param date Optional date to check (defaults to current date)
 * @returns The name of the current season or "Default" if no season is active
 */
export function getSeasonName(date: Date = new Date()): string {
  const currentSeason = getCurrentSeason(date);
  return currentSeason ? currentSeason.name : "Default";
}
