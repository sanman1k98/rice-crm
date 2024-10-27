/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		session: import('./lib/sessions').TSession | null;
		user: import('./lib/sessions').TUser | null;
	}
}
