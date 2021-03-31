import React from 'react';
import { Select, Spin } from 'antd';

const CustomSelect = ({
  value,
  loading,
  onSearch,
  onChange,
  data,
  ...props
}) => {
  const { Option } = Select;

  return (
    <Select
      showSearch
      value={value}
      labelInValue
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={props.filterOption || false}
      notFoundContent={loading ? <Spin size='small' /> : null}
      onSearch={onSearch}
      onChange={onChange}
      loading={loading}
      {...props}
    >
      {data.map((d) => {
        const dataValues = d.full_name || d.name || d.title;

        return (
          <Option value={d.id} key={d.id}>
            {dataValues}
            {dataValues && d.email && ' | '}
            {d.email}
          </Option>
        );
      })}
    </Select>
  );
};

export default CustomSelect;
