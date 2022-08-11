/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Button, FormField, FormSelect, FormTextarea } from '@sdjs-02/components';
import { ITask } from '@sdjs-02/interfaces';
import taskFormSchema from './taskFormSchema';
import 'twin.macro';

interface TaskFormProps {
  isOpen: boolean;
  taskSelected: any;
  onRemove: () => void;
  onSubmit: (values: ITask) => void;
  onCancel: () => void;
}

export const INITIAL_TASK = { _id: '', title: '', description: '', status: 'pending' };
const STATUS_DONE = 'done';
const TASK_STATUS = ['pending', 'progress', STATUS_DONE];

export const TaskForm = ({ isOpen, taskSelected, onRemove, onSubmit, onCancel }: TaskFormProps) => {
  const [isViewMode, setIsViewMode] = useState(true);
  const isEditTask = taskSelected._id;
  const disabledEdition = isViewMode && isEditTask;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: INITIAL_TASK,
    validationSchema: taskFormSchema,
    onSubmit: (values, { resetForm, setStatus }) => {
      setStatus(false);
      if (!isEditTask) resetForm();
      onSubmit(values);
    },
  });

  const hasStatusDone = taskSelected?.status === STATUS_DONE;

  useEffect(() => {
    formik.setValues(taskSelected);
  }, [taskSelected]);

  useEffect(() => {
    if (isEditTask) formik.setStatus(isViewMode);
  }, [isViewMode]);

  useEffect(() => {
    if (isOpen && isEditTask) {
      setIsViewMode(true);
      formik.setStatus(true);
    }

    if (!isOpen) formik.setStatus(false);
  }, [isOpen]);

  return (
    <div tw="w-full">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div tw="mb-5">
            <FormField disabled={disabledEdition} label="Title" name="title" />

            <FormTextarea disabled={disabledEdition} label="Description" name="description" />

            {isEditTask && (
              <FormSelect disabled={disabledEdition} label="Status" name="status" options={TASK_STATUS} />
            )}
          </div>

          <div tw="flex justify-end">
            {disabledEdition ? (
              <div>
                <Button type="button" color="danger" tw="mr-3" onClick={onRemove}>
                  delete
                </Button>

                {!hasStatusDone && (
                  <Button type="button" onClick={() => setIsViewMode(false)}>
                    edit task
                  </Button>
                )}
              </div>
            ) : (
              <div>
                <Button
                  type="button"
                  color="danger"
                  tw="mr-3"
                  onClick={isEditTask ? () => setIsViewMode(true) : onCancel}
                >
                  cancel
                </Button>

                <Button type="submit" color="success" disabled={formik.status}>
                  save
                </Button>
              </div>
            )}
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};
