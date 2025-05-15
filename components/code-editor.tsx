'use client';

import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
}

export default function CodeEditor({
  value,
  onChange,
  language = 'javascript',
  height = '400px',
}: CodeEditorProps) {
  const [mounted, setMounted] = useState(false);

  // This is to avoid hydration errors with Monaco editor
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{ height }}
        className="border rounded-md bg-gray-50 p-4 font-mono text-sm overflow-auto"
      >
        {value}
      </div>
    );
  }

  return (
    <Editor
      height={height}
      language={language}
      value={value}
      onChange={(value) => onChange(value || '')}
      theme="vs-light"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        automaticLayout: true,
      }}
    />
  );
}
