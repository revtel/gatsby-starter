import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import ArticleItem from './ArticleItem';

function ArticleList(props) {
  const prefixPath = '/articles';
  const [actions] = useOutlet('actions');
  const [articles, setArticles] = React.useState([]);
  const [dimension] = useOutlet('dimension');
  const mobile = dimension.innerWidth < 900;

  React.useEffect(() => {
    async function fetchData() {
      try {
        actions.setLoading(true);
        setArticles(await actions.clientFetchArticles());
      } catch (ex) {
        console.warn(ex);
      } finally {
        actions.setLoading(false);
      }
    }

    fetchData();
  }, [actions]);

  function renderCustomSection(sectionId) {
    return actions.renderCustomSection({
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
