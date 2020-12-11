import React from 'react';
import './index.scss';

const prefixCls = 'kai-empty';

const Empty = ({ text }) => (
  <div className={prefixCls}>
    <p className={`${prefixCls}-text`} data-l10n-id={text}>{text}</p>
  </div>
);

export default Empty;
