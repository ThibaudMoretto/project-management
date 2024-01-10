import { memo } from 'react';

import styles from './Overview.module.scss';

function Overview() {
  return <div className={styles.overview}>overview</div>;
}

const MemoizedOverview = memo(Overview);

export { MemoizedOverview as Overview };
