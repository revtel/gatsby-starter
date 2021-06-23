import React from 'react';
import {Button} from 'antd';
import styled from 'styled-components';
import {withTheme} from '@rjsf/core';
import {Theme as AntDTheme} from '@rjsf/antd';

const RjsForm = withTheme(AntDTheme);

function Form(props) {
  const {schema, uiSchema, instance, onSubmit = null} = props;
  const [values, setValues] = React.useState(instance || {});
  const submitBtnRef = React.useRef();

  return (
    <Wrapper>
      <RjsForm
        schema={schema}
        uiSchema={uiSchema}
        formData={values}
        onChange={({formData}) => {
          console.log('changed formData', formData);
          setValues(formData);
        }}
        onSubmit={({formData}) => {
          console.log('submitted formData', formData);
          onSubmit(formData);
        }}
        onError={(errors) => {
          console.log('errors', errors);
        }}>
        <div className="submit-buttons-bar">
          {onSubmit && (
            <Button
              type="primary"
              onClick={() => {
                submitBtnRef.current.click();
              }}>
              確認
            </Button>
          )}

          <button type="submit" ref={submitBtnRef}></button>
        </div>
      </RjsForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 800px;
  & .submit-buttons-bar {
    display: flex;
    justify-content: flex-end;
    & button[type='submit'] {
      display: none;
    }
  }
`;

export default Form;
