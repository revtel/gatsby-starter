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
  Modal,
} from 'antd';
import RevForeign from 'rev.sdk.js/Generic/CustomFields/RevForeign';
import * as AppActions from '../../AppActions';
import {getNewOutlet, getOutlet, useOutlet} from 'reconnect.js';

const {Option} = Select;

getNewOutlet('custom-order-modal', null, {autoDelete: false});

function showAdminCustomOrderModal(show) {
  getOutlet('custom-order-modal').update(show);
}

function AdminCustomOrderModal(props) {
  const [visible, setVisible] = useOutlet('custom-order-modal');

  return (
    <Modal
      title={null}
      footer={null}
      bodyStyle={{padding: 0}}
      width={720}
      visible={visible}
      onOk={() => {
        setVisible(false);
      }}
      onCancel={() => {
        setVisible(false);
      }}>
      <div style={{padding: 20}}>{visible && <AdminCustomOrder />}</div>
    </Modal>
  );
}

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
    return (
      <Input
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        {...rest}
      />
    );
  }
};

function AdminCustomOrder() {
  const [form] = Form.useForm();

  const onSubmit = async (data) => {
    try {
      AppActions.setLoading(true);
      const payload = {
        ...data,
        total: parseInt(data.total),
      };
      await AppActions.createCustomOrder(payload);
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
          type: 'number',
          placeholder: '',
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
          <Button
            style={{marginLeft: 10}}
            onClick={() => {
              form.resetFields();
            }}
            type="dashed">
            清除
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
}

export default AdminCustomOrderModal;
export {showAdminCustomOrderModal};
