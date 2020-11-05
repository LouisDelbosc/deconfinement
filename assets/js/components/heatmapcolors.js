const NEUTRAL = "#ECEBE9";
const BLUE = "#85C1E9";
const GREEN = "#76D7C4";
const YELLOW = "#F4D03F";
const ORANGE = "#F39C12";
const RED = "#E74C3C";

const COLORS = [NEUTRAL, BLUE, GREEN, YELLOW, ORANGE, RED];

export function buildBounds(maxValue) {
  console.log(maxValue);
  return (value) => {
    return maxValue > 0 ? COLORS[Math.floor((value / maxValue) * 5)] : NEUTRAL;
  };
}
