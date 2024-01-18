import { Route, Routes } from 'react-router-dom';

import { useGetUserQuery } from 'store/user';

import { PageNotFound } from 'components/404/404';
import { Dashboard } from 'components/dashboard/Dashboard';
import { Header } from 'components/header/Header';
import { Login } from 'components/login/Login';
import { Profile } from 'components/profile/Profile';
import { Projects } from 'components/projects/Projects';

import './config/i18n';

import styles from './App.module.scss';

function App() {
  const { data: user } = useGetUserQuery();

  const hasUser = Boolean(user?.role);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.content}>
        <Routes>
          {' '}
          {hasUser && (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/:projectId" element={<Dashboard />} />
            </>
          )}
          <Route path="/projects" element={<Projects />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
