import logo from './logo.svg';
import './App.css';
import Basic from './basic'
import { HookEx } from './hook'
import { Fragment } from 'react'

function App() {

  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
          <div>
            <Basic name="hong" birth={1994} firstInteger={10} lastInteger={100} />
          </div>
          <div>
            <HookEx />
          </div>
        </header>
      </div>
    </Fragment>
  );
}

export default App;
