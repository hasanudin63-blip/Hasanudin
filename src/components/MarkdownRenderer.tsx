import React from 'react';

export type DocThemeId = 'emerald' | 'sapphire' | 'crimson' | 'amethyst' | 'amber' | 'classic';

export interface DocTheme {
  id: DocThemeId;
  name: string;
  h1Text: string;
  h1Border: string;
  h2Text: string;
  h2Border: string;
  h3Text: string;
  listMarker: string;
  tableHeaderBg: string;
  tableHeaderText: string;
  boldText: string;
}

export const DOC_THEMES: Record<DocThemeId, DocTheme> = {
  emerald: {
    id: 'emerald',
    name: 'Emerald Forest (Default)',
    h1Text: 'text-teal-950',
    h1Border: 'border-teal-100',
    h2Text: 'text-teal-900',
    h2Border: 'border-[#043b32]',
    h3Text: 'text-emerald-700',
    listMarker: 'marker:text-emerald-600',
    tableHeaderBg: 'bg-teal-50/70',
    tableHeaderText: 'text-[#043b32]',
    boldText: 'text-teal-950',
  },
  sapphire: {
    id: 'sapphire',
    name: 'Ocean Sapphire (Biru)',
    h1Text: 'text-blue-950',
    h1Border: 'border-blue-100',
    h2Text: 'text-blue-900',
    h2Border: 'border-blue-600',
    h3Text: 'text-sky-700',
    listMarker: 'marker:text-blue-500',
    tableHeaderBg: 'bg-blue-50/70',
    tableHeaderText: 'text-blue-950',
    boldText: 'text-blue-950',
  },
  crimson: {
    id: 'crimson',
    name: 'Ruby Crimson (Akademis/SD)',
    h1Text: 'text-rose-950',
    h1Border: 'border-rose-100',
    h2Text: 'text-rose-900',
    h2Border: 'border-rose-700',
    h3Text: 'text-rose-650',
    listMarker: 'marker:text-rose-600',
    tableHeaderBg: 'bg-rose-50/70',
    tableHeaderText: 'text-rose-950',
    boldText: 'text-rose-950',
  },
  amethyst: {
    id: 'amethyst',
    name: 'Amethyst Purple (Ungu)',
    h1Text: 'text-purple-950',
    h1Border: 'border-purple-100',
    h2Text: 'text-purple-900',
    h2Border: 'border-purple-650',
    h3Text: 'text-purple-600',
    listMarker: 'marker:text-purple-500',
    tableHeaderBg: 'bg-purple-50/70',
    tableHeaderText: 'text-purple-950',
    boldText: 'text-purple-950',
  },
  amber: {
    id: 'amber',
    name: 'Warm Amber (Emas/Cokelat)',
    h1Text: 'text-amber-950',
    h1Border: 'border-amber-100',
    h2Text: 'text-amber-900',
    h2Border: 'border-amber-650',
    h3Text: 'text-amber-700',
    listMarker: 'marker:text-amber-600',
    tableHeaderBg: 'bg-amber-50/75',
    tableHeaderText: 'text-amber-950',
    boldText: 'text-amber-950',
  },
  classic: {
    id: 'classic',
    name: 'Classic Midnight (Hemat Tinta)',
    h1Text: 'text-slate-900',
    h1Border: 'border-slate-300',
    h2Text: 'text-slate-800',
    h2Border: 'border-slate-900',
    h3Text: 'text-slate-700',
    listMarker: 'marker:text-slate-500',
    tableHeaderBg: 'bg-slate-100',
    tableHeaderText: 'text-slate-900',
    boldText: 'text-black',
  }
};

interface MarkdownRendererProps {
  content: string;
  themeId?: DocThemeId;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  themeId = 'emerald' 
}) => {
  if (!content) return null;

  const activeTheme = DOC_THEMES[themeId] || DOC_THEMES['emerald'];

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className={`list-disc pl-6 mb-4 space-y-1.5 text-slate-705 ${activeTheme.listMarker}`}>
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: parseInlineStyles(item) }} />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const flushTable = (key: string) => {
    if (inTable) {
      elements.push(
        <div key={`table-wrapper-${key}`} className="overflow-x-auto my-6 border border-slate-200 rounded-lg shadow-xs">
          <table className="min-w-full divide-y divide-slate-200 text-sm text-left">
            <thead className={`${activeTheme.tableHeaderBg} ${activeTheme.tableHeaderText} font-semibold`}>
              <tr>
                {tableHeaders.map((h, idx) => (
                  <th key={idx} className="px-4 py-3 border-b border-slate-200 font-bold whitespace-nowrap text-xs uppercase tracking-wider" dangerouslySetInnerHTML={{ __html: parseInlineStyles(h) }} />
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200 text-slate-600">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-52/30"}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-slate-700 font-medium" dangerouslySetInnerHTML={{ __html: parseInlineStyles(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableHeaders = [];
      tableRows = [];
      inTable = false;
    }
  };

  const parseInlineStyles = (text: string) => {
    let html = text;
    // Bold: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, `<strong class="font-bold ${activeTheme.boldText}">$1</strong>`);
    // Italic: *text*
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-slate-800">$1</em>');
    return html;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Table detection: line starting with |
    if (line.startsWith('|')) {
      flushList(`t-${i}`);
      
      const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      // Separator |---|---|
      if (cells.every(c => c.startsWith('-'))) {
        continue;
      }
      
      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else {
      flushTable(`t-${i}`);
    }

    // Bullet points
    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushTable(`l-${i}`);
      listItems.push(line.substring(2));
      continue;
    } else {
      flushList(`l-${i}`);
    }

    // Headings
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className={`text-2xl sm:text-3xl font-extrabold font-sans ${activeTheme.h1Text} mt-8 mb-5 border-b ${activeTheme.h1Border} pb-2.5 tracking-tight`} dangerouslySetInnerHTML={{ __html: parseInlineStyles(line.substring(2)) }} />
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className={`text-xl font-bold font-sans ${activeTheme.h2Text} mt-7 mb-4 tracking-tight border-l-4 ${activeTheme.h2Border} pl-3.5 leading-7`} dangerouslySetInnerHTML={{ __html: parseInlineStyles(line.substring(3)) }} />
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className={`text-lg font-bold font-sans ${activeTheme.h3Text} mt-5 mb-3 tracking-tight leading-6`} dangerouslySetInnerHTML={{ __html: parseInlineStyles(line.substring(4)) }} />
      );
    } else if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={i} className="text-base font-semibold font-sans text-slate-800 mt-4 mb-2 tracking-tight" dangerouslySetInnerHTML={{ __html: parseInlineStyles(line.substring(5)) }} />
      );
    } else if (line === '') {
      elements.push(<div key={i} className="h-3" />);
    } else {
      elements.push(
        <p key={i} className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: parseInlineStyles(line) }} />
      );
    }
  }

  // Final flush
  flushList('end');
  flushTable('end');

  return <div className="markdown-body text-slate-800">{elements}</div>;
};
