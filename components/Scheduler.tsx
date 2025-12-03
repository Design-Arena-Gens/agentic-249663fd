"use client";
import { useEffect, useMemo, useState } from 'react';
import { format, addDays, startOfDay } from 'date-fns';
import { PlannedPost, loadPlanned, savePlanned } from '@/lib/scheduler';
import { generateHashtags } from '@/lib/hashtags';
import { generateCaption } from '@/lib/captions';

function uid() { return Math.random().toString(36).slice(2, 10); }

export default function Scheduler() {
  const [posts, setPosts] = useState<PlannedPost[]>([]);
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [time, setTime] = useState<string>('09:00');
  const [caption, setCaption] = useState<string>('');
  const [hashtagsInput, setHashtagsInput] = useState<string>('growth consistency hooks');
  const hashtags = useMemo(() => generateHashtags({ keywords: hashtagsInput.split(/[,\s]+/).filter(Boolean), limit: 12 }), [hashtagsInput]);

  useEffect(() => { setPosts(loadPlanned()); }, []);
  useEffect(() => { savePlanned(posts); }, [posts]);

  function addPost() {
    const dt = new Date(`${date}T${time}:00`);
    const newPost: PlannedPost = {
      id: uid(),
      datetime: dt.toISOString(),
      caption,
      hashtags,
      status: 'planned'
    };
    setPosts((p) => [...p, newPost]);
    setCaption('');
  }

  function suggestCaption() {
    setCaption(generateCaption({ topic: caption || 'Sharing my top content tips', tone: 'educational', includeEmojis: true, callToAction: 'Save and share!' }));
  }

  function remove(id: string) { setPosts((p) => p.filter(x => x.id !== id)); }
  function updateStatus(id: string, status: 'planned'|'draft'|'posted') { setPosts(p => p.map(x => x.id === id ? { ...x, status } : x)); }

  const next7 = Array.from({ length: 7 }, (_, i) => addDays(startOfDay(new Date()), i));

  return (
    <div className="card">
      <h3>Scheduler</h3>
      <div className="row">
        <div className="col">
          <label className="small">Date</label>
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="col">
          <label className="small">Time</label>
          <input className="input" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <div className="col">
          <label className="small">Caption</label>
          <textarea className="input textarea" value={caption} onChange={(e) => setCaption(e.target.value)} />
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button className="button" onClick={addPost} disabled={!caption}>Add to Schedule</button>
            <button className="button ghost" onClick={suggestCaption}>Suggest caption</button>
          </div>
        </div>
        <div className="col">
          <label className="small">Hashtag keywords</label>
          <input className="input" value={hashtagsInput} onChange={(e) => setHashtagsInput(e.target.value)} />
          <div style={{ marginTop: 8 }}>
            {hashtags.map(h => <span key={h} className="badge" style={{ marginRight: 6, marginBottom: 6 }}>#{h}</span>)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <h4 style={{ margin: '8px 0' }}>Next 7 days</h4>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 150 }}>When</th>
              <th>Caption</th>
              <th style={{ width: 180 }}>Hashtags</th>
              <th style={{ width: 140 }}>Status</th>
              <th style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {posts
              .filter(p => new Date(p.datetime) <= addDays(new Date(), 7))
              .sort((a,b) => +new Date(a.datetime) - +new Date(b.datetime))
              .map((p) => (
              <tr key={p.id}>
                <td>{format(new Date(p.datetime), 'EEE, MMM d ? HH:mm')}</td>
                <td style={{ maxWidth: 420, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.caption}</td>
                <td>{p.hashtags.slice(0,6).map(h => `#${h}`).join(' ')}</td>
                <td>
                  <select className="input" value={p.status} onChange={(e) => updateStatus(p.id, e.target.value as any)}>
                    <option value="planned">Planned</option>
                    <option value="draft">Draft</option>
                    <option value="posted">Posted</option>
                  </select>
                </td>
                <td>
                  <button className="button secondary" onClick={() => remove(p.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="small" style={{ marginTop: 8 }}>Scheduler stores data locally in your browser. Export regularly to back up.</p>
    </div>
  );
}
