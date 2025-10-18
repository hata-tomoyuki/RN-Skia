import { useHeaderHeight } from "@react-navigation/elements";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

type AnimatedCircleProps = {
  color: string;
  size: number;
  centerX: number;
  centerY: number;
  initialAngle: number;
};

/**
 * アニメーション付きの円
 * 指定された角度から回転しながら拡大縮小する
 */
function AnimatedCircle({
  color,
  size,
  centerX,
  centerY,
  initialAngle,
}: AnimatedCircleProps) {
  const distance = size * 0.25;
  const angle = useSharedValue(initialAngle);
  const r = useSharedValue(size * 0.3);

  const cx = useDerivedValue(
    () => centerX + distance * Math.cos(angle.value)
  );
  const cy = useDerivedValue(
    () => centerY + distance * Math.sin(angle.value)
  );

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(angle.value + Math.PI * 6, { duration: 3000 }),
      -1
    );
  }, [angle]);

  useEffect(() => {
    r.value = withRepeat(withTiming(size * 1.15, { duration: 1500 }), -1, true);
  }, [r, size]);

  return <Circle cx={cx} cy={cy} r={r} color={color} />;
}

/**
 * アニメーション付きの円を3つ表示
 * 円が回転しながら拡大縮小するアニメーション
 */
export default function AnimatedCircles() {
  const headerHeight = useHeaderHeight();
  const size = Dimensions.get("window").width * 0.33;
  const centerX = Dimensions.get("window").width / 2;
  const centerY = Dimensions.get("window").height / 2 - headerHeight;

  return (
    <Canvas style={styles.canvas}>
      <Group blendMode="multiply">
        <AnimatedCircle
          centerX={centerX}
          centerY={centerY}
          size={size}
          initialAngle={0}
          color="cyan"
        />
        <AnimatedCircle
          centerX={centerX}
          centerY={centerY}
          size={size}
          initialAngle={(Math.PI * 2) / 3}
          color="magenta"
        />
        <AnimatedCircle
          centerX={centerX}
          centerY={centerY}
          size={size}
          initialAngle={(Math.PI * 4) / 3}
          color="yellow"
        />
      </Group>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
});

