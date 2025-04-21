# OpenAI Chat Web App

ローカルで動作する **OpenAI API 利用チャットアプリ** のモノレポ (client / server) です。  
MVP 実装フェーズ (Phase 1) に向けた初期セットアップを行いました。

## ディレクトリ構成（予定）

```
.
├── client/   # React + Vite + TypeScript (UI)
├── server/   # Express + TypeScript (API ルーター)
├── .gitignore
├── README.md
├── package.json
└── pnpm-workspace.yaml
```

> client / server フォルダは今後のコミットで生成します。

## 前提

- Node.js ≥ 18  
- pnpm ≥ 8（推奨） *npm でも動作しますがワークスペース機能の都合で pnpm を想定*

### pnpm インストール

```bash
npm install -g pnpm
```

## セットアップ

```bash
pnpm install          # ルートで一括インストール
pnpm dev              # client と server を並列起動 (concurrently)
```

## 環境変数

```
# server/.env
OPENAI_API_KEY=sk-********************************
```

## スクリプト

| コマンド           | 説明                                     |
| ------------------ | ---------------------------------------- |
| `pnpm dev`         | client/server 開発サーバ同時起動         |
| `pnpm build`       | client → server の順に本番ビルド         |
| `pnpm test`        | ルート以下すべてのパッケージでテスト実行 |
| `pnpm lint`        | ESLint + Prettier チェック               |

## ライセンス

MIT
