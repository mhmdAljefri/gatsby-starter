import React from 'react';
import Container from '../components/UI/Container';
import Text from '../components/Text';
import TransitionLink from 'gatsby-plugin-transition-link/AniLink'

export default function Page2({ children, transitionStatus, entry, exit }) {
  return (
    <Container>
      <Text content="hello from page2" />
      <TransitionLink
        cover
        to="/"
        direction="left"
        duration={3}
      >
        Go to page 2
      </TransitionLink>
    </Container>
  )
}