"use client";
import React from 'react';

export function Modal({ open, onClose, children, title }: { open: boolean; onClose: () => void; children: React.ReactNode; title?: string; }) {
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
			<div className="w-full max-w-lg rounded-lg bg-white shadow">
				<div className="flex items-center justify-between border-b px-4 py-3">
					<div className="font-medium">{title}</div>
					<button className="text-sm text-neutral-600" onClick={onClose}>Close</button>
				</div>
				<div className="p-4">{children}</div>
			</div>
		</div>
	);
}


