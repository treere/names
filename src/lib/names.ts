import FEMALE_NAMES from './femaleNames';
import MALE_NAMES from './maleNames';
import type { FormType } from './schema';

export interface Name {
  sex: Sex;
  name: string;
  key: string;
}

export type Sex = 'M' | 'F';

const names: Name[] = MALE_NAMES.concat(FEMALE_NAMES);

export const filteredNamesList = (filters: FormType): Name[] => {
  let n = names;

  if (!filters.male) n = n.filter((name) => name.sex !== 'M');

  if (!filters.female) n = n.filter((name) => name.sex !== 'F');

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
