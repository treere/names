export interface Filters {
  text: string;
  start: string;
  end: string;
}

export interface Name {
  name: string;
}

const names = [
  { name: 'andrea' },
  { name: 'anna' },
  { name: 'luca' },
  { name: 'lucia' },
  { name: 'bianca' }
];

export const filteredNamesList = (filters: Filters): Name[] => {
  let n = names;
  if (filters.text.length !== 0)
    n = n.filter((name) => filters.text.split(',').some((v) => name.name.includes(v)));

  if (filters.start.length !== 0)
    n = n.filter((name) => filters.start.split(',').some((v) => name.name.startsWith(v)));

  if (filters.end.length !== 0)
    n = n.filter((name) => filters.end.split(',').some((v) => name.name.endsWith(v)));

  return n;
};
