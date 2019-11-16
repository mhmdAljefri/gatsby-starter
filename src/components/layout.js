import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SEO from './seo';
import Drawer from './Drawer';
import Switch from './Switch';
import Container from './UI/Container';
import Heading from './Heading';
import Box from './Box';
import HamburgMenu from './HamburgMenu';
import { DrawerProvider } from "contexts/DrawerContext";
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import GlobalStyle from '../styles';

const Layout = ({ children, pageContext }) => {
  const [isOpen, setOpen] = useState(false);
  const [isDark, setDark] = useState(false);
  const isArabic = pageContext.lang === 'ar';
  const placement = isArabic ? 'left' : 'right';

  function toggleDarkTheme() {
    setDark(!isDark);
  }

  function toggleHandler() {
    setOpen(!isOpen)
  }

  return (
    <ThemeProvider theme={{ ...theme, isDark }}>
      <GlobalStyle />
      {isArabic ? <GlobalStyle.Arabic /> : null}
      <SEO {...pageContext} />
      <header>
        <Container>
          <Box flexBox alignItems="center" justifyContent="space-between">
            <Heading content={pageContext.title} />
            <Box flexBox alignItems="center" >
              <Switch
                isChecked={isDark}
                isMaterial
                onChange={toggleDarkTheme}
                labelPosition="right"
              />
              <DrawerProvider>
                <Drawer
                  width="420px"
                  placement={placement}
                  drawerHandler={<HamburgMenu barColor="#eee" />}
                  open={isOpen}
                  toggleHandler={toggleHandler}
                >
                  <span></span>
                </Drawer>
              </DrawerProvider>
            </Box>
          </Box>
        </Container>
      </header>
      <main>{children}</main>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Layout;
