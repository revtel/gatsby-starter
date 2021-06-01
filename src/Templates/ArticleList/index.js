import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';

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
                  onClick={() => {
                    navigate(`/article?id=${article.id}`);
                  }}>
                  <figure />
                  <div className="space" />
                  <div className="content">
                    <h3>{article.title || 'Title'}</h3>
                    <p>{article.summary || 'Summary'}</p>
                  </div>
                </ArticleItem>
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

const ArticleItem = styled.div`
  margin: 20px 0px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: ${(props) => (props.mobile ? 'column' : 'row')};

  & > figure {
    flex-basis: 240px;
    height: 180px;
    background-color: #ccc;
    margin: 0;
  }

  & > .space {
    flex-basis: 15px;
  }

  & > .content {
    flex: 1;
  }
`;

export default ArticleList;
