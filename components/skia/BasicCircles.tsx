import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { Dimensions, StyleSheet } from "react-native";

/**
 * 基本的な円を描画する例
 * 3つの円をブレンドモード（multiply）で重ねて表示
 */
export default function BasicCircles() {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const r = width * 0.33;

  return (
    <Canvas style={styles.canvas}>
      <Group blendMode="multiply">
        <Circle cx={r} cy={r} r={r} color="cyan" />
        <Circle cx={width - r} cy={r} r={r} color="magenta" />
        <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
      </Group>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
});

