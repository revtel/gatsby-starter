import React, {useCallback} from 'react';
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Switch,
  message,
} from 'antd';
import RevForeign from 'rev.sdk.js/Generic/CustomFields/RevForeign';
import * as AppActions from '../../AppActions';

const {Option} = Select;

const initialValues = {
  user_id: '',
  name: '',
  total: 0,
  description: '',
};

const GenericInput = ({
  type,
  options = [],
  onChange = () => 0,
  placeholder,
  disabled = false,
  ...rest
}) => {
  if (type === 'select') {
    return (
      <Select
        {...rest}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}>
        <Option disabled key={-1} value={''}>
          {placeholder}
        </Option>
        {options.map((opt, index) => (
          <Option disabled={opt.disabled} key={index} value={opt.value}>
            {opt.label}
          </Option>
        ))}
      </Select>
    );
  } else if (type === 'text') {
    return (
      <Input
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
    );
  } else if (type === 'textarea') {
    return (
      <Input.TextArea
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
    );
  } else if (type === 'switch') {
    return <Switch disabled={disabled} onChange={onChange} {...rest} />;
  } else {
    throw new Error('field type is required');
  }
};

const AdminCustomOrderPage = () => {
  const [form] = Form.useForm();

  const onSubmit = async (data) => {
    try {
      AppActions.setLoading(true);
      console.log('DBG', data);
      // TODO: transform total to full price

      /*
      const user_info = getUserInfo(data);
      const payload = {
        item: {
          product: {
            name: data.product_name,
          },
          config: {
            qty: Number(data.product_qty),
            variants: [],
            extra_data: '',
          },
          price: Number(data.product_price),
        },
        user_id: data.user_id,
        checkout: {
          ...user_info,
          payment_subtype: data.payment_subtype,
          logistics_type: data.logistics_type,
          logistics_subtype: data.logistics_subtype,
          extra_data: {},
        },
      };
      await AppActions.createCustomOrder(payload);
      */
      form.resetFields();
      message.success('建立訂單成功');
    } catch (e) {
      console.error(e);
      message.error('建立訂單失敗');
    } finally {
      AppActions.setLoading(false);
    }
  };

  const onError = (data) => {
    console.log(data);
  };

  const getInputProps = useCallback(
    (field) => {
      const onChangeForInput = (e) => {
        form.setFieldsValue({
          [field]: e.target.value,
        });
      };

      const fields = {
        name: {
          label: '訂單名稱',
          name: field,
          value: form.getFieldValue[field],
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '',
        },

        total: {
          label: '總金額',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請輸入產品單價',
        },

        description: {
          label: '備註',
          name: field,
          onChange: onChangeForInput,
          type: 'textarea',
          rules: [],
          placeholder: '請輸入備註',
        },
      };
      return fields[field];
    },
    [form],
  );

  return (
    <Space direction="vertical" style={{padding: 20}}>
      <h1>建立客製化訂單</h1>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        scrollToFirstError={{
          behavior: (e) => {
            const {el, top} = e[0];
            el.scrollTo({
              left: 0,
              top: top - 100,
              behavior: 'smooth',
            });
          },
        }}
        onFinish={onSubmit}
        onFinishFailed={onError}>
        <Form.Item
          label="客戶"
          name="user_id"
          valuePropName="formData"
          rules={[{required: true, message: '必填'}]}>
          <RevForeign
            schema={{
              extraColumns: [
                {
                  title: '信箱',
                  dataIndex: 'email',
                },
                {
                  title: '登入方式',
                  dataIndex: 'provider',
                },
              ],
              primaryKey: 'owner',
              collection: 'user_profile',
              type: 'string',
              default: '',
              searchFields: ['owner', 'email'],
              searchCaseSensitive: false,
              searchApproach: 'union',
            }}
            onChange={(value) => {
              form.setFieldsValue({
                user_id: value,
              });
            }}
          />
        </Form.Item>
        <Divider orientation="center">必要資訊</Divider>
        <Form.Item {...getInputProps('name')}>
          <GenericInput {...getInputProps('name')} />
        </Form.Item>
        <Form.Item {...getInputProps('total')}>
          <GenericInput {...getInputProps('total')} />
        </Form.Item>

        <Divider orientation="center">其他資訊</Divider>
        <Form.Item {...getInputProps('description')}>
          <GenericInput {...getInputProps('description')} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            送出
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default AdminCustomOrderPage;
