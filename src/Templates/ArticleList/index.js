import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import ArticleItem from './ArticleItem';
import * as AppActions from '../../AppActions';
import * as JStorageActions from '../../Actions/JStorage';

function ArticleList(props) {
  const prefixPath = '/articles';
  const [articles, setArticles] = React.useState([]);
  const [dimension] = useOutlet('dimension');
  const mobile = dimension.innerWidth < 900;

  React.useEffect(() => {
    async function fetchData() {
      try {
        AppActions.setLoading(true);
        setArticles(
          await JStorageActions.fetchDocuments(
            'Article_Default',
            {
              label: 'blog',
            },
            ['-created'],
            null,
            {
              content: 0,
            },
          ),
        );
      } catch (ex) {
        console.warn(ex);
      } finally {
        AppActions.setLoading(false);
      }
    }

    fetchData();
  }, []);

  function renderCustomSection(sectionId) {
    return AppActions.renderCustomSection({
      route: prefixPath,
      sectionId,
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
            <h2>最新文章</h2>
            {articles.map((article) => {
              return (
                <ArticleItem
                  key={article.id}
                  mobile={mobile}
                  article={article}
                  onClick={() => {
                    navigate(`/article?id=${article.id}`);
                  }}
                />
              );
            })}
            {renderCustomSection('C')}
          </div>

          {renderCustomSection('D')}
        </div>

        {renderCustomSection('E')}
      </div>

      {renderCustomSection('F')}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: var(--topNavBarHeight);

  & > .content {
    max-width: var(--contentMaxWith);
    margin: 0 auto;
    padding: var(--basePadding);
  }
`;

export default ArticleList;
