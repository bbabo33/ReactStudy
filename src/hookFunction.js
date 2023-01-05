import React, { useEffect, useState } from 'react';

/* 
참고
https://ko.reactjs.org/docs/hooks-intro.html

class 컴포넌트는 state 오브젝트를 가지고 라이프 사이클에 따라 변경이 되었다
그러나 function 컴포넌트는 컴포넌트를 구성할 수 있지만
라이프 사이클을 가지지 않기 때문에 자동감지가 되지 않았다
리액트 16.8버전부터 React Hook이 도입되면서 함수에서도 스테이트도 가지고 
라이프사이클 메소드도 사용할 수 있게 되었다

functional component에서 Hook역할을 하는 것이 useState이다
Hook은 함수 컴포넌트에서 React state와 생명주기를 연동할 수 있게 해주는 함수이다.
Hook은 class 안에서는 동작하지 않는다. 대신 class 없이 React를 사용할 수 있게 해준다

effect hook
-> useEfeect는 함수 컴포넌트 내에서 class 컴포넌트의 
componentDidMount, componentDidUpdate, componentWillUnmount 와 같이 
데이터의 변화 감지에 의해 DOM이 변경될 수 있도록 function Component에서 제공하는 것이다
*** 주의할 점은 useEffect를 사용하면, React는 DOM을 바꾼 뒤에 'effect'함수를 실행한다

React는 effect가 수행되는 시점에 이미 DOM이 업데이트 되었음을 보장한다

 */
function HookFunctionEx(props) {
    /**
     * 여기서 useState는 인자로 초기 state 값을 하나 받는다.
     * 초기값으로 0을 넣어줌. 객체여도 아니어도 된다
     * 이 초기값은 첫 번째 렌더링에만 딱 한번 사용된다.
     * 
     * useState에 사용된 state 변수는 함수가 끝나더라도 react에 의해 사라지지 않는다 
     */
    const [count, setCount] = useState(0);
    const [name, setName] = useState('hong');
    const [testObj, setTestObj] = useState({a: 1, b: 2, c:3});

    useEffect((props) => {
        function handleStatueChange() {
            console.log('handleStatueChange in useEffect');
        }
        
        console.log(handleStatueChange());
    })

    return (
        <div>
            <p>{ name } clicked {count} times.</p>
            <button onClick={() => {
                                    // class HookClassEx에 this.setState({ count: this.state.count + 1 })와 달리
                                    // 변수가 병합되는게 아니라 엎어쳐진다
                                    setCount(count + 1);
                                    setName('jin');
                                    setTestObj({a: 2, d: 4});
                                    console.log(testObj);
                                    props.emitFunction('data from child');
                                    props.tempFunction('temp from child');
            }}> click me </button>
        </div>
    );
}

class HookClassEx extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
            , name: 'guess who?'
        };
    }

    // componentDidUpdate() {
    //     this.setState({name: 'guess who who who???'});
    // }

    render() {
        return (
            <div>
                <p>{this.state.name} clicked {this.state.count} times</p>
                {/* setState({ count: this.state.count + 1 })으로 status가 병합됨 */}
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Click me
                </button>
            </div>
        );
    }
}

export { HookFunctionEx, HookClassEx };