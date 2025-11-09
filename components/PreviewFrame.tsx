import React from 'react';
import type { AppSchema } from '@/types/builder';

export function PreviewFrame({ schema }: { schema: AppSchema | null }) {
	if (!schema) {
		return (
			<div className="h-full w-full bg-white flex items-center justify-center">
				<div className="text-center">
					<p className="text-gray-500 text-sm">No schema available</p>
					<p className="text-gray-400 text-xs mt-2">Start building your app to see the preview</p>
				</div>
			</div>
		);
	}

	return (
		<div className="h-full w-full bg-white">
			<div className="p-3 text-sm text-neutral-600">Render from schema (placeholder)</div>
			<pre className="text-xs p-3 overflow-auto h-full">{JSON.stringify(schema, null, 2)}</pre>
		</div>
	);
}


