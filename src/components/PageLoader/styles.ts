import styled from 'styled-components';

export const PageLoaderWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bk-color-white-opeque);
  z-index: 999;
`;
