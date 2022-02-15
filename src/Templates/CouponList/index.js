import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Table} from 'antd';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import moment from 'moment';
import numeral from 'numeral';
import * as AppActions from '../../AppActions';

const CouponListPage = () => {
  const [total, setTotal] = useState(0);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const _fetchCoupons = async () => {
      try {
        AppActions.setLoading(true);
        const now = new Date().getTime();
        const resp = await JStorage.fetchDocuments('coupon', {
          $and: [
            {start_time: {$lte: now}},
            {end_time: {$gte: now}},
            {usage: {$gte: 1}},
          ],
        });
        setCoupons(resp.results);
        setTotal(resp.total);
      } finally {
        AppActions.setLoading(false);
      }
    };
    _fetchCoupons();
  }, []);

  const columns = [
    {
      title: '優惠名稱',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 100,
    },
    {
      title: '優惠代碼',
      dataIndex: 'code',
      key: 'code',
      width: 100,
    },
    {
      title: '優惠門檻',
      dataIndex: 'threshold',
      key: 'threshold',
      width: 100,
      render: (val) => {
        return numeral(val).format('$0,0');
      },
    },
    {
      title: '優惠折抵',
      dataIndex: 'discount',
      key: 'discount',
      width: 100,
      render: (val) => {
        return numeral(val).format('$0,0');
      },
    },
    {
      title: '起日',
      dataIndex: 'start_time',
      key: 'start_time',
      width: 100,
      render: (time) => {
        return moment(time).format('YYYY-MM-DD hh:mm');
      },
    },
    {
      title: '迄日',
      dataIndex: 'end_time',
      key: 'end_time',
      width: 100,
      render: (time) => {
        return moment(time).format('YYYY-MM-DD hh:mm');
      },
    },
  ];
  return (
    <Wrapper>
      <Table
        scroll={{x: 500}}
        columns={columns}
        dataSource={coupons}
        pagination={{
          position: ['bottomRight'],
          defaultCurrent: 1,
          total: total,
          defaultPageSize: 20,
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

export default CouponListPage;
