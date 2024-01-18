import client from '../config/client';

import { TProject } from 'project-management-types';

import { camelizeObjectKeys, camelizeArrayOfObjects } from '../utils/camelizeObjectKeys';

const projectsDatamapper = {
  async getById(id: Pick<TProject, 'id'>): Promise<TProject> {
    const result = await client.query(
      `
        SELECT id, title FROM projects
        WHERE id = $1
      `,
      [id]
    );

    return camelizeObjectKeys(result.rows[0]);
  },

  async getAll(): Promise<TProject[]> {
    const result = await client.query(
      `
        SELECT id, title FROM projects
      `
    );

    return camelizeArrayOfObjects(result.rows);
  },

  async create({ title }: Pick<TProject, 'title'>): Promise<TProject> {
    const result = await client.query(
      `
        INSERT INTO projects (title)
        VALUES ($1)
        RETURNING id, title
      `,
      [title]
    );

    return camelizeObjectKeys(result.rows[0]);
  },
};

export default projectsDatamapper;
