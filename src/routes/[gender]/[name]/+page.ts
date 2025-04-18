import type { EntryGenerator } from './$types';
import M_NAMES from '$lib/MALE.list';
import F_NAMES from '$lib/FEMALE.list';

export const prerender = true;

export const entries: EntryGenerator = () => {
  const males = M_NAMES.map((name: string) => ({ gender: 'male', name: name.toLowerCase() }));
  const females = F_NAMES.map((name: string) => ({ gender: 'female', name: name.toLowerCase() }));
  return [...males, ...females];
};
