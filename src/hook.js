import React, { useState } from 'react';

/* 
참고
https://ko.reactjs.org/docs/hooks-intro.html

class 컴포넌트는 state 오브젝트를 가지고 라이프 사이클에 따라 변경이 되었다
그러나 function 컴포넌트는 컴포넌트를 구성할 수 있지만
라이프 사이클을 가지지 않기 때문에 자동감지가 되지 않았다
리액트 16.8버전부터 React Hook이 도입되면서 함수에서도 스테이트도 가지고 
라이프사이클 메소드도 사용할 수 있게 되었다
 */
function HookEx() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times </p>
            <button onClick={() => setCount(count + 1)}> click me </button>
        </div>
    );
}

export { HookEx };