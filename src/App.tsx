import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const StyledContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const MyButton = styled(Button)`
  background-color: ${(props) => props.theme.primaryColor};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

function App() {
  return (
    <StyledContainer>
      <h1>Hello, Styled-components and Ant Design!</h1>
      <MyButton type="primary">Primary Button</MyButton>
    </StyledContainer>
  );
}

export default App;
