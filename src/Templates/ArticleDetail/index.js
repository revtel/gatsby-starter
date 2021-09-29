import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import qs from 'query-string';
import {PageHeader} from 'antd';
import RichTextPreview from 'rev.sdk.js/Components/RichTextPreview';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import * as AppActions from '../../AppActions';

function ArticleDetail(props) {
  const prefixPath = '/article';
  const [dimension] = useOutlet('dimension');
  const [article, setArticle] = React.useState(null);
  const params = qs.parse(props.location.search);
  const {id} = params;
  const mobile = dimension.innerWidth < 720;

  React.useEffect(() => {
    async function fetchData() {
      try {
        AppActions.setLoading(true);
        setArticle(await JStorage.fetchOneDocument('Article_Default', {id}));
      } catch (ex) {
      } finally {
        AppActions.setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  function renderCustomSection(sectionId) {
    return AppActions.renderCustomSection({
      route: prefixPath,
      sectionId,
      params,
    });
  }

  return (
    <Wrapper>
      {renderCustomSection('A')}

      <div className="content">
        {renderCustomSection('B')}

        <div
          style={{display: 'flex', flexDirection: mobile ? 'column' : 'row'}}>
          <div style={{flex: 1}}>
            <PageHeader
              title={'返回所有文章'}
              onBack={() => navigate(`/articles`)}
              style={{padding: 0}}
            />
            {article && (
              <>
                <h2>{article.title || '無標題'}</h2>
                <RichTextPreview content={article.content} />
              </>
            )}
          </div>
          {renderCustomSection('C')}
        </div>

        {renderCustomSection('D')}
      </div>

      {renderCustomSection('E')}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: var(--topNavBarHeight);

  & > .content {
    max-width: var(--contentMaxWidth);
    margin: 0 auto;
    padding: var(--basePadding);
  }
`;

export default ArticleDetail;
