# System Patterns: ai‑chat‑webapp

## モノレポ構成
- pnpm workspaces で `client/` (フロント) と `server/` (バック) を分割  
- ルートで一括管理・コマンド実行

## フロントエンド
- Vite + React + TypeScript + TailwindCSS  
- UI コンポーネント構造:
  - `ChatInput`, `MessageList`, `ErrorBanner` などモジュール化  
- Vite サーバーに proxy 設定 (`/api` → `http://localhost:3001`) を追加し、CORS を回避

## バックエンド
- Express + TypeScript (ESM)  
- `ts-node/esm` ローダーを指定した nodemon による開発サーバー  
- 環境変数管理: `dotenv` + `.env`  
- API: `/api/chat` で OpenAI の Chat API をラップ  
- ヘルスチェック: `/healthz`

## 共通
- 環境変数の型保証: tsconfig.json の `"types": ["node"]`  
- ESLint + Prettier + Husky でコード品質維持  
- GitHub Actions による CI/CD パイプライン

## 拡張性
- memory‑bank 下に API モデルや履歴を保存する構造を追加可能  
- 将来的に他社 API を同一構成に組み込みやすい設計
