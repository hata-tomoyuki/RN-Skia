import {
    Canvas,
    Fill,
    LinearGradient,
    Text,
    matchFont,
    vec,
} from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import {
    interpolateColor,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

/**
 * グラデーションアニメーション付きのテキスト表示
 * テキストの塗りがグラデーションで変化する
 */
export default function GradientText() {
  const width = Dimensions.get("window").width;
  const fontSize = 32;
  const fontFamily = Platform.select({ ios: "Helvetica", default: "serif" });

  const font = matchFont({
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeight: "bold",
  });

  // グラデーションの開始色と終了色
  const startColors = [
    "rgba(34, 193, 195, 0.4)",
    "rgba(34,193,195,0.4)",
    "rgba(63,94,251,1)",
    "rgba(253,29,29,0.4)",
  ];
  const endColors = [
    "rgba(0,212,255,0.4)",
    "rgba(253,187,45,0.4)",
    "rgba(252,70,107,1)",
    "rgba(252,176,69,0.4)",
  ];

  const colorsIndex = useSharedValue(0);

  // 3秒ごとに色のインデックスを変える
  useEffect(() => {
    colorsIndex.value = withRepeat(
      withTiming(startColors.length - 1, {
        duration: 3000,
      }),
      -1,
      true
    );
  }, [colorsIndex]);

  // colorIndexの値から色を変化させるアニメーション
  const gradientColors = useDerivedValue(() => {
    return [
      interpolateColor(
        colorsIndex.value,
        [0, 1, 2, 3],
        startColors as any
      ) as string,
      interpolateColor(
        colorsIndex.value,
        [0, 1, 2, 3],
        endColors as any
      ) as string,
    ];
  });

  return (
    <Canvas style={styles.canvas}>
      <Fill color="#fff" />
      <Text x={20} y={100} font={font} text="Hello React Native Skia!">
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, fontSize)}
          colors={gradientColors}
        />
      </Text>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
});

