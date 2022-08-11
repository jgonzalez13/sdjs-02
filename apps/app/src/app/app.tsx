import { useEffect, useState } from 'react';
import { Button, Modal, Pagination } from '@sdjs-02/components';
import { useTasks, useToggle } from '@sdjs-02/hooks';
import { ITask } from '@sdjs-02/interfaces';
import { Filter, RemoveModal, TaskForm, Tasks, INITIAL_TASK } from '../components';
import 'twin.macro';

export const App = () => {
  const [currentFilter, setCurrentFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [{ data, loading, errorMessage }, actionsTask] = useTasks(currentPage, currentFilter);
  const [isOpenEditModal, toggleIsOpenEditModal] = useToggle();
  const [isOpenRemoveModal, toggleIsOpenRemoveModal] = useToggle();
  const [taskSelected, setTaskSelected] = useState<ITask>(INITIAL_TASK);

  const onAddNewTask = () => {
    if (taskSelected) setTaskSelected(INITIAL_TASK);
    toggleIsOpenEditModal();
  };

  const onSelectTask = (task: ITask) => {
    setTaskSelected(task);
    toggleIsOpenEditModal();
  };

  const onRemoveTask = () => {
    actionsTask.remove({
      variables: {
        filter: {
          _id: taskSelected._id,
        },
      },
    });
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
    setCurrentPage(1);
  }, [currentFilter]);

  useEffect(() => {
    if (!loading) {
      if (isOpenEditModal) toggleIsOpenEditModal();
      if (isOpenRemoveModal) toggleIsOpenRemoveModal();
    }
  }, [loading]);

  return (
    <div tw="flex flex-col items-center justify-center w-full h-screen p-16">
      {errorMessage && <div tw="bg-red-600 text-white p-2 mb-5">{errorMessage}</div>}

      <div tw="mb-5">
        <Button color="success" onClick={onAddNewTask}>
          Create new task
        </Button>
      </div>

      <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

      {data?.items && <Tasks data={data?.items} onClickTask={onSelectTask} />}

      {data?.pageInfo && (
        <Pagination {...data?.pageInfo} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}

      <Modal color="info" isOpen={isOpenEditModal} toggle={toggleIsOpenEditModal}>
        <TaskForm
          isOpen={isOpenEditModal}
          taskSelected={taskSelected}
          onSubmit={onSubmitForm}
          onCancel={toggleIsOpenEditModal}
          onRemove={toggleIsOpenRemoveModal}
        />
      </Modal>

      <RemoveModal
        isOpen={isOpenRemoveModal}
        taskTitle={taskSelected.title}
        toggle={toggleIsOpenRemoveModal}
        onConfirm={onRemoveTask}
      />
    </div>
  );
};

export default App;
