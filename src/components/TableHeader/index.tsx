import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { HeaderWrapper, SearchWrapper, Image } from './styles';
import Search from '../Search';
import Button from '../Button';
import { Space } from 'antd';

type Props = {
  toggleModal: (isVisible: boolean) => void;
};

function Tableheader({ toggleModal }: Props) {
  return (
    <HeaderWrapper>
      <SearchWrapper>
        <Search
          placeholder="Search for anything"
          onSearch={() => null}
          enterButton
        />
        <Image src="/img/filter.svg" alt="filter" />
      </SearchWrapper>
      <Button onClick={() => toggleModal(true)}>
        Create Element{' '}
        <Space>
          <PlusOutlined />
        </Space>
      </Button>
    </HeaderWrapper>
  );
}

export default Tableheader;
