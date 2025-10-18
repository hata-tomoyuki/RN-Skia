import AnimatedCircles from '@/components/skia/AnimatedCircles';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet, View } from 'react-native';

/**
 * アニメーション付きの円の例を表示する画面
 */
export default function AnimatedScreen() {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">アニメーション</ThemedText>
        <ThemedText style={styles.description}>
          円が回転しながら拡大縮小するアニメーション
        </ThemedText>
      </ThemedView>
      <View style={styles.canvasContainer}>
        <AnimatedCircles />
      </View>
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
  canvasContainer: {
    flex: 1,
  },
});

