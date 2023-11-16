import styled from 'styled-components';

export const GridWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.grayBg};
  border-right: 1px solid ${({ theme }) => theme.grayBg};
  margin-bottom: 100px;
`;

export const GridRow = styled.div`
  display: flex;
  width: 100%;
`;

export const GridCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border-top: 1px solid ${({ theme }) => theme.grayBg};
  border-left: 1px solid ${({ theme }) => theme.grayBg};
  padding: 10px;

  > span:first-child {
    text-transform: capitalize;
    color: ${({ theme }) => theme.grayShade1};
    margin-bottom: 8px;
  }

  > span:last-child {
    font-weight: 500;
  }
`;
