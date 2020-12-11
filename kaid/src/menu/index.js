import React from 'react';
import ReactDOM from 'react-dom';

import SoftKey from '../softkey';
import SimpleNavigationHelper from '../simple-navigation-helper';
import './index.scss';

const prefixCls = 'kai-menu';
const FOCUS_SELECTOR = '.kai-menu-item';

class Menu extends React.Component {
  componentDidMount() {
    SoftKey.register({ left: '', center: 'select', right: '' }, this.el);
    this.navigator = new SimpleNavigationHelper(FOCUS_SELECTOR, this.el);

    this.lastFocus = document.activeElement;
    this.el.focus();
  }

  componentWillUnmount() {
    this.navigator.destroy();
    SoftKey.unregister(this.el);
  }

  onKeyDown = (e) => {
    const { options, onCancel } = this.props;
    let option;
    switch (e.key) {
      case 'Enter':
        this.close();
        option = options[+e.target.dataset.index];
        if (option && option.onSelect) {
          option.onSelect();
        }
        break;

      case 'Backspace':
        onCancel && onCancel();
        this.close();
        e.preventDefault();
        break;

      default:
        break;
    }
  }

  focusLast() {
    if (this.lastFocus && this.lastFocus.offsetParent) {
      this.lastFocus.focus();
    }
    this.lastFocus = null;
  }


  close() {
    this.props.close();
    this.focusLast();
  }

  render() {
    const { header, options, radioOnIndex } = this.props;
    const menu = options.map((option, index) => (
      <li
        key={`option-${option.id}`}
        tabIndex="-1"
        data-index={index}
        className={`${prefixCls}-item p-pri`}
      >
        <div>
          <span data-l10n-id={option.id}>{option.id}</span>
        </div>
        {option.type === 'radio-item' ?
          <div>
            <span className='radio-item'
                  data-icon={index === radioOnIndex ? 'radio-on' : 'radio-off'}/>
          </div> : null}
      </li>
    ));
    return (
      <>
        <div ref={(node) => { this.el = node; }} className="kai-menu-wrapper" tabIndex="-1" onKeyDown={this.onKeyDown}>
          <div className="kai-menu-header h1" data-l10n-id={header || 'options'}>{header || 'options'}</div>
          <ul>{menu}</ul>
        </div>
        <SoftKey />
      </>
    );
  }

  static open(config, container) {
    const div = document.createElement('div');
    div.className = `${prefixCls}`;

    const parent = container || document.body;
    parent.appendChild(div);

    function render(props) {
      ReactDOM.render(<Menu {...props} />, div);
    }


    function close() {
      ReactDOM.unmountComponentAtNode(div);
      parent.removeChild(div);
      config.onClose && config.onClose();
    }

    config.onOpen && config.onOpen();
    render({ ...config, close });
  }
}

export default Menu;
