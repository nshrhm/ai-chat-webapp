# ai-chat-webapp Client

このディレクトリは React + TypeScript + Vite を用いたフロントエンドの実装を含みます。

## 概要

- OpenAI API を利用したチャット UI  
- モデル選択機能と料金表示  
- 複数行入力対応の質問フォーム  
- TailwindCSS によるスタイリング

## セットアップ

```bash
pnpm install
```

## 開発

```bash
pnpm dev
```

## 画像

- 利用例のスクリーンショット: `docs/fig01.png`  
- モデル選択画面: `docs/fig02.png`

## ESLint 設定の拡張例

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## 参考プラグイン

- [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)  
  },
})
```
