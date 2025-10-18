# React Native Skia サンプルアプリ 🎨

このプロジェクトは、React Native Skiaの使い方を学ぶためのサンプルアプリです。

## 📚 参考記事

このプロジェクトは以下の記事を参考に作成されました：
- [React Native Skiaを使ってみよう！](https://zenn.dev/tellernovel_inc/articles/01bc1085b3f273)

## ✨ 機能

このアプリには以下の4つのReact Native Skiaの例が含まれています：

### 1. 基本的な円 ⭕
3つの円をブレンドモード（multiply）で重ねて表示します。Skiaの基本的な図形描画とブレンドモードの使い方を学べます。

### 2. アニメーション 🌀
円が回転しながら拡大縮小するアニメーションです。React Native ReanimatedとSkiaを組み合わせたアニメーションの実装方法を学べます。

### 3. グラデーションテキスト 🎨
テキストにグラデーションを適用し、グラデーションの色がアニメーションで変化します。テキスト描画とグラデーションの使い方を学べます。

### 4. 画像とジェスチャー 👆
画像をドラッグすると、移動距離に応じてブラーがかかります。React Native Gesture Handler、マスク、ブラー効果の使い方を学べます。

## 🚀 セットアップ

1. 依存関係をインストール

   ```bash
   npm install
   ```

2. アプリを起動

   ```bash
   npx expo start
   ```

3. 表示オプション

   - `i` - iOSシミュレータで開く
   - `a` - Androidエミュレータで開く
   - `w` - Webブラウザで開く

## 📂 プロジェクト構成

```
├── app/
│   └── (tabs)/
│       ├── index.tsx      # ホーム画面（サンプル一覧）
│       ├── circles.tsx    # 基本的な円の例
│       ├── animated.tsx   # アニメーションの例
│       ├── text.tsx       # グラデーションテキストの例
│       └── gesture.tsx    # 画像とジェスチャーの例
├── components/
│   └── skia/
│       ├── BasicCircles.tsx      # 基本的な円のコンポーネント
│       ├── AnimatedCircles.tsx   # アニメーション付き円のコンポーネント
│       ├── GradientText.tsx      # グラデーションテキストのコンポーネント
│       └── ImageWithGesture.tsx  # 画像とジェスチャーのコンポーネント
└── assets/
    └── images/            # 画像ファイル
```

## 🔧 使用技術

- **React Native** - クロスプラットフォームのモバイルアプリ開発フレームワーク
- **Expo** - React Native開発ツールチェーン
- **@shopify/react-native-skia** - SkiaグラフィックスエンジンのReact Nativeバインディング
- **react-native-reanimated** - 高性能なアニメーションライブラリ
- **react-native-gesture-handler** - ジェスチャー処理ライブラリ

## 📖 詳細情報

### React Native Skiaについて

React Native Skiaは、Flutterなどでも使われるSkiaエンジンをReact Nativeで利用するためのライブラリです。CanvasライクなAPIを提供し、ネイティブのAPIでは表現しづらいリッチな要素のレンダリングに向いています。

**主な特徴：**
- 高性能なグラフィックス描画
- Canvasライクな直感的なAPI
- React Native Reanimatedとの統合
- iOS、Android、Web対応

**活用シーン：**
- グラフやチャートの表示
- カスタムアニメーション
- 複雑なUI要素の描画
- 画像加工やフィルター効果

### 参考リソース

- [React Native Skia公式ドキュメント](https://shopify.github.io/react-native-skia/)
- [William Candillon YouTube チャンネル](https://www.youtube.com/wcandillon)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
# RN-Skia
