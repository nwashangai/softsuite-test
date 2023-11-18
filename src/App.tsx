import React from 'react';
import styled from 'styled-components';
import Button from './components/Button';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

function App() {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/payrole-management/element-setup/element');
  };
  return (
    <StyledContainer>
      <h1>Hello, Welcome and thank you for Visiting!</h1>
      <p>Use the button below or sidebar to navigate to the element page</p>
      <Button onClick={handleRedirect}>Go to Element page</Button>
    </StyledContainer>
  );
}

export default App;
