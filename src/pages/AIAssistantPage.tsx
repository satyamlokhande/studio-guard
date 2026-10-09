import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  AssistantMessage,
  askAquaGuardAssistant,
} from '../services/aiAssistantService';
import {
  Bot,
  User,
  Send,
  Sparkles,
  Trash2,
  Copy,
  Check,
  Compass,
  AlertTriangle,
  Droplets,
  HelpCircle,
  FileText,
  Shield,
  Layers,
} from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  const { stations, alerts, waterQualityMap, pipelineFlows, extractionAnomalies, isDemoMode } = useApp();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      timestamp: 'Just now',
      provider: 'local_engine',
      text: `Hello! I am **AquaGuard AI**, your intelligent hydrogeological decision-support assistant.

I have direct access to our live telemetry database across all **12 monitoring stations** in the Green Valley Aquifer Basin, including real-time water table depths, multi-parameter water quality sondes, pipeline mass-balance flows, and automated anomaly logs.

Select a suggested prompt below or ask me any question regarding aquifer health, leak diagnostics, or conservation planning.`,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || loading) return;

    const userMessage: AssistantMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await askAquaGuardAssistant(promptText, messages, {
        stations,
        alerts,
        waterQualityMap,
        pipelineFlows,
        extractionAnomalies,
      });

      const assistantMessage: AssistantMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: result.provider,
        citations: result.citations,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-' + (Date.now() + 1),
          sender: 'assistant',
          text: 'An error occurred while generating a response. Please verify your query or try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          provider: 'local_engine',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const suggestedQuestions = [
    'Which locations have critically low groundwater levels?',
    'Explain the latest water-quality warnings.',
    'What could cause an unusual flow reading?',
    'Which locations should authorities inspect first?',
    'How can groundwater recharge be improved?',
    "Summarize this week's monitoring data.",
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-sky-700 text-white shadow-xs">
            <Bot className="w-6 h-6" />
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                AquaGuard AI Assistant
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                Groundwater Intelligence
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Grounded in real-time basin telemetry, piezometric hydrographs, and ISO safety thresholds.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setMessages([
                {
                  id: 'welcome-reset',
                  sender: 'assistant',
                  timestamp: 'Just now',
                  provider: 'local_engine',
                  text: 'Conversation reset. How can I assist you with the Green Valley aquifer monitoring data today?',
                },
              ])
            }
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-rose-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Suggested Prompts Shelf */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Recommended Hydrogeological Queries:</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={loading}
              className="text-xs font-medium px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/50 text-slate-700 transition-all text-left shadow-2xs disabled:opacity-50 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs min-h-[460px] flex flex-col justify-between space-y-4">
        <div className="space-y-5 overflow-y-auto max-h-[560px] pr-2">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-slate-900 text-white'
                      : 'bg-sky-700 text-white shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-sky-700 text-white rounded-tr-xs'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  {/* Top metadata for assistant */}
                  {!isUser && (
                    <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200/60 text-[10px] text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700">AquaGuard AI Engine</span>
                        <span className="px-1.5 py-0.2 rounded-xs bg-slate-200/70 text-slate-700 font-mono">
                          {m.provider === 'gemini' ? 'Gemini 3.8 Flash' : 'Hydrogeology Telemetry AI'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span>{m.timestamp}</span>
                        <button
                          onClick={() => handleCopy(m.id, m.text)}
                          className="hover:text-slate-900 p-0.5 rounded-xs"
                          title="Copy response"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Message body with Markdown styling */}
                  <div className="space-y-2 whitespace-pre-wrap font-sans">
                    {m.text}
                  </div>

                  {/* Citations if available */}
                  {!isUser && m.citations && m.citations.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                      <span className="font-semibold text-slate-600">Grounded in:</span>
                      {m.citations.map((c, i) => (
                        <span
                          key={i}
                          className="bg-white border border-slate-200 px-1.5 py-0.5 rounded-sm font-mono text-sky-800"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading indicator */}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-xs p-3.5 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                <span>AquaGuard AI is analyzing hydrogeological telemetry & rules...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="pt-3 border-t border-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask AquaGuard AI (e.g. 'What is causing the water quality alert at ST-104?')"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-[10px] text-slate-500 mt-2 text-center">
            AquaGuard AI provides predictive analysis and operational guidance based on sensor models. Always verify on-site with physical testing kits.
          </p>
        </div>
      </div>
    </div>
  );
};
