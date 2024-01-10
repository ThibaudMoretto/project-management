import { memo } from 'react';

import styles from './Overview.module.scss';

function Overview() {
  return (
    <div className={styles.overview}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h2>Backlog</h2>

          <div className={styles.addCard}>
            <span>+</span>
            <span>Add a card</span>
          </div>
        </div>

        <div className={styles.column}>
          <h2>To Do</h2>
        </div>

        <div className={styles.column}>
          <h2>In Progress</h2>
        </div>

        <div className={styles.column}>
          <h2>Done</h2>
        </div>
      </div>
    </div>
  );
}

const MemoizedOverview = memo(Overview);

export { MemoizedOverview as Overview };
