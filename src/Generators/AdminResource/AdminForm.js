import React from 'react';
import {useOutlet} from 'reconnect.js';
import * as Generic from '../../Generic';
import {message, Button} from 'antd';
import {removeAutoFields} from '../../Utils/JStorageUtil';
import FileUpload from './FileUpload';
import * as AppActions from '../../AppActions';

function AdminForm(props) {
  const {instance, collection, actionBar, formSpec, config} = props;
  const [actions] = useOutlet('actions');
  const [user] = useOutlet('user');

  function goToArticle(id) {
    if (!id) {
      window.open(`${config.articleEditorHost}?token=${user.token}`, '_blank');
    } else {
      window.open(
        `${config.articleEditorHost}?token=${user.token}&id=${id}`,
        '_blank',
      );
    }
  }

  return (
    <div>
      {AppActions.renderCustomAdminSection({
        name: formSpec.customName || 'AdminForm',
        section: 'A',
        context: {
          ...props,
        },
      })}

      {!formSpec.preventDefault && (
        <Generic.Form
          schema={formSpec.schema}
          uiSchema={formSpec.uiSchema}
          instance={instance}
          onSubmit={async (formData) => {
            try {
              actions.setLoading(true);
              if (!instance) {
                await actions.createDocument(collection, formData);
              } else {
                await actions.updateDocument(
                  collection,
                  {id: instance.id},
                  removeAutoFields(formData),
                );
              }
              message.success('成功!');
            } catch (ex) {
              message.error('API failure');
            } finally {
              actions.setLoading(false);
            }
          }}
        />
      )}

      {AppActions.renderCustomAdminSection({
        name: formSpec.customName || 'AdminForm',
        section: 'B',
        context: {
          ...props,
        },
      })}

      {actionBar && actionBar.length > 0 && (
        <div
          style={{
            marginTop: 10,
            borderTop: '1px solid #ccc',
            padding: '15px 0',
          }}>
          <h3>工具列</h3>
          <div style={{marginTop: 10}}>
            {actionBar.find((action) => action === 'file') && <FileUpload />}

            {actionBar.find((action) => action === 'article') && (
              <Button style={{marginLeft: 8}} onClick={() => goToArticle()}>
                創建文章
              </Button>
            )}

            {actionBar.find((action) => action === 'article') && (
              <Button
                style={{marginLeft: 8}}
                disabled={!(instance && instance.article)}
                onClick={() => goToArticle(instance && instance.article)}>
                編輯文章
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminForm;
