import { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProjectsQuery } from 'store/projects';

import { Layout } from 'components/shared/layout/Layout';

import { TasksList } from './tasksList/TasksList';
import { Details } from './tasksList/details/Details';

import styles from './Dashboard.module.scss';

function Dashboard() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { data: projects } = useGetProjectsQuery();

  useEffect(() => {
    if (!projectId && projects?.length) {
      navigate(`/${projects[0].id}`);
    }
  }, [projectId, projects, navigate]);

  const hasProjects = Boolean(projects?.length);

  return (
    <Layout className={styles.dashboard}>
      <div>
        <Details />
      </div>

      {hasProjects ? (
        <TasksList />
      ) : (
        <>
          <h1>No project</h1>
        </>
      )}
    </Layout>
  );
}

const MemoizedDashboard = memo(Dashboard);

export { MemoizedDashboard as Dashboard };
