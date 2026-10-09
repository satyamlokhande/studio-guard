import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI SDK on server-side if key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API: AquaGuard AI Assistant Endpoint
app.post('/api/assistant', async (req, res) => {
  try {
    const { prompt, history, context } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (aiClient && process.env.GEMINI_API_KEY) {
      const systemInstruction = `You are AquaGuard AI, an expert full-stack hydrogeological decision-support assistant for the Green Valley Groundwater Monitoring and Management System.
You have direct access to live telemetry across 12 monitoring stations, pipeline electromagnetic flow meters, and multi-parameter water quality sondes.
Key Data Context:
- Monitored Stations: ${context?.stationCount || 12}
- Critical Wells: ${JSON.stringify(context?.criticalStations || [])}
- Active Priority Alerts: ${JSON.stringify(context?.activeAlerts || [])}
- Water Quality Issues: ${JSON.stringify(context?.waterQualityAlerts || [])}
- Pipeline Mass-Balance Loss: ${JSON.stringify(context?.pipelineLeaks || [])}

Instructions:
1. Provide concise, highly actionable, and professional answers formatted in Markdown with clear headings and bullet points.
2. Ground all answers in the actual telemetry values and cite specific station codes (e.g., ST-104, ST-105, PL-UI-04).
3. Distinguish observed physical readings from hypothesized root causes.
4. If asked about water safety, explicitly state that in-situ physical readings do not replace certified ISO/EPA microbiological laboratory testing.
5. If data is unknown or outside the Green Valley basin scope, say so honestly.`;

      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.text }],
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: prompt }],
      });

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
        },
      });

      const responseText = response.text || '';
      return res.json({
        text: responseText,
        provider: 'gemini',
        citations: ['Green Valley Telemetry Network', 'Gemini 3.8 Flash'],
      });
    }

    // If no GEMINI_API_KEY, return fallback signal so client uses domain intelligence engine
    return res.status(503).json({
      error: 'GEMINI_API_KEY not configured on server; using AquaGuard Local Engine',
      fallback: true,
    });
  } catch (error: any) {
    console.error('Gemini API Error in server.ts:', error);
    return res.status(500).json({
      error: error?.message || 'Server assistant error',
      fallback: true,
    });
  }
});

// Mount Vite middleware in development mode or serve static build in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AquaGuard server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
