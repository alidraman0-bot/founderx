"use client";
import { useState } from 'react';
import type { AppSchema } from '@/types/builder';

export function AIChat({ onRun, disabled }: { onRun: (message: string) => Promise<AppSchema> | AppSchema; disabled?: boolean; }) {
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleRun() {
		if (!message.trim()) return;
		setLoading(true);
		try { await onRun(message); setMessage(''); } finally { setLoading(false); }
	}

	return (
		<div className="space-y-2">
			<textarea className="w-full border rounded px-3 py-2 min-h-[120px]" placeholder="Describe your change..." value={message} onChange={e => setMessage(e.target.value)} disabled={disabled || loading} />
			<button onClick={handleRun} disabled={disabled || loading} className="w-full bg-black text-white py-2 rounded">{loading ? 'Running...' : 'Run'}</button>
		</div>
	);
}


