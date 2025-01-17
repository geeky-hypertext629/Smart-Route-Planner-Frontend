export interface PollutionData {
  coordinates: [number, number];
  value: number;
}

export interface Route {
  path: [number, number][];
  pollutionScore: number;
}