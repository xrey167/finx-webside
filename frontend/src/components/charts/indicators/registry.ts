export type IndicatorInput = Array<[number, number]>; // [ts, value] base series

export type IndicatorOutput = {
  name: string;
  points: Array<[number, number]>;
  color?: string;
};

export type IndicatorImpl = (data: IndicatorInput, params?: Record<string, unknown>) => IndicatorOutput;

const registry = new Map<string, IndicatorImpl>();

export function registerIndicator(name: string, impl: IndicatorImpl) {
  registry.set(name, impl);
}

export function getIndicator(name: string): IndicatorImpl | undefined {
  return registry.get(name);
}

// Example: SMA
registerIndicator("SMA", (data, params) => {
  const period = Number(params?.period ?? 14);
  const out: Array<[number, number]> = [];
  let sum = 0;
  const vals = data.map((d) => d[1]);
  for (let i = 0; i < vals.length; i++) {
    sum += vals[i];
    if (i >= period) sum -= vals[i - period];
    if (i >= period - 1) out.push([data[i][0], sum / period]);
  }
  return { name: `SMA(${period})`, points: out, color: "#60a5fa" };
});
