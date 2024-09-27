import FEMALE_NAMES from './femaleNames';
import MALE_NAMES from './maleNames';

export interface Filters {
  contain: string;
  end: string;
  notContain: string;
  notStart: string;
  notEnd: string;
  sex?: Sex;
  start: string;
  minLength: number;
  maxLength: number;
}

export interface Name {
  sex: Sex;
  name: string;
  key: string;
}

export type Sex = 'M' | 'F';

const names: Name[] = MALE_NAMES.concat(FEMALE_NAMES);

export const filteredNamesList = (filters: Filters): Name[] => {
  let n = names;

  if (filters.sex) n = n.filter((name) => name.sex === filters.sex);

  if (filters.minLength > 0) n = n.filter((name) => name.name.length >= filters.minLength);

  if (filters.maxLength > 0) n = n.filter((name) => name.name.length <= filters.maxLength);

  if (filters.contain.length !== 0)
    n = n.filter((name) => filters.contain.split(',').some((v) => name.key.includes(v)));

  if (filters.notContain.length !== 0)
    n = n.filter((name) => !filters.notContain.split(',').some((v) => name.key.includes(v)));

  if (filters.start.length !== 0)
    n = n.filter((name) => filters.start.split(',').some((v) => name.key.startsWith(v)));

  if (filters.notStart.length !== 0)
    n = n.filter((name) => !filters.notStart.split(',').some((v) => name.key.startsWith(v)));

  if (filters.end.length !== 0)
    n = n.filter((name) => filters.end.split(',').some((v) => name.key.endsWith(v)));

  if (filters.notEnd.length !== 0)
    n = n.filter((name) => !filters.notEnd.split(',').some((v) => name.key.endsWith(v)));

  return n;
};
