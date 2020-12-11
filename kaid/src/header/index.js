import React from 'react';
import './index.scss';

const headerCls = 'kai-header';

const Header = ({ text, children }) => (
  <header className={headerCls}>
    <h1 className="h1" data-l10n-id={text}>
      {children}
    </h1>
  </header>
);

export default Header;
