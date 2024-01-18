import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, message } from 'antd';
import { Select } from 'antd';
import { TProject } from 'project-management-types';
import { useGetProjectsQuery } from 'store/projects';
import { useCreateProjectMutation } from 'store/projects';

import { projectSchema } from './projectSchema';

import styles from './Details.module.scss';

function Details() {
  const { projectId } = useParams();
  const { data: projects = [], isLoading } = useGetProjectsQuery();

  const navigate = useNavigate();

  const [createProject] = useCreateProjectMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    title: Pick<TProject, 'title'>;
  }>({
    resolver: zodResolver(projectSchema),
  });

  if (isLoading) {
    return null;
  }

  const onSubmit = (data: { title: Pick<TProject, 'title'> }) => {
    createProject(data).then(res => {
      if ('error' in res) {
        messageApi.open({
          type: 'error',
          content: 'Error while creating project',
          duration: 2,
        });
        return;
      }

      messageApi.open({
        type: 'success',
        content: 'Project created',
        duration: 2,
      });
      setIsModalVisible(false);
    });
  };

  return (
    <div className={styles.details}>
      {contextHolder}
      <div className={styles.projectSelector}>
        <label htmlFor="title">Select project: </label>
        <Select
          placeholder="Select a project"
          onChange={value => navigate(`/${value}`)}
          defaultValue={
            projects.find(project => project.id === Number(projectId))?.id ||
            projects[0]
          }
        >
          {projects?.map(project => (
            <Select.Option key={project.id} value={project.id}>
              {project.title}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Create project
      </Button>

      <Modal
        open={isModalVisible}
        onOk={() => {}}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="createProjectModal">
          <label htmlFor="title">Title</label>
          <input {...register('title')} id={'title'} />
          {errors.title && <span>This field is required</span>}

          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
}

const MemoizedDetails = memo(Details);

export { MemoizedDetails as Details };
