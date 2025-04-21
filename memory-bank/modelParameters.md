# Model Parameters

各モデルで設定可能なパラメータ一覧

| モデルID          | Temperature | Max Tokens | Top P | Frequency Penalty | Presence Penalty | Stream |
|-------------------|:-----------:|:----------:|:-----:|:-----------------:|:----------------:|:------:|
| gpt-3.5-turbo     | ✓           | ✓          | ✓     | ✓                 | ✓                | ✓      |
| gpt-4             | ✓           | ✓          | ✓     | ✓                 | ✓                | ✓      |
| gpt-4.1-nano      | ×           | ✓          | ✓     | ✓                 | ✓                | ✓      |

- **Temperature**: 応答の創発性・ランダム性 (0.0–2.0)  
- **Max Tokens**: 生成トークンの最大数  
- **Top P**: nucleus sampling (0.0–1.0)  
- **Frequency Penalty**: 頻出ワード抑制 (0.0–2.0)  
- **Presence Penalty**: 新規トピック推奨 (0.0–2.0)  
- **Stream**: ストリーミング応答の可否  

> ※将来的に他社 API やカスタムモデルのパラメータ定義を追加してください。
