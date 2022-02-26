import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import qs from 'query-string';
import {PageHeader} from 'antd';
import RichTextPreview from 'rev.sdk.js/Components/RichTextPreview';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import * as AppActions from '../../AppActions';
import BrowseHeader from '../../Components/BrowseHeader';

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

  function renderCustomSection({route, sectionId, params}) {
    if (sectionId === 'A') {
      return <BrowseHeader />;
    }

    if (['B', 'D'].indexOf(sectionId) > -1) {
      return null;
    }
  }

  const _renderCustomSection = React.useCallback(
    (sectionId) => {
      if (renderCustomSection && typeof renderCustomSection === 'function') {
        return renderCustomSection({
          route: prefixPath,
          sectionId,
          params,
        });
      }
      // customRenderFunc backward compatibility
      if (AppActions.renderCustomSection) {
        return AppActions.renderCustomSection({
          route: prefixPath,
          sectionId,
          params,
        });
      }

      return null;
    },
    [params, prefixPath],
  );

  return (
    <Wrapper>
      {_renderCustomSection('A')}

      <div className="content">
        {_renderCustomSection('B')}

        <div
          style={{display: 'flex', flexDirection: mobile ? 'column' : 'row'}}>
          <div className="article-content">
            <PageHeader
              title={'返回所有文章'}
              onBack={() => navigate(`/articles`)}
              style={{padding: 0, marginBottom: 20}}
            />
            {article && (
              <>
                <h2 className="article-title">{article.title || '無標題'}</h2>
                <RichTextPreview content={article.content} />
              </>
            )}
          </div>
          {_renderCustomSection('C')}
        </div>

        {_renderCustomSection('D')}
      </div>

      {_renderCustomSection('E')}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: var(--topNavBarHeight);
  max-width: var(--contentMaxWidth);
  margin: 0 auto;
  & > .content {
    padding: var(--basePadding);
  }

  & .article-content {
    max-width: 800px;
    margin: 20px auto;
    flex: 1;

    & h2.article-title {
      font-size: 1.5rem;
      font-weight: 200;
      line-height: 1.5;
      margin-bottom: 20px;
    }
  }
`;

export default ArticleDetail;
