export interface ElementState {
  name: string;
  description: string;
  payRunId?: string;
  payRunValueId?: string;
  classificationId?: string;
  classificationValueId?: string;
  categoryId?: string;
  categoryValueId?: string;
  reportingName: string;
  processingType: string;
  status: string;
  prorate: string;
  effectiveStartDate: string;
  effectiveEndDate: string;
  selectedMonths: string[];
  payFrequency: string;
  classificationValues: Array<DropdownType>;
  categoryValues: Array<DropdownType>;
  payValues: Array<DropdownType>;
}

export enum Mode {
  create = 'create',
  edit = 'edit',
}

type DropdownType = {
  value: string;
  label: string;
  disabled?: boolean;
};
