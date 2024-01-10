import { memo } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import cn from 'classnames';

import styles from './NavBar.module.scss';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

function NavBar({ isMenuOpen, setIsMenuOpen }: Props) {
  return (
    <nav className={cn(styles.navBar, { [styles.isMenuOpen]: isMenuOpen })}>
      <CloseOutlined
        className={styles.closeButton}
        onClick={() => setIsMenuOpen(false)}
      />
    </nav>
  );
}

const MemoizedNavBar = memo(NavBar);

export { MemoizedNavBar as NavBar };
