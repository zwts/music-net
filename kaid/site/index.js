import React from 'react';
import ReactDOM from 'react-dom';
import './static/common.scss';

import OneLineLi from './template/one-line-li';
import TwoLinesLi from './template/two-line-li';
import Header from '../src/header';
import Menu from '../src/menu';
import Dialog from '../src/dialog'


class Site extends React.Component {
  constructor(props) {
    super(props);
    this.panels = {};
    this.state = { panel: 'list' };
  }

  componentDidMount() {
    Menu.open({
      header: 'fruits',
      options: [
        {id: 'apple', label:'apple', onSelect :() => {}},
        {id: 'bananer', label:'bananer', onSelect: () => {}}
      ],
      onOpen: () => {} ,
      onCancel: () => {}
    }, document.querySelector('.menuContainer'));

    Dialog.alert({
      header: 'Alert Dialog',
      content: 'Some alert message here'
    }, document.querySelector('.alertDialogContainer'));

    Dialog.prompt({
      header: "Input fruit number",
      content: "You need to input the number you want",

      initialValue: "1",
      inputOptions: {
        type: 'text',
        placeholder: 'fruit number you want',
        defaultValue: 1,
        'x-inputmode': 'digit',
        maxLength: 3
      }
    }, document.querySelector('.promptDialogContainer'));

    Dialog.progress({
      header: "Download file progress",
      type: "progress",
      content: "Please wait file download",
      progressOptions: {
        value: 3,
        max: 10
      }
    }, document.querySelector('.progressDialogContainer'));
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <>
      <span>Header</span>
      <div className="fake-device-container">
        <Header text="header">Header</Header>
      </div>

      <span>One Line List</span>
      <div className="fake-device-container">
        <OneLineLi></OneLineLi>
      </div>

      <span>Two Lines List</span>
      <div className="fake-device-container">
        <TwoLinesLi></TwoLinesLi>
      </div>

      <span>Option Menu</span>
      <div className="fake-device-container menuContainer">
      </div>

      <span>Alert Dialog</span>
      <div className="fake-device-container alertDialogContainer">
      </div>

      <span>Input Dialog</span>
      <div className="fake-device-container promptDialogContainer">
      </div>

      <span>Progress Dialog</span>
      <div className="fake-device-container progressDialogContainer">
      </div>

      </>
    );
  }
}

ReactDOM.render(<Site />, document.body);
