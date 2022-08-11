import { RadioButton } from '@sdjs-02/components';
import 'twin.macro';

interface FilterProps {
  currentFilter: string;
  setCurrentFilter: (value: string) => void;
}

const FILTERS = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Progress',
    value: 'progress',
  },
  {
    label: 'Done',
    value: 'done',
  },
];

export const Filter = ({ currentFilter, setCurrentFilter }: FilterProps) => {
  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFilter(e.target.value);
  };

  return (
    <div tw="flex mb-5">
      {FILTERS.map(({ label, value }) => (
        <RadioButton
          key={value}
          checked={currentFilter === value}
          name="filter"
          tw="mr-3"
          value={value}
          onChange={onChangeFilter}
        >
          {label}
        </RadioButton>
      ))}
    </div>
  );
};
