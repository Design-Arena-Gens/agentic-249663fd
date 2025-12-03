"use client";
import { useState } from 'react';
import { generateIdeas } from '@/lib/ideas';
import { generateCaption } from '@/lib/captions';
import { generateHashtags } from '@/lib/hashtags';

export default function BotAssistant() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState<string>('');

  function runAssistant() {
    const text = prompt.trim();
    if (!text) return;
    // Very simple rule-based assistant
    if (/idea|content|post/i.test(text)) {
      const ideas = generateIdeas({ niche: text, topics: [], style: 'engaging' }).slice(0, 5);
      setOutput(ideas.map((i, idx) => `${idx + 1}. ${i.title} ? ${i.hook}`).join('\n'));
      return;
    }
    if (/caption|write/i.test(text)) {
      const cap = generateCaption({ topic: text, tone: 'friendly', includeEmojis: true, callToAction: 'Follow for more!' });
      setOutput(cap);
      return;
    }
    if (/hashtag|tags?/i.test(text)) {
      const tags = generateHashtags({ keywords: text.split(/[,\s]+/).filter(Boolean), niche: 'general', limit: 20 });
      setOutput(tags.map(t => `#${t}`).join(' '));
      return;
    }
    setOutput('Try asking for ideas, a caption, or hashtags.');
  }

  return (
    <div className="card">
      <h3>Assistant</h3>
      <div className="row">
        <div className="col">
          <textarea className="input textarea" placeholder="Ask for ideas, captions, or hashtags" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </div>
      </div>
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button className="button" onClick={runAssistant}>Generate</button>
        <button className="button ghost" onClick={() => setOutput('')}>Clear</button>
      </div>
      {output && (
        <pre style={{ whiteSpace: 'pre-wrap', background: '#0f172a', color: 'white', padding: 12, borderRadius: 8, marginTop: 12, overflow: 'auto' }}>{output}</pre>
      )}
      <p className="small" style={{ marginTop: 8 }}>Note: This assistant is rule-based and runs locally without external APIs.</p>
    </div>
  );
}
