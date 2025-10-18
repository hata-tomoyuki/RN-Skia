import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Canvas, Fill, Image, ImageShader, Shader, Skia, useAnimatedImageValue, useImage } from "@shopify/react-native-skia";


const source = Skia.RuntimeEffect.Make(`
  uniform shader image;
  uniform float time;
  uniform float intensity;

  half4 main(float2 xy) {
    xy.x += sin(xy.y / 3 + time) * intensity;
    return image.eval(xy).rbga;
  }`)!;

// ダミーのクイズデータ
const quizData = {
  question: "日本の首都は東京である",
  correctAnswer: true, // true = ◯, false = ✕
};

export default function TestScreen() {
  const image = useImage(require("../../assets/images/parrot.png"));
  const slowParrotGif = useAnimatedImageValue(require("../../assets/images/ultrafastparrot.gif"));
  const [time, setTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [noiseIntensity, setNoiseIntensity] = useState(10);

  useEffect(() => {
    if (!isAnimating) {
      setTime(0);
      return;
    }

    let animationFrameId: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 100;
      setTime(elapsed);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnimating]);

  const handleAnswer = (userAnswer: boolean) => {
    setAnswered(true);
    const correct = userAnswer === quizData.correctAnswer;
    setIsCorrect(correct);

    // 不正解の場合はノイズアニメーションを開始
    if (!correct) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  };

  const resetQuiz = () => {
    setAnswered(false);
    setIsCorrect(null);
    setIsAnimating(false);
  };

  if (!image) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">◯✕クイズ</ThemedText>
        <ThemedText style={styles.description}>
          問題を読んで◯か✕で答えてください
        </ThemedText>
      </ThemedView>

      <View style={styles.quizContainer}>
        <View style={styles.questionBox}>
          <ThemedText style={styles.questionLabel}>問題</ThemedText>
          <ThemedText style={styles.questionText}>
            {quizData.question}
          </ThemedText>
        </View>
      </View>

      {answered && (
        <View style={[styles.resultBox, isCorrect ? styles.correctBox : styles.incorrectBox]}>
          <ThemedText style={styles.resultText}>
            {isCorrect ? '✓ 正解！' : '✗ 不正解...'}
          </ThemedText>
        </View>
      )}

      <View style={styles.canvasContainer}>
        <Canvas style={{ width: 256, height: 256 }}>
          {answered && isCorrect ? (
            // 正解時: slowparrot.gifを表示
            <Image
              image={slowParrotGif}
              fit="cover"
              x={0}
              y={0}
              width={256}
              height={256}
            />
          ) : isAnimating ? (
            // 不正解時: ノイズアニメーション
            <Fill>
              <Shader source={source} uniforms={{ time, intensity: noiseIntensity }}>
                <ImageShader
                  image={image}
                  fit="cover"
                  rect={{ x: 0, y: 0, width: 256, height: 256 }}
                />
              </Shader>
            </Fill>
          ) : (
            // デフォルト/未回答時: 通常のparrot.png
            <Image
              image={image}
              fit="cover"
              x={0}
              y={0}
              width={256}
              height={256}
            />
          )}
        </Canvas>
      </View>

      {/* <View style={styles.sliderContainer}>
        <ThemedText style={styles.sliderLabel}>ノイズの強度</ThemedText>
        <View style={styles.sliderRow}>
          <Text style={styles.sliderValueText}>0</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={30}
            step={1}
            value={noiseIntensity}
            onValueChange={setNoiseIntensity}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#E5E5EA"
            thumbTintColor="#007AFF"
          />
          <Text style={styles.sliderValueText}>30</Text>
        </View>
        <ThemedText style={styles.currentValueText}>
          現在の値: {noiseIntensity}
        </ThemedText>
      </View> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.maruButton, answered && styles.buttonDisabled]}
          onPress={() => handleAnswer(true)}
          disabled={answered}
        >
          <Text style={[styles.buttonText, styles.maruButtonText]}>◯</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.batsuButton, answered && styles.buttonDisabled]}
          onPress={() => handleAnswer(false)}
          disabled={answered}
        >
          <Text style={[styles.buttonText, styles.batsuButtonText]}>✕</Text>
        </TouchableOpacity>
      </View>

      {answered && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetQuiz}
        >
          <Text style={styles.resetButtonText}>もう一度挑戦</Text>
        </TouchableOpacity>
      )}

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
    fontSize: 14,
  },
  quizContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  questionBox: {
    backgroundColor: '#F2F2F7',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  questionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.6,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  resultBox: {
    position: 'absolute',
    top: 200,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  correctBox: {
    backgroundColor: '#D1F2EB',
  },
  incorrectBox: {
    backgroundColor: '#FADBD8',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '700',
  },
  canvasContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  canvas: {
    flex: 1,
  },
  sliderContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    minWidth: 20,
    textAlign: 'center',
  },
  currentValueText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 20,
    gap: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  maruButton: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  batsuButton: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  buttonText: {
    fontSize: 48,
    fontWeight: '700',
  },
  maruButtonText: {
    color: '#2196F3',
  },
  batsuButtonText: {
    color: '#F44336',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  resetButton: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#8E8E93',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
