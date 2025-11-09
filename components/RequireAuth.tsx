"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase/client';

export function RequireAuth({ children }: { children: React.ReactNode }) {
	const [loading, setLoading] = useState(true);
	const [isAuthed, setIsAuthed] = useState(false);

	useEffect(() => {
		let mounted = true;
		async function check() {
			const { data } = await supabase.auth.getUser();
			if (!mounted) return;
			setIsAuthed(!!data.user);
			setLoading(false);
		}
		check();
		return () => { mounted = false; };
	}, []);

	if (loading) return <div className="p-6 text-neutral-600">Checking session...</div>;
	if (!isAuthed) {
		return (
			<div className="p-6 space-y-3">
				<div className="text-lg font-medium">You must be signed in</div>
				<div className="text-sm text-neutral-600">Please sign in to access the builder.</div>
				<div className="flex gap-3">
					<Link className="underline" href="/auth/login">Login</Link>
					<Link className="underline" href="/auth/register">Register</Link>
				</div>
			</div>
		);
	}

	return <>{children}</>;
}


