import React, { useState, useEffect } from 'react';

type Role = 'user' | 'assistant';
interface Message {
  role: Role;
  content: string;
}

interface ModelInfo {
  id: string;
  name: string;
  fee: {
    input: number;
    cachedInput: number;
    output: number;
  };
}

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelsInfo, setModelsInfo] = useState<ModelInfo[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4.1-nano-2025-04-14');
  const [temperature, setTemperature] = useState<number>(0.7);

  useEffect(() => {
    fetch('/api/models')
      .then(res => res.json())
      .then(data => setModelsInfo(data.models))
      .catch(() =>
        setModelsInfo([
          {
            id: 'gpt-4.1-nano-2025-04-14',
            name: 'gpt-4.1-nano',
            fee: { input: 0.1, cachedInput: 0.025, output: 0.4 },
          },
        ])
      );
  }, []);

  useEffect(() => {
    // モデル切替時に localStorage から温度を復元
    const savedTemp = localStorage.getItem(`temperature_${selectedModel}`);
    if (savedTemp !== null) {
      setTemperature(parseFloat(savedTemp));
    } else {
      setTemperature(0.7);
    }
  }, [selectedModel]);

  const currentModel = modelsInfo.find(m => m.id === selectedModel);

  const sendMessage = async () => {
    if (!input) return;
    const userMessage: Message = { role: 'user', content: input };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setLoading(true);
    setError(null);
    const payload = { message: input, model: selectedModel, temperature };
    setInput('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const botMessage: Message = { role: 'assistant', content: data.reply };
      setMessages(prev => [...updated, botMessage]);
    } catch (e: any) {
      setError(e.message || 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">AI チャット</h1>
        <select
          className="mb-2 p-2 border rounded"
          value={selectedModel}
          onChange={e => setSelectedModel(e.target.value)}
        >
          {modelsInfo.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        {currentModel && (
          <div className="mb-4 text-sm text-gray-600">
            入力 ${currentModel.fee.input.toFixed(2)} / キャッシュ入力 $
            ${currentModel.fee.cachedInput.toFixed(2)} / 出力 $
            ${currentModel.fee.output.toFixed(2)} (USD / 1M tokens)
          </div>
        )}
        <label className="mb-2 font-medium" htmlFor="temperature">
          Temperature: {temperature.toFixed(1)}
        </label>
        <input
          id="temperature"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={e => {
            const val = parseFloat(e.target.value);
            setTemperature(val);
            localStorage.setItem(`temperature_${selectedModel}`, val.toString());
          }}
          className="w-full mb-4"
        />
        <div className="flex-1 overflow-auto space-y-2 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'
                }`}
            >
              <span className="block font-medium">
                {msg.role === 'user' ? 'あなた' : 'AI'}:
              </span>
              <span>{msg.content}</span>
            </div>
          ))}
        </div>
        {error && (
          <div className="text-red-500 mb-2">
            {error}{' '}
            <button onClick={sendMessage} className="underline">
              再試行
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <textarea
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            placeholder="質問を入力..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            disabled={loading}
            rows={3}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? '送信中...' : '送信'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
