export function TemplateCard({ title, onUse }: { title: string; onUse?: () => void }) {
	return (
		<div className="border rounded p-4 bg-white">
			<div className="h-24 bg-neutral-100 rounded mb-2" />
			<div className="font-medium">{title}</div>
			<button onClick={onUse} className="mt-2 text-sm underline">Use Template</button>
		</div>
	);
}


