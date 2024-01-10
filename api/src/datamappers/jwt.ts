import client from '../config/client';

import { camelizeObjectKeys } from '../utils/camelizeObjectKeys';

const jwtDatamapper = {
  async add(token: string) {
    const result = await client.query(`INSERT INTO token (token) VALUES ($1)`, [token]);

    return camelizeObjectKeys(result.rows[0]);
  },

  async get(token: string) {
    const result = await client.query(`SELECT * FROM token WHERE token = $1`, [token]);

    return camelizeObjectKeys(result.rows[0]);
  },

  async delete(token: string) {
    await client.query('DELETE FROM token WHERE token=$1', [token]);
    return true;
  },
};

export default jwtDatamapper;
