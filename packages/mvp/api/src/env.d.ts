/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly SERVICE_DB_URL?: string;
	readonly SERVICE_DB_AUTH_TOKEN?: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
