import React from 'react';
import { Spin } from 'antd';
import { PageLoaderWrapper } from './styles';

const PageLoader = () => {
  return (
    <PageLoaderWrapper>
      <Spin data-testid="loading-spinner" size="large" />
      <p>Loading...</p>
    </PageLoaderWrapper>
  );
};

export default PageLoader;
