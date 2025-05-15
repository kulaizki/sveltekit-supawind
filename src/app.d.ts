// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { SupabaseClient } from '@supabase/supabase-js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			getSession: () => Promise<Session | null>;
		}
		// interface PageData {}
		// interface Platform {}
	}

	interface ImportMetaEnv {
		PUBLIC_SUPABASE_URL: string;
		PUBLIC_SUPABASE_ANON_KEY: string;
		PUBLIC_SITE_URL?: string;
	}
  
	interface ImportMeta {
		env: ImportMetaEnv;
	}
}

// Needed for the Session type
interface Session {
	user: {
		id: string;
		email?: string;
		user_metadata: {
			[key: string]: any;
		};
	};
}

export {};
