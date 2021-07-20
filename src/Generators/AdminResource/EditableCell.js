import React from 'react';
import {Input, Checkbox} from 'antd';

function EditableCell(props) {
  const fieldType = props.type || 'text';
  const initialValue = props.record[props.field];
  const rid = props.record.id;
  const [checked, setChecked] = React.useState(
    fieldType === 'boolean' ? initialValue : false,
  );
  const [value, setValue] = React.useState(initialValue?.toString());
  const setDirtyMap = props.setDirtyMap;
  const commonStyle = {width: props.width || 120};

  // the style is for UI only, so we don't check type
  // simply convert the initialValue to string and see if there're different
  const unchanged =
    fieldType === 'boolean'
      ? checked === initialValue
      : value === initialValue?.toString();

  const style = unchanged
    ? {...commonStyle}
    : {
        ...commonStyle,
        border: '1px solid red',
      };

  const onChange = (e) => {
    let nextValue;

    if (fieldType === 'boolean') {
      nextValue = e.target.checked;
      setChecked(nextValue);
    } else {
      nextValue = e.target.value;
      setValue(nextValue);
    }

    // input always consider the value to be string,
    // so we might need extra conversion here
    if (fieldType === 'number') {
      nextValue = parseFloat(nextValue);
    }

    if (nextValue !== initialValue) {
      setDirtyMap((dirtyMap) => {
        return {
          ...dirtyMap,
          [rid]: {
            ...(dirtyMap[rid] || {}),
            [props.field]: nextValue,
          },
        };
      });
    } else {
      setDirtyMap((dirtyMap) => {
        const nextMap = {...dirtyMap};
        if (dirtyMap[rid]) {
          const dirtyObj = {...dirtyMap[rid]};
          delete dirtyObj[props.field];
          if (Object.keys(dirtyObj).length === 0) {
            delete nextMap[rid];
          } else {
            nextMap[rid] = dirtyObj;
          }
        }
        return nextMap;
      });
    }
  };

  if (fieldType === 'boolean') {
    // TODO: apply red border as modifed mark is really ugly in this case
    return <Checkbox checked={checked} onChange={onChange} />;
  }

  return (
    <Input value={value} type={fieldType} onChange={onChange} style={style} />
  );
}

export default EditableCell;
