import { Card } from '@sdjs-02/components';
import { ITask } from '@sdjs-02/interfaces';
import 'twin.macro';

interface TasksProps {
  data: [ITask] | ITask[];
  onClickTask: (task: ITask) => void;
}

export const Tasks = ({ data, onClickTask }: TasksProps) => {
  if (data.length === 0) return <div tw="h-full flex justify-center items-center">No tasks found</div>;

  return (
    <div tw="h-full flex flex-col justify-center">
      {data.map((task: ITask) => (
        <Card key={task['_id']} tw="mb-7" onClick={() => onClickTask(task)}>
          <Card.Title tw="mb-6">{task.title}</Card.Title>

          <Card.Body>{task.description}</Card.Body>
        </Card>
      ))}
    </div>
  );
};
