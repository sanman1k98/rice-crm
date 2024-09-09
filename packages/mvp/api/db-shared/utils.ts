import { fileURLToPath } from 'node:url';
import { relative, isAbsolute } from 'node:path';

export function relativeFromCwd(absPath: URL | string) {
  const path = absPath instanceof URL ? fileURLToPath(absPath) : absPath;
  if (!isAbsolute(path))
    throw new Error('`path` must be an absolute path.');
  return relative(process.cwd(), path);
}

export function localServiceDbPath() {
  const absUrl = new URL('../.databases/service.db', import.meta.url);
  const relPath = relative(process.cwd(), fileURLToPath(absUrl));
  return `file:${relPath}`;
}

export function localOrgDbPath(name: string) {
  const absUrl = new URL(`../.databases/orgs/${name}`, import.meta.url);
  const relPath = relative(process.cwd(), fileURLToPath(absUrl));
  return `file:${relPath}`;
}
