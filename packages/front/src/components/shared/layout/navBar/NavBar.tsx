import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import {
  BarChartOutlined,
  CloseOutlined,
  OrderedListOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';
import cn from 'classnames';

import styles from './NavBar.module.scss';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

function NavBar({ isMenuOpen, setIsMenuOpen }: Props) {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  return (
    <nav className={cn(styles.navbar, { [styles.isMenuOpen]: isMenuOpen })}>
      <div className={styles.logo}>Project Management</div>

      <CloseOutlined
        className={styles.closeButton}
        onClick={() => setIsMenuOpen(false)}
      />

      <NavLink
        to={'/'}
        className={cn(styles.item, {
          [styles.isActive]: pathname === '/',
        })}
        onClick={() => setIsMenuOpen(false)}
      >
        <BarChartOutlined />
        <span>{t('dashboard.navbar.dashboard')}</span>
      </NavLink>
      <NavLink
        to={'/projects'}
        className={cn(styles.item, {
          [styles.isActive]: pathname === '/projects',
        })}
        onClick={() => setIsMenuOpen(false)}
      >
        <OrderedListOutlined />
        <span>{t('dashboard.navbar.projects')}</span>
      </NavLink>

      <NavLink
        to={'/profile'}
        className={cn(styles.item, {
          [styles.isActive]: pathname.includes('/profile'),
        })}
        onClick={() => setIsMenuOpen(false)}
      >
        <UserOutlined />
        <span>{t('dashboard.navbar.profile')}</span>
      </NavLink>

      <div onClick={() => {}} className={styles.item}>
        <PoweroffOutlined />
        <span>{t('logout')}</span>
      </div>
    </nav>
  );
}

const MemoizedNavBar = memo(NavBar);

export { MemoizedNavBar as NavBar };
