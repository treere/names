export interface Filters {
  text: string;
  start: string;
  end: string;
  sex?: Sex;
}

export interface Name {
  sex: Sex;
  name: string;
}

export type Sex = 'M' | 'F';

const names: Name[] = [
  { sex: 'M', name: 'andrea' },
  { sex: 'F', name: 'anna' },
  { sex: 'M', name: 'luca' },
  { sex: 'F', name: 'lucia' },
  { sex: 'F', name: 'bianca' }
];

export const filteredNamesList = (filters: Filters): Name[] => {
  let n = names;

  if (filters.sex) n = n.filter((name) => name.sex === filters.sex);

  if (filters.text.length !== 0)
    n = n.filter((name) => filters.text.split(',').some((v) => name.name.includes(v)));

  if (filters.start.length !== 0)
    n = n.filter((name) => filters.start.split(',').some((v) => name.name.startsWith(v)));

  if (filters.end.length !== 0)
    n = n.filter((name) => filters.end.split(',').some((v) => name.name.endsWith(v)));

  return n;
};
