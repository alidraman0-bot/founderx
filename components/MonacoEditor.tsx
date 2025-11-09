"use client";
import React from 'react';
import Editor, { OnChange } from '@monaco-editor/react';

export function MonacoEditor({ value, language, height = "400px", onChange }: { value?: string; language?: string; height?: string | number; onChange?: OnChange; }) {
	return <Editor height={height} defaultLanguage={language} defaultValue={value} onChange={onChange} theme="vs-dark" />;
}


