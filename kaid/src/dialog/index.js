import React from 'react';
import ReactDOM from 'react-dom';
import SoftKey from '../softkey';
import './index.scss';

const prefixCls = 'kai-dialog';

class Dialog extends React.Component {
  componentDidMount() {
    this.updateSoftKeys();

    this.lastFocus = document.activeElement;
    this.focus();
  }

  componentDidUpdate() {
    if (this.props.type === 'prompt') {
      this.input.value = this.props.initialValue || '';
    }
  }

  componentWillUnmount() {
    SoftKey.unregister(this.element);
  }

  updateSoftKeys() {
    switch (this.props.type) {
      case 'alert':
        SoftKey.register({
          left: '',
          center: 'ok',
          right: ''
        }, this.element);
        break;
      case 'progress':
        SoftKey.register({
          left: 'cancel',
          center: '',
          right: ''
        }, this.element);
        break;
      case 'prompt':
        SoftKey.register({
          left: 'cancel',
          center: '',
          right: 'ok'
        }, this.element);
        break;
      default:
        break;
    }
  }

  focus() {
    if (this.input) {
      this.input.focus();
    } else {
      this.element.focus();
    }
  }

  onKeyDown = (evt) => {
    const { type, onOK, onCancel } = this.props;
    switch (evt.key) {
      case 'Enter':
        if (type === 'alert') {
          this.close();
        }
        break;
      case 'SoftLeft':
        if (type === 'progress' || type === 'prompt') {
          onCancel && onCancel();
          this.close();
        }
        break;
      case 'SoftRight':
        if (type === 'prompt') {
          onOK && onOK(this.input.value);
          this.close();
        }
        break;
      case 'Backspace':
      case 'EndCall':
        evt.preventDefault();
        evt.stopPropagation();
        this.close();
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
    const { header, content, type, inputOptions, progressOptions } = this.props;
    return (
      <>
        <div
          ref={node => { this.element = node }}
          className={`${prefixCls}-wrapper`}
          tabIndex="-1" onKeyDown={this.onKeyDown}
        >
          {header ?
            <div className={`${prefixCls}-header h1`} data-l10n-id={header}>
              {header}
            </div> : null}
          <div className={`${prefixCls}-container ${type}`}>
            {content ?
              <p className={`${prefixCls}-content`} data-l10n-id={content}>
                {content}
              </p> : null}
            {
              type === 'prompt' ?
                <input
                  ref={(node) => { this.input = node; }}
                  className={`${prefixCls}-input`}
                  {...inputOptions}
                /> : null
            }
            {
              type === 'progress' ?
                <div>
                  <p>
                    {`${progressOptions.value} / ${progressOptions.max}`}
                  </p>
                  <progress
                    {...progressOptions}
                  />
                </div> : null
            }
          </div>
        </div>
        <SoftKey />
      </>
    );
  }
}


function show(config, container) {
  const div = document.createElement('div');
  div.className = `${prefixCls}`;

  const parent = container ? container : document.body;
  parent.appendChild(div);

  function render(props) {
    ReactDOM.render(<Dialog {...props} />, div);
  }

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    parent.removeChild(div);
    config.onClose && config.onClose();
  }

  config.onOpen && config.onOpen();
  render({...config, close});
}

['alert', 'progress', 'prompt'].forEach(type => {
  Dialog[type] = function(props, contianer) {
    const config = {
      type,
      ...props
    };

    return show(config, contianer);
  };
});

export default Dialog
