# Project Brief: ai‑chat‑webapp

本プロジェクトは、OpenAI API を利用した Web ベースのチャットアプリケーションを素早く立ち上げることを目的とします。  
ユーザーはブラウザ上で質問を入力し、AI からの応答をリアルタイムに受け取れます。

主なゴール:
- ローカル開発で動作する MVP（Phase 1）の実装  
- OpenAI API キーを環境変数管理し、セキュリティ確保  
- Web UI（React＋Vite＋TailwindCSS）と API サーバー（Express＋TypeScript）のモノレポ構成  
- エラーハンドリング、CORS、HTTPS、プロキシ設定によるスムーズな開発体験  
- GitHub Actions を使った CI/CD、GitHub 公開  

要件:
1. シンプル操作のチャット UI  
2. OpenAI API との連携  
3. エラーメッセージ表示と再試行機能  
4. TailwindCSS によるレスポンシブデザイン  
5. テスト、Lint、ビルド、デプロイの自動化  
6. 将来の拡張性を考慮した設計
