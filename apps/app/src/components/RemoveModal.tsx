import { Button, Modal } from '@sdjs-02/components';
import 'twin.macro';

interface RemoveModalProsp {
  isOpen: boolean;
  taskTitle: string;
  toggle: () => void;
  onConfirm: () => void;
}

export const RemoveModal = ({ isOpen, taskTitle, toggle, onConfirm }: RemoveModalProsp) => (
  <Modal color="danger" isOpen={isOpen} toggle={toggle}>
    <div tw="w-full">
      <div tw="mb-5">
        Are you sure you want to delete <span tw="font-bold">{taskTitle}</span> ?
      </div>

      <div tw="flex justify-end">
        <Button type="button" tw="mr-3" onClick={toggle}>
          Cancel
        </Button>

        <Button color="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  </Modal>
);
