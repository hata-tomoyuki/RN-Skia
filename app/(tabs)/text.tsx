import GradientText from '@/components/skia/GradientText';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet, View } from 'react-native';

/**
 * グラデーションテキストの例を表示する画面
 */
export default function TextScreen() {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">グラデーションテキスト</ThemedText>
        <ThemedText style={styles.description}>
          テキストの塗りがグラデーションで変化する
        </ThemedText>
      </ThemedView>
      <View style={styles.canvasContainer}>
        <GradientText />
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

