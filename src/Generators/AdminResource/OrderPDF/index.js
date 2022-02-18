import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import moment from 'moment';
import * as Cart from 'rev.sdk.js/Actions/Cart';
import React, {Fragment} from 'react';
import _ from 'lodash';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'SourceHanSansCN',
    backgroundColor: '#fff',
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const OrderPDF = (props) => {
  const {order} = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.center, {backgroundColor: '#ccc'}]}>
          <Text>訂單編號- {order.order_number} -工作單</Text>
        </View>
        <View style={[styles.center, {backgroundColor: '#ccc'}]}>
          <Text>訂單資訊</Text>
        </View>
        <View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>訂單編號</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>{order.order_number}</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>建立時間</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>
                {moment(order.created).format('YYYY/MM/DD')}
              </Text>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>會員名稱</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>{order.buyer_name}</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>聯絡電話</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>{order.buyer_phone}</Text>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>公司抬頭</Text>
            </View>
            <View style={[styles.cell]} />
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>電子信箱</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>{order.buyer_email}</Text>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell, {flex: 1}]}>
              <Text style={[styles.text]}>訂單備註</Text>
            </View>
            <View style={[styles.cell, {flex: 3}]}>
              <Text style={[styles.text]}>
                {order.order_note || '沒有備註'}
              </Text>
            </View>
          </View>
        </View>
        <View style={{height: 20}} />
        <View style={[styles.center, {backgroundColor: '#ccc'}]}>
          <Text>購買人資訊</Text>
        </View>
        <View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>購買人姓名</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>{order.buyer_name}</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>購買人電話</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>{order.buyer_phone}</Text>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>購買人信箱</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>{order.buyer_email}</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>購買人地址</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>
                {order.buyer_zip} {order.buyer_city}
                {order.buyer_district}
                {order.buyer_address}
              </Text>
            </View>
          </View>
        </View>
        <View style={{height: 20}} />

        <View style={[styles.center, {backgroundColor: '#ccc'}]}>
          <Text>物流資訊</Text>
        </View>
        <View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>物流單編號</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>
                {order.logistics_detail?.MerchantTradeNo || '無'}
              </Text>
            </View>

            <View style={[styles.cell]}>
              <Text style={[styles.text]}>物流方式</Text>
            </View>

            <View style={[styles.cell]}>
              <Text style={[styles.text]}>
                {Cart.LOGISTICS_TYPE_DISPLAY[order.logistics_type].label}
              </Text>

              {order.logistics_type === Cart.LOGISTICS_TYPE.cvs && (
                <Fragment>
                  <Text style={[styles.text]}>
                    {
                      Cart.LOGISTICS_SUBTYPE_DISPLAY[order.logistics_subtype]
                        .label
                    }
                  </Text>
                  <Text style={[styles.text]}>
                    {order.extra_data.CVSStoreName}
                  </Text>
                  {_.chunk(order.extra_data.CVSAddress, 8).map((c, i) => (
                    <Text key={i} style={[styles.text]}>
                      {c}
                    </Text>
                  ))}
                </Fragment>
              )}
            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell, {flex: 1}]}>
              <Text style={[styles.text]}>保密代寄</Text>
            </View>
            <View style={[styles.cell, {flex: 3}]} />
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>收件人姓名</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>{order.receiver_name}</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>寄件人姓名</Text>
            </View>
            <View style={[styles.cell]} />
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>收件人地址</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>
                {order.receiver_zip} {order.receiver_city}
                {order.receiver_district}
                {order.receiver_address}
              </Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>寄件人地址</Text>
            </View>
            <View style={[styles.cell]} />
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>收件人手機</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>{order.receiver_phone}</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>寄件人手機</Text>
            </View>
            <View style={[styles.cell]} />
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>收件人市話</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>
                {order.receiver_tel} {order.receiver_tel_ext}
              </Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>寄件人市話</Text>
            </View>
            <View style={[styles.cell]} />
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>收件人信箱</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>{order.receiver_email}</Text>
            </View>
            <View style={[styles.cell]} />
            <View style={[styles.cell]} />
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>預計出貨時間</Text>
            </View>
            <View style={[styles.cell]} />
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>指定收貨時間</Text>
            </View>
            <View style={[styles.cell]} />
          </View>

          <View style={{display: 'flex', flexDirection: 'row', height: 200}}>
            <View style={[styles.cell, {flex: 1}]}>
              <Text style={[styles.text]}>訂單備註</Text>
            </View>
            <View style={[styles.cell, {flex: 3}]} />
          </View>
        </View>
        <View style={{height: 70}} />
        <View style={[styles.center, {backgroundColor: '#ccc'}]}>
          <Text>商品資訊</Text>
        </View>
        <View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>品項名稱</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>規格</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>產品縮圖</Text>
            </View>
            <View style={[styles.cell]}>
              <Text style={[styles.text]}>小計</Text>
            </View>
          </View>
          {order.items.map((i, index) => (
            <View key={index} style={{display: 'flex', flexDirection: 'row'}}>
              <View style={[styles.cell]}>
                <Text style={[styles.text]}>{i.name}</Text>
              </View>
              <View style={[styles.cell]}>
                <Text style={[styles.text]}>數量：{i.config.qty}</Text>
              </View>
              <View style={[styles.cell]}>
                <Image
                  style={{width: 100, height: 100, objectFit: 'contain'}}
                  source={{
                    uri: i.product.images?.[0].expected_url || '',
                  }}
                />
              </View>
              <View style={[styles.cell]}>
                <Text style={[styles.text]}>{i.amount}</Text>
              </View>
            </View>
          ))}
          {order.extra_items.map((i, index) => (
            <View key={index} style={{display: 'flex', flexDirection: 'row'}}>
              <View style={[styles.cell, {flex: 1}]}>
                <Text style={[styles.text]}>{i.name}</Text>
              </View>
              <View style={[styles.cell, {flex: 4}]}>
                <Text style={[styles.text]}>{i.amount}</Text>
              </View>
            </View>
          ))}
          {order.discount_items.map((i, index) => (
            <View key={index} style={{display: 'flex', flexDirection: 'row'}}>
              <View style={[styles.cell, {flex: 1}]}>
                <Text style={[styles.text]}>{i.name}</Text>
              </View>
              <View style={[styles.cell, {flex: 4}]}>
                <Text style={[styles.text]}>-{i.amount}</Text>
              </View>
            </View>
          ))}
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell, {flex: 1}]}>
              <Text style={[styles.text]}>總計</Text>
            </View>
            <View style={[styles.cell, {flex: 4}]}>
              <Text style={[styles.text]}>{order.total}</Text>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.cell, {flex: 1}]}>
              <Text style={[styles.text]}>備註</Text>
            </View>
            <View style={[styles.cell, {flex: 4}]} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default OrderPDF;
