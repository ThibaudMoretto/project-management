import ENFlag from 'assets/en.svg?react';
import FRFlag from 'assets/fr.svg?react';

import { Select, Spin, message } from 'antd';
import { useGetLocalesQuery } from 'store/locales';
import { useGetUserQuery } from 'store/user';

import { Layout } from 'components/shared/layout/Layout';

import styles from './Profile.module.scss';

export function Profile() {
  const {
    data: { name, email, role, locale: userLocale } = {},
    isLoading: isUserLoading,
  } = useGetUserQuery();

  const { data: locales = [], isLoading: isLocalesLoading } =
    useGetLocalesQuery();

  const [messageApi, contextHolder] = message.useMessage();

  const flagSelector = (locale: string) => {
    switch (locale) {
      case 'en':
        return (
          <ENFlag
            style={{ display: 'flex', alignItems: 'center', height: '20px' }}
          />
        );
      case 'fr':
        return (
          <FRFlag
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '20px',
            }}
          />
        );
      default:
        return (
          <ENFlag
            style={{ display: 'flex', alignItems: 'center', height: '20px' }}
          />
        );
    }
  };

  if (isUserLoading || isLocalesLoading) {
    return <Spin />;
  }

  return (
    <Layout className={styles.profile}>
      {contextHolder}
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
          <Select
            defaultValue={userLocale ? userLocale : locales[0]?.code}
            onChange={() => {
              messageApi.open({
                type: 'success',
                content: 'Locale changed',
                duration: 2,
              });
            }}
            size="large"
            popupMatchSelectWidth={200}
          >
            {locales?.map(locale => (
              <Select.Option key={locale.code} value={locale.code}>
                <div className={styles.option}>
                  <span>{flagSelector(`${locale.code}`)}</span>
                  <span>{locale.name}</span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </Layout>
  );
}
