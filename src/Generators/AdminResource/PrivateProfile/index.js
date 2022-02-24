import React from 'react';
import {Button, message, Select, Tag, InputNumber} from 'antd';
import * as AppActions from '../../../AppActions';
import {MoneyDollarCircle} from '@styled-icons/remix-line/MoneyDollarCircle';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';

function PrivateProfile(props) {
  const [privateProfile, setPrivateProfile] = React.useState(null);
  const [points, setPoints] = React.useState(0);

  let {context} = props;
  let {instance} = context;

  React.useEffect(() => {
    async function getUserPrivateProfile() {
      let resp = await JStorage.fetchOneDocument('private_profile', {
        owner: instance.owner,
      });

      setPrivateProfile(resp);
      setPoints(resp.points);
    }
    try {
      getUserPrivateProfile();
    } catch (ex) {
      console.warn(ex);
    }
  }, [instance.owner]);

  async function editUserPrivateProfile() {
    try {
      let resp = await AppActions.editUserPrivateProfile(
        instance.owner,
        points,
      );
      message.success('儲存成功！');
    } catch (ex) {
      console.warn(ex);
    }
  }

  if (privateProfile) {
    return (
      <div style={{backgroundColor: '#ddd', padding: 20}}>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: 8}}>
          <p style={{marginRight: 5}}>紅利點數</p>
          <MoneyDollarCircle size={23} />
        </div>
        <InputNumber
          min={0}
          value={points}
          onChange={(value) => setPoints(value)}
          style={{marginRight: 15}}
        />
        <Button type="primary" onClick={() => editUserPrivateProfile()}>
          儲存紅利
        </Button>
      </div>
    );
  }
  return null;
}

export default PrivateProfile;
