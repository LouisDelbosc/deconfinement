export const NEUTRAL = "bg-yellow-100";
const MINIMUM = "bg-orange-200";
const VERY_LOW = "bg-yellow-300";
const LOW = "bg-red-200";
const SOME = "bg-red-300";
const MANY = "bg-red-500";
const MOST = "bg-red-600";

const COLORS = [MINIMUM, VERY_LOW, LOW, SOME, MANY, MOST];

export function getHeatColor(value, maxValue) {
  return maxValue > 0 ? COLORS[Math.floor((value / maxValue) * 5)] : NEUTRAL;
}
