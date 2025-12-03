"use client";
import { useState } from 'react';
import { generateIdeas } from '@/lib/ideas';

export default function IdeasGenerator() {
  const [niche, setNiche] = useState('content creators');
  const [topics, setTopics] = useState('consistency, batching, hooks, engagement');
  const [style, setStyle] = useState<'engaging'|'educational'|'story'|'listicle'|'behind-the-scenes'>('engaging');

  const list = generateIdeas({ niche, topics: topics.split(/,\s*/).filter(Boolean), style });

  return (
    <div className="card">
      <h3>Content Ideas</h3>
      <div className="row">
        <div className="col">
          <label className="small">Niche</label>
          <input className="input" value={niche} onChange={(e) => setNiche(e.target.value)} />
        </div>
        <div className="col">
          <label className="small">Topics (comma separated)</label>
          <input className="input" value={topics} onChange={(e) => setTopics(e.target.value)} />
        </div>
        <div className="col">
          <label className="small">Style</label>
          <select className="input" value={style} onChange={(e) => setStyle(e.target.value as any)}>
            <option value="engaging">Engaging</option>
            <option value="educational">Educational</option>
            <option value="story">Story</option>
            <option value="listicle">Listicle</option>
            <option value="behind-the-scenes">Behind the scenes</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '28%' }}>Title</th>
              <th>Hook</th>
              <th style={{ width: '28%' }}>Structure</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, idx) => (
              <tr key={idx}>
                <td>{item.title}</td>
                <td>{item.hook}</td>
                <td>{item.structure.join(' ? ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
