/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Button, Card, Modal, Pagination } from '@sdjs-02/components';
import { useTasks, useToggle } from '@sdjs-02/hooks';
import { ITask } from '@sdjs-02/interfaces';
import { Filter, TaskForm, INITIAL_TASK } from '../components';
import 'twin.macro';

export const App = () => {
  const [currentFilter, setCurrentFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [{ data, loading, errorMessage }, actionsTask] = useTasks(currentPage);
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

    if (!values._id) return actionsTask.create({ variables });

    return actionsTask.update({
      variables: {
        ...variables,
        filter: {
          _id: values._id,
        },
      },
    });
  };

  useEffect(() => {
    if (isOpen && !loading) toggleIsOpen();
  }, [loading]);
  console.log({ currentFilter });
  return (
    <div tw="flex flex-col items-center justify-center w-full h-screen p-5">
      {errorMessage && <div tw="bg-red-600 text-white p-2 mb-5">{errorMessage}</div>}

      <div tw="mb-5">
        <Button color="success" onClick={onAddNewTask}>
          Create new task
        </Button>
      </div>

      <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

      {data?.items.map((task) => (
        <Card key={task['_id']} tw="mb-5" onClick={() => onSelectTask(task)}>
          <Card.Title tw="mb-6">{task.title}</Card.Title>

          <Card.Body>{task.description}</Card.Body>
        </Card>
      ))}

      {data?.pageInfo && (
        <Pagination {...data?.pageInfo} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}

      <Modal color="info" isOpen={isOpen} toggle={toggleIsOpen}>
        <TaskForm isOpen={isOpen} taskSelected={taskSelected} onSubmit={onSubmitForm} onCancel={toggleIsOpen} />
      </Modal>
    </div>
  );
};

export default App;
