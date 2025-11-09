"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
	{ href: '/dashboard', label: 'Dashboard' },
	{ href: '/data', label: 'Data' },
	{ href: '/workflows', label: 'Workflows' },
	{ href: '/templates', label: 'Templates' },
	{ href: '/settings', label: 'Settings' },
	{ href: '/analytics', label: 'Analytics' },
];

export function Sidebar() {
	const pathname = usePathname();
	return (
		<aside className="h-screen w-60 border-r bg-white p-4">
			<div className="mb-4 font-semibold">FounderX</div>
			<nav className="space-y-1">
				{links.map((l) => (
					<Link key={l.href} href={l.href} className={`block rounded px-3 py-2 text-sm ${pathname === l.href ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}>{l.label}</Link>
				))}
			</nav>
		</aside>
	);
}


