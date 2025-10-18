import ImageWithGesture from '@/components/skia/ImageWithGesture';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/**
 * 画像とジェスチャーの例を表示する画面
 */
export default function GestureScreen() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">画像とジェスチャー</ThemedText>
          <ThemedText style={styles.description}>
            画像をドラッグすると距離に応じてブラーがかかる
          </ThemedText>
        </ThemedView>
        <View style={styles.canvasContainer}>
          <ImageWithGesture />
        </View>
      </View>
    </GestureHandlerRootView>
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
  canvasContainer: {
    flex: 1,
  },
});

