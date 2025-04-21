import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY environment variable');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// モデル情報定義
interface ModelInfo {
  id: string;
  name: string;
  fee: { input: number; cachedInput: number; output: number };
  supportsTemperature: boolean;
}
const modelsInfo: ModelInfo[] = [
  { id: 'gpt-4.1-2025-04-14', name: 'gpt-4.1', fee: { input: 2.0, cachedInput: 0.5, output: 8.0 }, supportsTemperature: true },
  { id: 'gpt-4.1-mini-2025-04-14', name: 'gpt-4.1-mini', fee: { input: 0.4, cachedInput: 0.1, output: 1.6 }, supportsTemperature: true },
  { id: 'gpt-4.1-nano-2025-04-14', name: 'gpt-4.1-nano', fee: { input: 0.1, cachedInput: 0.025, output: 0.4 }, supportsTemperature: true },
  { id: 'gpt-4o-2024-08-06', name: 'gpt-4o', fee: { input: 2.5, cachedInput: 1.25, output: 10.0 }, supportsTemperature: true },
  { id: 'gpt-4o-mini-2024-07-18', name: 'gpt-4o-mini', fee: { input: 0.15, cachedInput: 0.075, output: 0.6 }, supportsTemperature: true },
  { id: 'o1-2024-12-17', name: 'o1', fee: { input: 15.0, cachedInput: 7.5, output: 60.0 }, supportsTemperature: false },
  { id: 'o1-pro-2025-03-19', name: 'o1-pro', fee: { input: 150.0, cachedInput: 0.0, output: 600.0 }, supportsTemperature: false },
  { id: 'o3-2025-04-16', name: 'o3', fee: { input: 10.0, cachedInput: 2.5, output: 40.0 }, supportsTemperature: false },
  { id: 'o4-mini-2025-04-16', name: 'o4-mini', fee: { input: 1.1, cachedInput: 0.275, output: 4.4 }, supportsTemperature: false },
  { id: 'o3-mini-2025-01-31', name: 'o3-mini', fee: { input: 1.1, cachedInput: 0.55, output: 4.4 }, supportsTemperature: false },
  { id: 'o1-mini-2024-09-12', name: 'o1-mini', fee: { input: 1.1, cachedInput: 0.55, output: 4.4 }, supportsTemperature: false },
];

app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, model, temperature } = req.body;
  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }
  try {
    const modelInfo = modelsInfo.find(m => m.id === model);
    const temp = modelInfo && modelInfo.supportsTemperature ? temperature : undefined;
    const completion = await openai.chat.completions.create({
      model: model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      temperature: typeof temp === 'number' ? temp : undefined,
    });
    const reply = completion.choices[0]?.message?.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.get('/api/models', (_req: Request, res: Response) => {
  res.json({ models: modelsInfo });
});

app.get('/healthz', (_req: Request, res: Response) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
