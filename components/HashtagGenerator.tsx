"use client";
import { useState } from 'react';
import { generateHashtags } from '@/lib/hashtags';

export default function HashtagGenerator() {
  const [keywords, setKeywords] = useState('content strategy growth consistency batching');
  const [niche, setNiche] = useState('creator');
  const [limit, setLimit] = useState(20);
  const tags = generateHashtags({ keywords: keywords.split(/[,\s]+/).filter(Boolean), niche, limit });

  return (
    <div className="card">
      <h3>Hashtag Generator</h3>
      <div className="row">
        <div className="col">
          <label className="small">Keywords (comma or space separated)</label>
          <textarea className="input textarea" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
        </div>
        <div className="col">
          <label className="small">Niche</label>
          <input className="input" value={niche} onChange={(e) => setNiche(e.target.value)} />
          <label className="small" style={{ marginTop: 8, display: 'block' }}>Limit</label>
          <input className="input" type="number" min={1} max={30} value={limit} onChange={(e) => setLimit(Math.min(30, Math.max(1, Number(e.target.value))))} />
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <div className="list">
          <div>
            {tags.map((t) => (
              <span key={t} className="badge" style={{ marginRight: 6, marginBottom: 6 }}>#{t}</span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 8 }}>
          <button className="button ghost" onClick={() => navigator.clipboard.writeText(tags.map(t => `#${t}`).join(' '))}>Copy All</button>
        </div>
      </div>
    </div>
  );
}
