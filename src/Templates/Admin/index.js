import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import moment from 'moment';
import {Card, Col, Divider, Row, Statistic} from 'antd';
import * as Cart from 'rev.sdk.js/Actions/Cart';

function getTurnOver(orders) {
  return orders.reduce((acc, cur) => {
    acc += cur.total;
    return acc;
  }, 0);
}

const StatisticSection = (props) => {
  const [statistic, setStatistic] = useState({
    mom: 0,
    yoy: 0,
    monthlyTurnOver: 0,
    monthlyOrderCount: 0,
    turnOver: 0,
    orderCount: 0,
  });

  useEffect(() => {
    const fetchAllOrders = async () => {
      //FIXME: will have issue when order quantity over than 100 , because paging limit is 100
      const resp = await JStorage.fetchDocuments('order', {});
      const {results} = resp;
      const now = moment(new Date());
      const settled = results.filter(
        (o) => o.payment_status === Cart.PAYMENT_STATUS.success,
      );

      const currentMonthOrders = settled.filter(
        (o) => moment(o.created).format('YYYY-MM') === now.format('YYYY-MM'),
      );

      const lastMonthOrders = settled.filter(
        (o) =>
          moment(o.created).format('YYYY-MM') ===
          now.add(-1, 'months').format('YYYY-MM'),
      );

      const lastYearOrdersInSameMonth = settled.filter(
        (o) =>
          moment(o.created).format('YYYY') ===
          now.add(-1, 'year').format('YYYY-MM'),
      );

      const mom =
        (getTurnOver(currentMonthOrders) / getTurnOver(lastMonthOrders) - 1) *
        100;

      const yoy =
        (getTurnOver(currentMonthOrders) /
          getTurnOver(lastYearOrdersInSameMonth) -
          1) *
        100;

      setStatistic((prev) => ({
        ...prev,
        mom: mom,
        yoy: yoy,
        monthlyTurnOver: getTurnOver(currentMonthOrders),
        monthlyOrderCount: currentMonthOrders.length,
        turnOver: getTurnOver(results),
        orderCount: results.length,
      }));
    };
    fetchAllOrders();
  }, []);

  return (
    <div style={{margin: '10px 0'}}>
      {/*<Divider orientation="center">營收成長率</Divider>*/}
      {/*<Row gutter={[16, 16]}>*/}
      {/*  <Col lg={12} md={24} xs={24} sm={24}>*/}
      {/*    <Card>*/}
      {/*      <Statistic*/}
      {/*        title="MoM (月營收成長率）"*/}
      {/*        value={isFinite(statistic.mom) ? statistic.mom : '尚無資料'}*/}
      {/*        precision={2}*/}
      {/*        valueStyle={{color: statistic.mom >= 0 ? 'red' : 'green'}}*/}
      {/*        suffix={isFinite(statistic.mom) ? '%' : ''}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col lg={12} md={24} xs={24} sm={24}>*/}
      {/*    <Card>*/}
      {/*      <Statistic*/}
      {/*        title="YoY (年營收成長率）"*/}
      {/*        value={isFinite(statistic.yoy) ? statistic.yoy : '尚無資料'}*/}
      {/*        valueStyle={{color: statistic.yoy >= 0 ? 'red' : 'green'}}*/}
      {/*        precision={2}*/}
      {/*        suffix={isFinite(statistic.yoy) ? '%' : ''}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      <Divider orientation="center">月報</Divider>
      <Row gutter={[16, 16]}>
        <Col lg={12} md={24} xs={24} sm={24}>
          <Card>
            <Statistic
              title="本月營收"
              value={statistic.monthlyTurnOver}
              precision={2}
              suffix="TWD"
            />
          </Card>
        </Col>
        <Col lg={12} md={24} xs={24} sm={24}>
          <Card>
            <Statistic
              title="本月訂單數"
              value={statistic.monthlyOrderCount}
              precision={0}
            />
          </Card>
        </Col>
      </Row>
      {/*<Divider orientation="center">總報</Divider>*/}
      {/*<Row gutter={[16, 16]}>*/}
      {/*  <Col lg={12} md={24} xs={24} sm={24}>*/}
      {/*    <Card>*/}
      {/*      <Statistic*/}
      {/*        title="總營收"*/}
      {/*        value={statistic.turnOver}*/}
      {/*        precision={2}*/}
      {/*        suffix="TWD"*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col lg={12} md={24} xs={24} sm={24}>*/}
      {/*    <Card>*/}
      {/*      <Statistic*/}
      {/*        title="總訂單數"*/}
      {/*        value={statistic.orderCount}*/}
      {/*        precision={0}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
    </div>
  );
};

function Settings(props) {
  return (
    <Wrapper>
      <h1>首頁</h1>
      <StatisticSection />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;

  & > h1 {
    font-size: 32px;
  }
`;

export default Settings;
