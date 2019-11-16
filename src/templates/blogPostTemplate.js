import React from "react";
import "@redq/reuse-modal/es/index.css";

import { graphql } from "gatsby";

export default function BlogTemplate() {
  return (
    <p>BlogTemplate</p>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
