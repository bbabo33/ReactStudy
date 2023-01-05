import logo from './logo.svg';
import './App.css';
import Basic from './basic'
import { HookFunctionEx, HookClassEx } from './hookFunction'
// import HookClassEx from './hookClass'
import { Fragment, useEffect, useState } from 'react'

function App() {

  let [nameFromHookFunctionEx, setNameFromHookFunctionEx] = useState('only parent');
  let tempData = 'aaaa';

  function tempFunction(val) {
    console.log(tempData, 'in App');
    /* 
      자식컴포넌트에서 부모가 가진 메서드가 호출되고
      값도 바뀌지만
      데이터 렌더링은 일어나지 않아 그대로 tempData -> aaaa이다
      이는 state 관리대상이 아니므로 hook에서 제외됨
    */
    tempData = val;
    //setNameFromHookFunctionEx(val);
    console.log(tempData, 'in App');
    
    return tempData;
  }

  useEffect(() => {
    console.log(tempData, 'in App useEffect');
  })

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
        </header>
        <div>
          <div>
            <div className="divider" />
            <div>{ tempData } hook function { nameFromHookFunctionEx }</div>
            {/* 
                자식컴포넌트에서 데이터 올리기
                https://ko.reactjs.org/docs/components-and-props.html#props-are-read-only
                
            */}
            <HookFunctionEx name="hongsungJin" emitFunction={setNameFromHookFunctionEx} tempFunction={tempFunction} />
            <div className="divider" />
            <div>hook class</div>
            <HookClassEx />
          </div>
          <div className="divider" />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
