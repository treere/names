import type { EntryGenerator } from './$types';
import M_NAMES from '$lib/MALE.list';
import F_NAMES from '$lib/FEMALE.list';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return [...M_NAMES, ...F_NAMES].map((name: string) => ({ name: name.toLowerCase() }));
};
