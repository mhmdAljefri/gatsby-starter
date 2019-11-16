import React from 'react';
import Container from '../components/UI/Container';
import Text from '../components/Text';
import AniLink from "gatsby-plugin-transition-link/AniLink";

export default function IndexPage(props) {
  console.log({ props });

  return (
    <Container>
      <Text content="hello from index" />
      <AniLink
        to="/page-2"
        paintDrip
      >
        Go to page 2
      </AniLink>
    </Container>
  )
}