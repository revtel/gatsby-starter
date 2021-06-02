import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {Table, Button} from 'antd';
import queryString from 'query-string';

const specFormat = {
  path: '/dashboard',
  name: '產品',
  primaryKey: 'id',
  actions: {
    setLoading: () => null,
    fetchList: () => [],
    fetchById: () => ({}),
  },
  columns: [
    {
      title: '名稱',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '價錢',
      key: 'price',
      dataIndex: 'price',
    },
  ],
};

function Resource(props) {
  const {
    spec,
    location,
    renderDetail,
    renderCreateButton,
    renderDetailButton,
    onCreate,
    onGoToDetail,
    style = {},
  } = props;
  const params = queryString.parse(location.search);
  const {action, id} = params;
  const [records, setRecords] = React.useState([]);
  const [selectedRecord, setSelectedRecord] = React.useState(null);

  if (!spec || !location || !renderDetail) {
    throw new Error(`Must pass recource, location and renderDetail. Resource looks like this: ${JSON.stringify(
      specFormat,
      null,
      2,
    )}
    `);
  }

  const {setLoading, fetchRecords, fetchRecordById} = spec.actions;

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (action === 'detail') {
        try {
          setSelectedRecord(null);
          setSelectedRecord(await fetchRecordById(id));
        } catch (ex) {
          console.warn(ex);
        }
      } else {
        try {
          setRecords([]);
          setRecords(await fetchRecords());
        } catch (ex) {
          console.warn(ex);
        }
      }
      setLoading(false);
    }

    fetchData();
  }, [setLoading, fetchRecords, fetchRecordById, action, id]);

  const hasCreateButton =
    typeof renderCreateButton === 'undefined' ||
    typeof renderCreateButton === 'function';

  const hasDetailButton =
    typeof renderDetailButton === 'undefined' ||
    typeof renderDetailButton === 'function';

  if (action === 'create') {
    return (
      <Wrapper style={style}>
        <Row>
          <Button onClick={() => navigate(spec.path)}>返回列表</Button>
          <h1 style={{marginLeft: 10}}>{`創建${spec.name}`}</h1>
        </Row>

        {renderDetail({instance: null})}
      </Wrapper>
    );
  } else if (action === 'detail') {
    return (
      <Wrapper style={style}>
        <Row>
          <Button onClick={() => navigate(spec.path)}>返回列表</Button>
          <h1 style={{marginLeft: 10}}>{`${spec.name}詳情`}</h1>
        </Row>

        {selectedRecord && renderDetail({instance: selectedRecord})}
      </Wrapper>
    );
  } else {
    const columns = [...spec.columns];

    if (hasDetailButton) {
      columns.push({
        title: '',
        key: 'action',
        render: renderDetailButton
          ? (_, record) => renderDetailButton(record)
          : (_, record) => (
              <Button
                onClick={() => {
                  if (onGoToDetail) {
                    onGoToDetail(record);
                  } else {
                    navigate(`${spec.path}?action=detail&id=${record.id}`);
                  }
                }}>
                詳情
              </Button>
            ),
      });
    }

    return (
      <Wrapper style={style}>
        <Row>
          <h1 style={{marginRight: 10}}>{`我的${spec.name}`}</h1>
          {hasCreateButton &&
            (renderCreateButton ? (
              renderCreateButton()
            ) : (
              <Button
                onClick={() => {
                  if (onCreate) {
                    onCreate();
                  } else {
                    navigate(`${spec.path}?action=create`);
                  }
                }}>
                +
              </Button>
            ))}
        </Row>
        <Table
          dataSource={records}
          columns={columns}
          rowKey={spec.primaryKey}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  padding: 20px;

  & h1 {
    font-size: 32px;
    margin: 0px;
  }

  ${(props) => props.css}
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

export default Resource;
