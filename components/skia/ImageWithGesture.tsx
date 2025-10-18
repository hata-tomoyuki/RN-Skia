import {
    Blur,
    Canvas,
    Circle,
    Fill,
    Image,
    Mask,
    useImage,
} from "@shopify/react-native-skia";
import { Dimensions, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
    useDerivedValue,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

/**
 * 画像描画とジェスチャー、ブラー、マスクの例
 * パンジェスチャーで画像を動かすと、動いた距離に応じてブラーがかかる
 */
export default function ImageWithGesture() {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  // 画像を読み込む
  const image = useImage(require("../../assets/images/slowparrot.gif"));

  // 画像のサイズを設定
  const size = {
    width: 200,
    height: 200,
  };

  const offsetX = useSharedValue<number>(0);
  const offsetY = useSharedValue<number>(0);

  // パンジェスチャーの設定
  const pan = Gesture.Pan()
    .onChange((event) => {
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
    })
    .onFinalize(() => {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
    });

  const imageX = useDerivedValue(() => {
    return (width - size.width) / 2 + offsetX.value;
  });

  const imageY = useDerivedValue(() => {
    return (height - size.height) / 2 + offsetY.value;
  });

  // 移動した距離に応じてブラーの強さを変える（0〜10）
  const blur = useDerivedValue(() => {
    const offset = Math.max(Math.abs(offsetX.value), Math.abs(offsetY.value));
    return Math.min(offset / 100, 1.0) * 10;
  });

  if (!image) {
    return null;
  }

  return (
    <GestureDetector gesture={pan}>
      <Canvas style={styles.canvas}>
        <Fill color="#333" />
        <Mask
          mode="luminance"
          mask={
            <Circle cx={width / 2} cy={height / 2} r={width / 2} color="white" />
          }
        >
          <Image
            image={image}
            x={imageX}
            y={imageY}
            width={size.width}
            height={size.height}
          >
            <Blur blur={blur} />
          </Image>
        </Mask>
      </Canvas>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
});

