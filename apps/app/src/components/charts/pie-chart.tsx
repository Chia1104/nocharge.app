import { useMemo } from "react";

import { Canvas, Path, PathOp, Skia } from "@shopify/react-native-skia";
import type { SkPath } from "@shopify/react-native-skia";
import { useThemeColor } from "heroui-native";
import { StyleSheet, View } from "react-native";

export interface PieChartData {
  value: number;
  color?: string;
  label?: string;
}

interface PieChartProps {
  data: PieChartData[];
  size: number;
  strokeWidth?: number;
  gap?: number;
}

const hexToRgb = (hex: `#${string}`) => {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b };
};

const darkenColor = (hex: `#${string}`, factor: number) => {
  try {
    const { r, g, b } = hexToRgb(hex);
    const darken = (c: number) => Math.max(0, Math.floor(c * (1 - factor)));

    const newR = darken(r).toString(16).padStart(2, "0");
    const newG = darken(g).toString(16).padStart(2, "0");
    const newB = darken(b).toString(16).padStart(2, "0");

    return `#${newR}${newG}${newB}`;
  } catch {
    return hex;
  }
};

export const PieChart = ({
  data,
  size,
  strokeWidth = 0,
  gap = 2,
}: PieChartProps) => {
  const themeColorDivider = useThemeColor("divider") as `#${string}`;
  const radius = size / 2;
  const innerRadius = radius * 0.65;

  const slices = useMemo(() => {
    const center = { x: radius, y: radius };
    const total = data.reduce((acc, cur) => acc + cur.value, 0);
    const maxValue = Math.max(...data.map((d) => d.value));

    const { slices: result } = data.reduce<{
      slices: { path: SkPath; color: string; key: string }[];
      currentAngle: number;
    }>(
      (acc, item) => {
        const sweepAngle = (item.value / total) * 360;
        const effectiveSweep = Math.max(0, sweepAngle - gap);
        const startAngle = acc.currentAngle + gap / 2;

        const path = Skia.Path.Make();

        const outerRect = Skia.XYWHRect(
          center.x - radius + strokeWidth,
          center.y - radius + strokeWidth,
          (radius - strokeWidth) * 2,
          (radius - strokeWidth) * 2
        );

        if (effectiveSweep > 0) {
          path.addArc(outerRect, startAngle, effectiveSweep);
          path.lineTo(center.x, center.y);
          path.close();

          if (innerRadius > 0) {
            const hole = Skia.Path.Make();
            hole.addCircle(center.x, center.y, innerRadius);
            path.op(hole, PathOp.Difference);
          }
        }

        const weight = (item.value / maxValue) * 0.3;
        const color = item.color ?? darkenColor(themeColorDivider, weight);

        acc.slices.push({
          path,
          color,
          key: `slice-${acc.currentAngle}`,
        });
        acc.currentAngle += sweepAngle;
        return acc;
      },
      { slices: [], currentAngle: -90 }
    );

    return result;
  }, [data, radius, strokeWidth, innerRadius, gap, themeColorDivider]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Canvas style={{ width: size, height: size }}>
        {slices.map((slice) => (
          <Path
            key={slice.key}
            path={slice.path}
            color={slice.color}
            style="fill"
          />
        ))}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
