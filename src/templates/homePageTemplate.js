import React from "react";
import { graphql } from "gatsby";

export default ({
  data
}) => {
  return (
    <p>Home</p>
  )
};

export const pageQuery = graphql`
  query($slug: String!, $lang: String!) {
    markdownRemark(fields: {slug: {eq: $slug }}) {
      frontmatter {
        title
      }
    }
  }
`;
