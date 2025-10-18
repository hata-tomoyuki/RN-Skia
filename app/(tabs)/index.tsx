import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

/**
 * React Native Skiaの例を表示するホーム画面
 */
export default function HomeScreen() {
  const router = useRouter();

  const examples = [
    {
      title: '基本的な円',
      description: '3つの円をブレンドモードで重ねて表示',
      route: '/circles',
      icon: '●',
    },
    {
      title: 'アニメーション',
      description: '円が回転しながら拡大縮小する',
      route: '/animated',
      icon: '◐',
    },
    {
      title: 'グラデーションテキスト',
      description: 'テキストの塗りがグラデーションで変化',
      route: '/text',
      icon: 'T',
    },
    {
      title: '画像とジェスチャー',
      description: '画像をドラッグするとブラーがかかる',
      route: '/gesture',
      icon: '▣',
    },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">React Native Skia</ThemedText>
      </ThemedView>

      <ThemedView style={styles.descriptionContainer}>
        <ThemedText>
          React Native SkiaはSkiaエンジンをReact Nativeで利用するためのライブラリです。
          リッチでハイパフォーマンスなUIを作成できます。
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.examplesContainer}>
        <ThemedText type="subtitle" style={styles.examplesTitle}>
          サンプル一覧
        </ThemedText>
        {examples.map((example, index) => (
          <TouchableOpacity
            key={index}
            style={styles.exampleCard}
            onPress={() => router.push(example.route as any)}>
            <View style={styles.iconContainer}>
              <ThemedText style={styles.icon}>{example.icon}</ThemedText>
            </View>
            <View style={styles.exampleContent}>
              <ThemedText type="defaultSemiBold" style={styles.exampleTitle}>
                {example.title}
              </ThemedText>
              <ThemedText style={styles.exampleDescription}>
                {example.description}
              </ThemedText>
            </View>
            <ThemedText style={styles.arrow}>›</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>

      <ThemedView style={styles.referenceContainer}>
        <ThemedText type="subtitle">参考</ThemedText>
        <ThemedText style={styles.referenceText}>
          このサンプルは以下の記事を参考に作成されました：
        </ThemedText>
        <ThemedText style={styles.link}>
          React Native Skiaを使ってみよう！
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 16,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  examplesContainer: {
    gap: 12,
    marginBottom: 24,
  },
  examplesTitle: {
    marginBottom: 8,
  },
  exampleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  exampleContent: {
    flex: 1,
    gap: 4,
  },
  exampleTitle: {
    fontSize: 16,
  },
  exampleDescription: {
    fontSize: 13,
    opacity: 0.7,
  },
  arrow: {
    fontSize: 24,
    opacity: 0.5,
  },
  referenceContainer: {
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  referenceText: {
    fontSize: 14,
    opacity: 0.7,
  },
  link: {
    fontSize: 14,
    color: '#007AFF',
  },
});
