export const NEUTRAL = "bg-orange-100";
const VERY_LOW = "bg-yellow-300";
const LOW = "bg-orange-300";
const SOME = "bg-red-300";
const MANY = "bg-red-500";
const MOST = "bg-red-600";

const COLORS = [NEUTRAL, VERY_LOW, LOW, SOME, MANY, MOST];

export function getHeatColor(value, maxValue) {
  return maxValue > 0 ? COLORS[Math.floor((value / maxValue) * 5)] : NEUTRAL;
}
