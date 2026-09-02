import { useState } from 'react';
import type { ReactNode } from 'react';
import TabButton from './TabButton';

interface Tab {
  id: number;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

function Tabs({ tabs }: TabsProps) {
  const [selectedId, setSelectedId] = useState(tabs[0]?.id ?? 0);

  const selectedTab = tabs.find((tab) => tab.id === selectedId);

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            selected={selectedId === tab.id}
            onClick={() => setSelectedId(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>

      <div className="">{selectedTab?.content}</div>
    </div>
  );
}

export default Tabs;
