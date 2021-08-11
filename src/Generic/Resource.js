import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {Table, Button, Select, Input, Pagination} from 'antd';
import queryString from 'query-string';

function Resource(props) {
  const {
    spec,
    location,
    renderDetail,
    renderCreateButton,
    renderDetailButton,
    renderCustomSection,
    onCreate,
    onGoToDetail,
    querySpec = {},
    style = {},
  } = props;
  const params = queryString.parse(location.search);
  const {action, id} = params;
  const [records, setRecords] = React.useState([]);
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [totalRecords, setTotalRecords] = React.useState(0);

  // all params related to how we perform query, such as search, sort, and paging
  const {
    pageSizeOptions = null,
    sortOptions = null,
    canSearch = false,
  } = querySpec;

  const [queryState, setQueryState] = React.useState({
    keyword: '',
    sort: sortOptions ? sortOptions[0].value : '',
    pageSize: (pageSizeOptions && pageSizeOptions[0]) || 0,
    paging: {
      offset: 0,
      limit: (pageSizeOptions && pageSizeOptions[0]) || 0,
    },
  });

  // generate all setters from the outlet
  const setKeyword = (keyword) => {
    setQueryState((prevQueryState) => {
      const nextState = {...prevQueryState};
      return {
        ...nextState,
        keyword,
      };
    });
  };

  const setSort = (sort) => {
    setQueryState((prevQueryState) => {
      const nextState = {...prevQueryState};
      return {
        ...nextState,
        sort,
      };
    });
  };

  const setPageSize = (pageSize) => {
    setQueryState((prevQueryState) => {
      const nextState = {...prevQueryState};
      return {
        ...nextState,
        pageSize,
      };
    });
  };

  const setPaging = (paging) => {
    setQueryState((prevQueryState) => {
      const nextState = {...prevQueryState};
      return {
        ...nextState,
        paging,
      };
    });
  };

  // generate all values from the outlet
  const {keyword, sort, pageSize, paging} = queryState;
  // derive the keywordTmp from keyword
  const [keywordTmp, setKeywordTmp] = React.useState(keyword);

  // check if we can render sort or pagine UI,
  // please notice that we already have a dedicated "canSearch" prop for search UI
  const canSort = !!sortOptions;
  const canPaging = !!pageSizeOptions;

  const {setLoading, fetchRecords, fetchRecordById} = spec.actions;

  const fetchNextRecords = React.useCallback(
    async ({sort, keyword, paging}) => {
      setRecords([]);
      const params = {};
      if (canSort) {
        params.sort = sort;
      }
      if (canPaging) {
        params.paging = paging;
      }
      if (canSearch) {
        params.keyword = keyword;
      }
      const resp = await fetchRecords(params);
      if (Array.isArray(resp)) {
        setRecords(resp);
      } else {
        setRecords(resp.results);
        setTotalRecords(resp.total);
      }
    },
    [fetchRecords, canSort, canPaging, canSearch],
  );

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
          await fetchNextRecords({sort, keyword, paging});
        } catch (ex) {
          console.warn(ex);
        }
      }
      setLoading(false);
    }

    fetchData();
  }, [
    setLoading,
    fetchRecordById,
    action,
    id,
    sort,
    keyword,
    paging,
    fetchNextRecords,
  ]);

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

        {renderCustomSection &&
          renderCustomSection({
            path: spec.path,
            type: 'list',
            context: {
              position: 'top',
              records,
            },
          })}

        {(canPaging || canSort || canSearch) && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: '10px 0',
            }}>
            {canPaging > 0 && (
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

            {canSort && (
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

        {canPaging > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              marginBottom: 10,
            }}>
            <Pagination
              total={totalRecords}
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
        )}

        <Table
          dataSource={records}
          columns={columns}
          rowKey={spec.primaryKey}
          pagination={false}
        />

        <div style={{display: 'flex', alignItems: 'center', padding: '20px 0'}}>
          <Button
            size="large"
            onClick={async () => {
              try {
                setLoading(true);
                await fetchNextRecords({sort, keyword, paging});
              } catch (ex) {
                console.warn(ex);
              } finally {
                setLoading(false);
              }
            }}
            style={{margin: 10}}>
            重新整理
          </Button>
        </div>
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
