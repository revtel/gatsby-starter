import React from 'react';
import AdminResource from 'rev.sdk.js/Generators/AdminResource';
import {Button, message, Select, Tag} from 'antd';
import {useOutlet} from 'reconnect.js';
import AdminOrderDetailForm from './AdminOrderDetailForm';
import ArticleEditor from 'rev.sdk.js/Components/ArticleEditor';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import * as AppActions from '../../AppActions';

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
        建立
      </Button>
    </div>
  );
}

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
      renderCustomAdminCol={renderCustomAdminCol}
      renderCustomAdminSection={renderCustomAdminSection}
      {...props}
    />
  );
}

export default AdminResourcePage;
