import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import {Button, Select, Checkbox} from 'antd';
import * as AppActions from '../AppActions';
import * as CartActions from '../Actions/Cart';
import * as Algorithm from '../Utils/VariantsUtil';

function ProductVariants(props) {
  const {
    product,
    onNextConfig,
    values: savedValues = null,
    disabled = false,
  } = props;
  const [quantity, setQuantity] = React.useState(1);
  const [values, setValues] = React.useState(
    savedValues ||
      (product.variants || []).reduce((acc, variant) => {
        if (
          variant.type === 'single' &&
          Array.isArray(variant.choices) &&
          variant.choices[0]
        ) {
          acc.push({
            name: variant.name,
            choice: variant.choices[0].name,
          });
        }
        return acc;
      }, []),
  );

  React.useEffect(() => {
    async function fetchData() {
      if (onNextConfig) {
        try {
          AppActions.setLoading(true);
          const resp = await CartActions.calcPrice(product.id, {
            qty: quantity,
            variants: values,
          });
          onNextConfig(resp);
        } catch (ex) {
          console.warn(ex);
        } finally {
          AppActions.setLoading(false);
        }
      }
    }

    fetchData();
  }, [onNextConfig, quantity, values]);

  return (
    <Wrapper>
      {(product.variants || []).map((variant) => {
        if (variant.type === 'bool') {
          return (
            <InputField key={variant.name}>
              <Checkbox
                disabled={disabled}
                checked={Algorithm.getBool({values, name: variant.name})}
                onChange={(evt) => {
                  Algorithm.setBool({
                    values,
                    setValues,
                    name: variant.name,
                    checked: evt.target.checked,
                  });
                }}>
                {variant.label}
              </Checkbox>
            </InputField>
          );
        } else if (variant.type === 'single') {
          return (
            <InputField key={variant.name}>
              <label>{variant.label}</label>
              <Select
                disabled={disabled}
                style={{width: 120}}
                value={Algorithm.getSingle({values, name: variant.name})}
                onChange={(value) => {
                  Algorithm.setSingle({
                    values,
                    setValues,
                    name: variant.name,
                    choice: value,
                  });
                }}>
                {variant.choices.map((option) => {
                  return (
                    <Select.Option key={option.name} value={option.name}>
                      {option.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </InputField>
          );
        }
        return null;
      })}

      <InputField>
        <label>數量</label>
        <Select
          disabled={disabled}
          value={quantity}
          style={{width: 120}}
          onChange={setQuantity}>
          <Select.Option value={1}>1</Select.Option>
          <Select.Option value={2}>2</Select.Option>
          <Select.Option value={3}>3</Select.Option>
          <Select.Option value={4}>4</Select.Option>
          <Select.Option value={5}>5</Select.Option>
          <Select.Option value={6}>6</Select.Option>
          <Select.Option value={7}>7</Select.Option>
          <Select.Option value={8}>8</Select.Option>
          <Select.Option value={9}>9</Select.Option>
          <Select.Option value={10}>10</Select.Option>
        </Select>
      </InputField>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const InputField = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > label {
    margin-right: 10px;
  }
`;

export default ProductVariants;
