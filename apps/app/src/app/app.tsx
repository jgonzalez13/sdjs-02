/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Button, Card, Modal } from '@sdjs-02/components';
import { useTasks, useToggle } from '@sdjs-02/hooks';
import { ITask } from '@sdjs-02/interfaces';
import { TaskForm, INITIAL_TASK } from '../components';
import 'twin.macro';

export const App = () => {
  const [{ data, loading, errorMessage }, actionsTask] = useTasks(1);
  const [isOpen, toggleIsOpen] = useToggle();
  const [taskSelected, setTaskSelected] = useState<ITask>(INITIAL_TASK);

  const onAddNewTask = () => {
    if (taskSelected) setTaskSelected(INITIAL_TASK);
    toggleIsOpen();
  };

  const onSelectTask = (task: ITask) => {
    setTaskSelected(task);
    toggleIsOpen();
  };

  const onSubmitForm = async (values: ITask) => {
    const variables = {
      record: {
        title: values.title,
        description: values.description,
        status: values.status,
      },
    };

    if (values._id)
      actionsTask.update({
        variables: {
          ...variables,
          filter: {
            _id: values._id,
          },
        },
      });
    else actionsTask.create({ variables });
  };

  useEffect(() => {
    if (isOpen && !loading) toggleIsOpen();
  }, [loading]);

  return (
    <div tw="flex flex-col items-center justify-center w-full h-screen p-5">
      {errorMessage && <div tw="bg-red-600 text-white">{errorMessage}</div>}

      <div tw="mb-5">
        <Button color="success" onClick={onAddNewTask}>
          Create new task
        </Button>
      </div>

      {data?.items.map((task) => (
        <Card key={task['_id']} tw="mb-5" onClick={() => onSelectTask(task)}>
          <Card.Title tw="mb-6">{task.title}</Card.Title>

          <Card.Body>{task.description}</Card.Body>
        </Card>
      ))}

      <Modal color="info" isOpen={isOpen} toggle={toggleIsOpen}>
        <TaskForm isOpen={isOpen} taskSelected={taskSelected} onSubmit={onSubmitForm} onCancel={toggleIsOpen} />
      </Modal>
    </div>
  );
};

export default App;
