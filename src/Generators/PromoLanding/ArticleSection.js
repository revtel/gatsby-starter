import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import RichTextPreview from 'rev.sdk.js/Components/RichTextPreview';

function ArticleSection(props) {
  const [actions] = useOutlet('actions');
  const [article, setArticle] = React.useState(null);
  const {id} = props;

  React.useEffect(() => {
    async function fetchData() {
      try {
        actions.setLoading(true);
        setArticle(await actions.clientFetchArticleById(id));
      } catch (ex) {
      } finally {
        actions.setLoading(false);
      }
    }

    fetchData();
  }, [actions, id]);

  return (
    <Wrapper>
      {article && (
        <div className="content">
          <RichTextPreview content={article.content} />
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & > .content {
    max-width: var(--contentMaxWidth);
    margin: 0 auto;
    padding: var(--basePadding);
  }
`;

export default ArticleSection;
