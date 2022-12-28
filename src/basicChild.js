import React, { Component } from 'react';
import StopGreeting from './StopGreeting';
import ContinueGreeting from './ContinueGreeting';
import NullRender from './NullRender';

export default class BasicChild extends Component {

  constructor(props) {
    super(props);

    this.state = {
                  tickTime: props.tickTime
                  , timeFlag: true
                }

    /**
     * 이벤트 바인딩
     * 콜백에서 'this'가 작동하려면 바인딩이 필요하다
     */
    // this.stopTime = this.stopTime.bind(this);
  }

  componentDidMount() {
    console.log(this.state.tickTime);
  }

  /**
   * static 메서드이기 때문에 this에 접근할 수 없음. 잘 안씀
   * 대신에 componentDidUpdate 활용
   */
  // static getDerivedStateFromProps(props, state) {
  //   // console.log(props);
  //   // console.log(state);
  //   // 파라미터로 전달받은 props와 현재 state가 있기 때문에 this안씀
  // }

  shouldComponentUpdate() {
    if(this.state.timeFlag) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(prevProps);
    // console.log(prevState);

    /**
     * 해당 단계에서 계속 호출하니까
     * Maximum update depth exceeded. 
     * This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. 
     * React limits the number of nested updates to prevent infinite loops
     * 와 같은 오류 뜸
     * 
     * 참고) https://ko.reactjs.org/docs/react-component.html#shouldcomponentupdate
     */
    // this.setState({tickTime: prevProps.tickTime});
  }

  /**
   * constructor에서 this 바인딩을 함
   * 만약 constructor에서 this바인딩을 하지 않으면, 해당 메소드에서
   * this를 인식하지 못하고 undefined의 setState를 찾으려 한다고 에러뜸
   */
  stopTime(param) {
    // 이건 되긴 하는데 this.state의 값을 직접 바꾸는 것과 비슷함
    // this.setState({timeFlag: !this.state.timeFlag});

    // 파라미터 전달 가능
    console.log('param name is : ', param);

    // 이와 같이 prevState를 활용하자
    this.setState(prevState => {
      //console.log(prevState);
      return {timeFlag: !prevState.timeFlag};
    })
  }

  // greeting() {
  //   if(this.state.timeFlag) {
  //     return <StopGreeting />;
  //   } else {
  //     return <ContinueGreeting />;
  //   }
  // }

  render() {
    let desc;
    if(this.state.timeFlag) {
      desc = <ContinueGreeting />;
    } else {
      desc = <StopGreeting />;
    }

    return (
      <div>
        <span>child 현재시각: {this.props.tickTime.toLocaleTimeString()}</span>
        {/* 
          <button onClick={this.stopTime}>Stop Time</button>
          만약 constructor에서 this를 바인딩 하기 귀찮다면, 이렇게도 가능 
        */}
        {/* 
          <button onClick={() => this.stopTime()}>Stop Time</button>
        */}
        <div>
          {desc}
          <div>time flag is { this.state.timeFlag? 'true' : 'false'}</div>
          <button onClick={this.stopTime.bind(this, 'testText')}>Stop Time</button>
        </div>
        {/* render에서 null을 리턴하는 <NullRender />는 React 라이프사이클에 영향을 끼치지 않는다 */}
        <div><NullRender/></div>
      </div>
    );
  }
}