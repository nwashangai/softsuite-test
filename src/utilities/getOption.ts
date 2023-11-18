import { DropdownType } from '../slices/types';

export const getOption = (value: string, options: DropdownType[]) => {
  const option = options.find((item) => item.value.toString() === value);
  return option?.value;
};
