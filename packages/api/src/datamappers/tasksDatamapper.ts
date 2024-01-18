import client from '../config/client';

import { TProject, TTask, TASK_STATUSES } from 'project-management-types';
import { camelizeObjectKeys, camelizeArrayOfObjects } from '../utils/camelizeObjectKeys';

const tasksDatamapper = {
  async getAllByProjectId(id: Pick<TProject, 'id'>): Promise<Array<TTask>> {
    const result = await client.query(
      `SELECT id, title, description, status, priority FROM tasks
      WHERE project_id = $1`,
      [id]
    );

    return camelizeArrayOfObjects(result.rows);
  },

  async create({
    title,
    description,
    priority,
    projectId,
  }: {
    title: Pick<TTask, 'title'>;
    description: Pick<TTask, 'description'>;
    priority: Pick<TTask, 'priority'>;
    projectId: Pick<TProject, 'id'>;
  }): Promise<TTask> {
    const result = await client.query(
      `INSERT INTO tasks (title, description, status, priority, project_id)
      VALUES ($1, $2, '${TASK_STATUSES.backlog}', $3, $4)
      RETURNING id, title, description, status, priority, project_id`,
      [title, description, priority, projectId]
    );

    return camelizeObjectKeys(result.rows[0]);
  },

  async update({ id, title, description, priority, status, projectId }: TTask): Promise<TTask> {
    console.log(id, title, description, priority, status, projectId);

    const result = await client.query(
      `UPDATE tasks
      SET title = $1, description = $2, priority = $3, status = $4, project_id = $5
      WHERE id = $6
      RETURNING id, title, description, status, priority, project_id`,
      [title, description, priority, status, projectId, id]
    );

    console.log(result.rows[0]);

    return camelizeObjectKeys(result.rows[0]);
  },
};

export default tasksDatamapper;
