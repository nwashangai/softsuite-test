import styled from 'styled-components';

export const ElementLinkFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .ant-form-item-row {
    width: 100%;
  }
`;

export const AdditionalAssignmentInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

export const AdditionalInfoTitle = styled.span`
  font-weight: 500;
  font-size: 16px;
`;

export const AdditionalAssignmentInfoContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
