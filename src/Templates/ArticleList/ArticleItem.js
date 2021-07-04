import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import {mapLineBreak, formatDate} from '../../Utils/TextUtil';

function ArticleItem(props) {
  const {article, mobile} = props;

  return (
    <Wrapper
      mobile={mobile}
      article={article}
      onClick={() => {
        navigate(`/article?id=${article.id}`);
      }}>
      <figure />
      <div className="space" />
      <div className="content">
        <div>{formatDate(article.created)}</div>
        <h3>{article.title || 'Title'}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: mapLineBreak(article.outline || 'Outline'),
          }}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('${(props) => props.article.image}');
    margin: 0;
  }

  & > .space {
    flex-basis: 15px;
  }

  & > .content {
    flex: 1;
  }
`;

export default ArticleItem;
