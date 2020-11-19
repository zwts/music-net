// JSX + preact
import { h, render, Component } from 'preact';

class App extends Component {
  render() {
    return <h1>Hello, world!</h1>;
  }
}

render(<App />, document.body);


// htm + preact
// import { h, Component, render } from 'preact';
// import htm from 'htm';
//
// // Initialize htm with Preact
// const html = htm.bind(h);
//
// function App (props) {
//   return html`<h1>Hello ${props.name}!</h1>`;
// }
//
// render(html`<${App} name="World" />`, document.body);
