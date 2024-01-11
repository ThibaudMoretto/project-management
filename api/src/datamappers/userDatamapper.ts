import client from '../config/client';

import { User } from 'project-management-types';

import { camelizeObjectKeys } from '../utils/camelizeObjectKeys';

const userDatamapper = {
  async getByEmail(email: string): Promise<User> {
    const result = await client.query(
      `SELECT accounts.name, accounts.email, accounts.is_active, account_roles.name as role, locales.code as locale
      FROM accounts
      INNER JOIN account_roles
      ON accounts.account_role_id = account_roles.id
      INNER JOIN locales
      ON accounts.locale_id = locales.id
      WHERE accounts.email = $1`,
      [email]
    );

    return camelizeObjectKeys(result.rows[0]);
  },
};

export default userDatamapper;
