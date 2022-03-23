import React from 'react';
import clsx from 'clsx';
import { navigate } from 'gatsby';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import useSite from '@hooks/useSite';
import Logo from '@comps/logo';
import Nav from '@src/components/nav';
import '@styles/layout.scss';

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
}

export default function Layout(props: LayoutProps) {
  const data = useSite();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{props.title || data.title}</title>
        <meta name="description" content={data.description} />
      </Helmet>
      <div className={clsx('gg-container', props.className)}>
        <header>
          {!data.userLogo ? (
            <Logo
              onClick={() => navigate(`${data.assetPrefix}`)}
              color="var(--gg-logo)"
            />
          ) : (
            <img
              className="imglogo"
              src={require('../static/logo.png').default}
              onClick={() => navigate(`${data.assetPrefix}`)}
              alt="logo"
            />
          )}
          <Nav siteMetadata={data} />
        </header>
        <main>
          <div className="content">{props.children}</div>
        </main>
        <footer>
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
          >
            <img
              style={{ width: 60, height: 21 }}
              src={require('@icons/license.svg').default}
              alt="License"
            />
          </a>{' '}
          Copyright © 2022-present {data.owner}
        </footer>
      </div>
    </HelmetProvider>
  );
}
