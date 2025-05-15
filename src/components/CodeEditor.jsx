'use client';

import { useState, useEffect } from 'react';
import './CodeEditor.css';

function CodeEditor({ value, onChange, language = 'html' }) {
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setEditorValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <span className="language-badge">{language.toUpperCase()}</span>
      </div>
      <div className="editor-content">
        <textarea
          className="editor-textarea"
          value={editorValue}
          onChange={handleChange}
          spellCheck="false"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>
    </div>
  );
}

export default CodeEditor;
