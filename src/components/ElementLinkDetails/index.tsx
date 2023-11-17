import React from 'react';
import { GridCol, GridRow, GridWrapper } from '../../styles';
import {
  AdditionalData,
  DropdownType,
  ElementLinkState,
} from '../../slices/types';
import { capitalizeFirstChar } from '../../utilities/capitalizeFirstChar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { formatDate } from '../../utilities/formatDate';
import { amountTypeOptions } from '../../constants';
import { convertToValueFormat } from '../../utilities/loadDependencyData';
import { LookupType } from '../../slices/types';

type Props = {
  elementLinkDetail: ElementLinkState | null;
};

function ElementLinkDetals({ elementLinkDetail }: Props) {
  const lookup = useSelector((state: RootState) => state.lookup);
  const amountType =
    amountTypeOptions.find(
      (item) => item.value === elementLinkDetail?.amountType
    )?.label || '';

  const generateGrid = (data: AdditionalData[]) => {
    const rows = [];

    for (let i = 0; i < data.length; i += 2) {
      const row = (
        <GridRow key={i}>
          {generateGridCol(data[i])}
          {data[i + 1] ? generateGridCol(data[i + 1]) : <GridCol></GridCol>}
        </GridRow>
      );

      rows.push(row);
    }

    return rows;
  };

  const generateGridCol = (element: AdditionalData) => {
    const label = lookup.lookups.find(
      (item) => item.id === element.lookupId
    )?.name;

    const value = (
      lookup[
        convertToValueFormat(label as string) as keyof LookupType
      ] as DropdownType[]
    )?.find((item) => item.value === element.lookupValueId)?.label;

    return (
      <GridCol key={element.lookupId}>
        <span>{label}</span>
        <span>{value}</span>
      </GridCol>
    );
  };

  return (
    <GridWrapper>
      <GridRow>
        <GridCol>
          <span>NAME</span>
          <span>{elementLinkDetail?.name}</span>
        </GridCol>
        <GridCol>
          <span>SUB ORGANIZATION</span>
          <span>
            {
              lookup.subOrginazationValues.find(
                (item) =>
                  String(elementLinkDetail?.suborganizationId) === item.value
              )?.label
            }
          </span>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <span>DEPARTMENT</span>
          <span>
            {
              lookup.departmentvalues.find(
                (item) => String(elementLinkDetail?.departmentId) === item.value
              )?.label
            }
          </span>
        </GridCol>
        <GridCol>
          <span>LOCATION</span>
          <span>
            {
              lookup.locationValues.find(
                (item) => String(elementLinkDetail?.locationId) === item.value
              )?.label
            }
          </span>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <span>EMPLOYEE TYPE</span>
          <span>
            {
              lookup.employeeTypeValues.find(
                (item) =>
                  String(elementLinkDetail?.employeeTypeValueId) === item.value
              )?.label
            }
          </span>
        </GridCol>
        <GridCol>
          <span>EMPLOYEE CATEGORY</span>
          <span>
            {
              lookup.employeeCategoryValues.find(
                (item) =>
                  String(elementLinkDetail?.employeeCategoryValueId) ===
                  item.value
              )?.label
            }
          </span>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <span>EFFECTIVE DATE</span>
          <span>{formatDate(elementLinkDetail?.createdAt)}</span>
        </GridCol>
        <GridCol>
          <span>STATUS</span>
          <span>{capitalizeFirstChar(elementLinkDetail?.status || '')}</span>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <span>GRADE</span>
          <span>
            {
              lookup.gradeValues.find(
                (item) => elementLinkDetail?.grade === item.value.toString()
              )?.label
            }
          </span>
        </GridCol>
        <GridCol>
          <span>GRADE STEP</span>
          <span>
            {
              lookup.gradeStepsValues.find(
                (item) => elementLinkDetail?.gradeStep === item.value.toString()
              )?.label
            }
          </span>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <span>AMOUNT TYPE</span>
          <span>{amountType}</span>
        </GridCol>
        <GridCol>
          <span>{amountType.toUpperCase()}</span>
          <span>
            {elementLinkDetail &&
              elementLinkDetail[
                elementLinkDetail.amountType === 'rate' ? 'rate' : 'amount'
              ]}
          </span>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <span>EFFECTIVE START DATE</span>
          <span>{formatDate(elementLinkDetail?.effectiveStartDate)}</span>
        </GridCol>
        <GridCol>
          <span>EFFECTIVE END DATE</span>
          <span>{formatDate(elementLinkDetail?.effectiveEndDate)}</span>
        </GridCol>
      </GridRow>
      {generateGrid(elementLinkDetail?.additionalInfo || [])}
    </GridWrapper>
  );
}

export default ElementLinkDetals;
