import React from 'react';
import {useOutlet} from 'reconnect.js';
import styled from 'styled-components';
import {Table, Pagination, Input, Select, Button, message} from 'antd';
import EditableCell from './EditableCell';

function TableEditor(props) {
  const {resource, config} = props;
  const {
    collection,
    searchField = 'searchText',
    path,
    name,
    columns,
    querySpec,
    formSpec,
    actionBar = ['article', 'file'],
  } = resource;

  const {pageSizeOptions = [], sortOptions = [], canSearch = false} = querySpec;

  const [actions] = useOutlet('actions');
  const [fetchResp, setFetchResp] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');
  const [keywordTmp, setKeywordTmp] = React.useState('');
  const [sort, setSort] = React.useState(sortOptions[0]?.value);
  const [pageSize, setPageSize] = React.useState(pageSizeOptions[0]);
  const [paging, setPaging] = React.useState({offset: 0, limit: pageSize});
  const [dirtyMap, setDirtyMap] = React.useState('dirtyMap', {});
  const [lastRespTime, setLastRespTime] = React.useState(0);

  const fetchData = React.useCallback(async () => {
    try {
      actions.setLoading(true);
      setFetchResp(
        await actions.fetchDocuments(
          collection,
          keyword ? {[searchField]: {$regex: `${keyword}`, $options: 'g'}} : {},
          sort ? [sort] : [],
          paging,
        ),
      );
      setDirtyMap({});
      setLastRespTime(new Date().getTime());
    } finally {
      actions.setLoading(false);
    }
  }, [actions, sort, keyword, paging, collection, searchField]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns_ = columns.map((col) => {
    col = {...col};
    if (col.editable) {
      col = {
        ...col,
        render: (_, record) => {
          return (
            <EditableCell
              record={record}
              field={col.dataIndex}
              type={col.dataType}
              setDirtyMap={setDirtyMap}
            />
          );
        },
      };
    } else {
      if (col.dataType === 'boolean') {
        col.render = (_, record) => <div>{record.public ? '是' : '否'}</div>;
      }
    }
    return col;
  });

  return (
    <Wrapper>
      <h1>{`${name}列表`}</h1>

      {(pageSizeOptions.length > 0 || sortOptions.length > 0 || canSearch) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '10px 0',
          }}>
          {pageSizeOptions.length > 0 && (
            <div style={{width: 80}}>
              <div>每頁顯示</div>
              <Select
                value={pageSize}
                onChange={(nextPageSize) => {
                  setPageSize(nextPageSize);
                  setPaging({offset: 0, limit: nextPageSize});
                }}>
                {pageSizeOptions.map((opt) => (
                  <Select.Option key={opt} value={opt}>
                    {opt}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}

          {sortOptions.length > 0 && (
            <div style={{width: 120}}>
              <div>排序</div>
              <Select
                value={sort}
                onChange={(nextSort) => {
                  setSort(nextSort);
                  setPaging({offset: 0, limit: pageSize});
                }}>
                {sortOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}

          {canSearch && (
            <div style={{width: 300, marginLeft: 10}}>
              <div>搜尋 {keyword ? `"${keyword}"` : ''}</div>
              <Input.Search
                value={keywordTmp}
                onChange={(e) => setKeywordTmp(e.target.value)}
                onSearch={() => {
                  setKeyword(keywordTmp);
                  setPaging({offset: 0, limit: pageSize});
                }}
              />
            </div>
          )}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          marginBottom: 10,
        }}>
        <Pagination
          total={fetchResp.total}
          current={paging.offset / pageSize + 1}
          pageSize={pageSize}
          showQuickJumper
          showTotal={(total) => '共 ' + total + ' 筆'}
          onChange={(page, pageSize) => {
            setPaging({
              offset: (page - 1) * pageSize,
              limit: pageSize,
            });
          }}
          style={{marginTop: 20}}
        />
      </div>

      <Table
        key={lastRespTime}
        dataSource={fetchResp.results}
        rowKey="id"
        pagination={false}
        columns={columns_}
      />

      <div style={{display: 'flex', alignItems: 'center', padding: '20px 0'}}>
        <Button size="large" onClick={() => fetchData()} style={{margin: 10}}>
          重新整理
        </Button>

        <Button
          size="large"
          type="primary"
          style={{margin: 10}}
          disabled={Object.keys(dirtyMap).length === 0}
          onClick={async () => {
            console.log('dirtyMap', dirtyMap);
            const operations = [];
            for (const id in dirtyMap) {
              operations.push({
                method: 'update_one',
                payload: {
                  query: {id},
                  data: dirtyMap[id],
                },
              });
            }

            try {
              actions.setLoading(true);
              await actions.bulkWriteDocuments(collection, operations);
              await fetchData();
              message.success('成功更新');
            } catch (ex) {
            } finally {
              actions.setLoading(false);
            }
          }}>
          修改
        </Button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;

  & > h1 {
    font-size: 32px;
  }
`;

export default TableEditor;
