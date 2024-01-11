import { useState } from 'react';

import cn from 'classnames';

import { NavBar } from './navBar/NavBar';

import styles from './Layout.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Layout({ children, className }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className={cn(styles.content, className)}>{children}</div>
    </div>
  );
}
