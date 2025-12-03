"use client";
import { useState } from 'react';
import { generateCaption } from '@/lib/captions';

export default function CaptionGenerator() {
  const [topic, setTopic] = useState('How to stay consistent with content');
  const [tone, setTone] = useState<'friendly'|'educational'|'motivational'|'witty'|'aesthetic'>('friendly');
  const [emojis, setEmojis] = useState(true);
  const [cta, setCta] = useState('Follow for more!');
  const [output, setOutput] = useState('');

  function onGenerate() {
    setOutput(generateCaption({ topic, tone, includeEmojis: emojis, callToAction: cta }));
  }

  return (
    <div className="card">
      <h3>Caption Generator</h3>
      <div className="row">
        <div className="col">
          <label className="small">Topic</label>
          <textarea className="input textarea" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
        <div className="col">
          <label className="small">Tone</label>
          <select className="input" value={tone} onChange={(e) => setTone(e.target.value as any)}>
            <option value="friendly">Friendly</option>
            <option value="educational">Educational</option>
            <option value="motivational">Motivational</option>
            <option value="witty">Witty</option>
            <option value="aesthetic">Aesthetic</option>
          </select>
          <div style={{ marginTop: 8 }}>
            <label className="small" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="checkbox" checked={emojis} onChange={(e) => setEmojis(e.target.checked)} /> Include emojis
            </label>
          </div>
          <label className="small" style={{ marginTop: 8, display: 'block' }}>Call to action</label>
          <input className="input" value={cta} onChange={(e) => setCta(e.target.value)} />
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <button className="button" onClick={onGenerate}>Generate Caption</button>
        <button className="button ghost" style={{ marginLeft: 8 }} onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>Copy</button>
      </div>
      {output && (
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f1f5f9', padding: 12, borderRadius: 8, marginTop: 12 }}>{output}</pre>
      )}
    </div>
  );
}
