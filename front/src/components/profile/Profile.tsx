import { useGetUserQuery } from 'store/user';

import { Layout } from 'components/shared/layout/Layout';

import styles from './Profile.module.scss';

export function Profile() {
  const { data: { name, email, role, locale } = {} } = useGetUserQuery();

  return (
    <Layout className={styles.profile}>
      <h1>Profile</h1>
      <hr />
      <div className={styles.content}>
        <div className={styles.item}>
          <h3>Name :</h3>
          <p>{name}</p>
        </div>

        <div className={styles.item}>
          <h3>Email :</h3>
          <p>{email}</p>
        </div>

        <div className={styles.item}>
          <h3>Role :</h3>
          <p>{role}</p>
        </div>

        <div className={styles.item}>
          <h3>Locale :</h3>
          <p>{locale}</p>
        </div>
      </div>
    </Layout>
  );
}
