import { Table } from 'antd';
import { useGetProjectsQuery } from 'store/projects';

import { Layout } from 'components/shared/layout/Layout';

import styles from './Projects.module.scss';

export function Projects() {
  const { data: projects } = useGetProjectsQuery();

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const data = projects?.map(project => ({
    key: project.id,
    title: project.title,
    description: project.title,
  }));

  return (
    <Layout>
      <div className={styles.projects}>
        <h1>Projects</h1>
        <hr />
        <div className={styles.content}>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </Layout>
  );
}
