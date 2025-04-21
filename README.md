# ai-chat-webapp

[![CI](https://github.com/nshrhm/ai-chat-webapp/actions/workflows/ci.yml/badge.svg)](https://github.com/nshrhm/ai-chat-webapp/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/node-%3E=_18-brightgreen.svg)](https://nodejs.org/)

OpenAI の複数モデル・API を比較しながらチャット体験を検証できる Web アプリケーション。  
リアルタイムの対話 UI に加え、API 特有の機能を実装・評価できる拡張性を備え、将来的には他社の AI API も簡単に組み込める設計です。

## デモ

![スクリーンショット](docs/screenshot.png)

## Features

- シンプルなチャット UI  
- OpenAI Chat API 呼び出し  
- エラーハンドリング・再試行機能  
- TailwindCSS レスポンシブデザイン  
- Vite proxy による CORS 回避  
- モノレポ構成（client + server）
- 動的モデル選択機能（ドロップダウン）

## Installation

```bash
git clone https://github.com/nshrhm/ai-chat-webapp.git
cd ai-chat-webapp
pnpm install
```

## Development

```bash
pnpm dev
```

- Client: http://localhost:5173  
- Server: http://localhost:3001  

### モデル一覧フェッチ
フロントエンドは `/api/models` を呼び出し、利用可能モデルを取得してドロップダウンに表示します。

## Build

```bash
pnpm build
```

## Environment Variables

サーバー側の環境変数ファイルを作成します。

```bash
# server/.env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Contributing

プルリクエスト歓迎。`feature/*`, `bugfix/*` ブランチ戦略、Conventional Commits を採用。

## License

MIT
