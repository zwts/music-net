import React from 'react';
import SimpleNavigationHelper from '../simple-navigation-helper';
import './index.scss';

const prefixCls = 'kai-list';

export const ListItem = ({ id, focusable, primary, secondary, icon, outerClass, data, selector }) => {
  const itemCls = `${prefixCls}-item ${focusable ? 'focusable' : ''} ${outerClass ? outerClass : ''}`;
  const iconCls = `${prefixCls}-icon ${icon ? '' : 'hidden'}`;
  const lineCls = `${prefixCls}-line`;
  const primaryCls = `${prefixCls}-primary`;
  const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;

  return (
    <li className={itemCls} tabIndex='-1' id={id} {...data}>
      {selector ?
        <div className={iconCls}>
          <span data-icon={selector}/>
        </div>
        : null}
      <div className={iconCls}>
        <img src={icon} />
      </div>
      <div className={lineCls}>
        <span className={primaryCls}>{primary}</span>
        <label className={secondaryCls}>{secondary}</label>
      </div>
    </li>
  );
};

class List extends React.Component {
  componentDidMount() {
    this.navigator = new SimpleNavigationHelper('.focusable', this.container);
  }

  componentWillUnmount() {
    this.navigator.destroy();
  }

  render() {
    return (
    <div
      ref={(container) => { this.container = container; }}
      className='list-container'
      tabIndex='1'>
      <ul>{this.props.children}</ul>
    </div>
    );
  }
}

export default List;
