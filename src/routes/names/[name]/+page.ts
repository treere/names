import M_NAMES from '$lib/MALE.list';
import F_NAMES from '$lib/FEMALE.list';


export function entries() {
	return [...M_NAMES, ...F_NAMES].map((name) => ({name}));
}

export const prerender = true;