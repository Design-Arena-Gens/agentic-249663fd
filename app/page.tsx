import NavTabs from '@/components/NavTabs';
import CaptionGenerator from '@/components/CaptionGenerator';
import HashtagGenerator from '@/components/HashtagGenerator';
import IdeasGenerator from '@/components/IdeasGenerator';
import Scheduler from '@/components/Scheduler';
import ExportImport from '@/components/ExportImport';
import BotAssistant from '@/components/BotAssistant';
'use client';
import { useState } from 'react';

const TABS = [
  { id: 'assistant', label: 'Assistant' },
  { id: 'ideas', label: 'Ideas' },
  { id: 'captions', label: 'Captions' },
  { id: 'hashtags', label: 'Hashtags' },
  { id: 'scheduler', label: 'Scheduler' },
  { id: 'export', label: 'Export/Import' },
];

export default function Page() {
  const [tab, setTab] = useState<string>('assistant');

  return (
    <div>
      <NavTabs tabs={TABS} activeId={tab} onSelect={setTab} />
      {tab === 'assistant' && <BotAssistant />}
      {tab === 'ideas' && <IdeasGenerator />}
      {tab === 'captions' && <CaptionGenerator />}
      {tab === 'hashtags' && <HashtagGenerator />}
      {tab === 'scheduler' && <Scheduler />}
      {tab === 'export' && <ExportImport />}
    </div>
  );
}
