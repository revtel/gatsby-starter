import React from 'react';
import {graphql, navigate} from 'gatsby';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import {Button} from 'antd';

// the following two lines are for markdown with code blocks
// you can remove them if you don't need them
require('prismjs/themes/prism-solarizedlight.css');

function BlogDetail(props) {
  const {data} = props;
  const [_expand, setExpand] = React.useState(false);
  const [dimension] = useOutlet('dimension');
  const mobile = dimension.innerWidth < 800;
  // in desktop, always expand the list
  const expand = mobile ? _expand : true;

  React.useEffect(() => {
    // this is a hack to compensate inner page jump through `#` link
    // because gatsby-remark-autolink-headers' offsetY seems doesn't work
    setTimeout(() => {
      window.scrollBy({top: -80, behavior: 'smooth'});
    }, 200);
  }, [props.location]);

  return (
    <Wrapper mobile={mobile}>
      <div className="placeholder" />
      <div className="content">
        <BlogList mobile={mobile} expandList={expand}>
          <div style={{display: 'flex', alignItems: 'center', height: 40}}>
            <h2>所有Blog文章</h2>
            <div style={{flex: 1}} />
            {mobile && (
              <Button onClick={() => setExpand(!expand)}>
                {expand ? '-' : '+'}
              </Button>
            )}
          </div>
          {data.allMarkdownRemark.edges.map(({node}) => (
            <div key={node.fields.slug}>
              <Button type="link" onClick={() => navigate(node.fields.slug)}>
                {node.frontmatter.title}
              </Button>
            </div>
          ))}
        </BlogList>

        <div style={{flexBasis: 20}} />

        <BlogContent>
          <h1>{data.markdownRemark.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{__html: data.markdownRemark.html}} />
        </BlogContent>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: var(--topNavBarHeight);

  & > .content {
    max-width: var(--contentMaxWith);
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: ${(props) => (props.mobile ? 'column' : 'row')};
    align-items: ${(props) => (props.mobile ? 'stretch' : 'flex-start')};
  }

  code[class*='language-'],
  pre[class*='language-'] {
    white-space: pre-wrap;
  }
`;

const BlogList = styled.div`
  ${(props) =>
    (!props.mobile &&
      `
  width: 300px;
  position: sticky;
  top: calc(20px + var(--topNavBarHeight));
  `) ||
    `
    overflow: hidden;
    `}
  max-height: ${(props) => (props.expandList ? '10000px' : '40px')};
`;

const BlogContent = styled.div`
  flex: 1;
`;

export const pageQuery = graphql`
  query BlogDetail($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        created
      }
    }

    allMarkdownRemark(
      limit: 100
      filter: {fileAbsolutePath: {regex: "/blog/"}}
      sort: {fields: [frontmatter___created], order: DESC}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            created
          }
        }
      }
    }
  }
`;

export default BlogDetail;
