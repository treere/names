import type { FormType } from './schema';
import M_NAMES from './MALE.list';
import F_NAMES from './FEMALE.list';

export interface Name {
  gender: Gender;
  name: string;
  key: string;
}

export type Gender = 'male' | 'female';

const MALE_NAMES: Name[] = M_NAMES.map((name: string) => ({
  gender: 'male',
  name,
  key: name.toLowerCase()
}));

const FEMALE_NAMES: Name[] = F_NAMES.map((name: string) => ({
  gender: 'female',
  name,
  key: name.toLowerCase()
}));

const names: Name[] = MALE_NAMES.concat(FEMALE_NAMES);

export const filteredNamesList = (filters: FormType): Name[] => {
  let n = names;

  if (!filters.male) n = n.filter((name) => name.gender !== 'male');

  if (!filters.female) n = n.filter((name) => name.gender !== 'female');

  if (filters.minLength > 0) n = n.filter((name) => name.name.length >= filters.minLength);

  if (filters.maxLength > 0) n = n.filter((name) => name.name.length <= filters.maxLength);

  if (filters.contain.length !== 0)
    n = n.filter((name) => parseString(filters.contain).some((v) => name.key.includes(v)));

  if (filters.notContain.length !== 0)
    n = n.filter((name) => !parseString(filters.notContain).some((v) => name.key.includes(v)));

  if (filters.start.length !== 0)
    n = n.filter((name) => parseString(filters.start).some((v) => name.key.startsWith(v)));

  if (filters.notStart.length !== 0)
    n = n.filter((name) => !parseString(filters.notStart).some((v) => name.key.startsWith(v)));

  if (filters.end.length !== 0)
    n = n.filter((name) => parseString(filters.end).some((v) => name.key.endsWith(v)));

  if (filters.notEnd.length !== 0)
    n = n.filter((name) => !parseString(filters.notEnd).some((v) => name.key.endsWith(v)));

  return n;
};

const parseString = (s: string): string[] => s.split(',').map((v) => v.trim().toLowerCase());
