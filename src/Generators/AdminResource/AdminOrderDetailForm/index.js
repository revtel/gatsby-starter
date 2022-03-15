import React, {useCallback, useEffect, useState} from 'react';
import {
  Avatar,
  Button,
  Card,
  Collapse,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
} from 'antd';
import AntdAddressSetForm from 'rev.sdk.js/Components/AntdAddressSetForm';
import CartList from 'rev.sdk.js/Components/CartList';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import * as Cart from 'rev.sdk.js/Actions/Cart';
import {useOutlet} from 'reconnect.js';
import {Open} from '@styled-icons/ionicons-outline/Open';
import {BlobProvider} from '@react-pdf/renderer';
import OrderPDF from '../OrderPDF';

const {Panel} = Collapse;

function Filed(props) {
  const {name, value, addonBefore = null, addonAfter = null} = props;
  return (
    <Form.Item
      colon={false}
      label={name}
      labelAlign="left"
      style={{display: 'flex', flexDirection: 'column'}}>
      <Input
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        value={value}
        readOnly
      />
    </Form.Item>
  );
}

function UpdateOrderSection(props) {
  const {values, setValues} = props;
  const [form] = Form.useForm();
  const [isDirty, setIsDirty] = useState(false);
  const [actions] = useOutlet('actions');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!values) {
      return;
    }
    form.setFieldsValue({
      receiver_address: values.receiver_address,
      receiver_zip: values.receiver_zip,
      receiver_city: values.receiver_city,
      receiver_district: values.receiver_district,
    });
  }, [form, values]);

  const handleUpdateOrder = useCallback(
    async (data) => {
      try {
        actions.setLoading(true);
        const payload =
          data.logistics_type === Cart.LOGISTICS_TYPE.home
            ? {
                logistics_type: data.logistics_type,
                logistics_subtype: data.logistics_subtype,
                receiver_address: data.receiver_address,
                receiver_zip: data.receiver_zip,
                receiver_city: data.receiver_city,
                receiver_district: data.receiver_district,
                logistics_cvs_store_id: '',
                extra_data: {},
              }
            : {
                logistics_type: data.logistics_type,
                logistics_subtype: data.logistics_subtype,
                logistics_cvs_store_id: data.logistics_cvs_store_id,
              };
        const resp = await JStorage.updateDocument(
          'order',
          {id: values.id},
          payload,
        );
        setValues((prev) => ({
          ...prev,
          ...payload,
        }));
        setIsDirty(false);
        message.success('更新資訊成功');
      } catch (e) {
        message.error('更新資訊失敗');
      } finally {
        actions.setLoading(false);
      }
    },
    [actions, setValues, values.id],
  );

  if (!values) {
    return null;
  }

  return (
    <Card>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          receiver_address: values.receiver_address,
          receiver_zip: values.receiver_zip,
          receiver_city: values.receiver_city,
          receiver_district: values.receiver_district,
          logistics_type: values.logistics_type,
          logistics_subtype: values.logistics_subtype,
          logistics_cvs_store_id: values.logistics_cvs_store_id,
        }}
        onFinish={async (data) => {
          await handleUpdateOrder(data);
        }}
        onFinishFailed={() => {}}
        onFieldsChange={(field) => {
          if (field[0].name[0] === 'logistics_type') {
            form.setFieldsValue({
              logistics_subtype: '',
            });
          }
          const _isDirty = Object.keys(form.getFieldsValue()).some(
            (key) => form.getFieldsValue()[key] !== values[key],
          );
          setIsDirty(_isDirty);
        }}>
        <Form.Item
          rules={[{required: true, message: '必填'}]}
          name="logistics_type"
          label="物流方式">
          <Select>
            <Select.Option key="-1" value="" disabled={true}>
              請選擇物流方式
            </Select.Option>
            {Object.values(Cart.LOGISTICS_TYPE_DISPLAY).map((opt, idx) => (
              <Select.Option key={idx} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item dependencies={['logistics_type']}>
          {(instance) => {
            const selectLogisticsSubTypeElem = (
              <Form.Item
                rules={[{required: true, message: '必填'}]}
                label="物流商"
                name="logistics_subtype">
                <Select>
                  <Select.Option key="-1" value="" disabled={true}>
                    請選擇物流商
                  </Select.Option>
                  {instance.getFieldValue('logistics_type') ===
                  Cart.LOGISTICS_TYPE.cvs
                    ? Object.values(Cart.LOGISTICS_SUBTYPE_DISPLAY)
                        .filter(
                          (type) =>
                            type.value !== Cart.LOGISTICS_SUBTYPE.TCAT &&
                            type.value !== Cart.LOGISTICS_SUBTYPE.ECAN,
                        )
                        .map((opt, idx) => (
                          <Select.Option key={idx} value={opt.value}>
                            {opt.label}{' '}
                            {opt.value.toUpperCase().indexOf('C2C') < 0 &&
                              '大宗'}
                          </Select.Option>
                        ))
                    : Object.values(Cart.LOGISTICS_SUBTYPE_DISPLAY)
                        .filter(
                          (type) =>
                            type.value === Cart.LOGISTICS_SUBTYPE.TCAT ||
                            type.value === Cart.LOGISTICS_SUBTYPE.ECAN,
                        )
                        .map((opt, idx) => (
                          <Select.Option key={idx} value={opt.value}>
                            {opt.label}
                          </Select.Option>
                        ))}
                </Select>
              </Form.Item>
            );
            return instance.getFieldValue('logistics_type') ===
              Cart.LOGISTICS_TYPE.home ? (
              <>
                {selectLogisticsSubTypeElem}
                <AntdAddressSetForm form={form} name="receiver" />
              </>
            ) : (
              <>
                {selectLogisticsSubTypeElem}
                <Form.Item
                  rules={[{required: true, message: '必填'}]}
                  label="超商ID"
                  name="logistics_cvs_store_id">
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="button"
                    type="primary"
                    onClick={() => {
                      window.open(
                        `${window.location.origin}/admin/select-cvs`,
                        '_blank',
                      );
                    }}>
                    超商地圖
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.Item>
        <Form.Item>
          <Button
            disabled={!isDirty}
            onClick={form.submit}
            type="primary"
            htmlType="button"
            style={{marginRight: 10}}>
            更新資訊
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

function CustomAdminOrderDetailForm(props) {
  const {context} = props;
  const {instance, values, setValues} = context;
  const [actions] = useOutlet('actions');

  const handleGenLogisticsOrder = useCallback(async () => {
    try {
      actions.setLoading(true);
      const {error = null} = await actions.createLogisticsOrder(values.id);
      if (error) {
        throw new Error(error);
      }
      message.success('建立成功');
    } catch (e) {
      message.error(e.message);
    } finally {
      actions.setLoading(false);
    }
  }, [actions, values.id]);

  const openCustomOrderOwnerInfo = async (ownerId) => {
    try {
      actions.setLoading(true);
      console.log('ownerId >', ownerId);
      let user = await JStorage.fetchOneDocument('user_profile', {
        owner: ownerId,
      });
      window.open(`/admin/users/?action=detail&id=${user.id}`);
    } catch (err) {
      console.log(err);
      message.warn('無法取得此客戶資訊');
    } finally {
      actions.setLoading(false);
    }
  };

  return (
    <div style={{margin: '5px 0'}}>
      {values.payment_subtype === Cart.PAYMENT_SUBTYPE.offline && (
        <Filed name="轉帳後五碼" value={instance.offline_tx} />
      )}
      <Space direction="horizontal" style={{marginBottom: 12}}>
        {!instance.is_custom && (
          <Button
            disabled={
              !['created', 'pending', 'error', 'exception'].includes(
                values?.logistics_status,
              )
            }
            onClick={handleGenLogisticsOrder}>
            建立物流訂單
          </Button>
        )}

        {!instance.is_custom && (
          <BlobProvider document={<OrderPDF order={instance} />}>
            {({...rest}) => {
              return (
                <Button
                  style={{margin: '10px 0'}}
                  onClick={() => {
                    window.open(rest.url, '_blank');
                  }}>
                  下載 PDF
                </Button>
              );
            }}
          </BlobProvider>
        )}

        {values.payment_subtype === Cart.PAYMENT_SUBTYPE.offline && (
          <>
            <Popconfirm
              disabled={values.payment_status === Cart.PAYMENT_STATUS.success}
              title="已經確認轉帳後五碼？"
              onConfirm={async () => {
                const _hide = message.loading('更新付款狀態...');
                await actions.confirmOfflineOrder(instance.id);
                const order = await JStorage.fetchOneDocument('order', {
                  id: instance.id,
                });
                setValues(order);
                _hide();
              }}>
              <Button
                disabled={
                  values.payment_status === Cart.PAYMENT_STATUS.success
                }>
                切換付款狀態為成功
              </Button>
            </Popconfirm>
          </>
        )}
      </Space>

      {instance.is_custom ? (
        <div style={{marginTop: 10}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div
              style={{display: 'flex', alignItems: 'center', marginBottom: 5}}>
              {' '}
              <label>客戶 id</label>
              <Button
                type="link"
                icon={<Open size={24} />}
                onClick={() => openCustomOrderOwnerInfo(instance.owner)}
                style={{marginLeft: 5}}
              />
            </div>
            <Input disabled value={instance.owner} />
          </div>
        </div>
      ) : (
        <Collapse defaultActiveKey={[]}>
          <Panel header="購買人資訊" key={1}>
            <Filed name="購買人姓名" value={instance.buyer_name} />
            <Filed name="購買人電話" value={instance.buyer_phone} />
            <Filed name="購買人信箱" value={instance.buyer_email} />
            <Filed
              name="購買人地址"
              value={instance.buyer_address}
              addonBefore={
                <span>
                  {`${instance.buyer_zip} ${instance.buyer_city} ${instance.buyer_district}`}
                </span>
              }
            />
            <Filed
              name="市話"
              value={instance.buyer_tel}
              addonAfter={<span>分機號碼 {instance.buyer_tel_ext}</span>}
            />
          </Panel>
          <Panel header="收件人資訊" key={2}>
            <Filed name="收件人姓名" value={instance.receiver_name} />
            <Filed name="收件人電話" value={instance.receiver_phone} />
            <Filed name="收件人信箱" value={instance.receiver_email} />
            <Filed
              name="收件人地址"
              value={instance.receiver_address}
              addonBefore={
                <span>
                  {`${instance.receiver_zip} ${instance.receiver_city} ${instance.receiver_district}`}
                </span>
              }
            />
            <Filed
              name="市話"
              value={instance.receiver_tel}
              addonAfter={<span>分機號碼 {instance.receiver_tel_ext}</span>}
            />
          </Panel>
          <Panel header="物流資訊" key={3}>
            <Filed
              name="物流方式"
              value={Cart.LOGISTICS_TYPE_DISPLAY[instance.logistics_type].label}
            />
            <Filed
              name="物流商"
              value={
                Cart.LOGISTICS_SUBTYPE_DISPLAY[instance.logistics_subtype].label
              }
            />
            <Filed
              name="付款方式"
              value={
                Cart.PAYMENT_SUBTYPE_DISPLAY[instance.payment_subtype].label
              }
            />
            <Filed name="物流狀態" value={instance.logistics_status} />
            {instance.logistics_type === Cart.LOGISTICS_TYPE.cvs && (
              <Card style={{marginBottom: 10}}>
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      src={Cart.CVS_ICON[instance.logistics_subtype]}
                    />
                  }
                  title={instance.extra_data.CVSStoreName}
                  description={instance.extra_data.CVSAddress}
                />
              </Card>
            )}
          </Panel>
          <Panel header="訂單內容" key={4}>
            <CartList cartItems={instance.items} disabled={true} />
          </Panel>
          <Panel header="更新訂單資訊" key={5}>
            <UpdateOrderSection values={values} setValues={setValues} />
          </Panel>
        </Collapse>
      )}
    </div>
  );
}

export default CustomAdminOrderDetailForm;
