import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useGetUserQuery } from 'store/user';

import { PageNotFound } from 'components/404/404';
import { Header } from 'components/header/Header';
import { Login } from 'components/login/Login';
import { NavBar } from 'components/navBar/NavBar';
import { Overview } from 'components/overview/Overview';

import styles from './App.module.scss';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: user } = useGetUserQuery();

  console.log(user);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.navBar}>
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      <div className={styles.content}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Overview />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
