import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Canvas, Circle, useCanvasRef } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function TestScreen() {
  const ref = useCanvasRef();
  useEffect(() => {
    setTimeout(() => {
      // you can pass an optional rectangle
      // to only save part of the image
      const image = ref.current?.makeImageSnapshot();
      if (image) {
        // you can use image in an <Image> component
        // Or save to file using encodeToBytes -> Uint8Array
        const bytes = image.encodeToBytes();
        console.log({ bytes });
      }
    }, 1000);
  });

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">テスト</ThemedText>
        <ThemedText style={styles.description}>
          画像スナップショットのテスト
        </ThemedText>
      </ThemedView>
      <Canvas style={styles.canvas} ref={ref}>
        <Circle r={128} cx={128} cy={128} color="red" />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  description: {
    marginTop: 8,
    opacity: 0.7,
  },
  canvas: {
    flex: 1,
  },
});
