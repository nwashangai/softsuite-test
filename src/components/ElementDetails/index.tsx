import React from 'react';
import { GridCol, GridRow, GridWrapper } from './styles';
import { ElementState } from '../../slices/types';
import { capitalizeFirstChar } from '../../utilities/capitalizeFirstChar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Props = {
  element: ElementState;
};

const frequency: { [key: string]: string } = {
  selectedMonths: 'Selected Months',
  monthly: 'Monthly',
};

function ElementDetals({ element }: Props) {
  const lookup = useSelector((state: RootState) => state.lookup);

  return (
    <GridWrapper>
      <GridRow>
        <GridCol>
          <span>ELEMENT NAME</span>
          <span>{element.name}</span>
        </GridCol>
        <GridCol>
          <span>ELEMENT CLASSIFICATION</span>
          <span>
            {
              lookup.elementClassificationValues.find(
                (item) => String(element.classificationValueId) === item.value
              )?.label
            }
          </span>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <span>ELEMENT CATEGORY</span>
          <span>
            {
              lookup.elementCategoryValues.find(
                (item) => String(element.categoryValueId) === item.value
              )?.label
            }
          </span>
        </GridCol>
        <GridCol>
          <span>PAYRUN</span>
          <span>
            {
              lookup.payRunValues.find(
                (item) => String(element.payRunValueId) === item.value
              )?.label
            }
          </span>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <span>DESCRIPTION</span>
          <span>{capitalizeFirstChar(element.description)}</span>
        </GridCol>
        <GridCol>
          <span>REPORTING NAME</span>
          <span>{capitalizeFirstChar(element.reportingName)}</span>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <span>EFFECTIVE START DATE</span>
          <span>{element.effectiveStartDate}</span>
        </GridCol>
        <GridCol>
          <span>EFFECTIVE END DATE</span>
          <span>{element.effectiveEndDate}</span>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <span>PROCESSING TYPE</span>
          <span>{capitalizeFirstChar(element.processingType)}</span>
        </GridCol>
        <GridCol>
          <span>PAY FREQUENCY</span>
          <span>{frequency[element.payFrequency]}</span>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <span>PAY MONTHS</span>
          <span>{element.selectedMonths.join(', ')}</span>
        </GridCol>
        <GridCol>
          <span>PRORATE</span>
          <span>{capitalizeFirstChar(element.prorate)}</span>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <span>STATUS</span>
          <span>{capitalizeFirstChar(element.status)}</span>
        </GridCol>
        <GridCol></GridCol>
      </GridRow>
    </GridWrapper>
  );
}

export default ElementDetals;
