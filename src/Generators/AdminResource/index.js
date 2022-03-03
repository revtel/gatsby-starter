import React from 'react';
import AdminResource from 'rev.sdk.js/Generators/AdminResource';
import {Button, message, Select, Tag, Form, DatePicker} from 'antd';
import {useOutlet} from 'reconnect.js';
import AdminOrderDetailForm from './AdminOrderDetailForm';
import ArticleEditor from 'rev.sdk.js/Components/ArticleEditor';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import * as AppActions from '../../AppActions';
import PrivateProfile from './PrivateProfile';
import * as Cart from 'rev.sdk.js/Actions/Cart';
import moment from 'moment';
const {RangePicker} = DatePicker;

const SITE_CONFIG = {
  landing: {display: '首頁設定', value: 'landing'},
  product_category: {display: '產品分類', value: 'product_category'},
  article_category: {display: '文章分類', value: 'article_category'},
};

function CreateSiteConfigButton() {
  const [name, setName] = React.useState('');

  async function createSiteConfig() {
    AppActions.setLoading(true);
    try {
      let [cfg] = await JStorage.fetchDocuments('site', {name}, null, null);

      if (!cfg) {
        cfg = await JStorage.createDocument('site', {name});
      }

      AppActions.navigate(`/admin/${name}?action=detail&id=${cfg.id}`);
    } catch (ex) {
      console.warn(__filename, ex);
    }
    AppActions.setLoading(false);
  }

  return (
    <div>
      <Select value={name} onChange={setName} style={{width: 100}}>
        <Select.Option style={{width: 100}} value="">
          請選擇
        </Select.Option>
        {[
          SITE_CONFIG.landing,
          SITE_CONFIG.product_category,
          SITE_CONFIG.article_category,
        ].map((opt) => (
          <Select.Option key={opt.value} style={{width: 100}} value={opt.value}>
            {opt.display}
          </Select.Option>
        ))}
      </Select>
      <Button type="text" disabled={name === ''} onClick={createSiteConfig}>
        前往
      </Button>
    </div>
  );
}

const getPaymentStatusCustomElem = (record) => {
  try {
    const label = Cart.PAYMENT_STATUS_DISPLAY[record.payment_status].label;
    const PAYMENT_STATUS_DISPLAY_ELEMENT = {
      [Cart.PAYMENT_STATUS.pending]: <Tag color="#CBCBCB">{label}</Tag>,
      [Cart.PAYMENT_STATUS.waiting]: <Tag color="#E59329">{label}</Tag>,
      [Cart.PAYMENT_STATUS.success]: <Tag color="#9FD000">{label}</Tag>,
      [Cart.PAYMENT_STATUS.failure]: <Tag color="#FF404C">{label}</Tag>,
    };
    return PAYMENT_STATUS_DISPLAY_ELEMENT[record.payment_status];
  } catch (e) {
    return <div style={{color: '#FF404C'}}>尚未定義狀態</div>;
  }
};

const getOrderStatusCustomElem = (record) => {
  const ORDER_STATUS_DISPLAY_ELEMENT = {
    waiting: <div style={{color: '#767676'}}>待處理</div>,
    processing: <div style={{color: '#E59329'}}>處理中</div>,
    done: <div style={{color: '#76A801'}}>已完成</div>,
    canceled: <div style={{color: '#B5B5B5'}}>已取消</div>,
  };
  try {
    return ORDER_STATUS_DISPLAY_ELEMENT[record.status];
  } catch (e) {
    return <div style={{color: '#FF404C'}}>尚未定義狀態</div>;
  }
};

const getLogisticsStatusCustomElem = (record) => {
  try {
    const label = Cart.LOGISTICS_STATUS_DISPLAY[record.logistics_status]?.label;
    const LOGISTICS_STATUS_DISPLAY_ELEMENT = {
      [Cart.LOGISTICS_STATUS.pending]: <Tag>{label}</Tag>,
      [Cart.LOGISTICS_STATUS.center_delivered]: <Tag color="gold">{label}</Tag>,
      [Cart.LOGISTICS_STATUS.in_delivery]: <Tag color="cyan">{label}</Tag>,
      [Cart.LOGISTICS_STATUS.delivered]: <Tag color="green">{label}</Tag>,
      [Cart.LOGISTICS_STATUS.error]: <Tag color="magenta">{label}</Tag>,
      [Cart.LOGISTICS_STATUS.exception]: <Tag color="red">{label}</Tag>,
    };
    return LOGISTICS_STATUS_DISPLAY_ELEMENT[record.logistics_status];
  } catch (e) {
    return <div style={{color: '#FF404C'}}>尚未定義狀態</div>;
  }
};

const OrderExtraQueries = (props) => {
  const [form] = Form.useForm();
  const {setQueryState, queryState} = props;

  const TIME_RANGE_TYPE = {
    today: 'today',
    yesterday: 'yesterday',
    past_7_days: 'past_7_days',
    past_30_days: 'past_30_days',
    month: 'month',
    last_month: 'last_month',
    custom: 'custom',
  };

  const TIME_RANGE_TYPE_DISPLAY = {
    [TIME_RANGE_TYPE.today]: {
      label: '當天',
      value: TIME_RANGE_TYPE.today,
    },
    [TIME_RANGE_TYPE.yesterday]: {
      label: '昨天',
      value: TIME_RANGE_TYPE.yesterday,
    },
    [TIME_RANGE_TYPE.past_7_days]: {
      label: '過去 7 天',
      value: TIME_RANGE_TYPE.past_7_days,
    },
    [TIME_RANGE_TYPE.past_30_days]: {
      label: '過去 30 天',
      value: TIME_RANGE_TYPE.past_30_days,
    },
    [TIME_RANGE_TYPE.month]: {
      label: '當月',
      value: TIME_RANGE_TYPE.month,
    },
    [TIME_RANGE_TYPE.last_month]: {
      label: '上個月',
      value: TIME_RANGE_TYPE.last_month,
    },
    [TIME_RANGE_TYPE.custom]: {
      label: '自訂區間',
      value: TIME_RANGE_TYPE.custom,
    },
  };

  const getRange = (method, range) => {
    const now = moment(new Date());
    const yesterday = moment(new Date()).add(-1, 'days');
    const past7Days = moment(new Date()).add(-7, 'days');
    const past30Days = moment(new Date()).add(-30, 'days');
    const lastMonth = moment(new Date()).add(-1, 'months');
    const getBeginTimeOfDay = (_moment_date) =>
      moment(_moment_date.format('YYYY-MM-DD 00:00:00'));
    const getEndTimeOfDay = (_moment_date) =>
      moment(_moment_date.format('YYYY-MM-DD 23:59:59'));
    const getBeginDayOfMonth = (_moment_date) =>
      moment(_moment_date.format('YYYY-MM-01'));
    const getEndDayOfMonth = (_moment_date) =>
      getEndTimeOfDay(
        moment(_moment_date.add(1, 'months').format('YYYY-MM-01')).add(
          -1,
          'days',
        ),
      );
    const TIME_RANGE = {
      [TIME_RANGE_TYPE.today]: [getBeginTimeOfDay(now), now],
      [TIME_RANGE_TYPE.yesterday]: [
        getBeginTimeOfDay(yesterday),
        getEndTimeOfDay(yesterday),
      ],
      [TIME_RANGE_TYPE.past_7_days]: [getBeginTimeOfDay(past7Days), now],
      [TIME_RANGE_TYPE.past_30_days]: [getBeginTimeOfDay(past30Days), now],
      [TIME_RANGE_TYPE.month]: [getBeginDayOfMonth(now), now],
      [TIME_RANGE_TYPE.last_month]: [
        getBeginDayOfMonth(lastMonth),
        getEndDayOfMonth(lastMonth),
      ],
      [TIME_RANGE_TYPE.custom]: range,
    };
    return TIME_RANGE[method];
  };

  const onSubmit = (data) => {
    const range = getRange(data.method, data.range);
    const _extraQueries = {};
    const start_date = range[0].valueOf();
    const end_date = range[1].valueOf();
    _extraQueries['created'] = {
      $gte: start_date,
      $lte: end_date,
    };

    setQueryState((prev) => {
      const nextExtraQuery = {...prev.extraQueries, ..._extraQueries};
      const filterOutQueryKeys = Object.keys(prev.extraQueries)
        .map((q) => {
          if (!Object.keys(_extraQueries).find((qk) => qk === q)) {
            return q;
          } else {
            return null;
          }
        })
        .filter((k) => !!k);
      filterOutQueryKeys.forEach((k) => {
        delete nextExtraQuery[k];
      });
      return {
        ...prev,
        extraQueries: nextExtraQuery,
      };
    });
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{}}
      colon={false}
      onFinish={onSubmit}>
      <Form.Item label="日期區間" name="method">
        <Select defaultValue="" allowClear style={{maxWidth: 180}}>
          <Select.Option disabled value="">
            請選擇日期區間
          </Select.Option>
          {Object.values(TIME_RANGE_TYPE_DISPLAY).map((type, index) => (
            <Select.Option key={index} value={type.value}>
              {type.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item dependencies={['method']}>
        {(form) => {
          if (form.getFieldValue('method') === TIME_RANGE_TYPE.custom) {
            return (
              <Form.Item
                rules={[{required: true, message: '請填寫查找區間'}]}
                name="range"
                label="自訂區間"
                dependencies={['method']}>
                <RangePicker showTime />
              </Form.Item>
            );
          } else {
            return null;
          }
        }}
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          查詢
        </Button>
      </Form.Item>
    </Form>
  );
};

function AdminResourcePage(props) {
  const {path, pageContext} = props;
  const [categories] = useOutlet('categories');
  const [actions] = useOutlet('actions');

  function renderCustomAdminSection(props) {
    const {name, type, context} = props;

    if (
      type === 'form' &&
      name === 'AdminOrderDetailForm' &&
      context.position === 'bottom'
    ) {
      return <AdminOrderDetailForm context={context} />;
    } else if (
      type === 'form' &&
      name === 'ArticleForm' &&
      context.position === 'top'
    ) {
      return (
        <ArticleEditor
          collection={{name: 'Article_Default'}} // will be removed in sdk
          onUpdate={() => 0} // will be removed in sdk
          onClose={() => 0} // will be removed in sdk
          document={context?.instance}
        />
      );
    } else if (
      type === 'form' &&
      name === 'ProductForm' &&
      context.position === 'top'
    ) {
      let _copyShareUrl = async () => {
        let _data = context.instance;
        let _url = actions.getReurl({
          title: encodeURIComponent(_data.name),
          image: _data.og_image || '',
          redirectUrl: `${window.location.origin}/product?id=${_data.id}`,
        });
        try {
          await navigator.clipboard.writeText(_url);
          message.success(`已複製分享連結 ${_url}`);
        } catch (err) {
          console.log(err);
          message.warn(`無法複製連結 ${_url}`);
        }
      };
      return <Button onClick={_copyShareUrl}>取得分享連結</Button>;
    } else if (name === 'UserCustom' && context.position === 'top') {
      return <PrivateProfile context={context} />;
    } else if (
      type === 'resource' &&
      path === '/admin/orders' &&
      context.position === 'middle'
    ) {
      return <OrderExtraQueries {...context} />;
    }
    return null;
  }

  function renderCustomAdminCol(props) {
    const {col, record} = props;
    if (col.customType === 'labels') {
      return record.labels.map((l, idx) => <Tag key={idx}>{l}</Tag>);
    } else if (col.customType === 'label') {
      return record.label?.map((l, idx) => <Tag key={idx}>{l}</Tag>);
    } else if (col.customType === 'site-config-name') {
      return SITE_CONFIG[record.name]?.display || record.name;
    } else if (col.customType === 'custom-order-info') {
      if (record.is_custom) {
        return (
          <div>
            <div>{record.custom_name}</div>
            <div>${record.total}</div>
          </div>
        );
      } else {
        return '';
      }
    } else if (col.customType === 'order_status') {
      return getOrderStatusCustomElem(record);
    } else if (col.customType === 'payment_status') {
      return getPaymentStatusCustomElem(record);
    } else if (col.customType === 'logistics_status') {
      return getLogisticsStatusCustomElem(record);
    } else if (col.customType === 'logistics_type') {
      return Cart.LOGISTICS_TYPE_DISPLAY[record.logistics_type]?.label;
    }
    return null;
  }

  if (path === '/admin/site') {
    pageContext.resource.renderCreateButton = () => {
      return <CreateSiteConfigButton />;
    };
    pageContext.resource.renderDetailButton = (cfg) => {
      return (
        <Button
          onClick={() => {
            AppActions.navigate(
              `/admin/${cfg.name}?action=detail&id=${cfg.id}`,
            );
          }}>
          編輯
        </Button>
      );
    };
  }

  return (
    <AdminResource
      {...props}
      renderCustomAdminCol={renderCustomAdminCol}
      renderCustomAdminSection={renderCustomAdminSection}
      restructureDocuments={async (collection, jsStorageResult) => {
        if (collection === 'user_profile') {
          const {results: _profiles} = jsStorageResult;
          const {results: _private_profiles} = await JStorage.fetchDocuments(
            'private_profile',
          );

          let nextProfiles = [];
          for (let record of _profiles) {
            const targetPrivateProfile = _private_profiles.find(
              (ppr) => ppr.owner === record.owner,
            );
            record = {
              ...record,
              email: targetPrivateProfile?.email || record?.email || '',
              points: targetPrivateProfile?.points || 0,
              provider:
                targetPrivateProfile?.provider || record?.provider || '',
            };
            nextProfiles = [...nextProfiles, record];
          }
          jsStorageResult.results = nextProfiles;
        }
        return jsStorageResult;
      }}
    />
  );
}

export default AdminResourcePage;
