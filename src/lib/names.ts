export interface Filters {
  text: string;
  start: string;
  end: string;
}

const names = ['andrea', 'anna', 'luca', 'lucia', 'bianca'];

export const filteredNames = (filters: Filters) => {
  let n = names;
  if (filters.text.length !== 0)
    n = n.filter((name) => filters.text.split(',').some((v) => name.includes(v)));

  if (filters.start.length !== 0)
    n = n.filter((name) => filters.start.split(',').some((v) => name.startsWith(v)));

  if (filters.end.length !== 0)
    n = n.filter((name) => filters.end.split(',').some((v) => name.endsWith(v)));

  return n;
};
