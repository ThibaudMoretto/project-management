import client from '../config/client';

import { TLocales } from 'project-management-types';

import { camelizeArrayOfObjects } from '../utils/camelizeObjectKeys';

const localesDatamapper = {
  getAll: async (): Promise<TLocales[]> => {
    const result = await client.query(
      `
        SELECT code, name FROM locales
      `
    );

    return camelizeArrayOfObjects(result.rows);
  },
};

export default localesDatamapper;
