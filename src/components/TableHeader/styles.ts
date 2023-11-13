import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 15px;
  background-color: ${({ theme }) => theme.background};
`;

export const SearchWrapper = styled.div`
  display: flex;
  max-width: 600px;
  gap: 15px;
`;

export const Image = styled.img`
  height: 32px;
  width: auto;
  cursor: pointer;
`;
