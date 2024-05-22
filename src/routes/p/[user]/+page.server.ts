import { deleteSessionCookie } from '@/server/sessionManager.server';
import type { PageServerLoad, Actions } from './$types';
import { lucia } from '@/server/auth.server'
import { redirect } from '@sveltejs/kit';


export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	logout: async ({ cookies, locals }) => {
		if (!locals.session?.id) return;

		await lucia.invalidateSession(locals.session.id);

		await deleteSessionCookie(lucia, cookies);

		throw redirect(303, "/login");
	},
}
