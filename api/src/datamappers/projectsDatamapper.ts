import client from '../config/client';

import { Project } from 'project-management-types';

import { camelizeObjectKeys, camelizeArrayOfObjects } from '../utils/camelizeObjectKeys';

const projectsDatamapper = {
  async getById(id: Pick<Project, 'id'>): Promise<Project> {
    const result = await client.query(
      `
        SELECT id, title FROM projects
        WHERE id = $1
      `,
      [id]
    );

    return camelizeObjectKeys(result.rows[0]);
  },

  async getAll(): Promise<Project[]> {
    const result = await client.query(
      `
        SELECT id, title FROM projects
      `
    );

    return camelizeArrayOfObjects(result.rows);
  },

  async create({ title }: Pick<Project, 'title'>): Promise<Project> {
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
