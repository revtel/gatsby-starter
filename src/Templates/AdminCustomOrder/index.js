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
import * as Cart from 'rev.sdk.js/Actions/Cart';
import AntdAddressSetForm from 'rev.sdk.js/Components/AntdAddressSetForm';
import * as AppActions from '../../AppActions';

const {Option} = Select;

const initialValues = {
  user_id: '',
  payment_subtype: '',
  logistics_type: '',
  logistics_subtype: '',
  buyer_name: '',
  buyer_phone: '',
  buyer_email: '',
  buyer_tel: '',
  buyer_tel_ext: '',
  buyer_zip: '',
  buyer_city: '',
  buyer_district: '',
  buyer_address: '',
  receiver_name: '',
  receiver_phone: '',
  receiver_email: '',
  receiver_tel: '',
  receiver_tel_ext: '',
  receiver_zip: '',
  receiver_city: '',
  receiver_district: '',
  receiver_address: '',
  invoice_category: '',
  invoice_donation: '',
  invoice_love_code: '',
  invoice_carrier_type: '',
  invoice_carrier_num: '',
  invoice_uni_no: '',
  order_note: '',
  product_name: '',
  product_qty: 1,
  product_price: 0,
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

const getUserInfo = (data) => {
  return data.is_same_as_buyer
    ? {
        buyer_name: data.buyer_name,
        buyer_email: data.buyer_email,
        buyer_phone: data.buyer_phone,
        buyer_tel: data.buyer_tel,
        buyer_tel_ext: data.buyer_tel_ext,
        buyer_zip: data.buyer_zip,
        buyer_city: data.buyer_city,
        buyer_district: data.buyer_district,
        buyer_address: data.buyer_address,
        receiver_name: data.buyer_name,
        receiver_email: data.buyer_email,
        receiver_phone: data.buyer_phone,
        receiver_tel: data.buyer_tel,
        receiver_tel_ext: data.buyer_tel_ext,
        receiver_zip: data.buyer_zip,
        receiver_city: data.buyer_city,
        receiver_district: data.buyer_district,
        receiver_address: data.buyer_address,
      }
    : {
        buyer_name: data.buyer_name,
        buyer_email: data.buyer_email,
        buyer_phone: data.buyer_phone,
        buyer_tel: data.buyer_tel,
        buyer_tel_ext: data.buyer_tel_ext,
        buyer_zip: data.buyer_zip,
        buyer_city: data.buyer_city,
        buyer_district: data.buyer_district,
        buyer_address: data.buyer_address,
        receiver_name: data.receiver_name,
        receiver_email: data.receiver_email,
        receiver_phone: data.receiver_phone,
        receiver_tel: data.receiver_tel,
        receiver_tel_ext: data.receiver_tel_ext,
        receiver_zip: data.receiver_zip,
        receiver_city: data.receiver_city,
        receiver_district: data.receiver_district,
        receiver_address: data.receiver_address,
      };
};

const AdminCustomOrderPage = () => {
  const [form] = Form.useForm();

  const onSubmit = async (data) => {
    try {
      AppActions.setLoading(true);
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

  const getInvoiceCarrierNumberRules = (invoiceCarrierType) => {
    if (invoiceCarrierType === Cart.INVOICE_CARRIER_TYPE.cdc) {
      return [
        {
          pattern: /^[A-Z]{2}[0-9]{14}$/g,
          message: '自然人憑證條碼載具格式不正確',
        },
      ];
    } else if (invoiceCarrierType === Cart.INVOICE_CARRIER_TYPE.mobile) {
      return [
        {
          pattern: /^\/[0-9A-Z+-.]{7}$/g,
          message: '手機條碼載具格式不正確',
        },
      ];
    } else {
      return [];
    }
  };

  const getInputProps = useCallback(
    (field) => {
      const onChangeForInput = (e) => {
        form.setFieldsValue({
          [field]: e.target.value,
        });
      };
      const onChangeForOther = (value) => {
        form.setFieldsValue({
          [field]: value,
        });
      };
      const fields = {
        product_name: {
          label: '產品名稱',
          name: field,
          value: form.getFieldValue[field],
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請輸入產品名稱',
        },
        product_qty: {
          label: '產品數量',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請輸入產品數量',
          disabled: true,
        },
        product_price: {
          label: '產品單價',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請輸入產品單價',
        },
        payment_subtype: {
          label: '付款方式',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForOther,
          options: Object.values(Cart.PAYMENT_SUBTYPE_DISPLAY).filter(
            (opt) =>
              opt.value !== Cart.PAYMENT_SUBTYPE.cod &&
              opt.value !== Cart.PAYMENT_SUBTYPE.default,
          ),
          type: 'select',
          placeholder: '請選擇付款方式',
        },
        logistics_type: {
          label: '物流方式',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForOther,
          options: Object.values(Cart.LOGISTICS_TYPE_DISPLAY).filter(
            (lt) => lt.value === Cart.LOGISTICS_TYPE.home,
          ),
          type: 'select',
          placeholder: '請選擇物流方式',
        },
        logistics_subtype: {
          label: '物流商',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForOther,
          options: Object.values(Cart.LOGISTICS_SUBTYPE_DISPLAY).filter(
            (lst) =>
              lst.value === Cart.LOGISTICS_SUBTYPE.TCAT ||
              lst.value === Cart.LOGISTICS_SUBTYPE.ECAN,
          ),
          type: 'select',
          placeholder: '請選擇物流商',
        },
        buyer_name: {
          label: '姓名',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請填寫購買人姓名',
        },
        buyer_phone: {
          label: '行動電話',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請填寫購買人行動電話',
        },
        buyer_email: {
          label: '電子郵件',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請填寫購買人電子郵件',
        },
        buyer_tel: {
          label: '市話',
          name: field,
          rules: [],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請填寫購買人市話',
        },
        buyer_tel_ext: {
          label: '市話分機',
          name: field,
          rules: [],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請填寫購買人市話分機',
        },
        is_same_as_buyer: {
          label: '同購買人',
          name: field,
          rules: [],
          onChange: onChangeForOther,
          type: 'switch',
          valuePropName: 'checked',
        },
        receiver_name: {
          label: '姓名',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請填寫收件人姓名',
        },
        receiver_phone: {
          label: '行動電話',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請填寫收件人行動電話',
        },
        receiver_email: {
          label: '電子郵件',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請填寫收件人電子郵件',
        },
        receiver_tel: {
          label: '市話',
          name: field,
          rules: [],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請填寫收件人市話',
        },
        receiver_tel_ext: {
          label: '市話分機',
          name: field,
          rules: [],
          onChange: onChangeForInput,
          type: 'text',
          placeholder: '請填寫收件人市話分機',
        },
        invoice_category: {
          label: '發票種類',
          name: field,
          rules: [{required: true, message: '必填'}],
          options: Object.values(Cart.INVOICE_CATEGORY_DISPLAY),
          type: 'select',
          placeholder: '請選擇發票種類',
          onChange: onChangeForOther,
        },
        invoice_uni_no: {
          label: '統一編號',
          name: field,
          rules: [
            {required: true, message: '必填'},
            {
              message: '統一編號須為剛好 8 位數字',
              pattern: /^\d{8}$/,
            },
          ],
          maxLength: 8,
          placeholder: '請輸入統一編號',
          onChange: onChangeForInput,
        },
        invoice_donation: {
          label: '是否捐贈發票',
          name: field,
          rules: [{required: true, message: '必填'}],
          onChange: async (value) => {
            let payload = {};
            payload[field] = value;
            if (value === Cart.INVOICE_DONATION.t) {
              payload.invoice_carrier_type = Cart.INVOICE_CARRIER_TYPE.none;
            } else {
              payload.invoice_carrier_type = '';
            }
            form.setFieldsValue({
              ...payload,
            });
          },
          options: Object.values(Cart.INVOICE_DONATION_DISPLAY),
          placeholder: '請選擇是否捐贈發票',
          type: 'select',
        },
        invoice_carrier_type: {
          label: '載具類型',
          name: field,
          rules: [{required: true, message: '必填'}],
          disabled:
            form.getFieldValue('invoice_donation') === Cart.INVOICE_DONATION.t,
          onChange: onChangeForOther,
          options:
            form.getFieldValue('invoice_donation') === Cart.INVOICE_DONATION.f
              ? Object.values(Cart.INVOICE_CARRIER_TYPE_DISPLAY).map((opt) => {
                  if (opt.value === Cart.INVOICE_CARRIER_TYPE.none) {
                    return {
                      ...opt,
                      disabled: true,
                    };
                  } else {
                    return opt;
                  }
                })
              : Object.values(Cart.INVOICE_CARRIER_TYPE_DISPLAY),
          type: 'select',
          placeholder: '請選擇載具類型',
        },
        invoice_love_code: {
          label: '愛心捐贈碼',
          name: field,
          onChange: onChangeForInput,
          rules: [
            {required: true, message: '必填'},
            {message: '愛心捐贈碼須為 3 ~ 7 位數數字', pattern: /^\d{3,7}$/},
          ],
          maxLength: 7,
          type: 'text',
          placeholder: '請輸入愛心捐贈碼',
        },
        invoice_carrier_num: {
          label: '載具條碼',
          name: field,
          type: 'text',
          onChange: onChangeForInput,
          rules: [
            {
              required: true,
              message: '必填',
            },
            ...getInvoiceCarrierNumberRules(
              form.getFieldValue('invoice_carrier_type'),
            ),
          ],
          placeholder: '請輸入載具條碼',
        },
        order_note: {
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
        <Divider orientation="center">購物車</Divider>
        <Form.Item {...getInputProps('product_name')}>
          <GenericInput {...getInputProps('product_name')} />
        </Form.Item>
        <Form.Item {...getInputProps('product_qty')}>
          <GenericInput {...getInputProps('product_qty')} />
        </Form.Item>
        <Form.Item {...getInputProps('product_price')}>
          <GenericInput {...getInputProps('product_price')} />
        </Form.Item>
        <Divider orientation="center">結帳資訊</Divider>
        <Form.Item
          label="指定訂單歸屬"
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
        <Form.Item {...getInputProps('payment_subtype')}>
          <GenericInput {...getInputProps('payment_subtype')} />
        </Form.Item>
        <Form.Item {...getInputProps('logistics_type')}>
          <GenericInput {...getInputProps('logistics_type')} />
        </Form.Item>
        <Form.Item {...getInputProps('logistics_subtype')}>
          <GenericInput {...getInputProps('logistics_subtype')} />
        </Form.Item>

        <Divider orientation="center">購買人資訊</Divider>
        <Form.Item {...getInputProps('buyer_name')}>
          <GenericInput {...getInputProps('buyer_name')} />
        </Form.Item>
        <Form.Item {...getInputProps('buyer_phone')}>
          <GenericInput {...getInputProps('buyer_phone')} />
        </Form.Item>
        <Form.Item {...getInputProps('buyer_email')}>
          <GenericInput {...getInputProps('buyer_email')} />
        </Form.Item>
        <Form.Item {...getInputProps('buyer_tel')}>
          <GenericInput {...getInputProps('buyer_tel')} />
        </Form.Item>
        <Form.Item {...getInputProps('buyer_tel_ext')}>
          <GenericInput {...getInputProps('buyer_tel_ext')} />
        </Form.Item>
        <AntdAddressSetForm form={form} name="buyer" enabledZip />

        <Divider orientation="center">收件人資訊</Divider>

        <Form.Item {...getInputProps('is_same_as_buyer')}>
          <GenericInput {...getInputProps('is_same_as_buyer')} />
        </Form.Item>

        <Form.Item dependencies={['is_same_as_buyer']}>
          {(instance) => {
            if (!instance.getFieldValue('is_same_as_buyer')) {
              return (
                <>
                  <Form.Item {...getInputProps('receiver_name')}>
                    <GenericInput {...getInputProps('receiver_name')} />
                  </Form.Item>
                  <Form.Item {...getInputProps('receiver_phone')}>
                    <GenericInput {...getInputProps('receiver_phone')} />
                  </Form.Item>
                  <Form.Item {...getInputProps('receiver_email')}>
                    <GenericInput {...getInputProps('receiver_email')} />
                  </Form.Item>
                  <Form.Item {...getInputProps('receiver_tel')}>
                    <GenericInput {...getInputProps('receiver_tel')} />
                  </Form.Item>
                  <Form.Item {...getInputProps('receiver_tel_ext')}>
                    <GenericInput {...getInputProps('receiver_tel_ext')} />
                  </Form.Item>
                  <AntdAddressSetForm form={form} name="receiver" enabledZip />
                </>
              );
            }
          }}
        </Form.Item>

        <Divider orientation="center">發票資訊</Divider>
        <Form.Item {...getInputProps('invoice_category')}>
          <GenericInput {...getInputProps('invoice_category')} />
        </Form.Item>

        <Form.Item dependencies={['invoice_category']}>
          {(instance) => {
            if (!instance.getFieldValue('invoice_category')) {
              return null;
            }
            return instance.getFieldValue('invoice_category') ===
              Cart.INVOICE_CATEGORY.b2b ? (
              <Form.Item {...getInputProps('invoice_uni_no')}>
                <GenericInput {...getInputProps('invoice_uni_no')} />
              </Form.Item>
            ) : (
              <Form.Item {...getInputProps('invoice_donation')}>
                <GenericInput {...getInputProps('invoice_donation')} />
              </Form.Item>
            );
          }}
        </Form.Item>

        <Form.Item dependencies={['invoice_donation']}>
          {(instance) => {
            if (!instance.getFieldValue('invoice_donation')) {
              return null;
            }
            if (
              instance.getFieldValue('invoice_donation') ===
              Cart.INVOICE_DONATION.t
            ) {
              return (
                <>
                  <Form.Item {...getInputProps('invoice_love_code')}>
                    <GenericInput {...getInputProps('invoice_love_code')} />
                  </Form.Item>
                </>
              );
            } else {
              return (
                <Form.Item {...getInputProps('invoice_carrier_type')}>
                  <GenericInput {...getInputProps('invoice_carrier_type')} />
                </Form.Item>
              );
            }
          }}
        </Form.Item>

        <Form.Item dependencies={['invoice_carrier_type']}>
          {(instance) => {
            if (
              !instance.getFieldValue('invoice_carrier_type') ||
              instance.getFieldValue('invoice_carrier_type') ===
                Cart.INVOICE_CARRIER_TYPE.none ||
              instance.getFieldValue('invoice_carrier_type') ===
                Cart.INVOICE_CARRIER_TYPE.ecpay
            ) {
              return null;
            }
            return (
              <Form.Item {...getInputProps('invoice_carrier_num')}>
                <GenericInput {...getInputProps('invoice_carrier_num')} />
              </Form.Item>
            );
          }}
        </Form.Item>

        <Divider orientation="center">其他資訊</Divider>
        <Form.Item {...getInputProps('order_note')}>
          <GenericInput {...getInputProps('order_note')} />
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
