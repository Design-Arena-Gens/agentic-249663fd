"use client";
import { useEffect, useState } from 'react';
import { PlannedPost, exportCsv, exportJson, loadPlanned, parseCsv, parseJson, savePlanned } from '@/lib/scheduler';

export default function ExportImport() {
  const [posts, setPosts] = useState<PlannedPost[]>([]);
  const [format, setFormat] = useState<'json'|'csv'>('json');
  const [text, setText] = useState('');

  useEffect(() => { setPosts(loadPlanned()); }, []);
  useEffect(() => { setText(format === 'json' ? exportJson(posts) : exportCsv(posts)); }, [posts, format]);

  function download() {
    const blob = new Blob([text], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `insta-planned.${format}`; a.click();
    URL.revokeObjectURL(url);
  }

  function importText() {
    try {
      const imported = format === 'json' ? parseJson(text) : parseCsv(text);
      savePlanned(imported);
      setPosts(imported);
      alert('Imported successfully');
    } catch (e: any) {
      alert('Failed to import: ' + e.message);
    }
  }

  return (
    <div className="card">
      <h3>Export / Import</h3>
      <div className="row">
        <div className="col">
          <label className="small">Format</label>
          <select className="input" value={format} onChange={(e) => setFormat(e.target.value as any)}>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        <div className="col" style={{ alignSelf: 'end' }}>
          <button className="button" onClick={download}>Download</button>
          <button className="button ghost" style={{ marginLeft: 8 }} onClick={importText}>Import</button>
        </div>
      </div>

      <textarea className="input textarea" value={text} onChange={(e) => setText(e.target.value)} style={{ marginTop: 12, minHeight: 260 }} />
      <p className="small">This data includes your planned posts, captions, and hashtags. Keep it safe.</p>
    </div>
  );
}
