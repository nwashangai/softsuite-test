export interface ElementState {
  id?: string;
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
}

export type AdditionalData = {
  lookupId: string | number;
  lookupValueId: string | number;
};

export interface ElementLinkState {
  id?: string;
  name: string;
  elementId: string;
  suborganizationId?: string | number;
  locationId?: string | number;
  departmentId?: string | number;
  employeeCategoryId?: string | number;
  employeeCategoryValueId?: string | number;
  employeeTypeId?: string | number;
  employeeTypeValueId?: number;
  jobTitleId?: string | number;
  grade?: string | number;
  gradeStep?: string | number;
  unionId?: string | number;
  amountType?: string;
  amount?: number;
  rate?: string | number;
  effectiveStartDate?: string;
  effectiveEndDate?: string;
  status: string;
  automate?: string;
  additionalInfo: AdditionalData[];
  createdAt?: string;
}

export enum Mode {
  create = 'create',
  edit = 'edit',
  view = 'view',
}

export type DropdownType = {
  value: string;
  label: string;
  suborganizationId?: string;
  gradeId?: string;
  disabled?: boolean;
};

export type DropDownListType = Array<DropdownType>;

export type LookupValuesType = {
  name: string;
  description: string;
  type: string;
  id: string;
};

export type LookupType = {
  lookups: Array<LookupValuesType>;
  elementCategoryValues: Array<DropdownType>;
  elementClassificationValues: Array<DropdownType>;
  employeeCategoryValues: Array<DropdownType>;
  employeeTypeValues: Array<DropdownType>;
  housingValues: Array<DropdownType>;
  jobTitleValues: Array<DropdownType>;
  locationValues: Array<DropdownType>;
  payRunValues: Array<DropdownType>;
  securityValues: Array<DropdownType>;
  wardrobeValues: Array<DropdownType>;
  unionValues: Array<DropdownType>;
  subOrginazationValues: Array<DropdownType>;
  gradeValues: Array<DropdownType>;
  gradeStepsValues: Array<DropdownType>;
  departmentvalues: Array<DropdownType>;
  loading: boolean;
};
