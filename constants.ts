import { ElephantPoint } from './types';

// Coordinates for the connect-the-dots elephant (approximate relative positions 0-100)
export const ELEPHANT_POINTS: ElephantPoint[] = [
  { id: 1, x: 15, y: 72 }, // Tail start (adjusted to not overlap with 20)
  { id: 2, x: 15, y: 50 }, // Back rear
  { id: 3, x: 20, y: 30 }, // Back top
  { id: 4, x: 40, y: 25 }, // Top mid
  { id: 5, x: 60, y: 25 }, // Top front
  { id: 6, x: 75, y: 35 }, // Head top
  { id: 7, x: 90, y: 45 }, // Forehead
  { id: 8, x: 95, y: 60 }, // Trunk top
  { id: 9, x: 90, y: 80 }, // Trunk tip curve
  { id: 10, x: 80, y: 75 }, // Trunk bottom
  { id: 11, x: 75, y: 60 }, // Mouth
  { id: 12, x: 70, y: 85 }, // Front Leg R
  { id: 13, x: 60, y: 85 }, // Front Leg L
  { id: 14, x: 60, y: 60 }, // Underbelly front
  { id: 15, x: 50, y: 60 }, // Underbelly mid
  { id: 16, x: 40, y: 85 }, // Back Leg R
  { id: 17, x: 30, y: 85 }, // Back Leg L
  { id: 18, x: 30, y: 60 }, // Underbelly rear
  { id: 19, x: 25, y: 65 }, // Rear curve
  { id: 20, x: 22, y: 68 }, // Loop back near start (Tail end)
];

export const MISSING_NUMBERS_GAME = [
  { display: 0, isMissing: false },
  { display: 1, isMissing: false },
  { display: 2, isMissing: false },
  { display: 3, isMissing: false },
  { display: 4, isMissing: true }, // Missing
  { display: 5, isMissing: false },
  { display: 6, isMissing: true }, // Missing
  { display: 7, isMissing: true }, // Missing
  { display: 8, isMissing: true }, // Missing
  { display: 9, isMissing: true }, // Missing
  { display: 10, isMissing: false },
  { display: 11, isMissing: false },
  { display: 12, isMissing: false },
  { display: 13, isMissing: false },
  { display: 14, isMissing: true }, // Missing
  { display: 15, isMissing: false },
  { display: 16, isMissing: true }, // Missing
  { display: 17, isMissing: true }, // Missing
  { display: 18, isMissing: true }, // Missing
  { display: 19, isMissing: true }, // Missing
  { display: 20, isMissing: false },
];