import BasicCircles from '@/components/skia/BasicCircles';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet, View } from 'react-native';

/**
 * 基本的な円の描画例を表示する画面
 */
export default function CirclesScreen() {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">基本的な円</ThemedText>
        <ThemedText style={styles.description}>
          3つの円をブレンドモード（multiply）で重ねて表示
        </ThemedText>
      </ThemedView>
      <View style={styles.canvasContainer}>
        <BasicCircles />
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

