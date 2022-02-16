import React from 'react';
import {Button, message, Select, Tag, InputNumber} from 'antd';
import * as AppActions from '../../AppActions';
import {MoneyDollarCircle} from '@styled-icons/remix-line/MoneyDollarCircle';

function PrivateProfile(props) {
  const [privateProfile, setPrivateProfile] = React.useState(null);
  const [points, setPoints] = React.useState(0);

  let {context} = props;
  let {instance} = context;

  React.useEffect(() => {
    async function getUserPrivateProfile() {
      let resp = await AppActions.getUserPrivateProfile(instance.owner); // instance.owner: user_id

      setPrivateProfile(resp);
      setPoints(resp.points);
    }
    try {
      getUserPrivateProfile();
    } catch (ex) {
      console.warn(ex);
    }
  }, [1]);

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
