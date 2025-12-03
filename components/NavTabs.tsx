"use client";
import clsx from 'clsx';

export default function NavTabs({ tabs, activeId, onSelect }: { tabs: { id: string; label: string }[]; activeId: string; onSelect: (id: string) => void; }) {
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button key={t.id} className={clsx('tab', { active: t.id === activeId })} onClick={() => onSelect(t.id)}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
