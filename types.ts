export enum Stage {
  Intro = 'INTRO',
  Ordering = 'ORDERING',
  Neighbors = 'NEIGHBORS',
  Ruler = 'RULER',
  Practice = 'PRACTICE'
}

export interface ElephantPoint {
  id: number;
  x: number;
  y: number;
}