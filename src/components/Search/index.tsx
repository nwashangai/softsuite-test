import React from 'react';
import { SearchInput } from './styles';
import { SearchProps } from 'antd/es/input';

function Search(props: SearchProps) {
  return <SearchInput {...props} />;
}

export default Search;
