import React from 'react';

import Container from 'components/UI/Container';
import { graphql } from 'gatsby';

export default function TagTemplate() {
  return (
    <Container>
      <p>TagTemplate</p>
    </Container>
  );
}

export const tagPageQuery = graphql`
  query TagPage {
    allMarkdownRemark(
      limit: 1000
      # sort: { fields: [frontmatter___date], order: DESC }
      # filter: { frontmatter: { tags: { in: [$tag] }, isDraft: { eq: false } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
