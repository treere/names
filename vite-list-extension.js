import fs from 'node:fs/promises';

export function listExtensionPlugin() {
  return {
    name: 'list-extension',
    load: async (id) => {
      if (id.endsWith('.list')) {
        try {
          const content = await fs.readFile(id, 'utf-8');

          const list = content
            .split('\n')
            .filter((x) => x.length > 0)
            .map((x) => `'${x}'`)
            .join(',');

          return {
            code: `export default [${list}];`,
            map: null
          };
        } catch (error) {
          console.error(`Error processing ${id}:`, error);
          return null;
        }
      }
    }
  };
}
