export interface Filters {
  text: string;
}

const names = ['andrea', 'anna', 'luca', 'lucia', 'bianca'];

export const filteredNames = (filters: Filters) => {
  return filters.text !== '' ? names.filter((x) => x.includes(filters.text)) : names;
};
