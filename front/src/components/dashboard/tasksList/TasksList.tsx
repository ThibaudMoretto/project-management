import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { skipToken } from '@reduxjs/toolkit/query';
import { Button, Card, Modal, Tag, message } from 'antd';
import { CreateTaskData, TASK_STATUSES } from 'project-management-types';
import {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from 'store/tasks';

import styles from './TasksList.module.scss';

function TasksList() {
  const { t } = useTranslation();

  const { projectId } = useParams();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { register, handleSubmit } = useForm<CreateTaskData>();

  const { data: tasks = [] } = useGetTasksQuery(projectId ?? skipToken);
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = (createTaskData: CreateTaskData) => {
    if (projectId) {
      createTask({ projectId, ...createTaskData }).then(() => {
        messageApi.success('Task created');
        setIsModalVisible(false);
      });
    }
  };

  const statuses = [
    { id: '0', name: TASK_STATUSES.backlog, order: 0 },
    { id: '1', name: TASK_STATUSES.toDo, order: 1 },
    { id: '2', name: TASK_STATUSES.inProgress, order: 2 },
    { id: '3', name: TASK_STATUSES.done, order: 3 },
  ];

  return (
    <div className={styles.list}>
      {contextHolder}
      <Modal
        title="New task"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title</label>
          <input {...register('title')} id="title" />

          <label htmlFor="description">Description</label>
          <input {...register('description')} id="description" />

          <label htmlFor="priority">Priority</label>
          <select {...register('priority')} id="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </form>
      </Modal>

      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        <span>Add a card</span>
      </Button>

      <div className={styles.columns}>
        <DragDropContext
          onDragEnd={result => {
            const { source, destination } = result;

            if (!destination) return;

            const sourceStatus = statuses.find(
              status => status.id === source.droppableId
            )?.name;
            const destinationStatus = statuses.find(
              status => status.id === destination.droppableId
            )?.name;
            const task = tasks.find(task => task.id === Number(source.index));

            if (
              sourceStatus !== destinationStatus &&
              destinationStatus &&
              projectId &&
              task
            ) {
              updateTask({
                ...task,
                id: Number(source.index),
                status: destinationStatus,
                projectId: projectId,
              });
            } else messageApi.error('Something went wrong');
          }}
        >
          {statuses.map(status => (
            <div className={styles.column}>
              <h3>{t(`dashboard.columns.${status.name}`)}</h3>
              <Droppable droppableId={status.id}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.droppable}
                  >
                    {tasks
                      .filter(task => task.status === status.name)
                      .map(task => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={task.id}
                        >
                          {provided => (
                            <Card
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              title={task.title}
                              bodyStyle={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                              }}
                            >
                              {task.description}
                              <hr />
                              <Tag
                                color={
                                  task.priority === 'low'
                                    ? '#87d068'
                                    : task.priority === 'medium'
                                      ? '#fa0'
                                      : '#f40'
                                }
                                style={{
                                  alignSelf: 'flex-start',
                                }}
                              >
                                {task.priority}
                              </Tag>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

const MemoizedTasksList = memo(TasksList);

export { MemoizedTasksList as TasksList };
