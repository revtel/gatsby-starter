import React from 'react';
import {Input} from 'antd';

function SearchInput(props) {
  const {search, updateSearch} = props;
  const [value, setValue] = React.useState(search);

  return (
    <>
      <Input.Search
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="搜尋關鍵字"
        onSearch={() => {
          updateSearch(value);
        }}
        style={{width: 150}}
      />
    </>
  );
}

export default SearchInput;
