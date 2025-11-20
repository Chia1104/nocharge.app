import { useMemo } from "react";

import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import type { SkPath } from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";

export interface PieChartData {
  value: number;
  color: string;
  label?: string;
}

interface PieChartProps {
  data: PieChartData[];
  size: number;
  strokeWidth?: number;
}

export const PieChart = ({ data, size, strokeWidth = 0 }: PieChartProps) => {
  const radius = size / 2;

  const slices = useMemo(() => {
    const center = { x: radius, y: radius };
    const total = data.reduce((acc, cur) => acc + cur.value, 0);

    const { slices: result } = data.reduce<{
      slices: { path: SkPath; color: string; key: string }[];
      currentAngle: number;
    }>(
      (acc, item) => {
        const sweepAngle = (item.value / total) * 360;
        const path = Skia.Path.Make();

        const rect = Skia.XYWHRect(
          center.x - radius + strokeWidth,
          center.y - radius + strokeWidth,
          (radius - strokeWidth) * 2,
          (radius - strokeWidth) * 2
        );

        path.moveTo(center.x, center.y);
        path.addArc(rect, acc.currentAngle, sweepAngle);
        path.close();

        acc.slices.push({
          path,
          color: item.color,
          key: `slice-${acc.currentAngle}`,
        });
        acc.currentAngle += sweepAngle;
        return acc;
      },
      { slices: [], currentAngle: 0 }
    );

    return result;
  }, [data, radius, strokeWidth]);

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
