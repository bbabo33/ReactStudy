import React, { Component } from 'react';
import BasicChild from './basicChild';

export default class Basic extends Component {
  /**
   * 해당 페이지 React의 작동 순서
   *
   * 1. 해당 컴포넌트를 사용하는 페이지에서 constructor()를 통해 정보를 알게됨
   *    -> App.js 의 <Basic />
   * 2. constructor에서 해당 컴포넌트의 state를 초기화 할 수 있음
   *    -> state는 vue와 비교했을 때, data 영역과 비슷하게 느껴짐
   * 3. 해당 컴포넌트를 사용하는 페이지에서는 해당 컴포넌트의 render()를 호출하여 DOM을 업데이트한다
   * 4. 해당 컴포넌트 내용과 관련된 DOM을 업데이트 하면 componentDidMount()를 호출한다
   * 5. componentDidMount에서 tick()을 호출하여 state의 재업데이트가 이루어짐
   * 6. react는 state의 변화를 감지하여 해당 컴포넌트의 render()를 호출
   * 7. 이후로 4-5-6이 계속 반복됨
   * 
   * life cycle
   * 1, 2, 3 모두 소괄호 순서대로 호출됨
   * 
   * 1. 초기화 단계 - 컴포넌트의 인스턴스가 생성되어 DOM 상에 삽입될 때
   *  1) constructor
   *  2) static getDerivedStateFromProps()
   *  3) render
   *  4) componentDidMount
   * 
   * 2. 업데이트 단계 - props 또는 state가 변경되면 갱신이 발생
   *  1) static getDerivedStateFromProps()
   *  2) shouldComponentUpdate()
   *  3) render()
   *  4) getSnapshotBeforeUpdate()
   *  5) componentDidUpdate()
   *  *** 5번 즉, React가 DOM을 업데이트 한 후, Hook을 호출한다(useEffect) 
   * 
   * 3. 소멸단계 - 마운트 해제
   *  1) componentWillUnmount()
   * 
   */

  constructor(props) {
    super(props);
    // state의 초기화 단계
    this.state = {tickTime: new Date()}
    console.log(props, 'this is basic constructor');
  }

  // https://ko.reactjs.org/docs/state-and-lifecycle.html 5.State와 생명주기
  // 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행
  componentDidMount() {
    console.log('this is basic componentDidMount');
    this.timerId = setInterval(() => this.tick(), 1000);
    // setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  /**
   * props / setState() / forceUpdate() 등으로
   * 값이 변경되었을 때, render 전 시점에 활성되는 메서드
   * update와 관련된 인자를 받을 수 있으며
   * 해당 메서드에서 return을 통해 render를 호출할지 말지를 결정
   */
  shouldComponentUpdate() {
    // console.log('this is basic shouldComponentUpdate');
    return true;
  }
  
  // 값의 변경으로 update가 이루어지면 최종적으로 해당 메서드가 호출됨
  componentDidUpdate() {
    //console.log('this is basic componentDidUpdate');
  }

  tick() {
    /**
     * this.state를 직접적으로 변경하려 하지마라
     * 
     * ex) this.state.a = 'hello';
     * 
     * 위와 같이 한다면 변화감지가 이루어지지 않는다
     * 
     * setState를 사용해야 변화감지가 이루어짐
     * this.state를 지정할 수 있는 유일한 공간은 constructor 뿐이다
     */
    this.setState({tickTime: new Date()});
  }

  activateLasers() {
    alert('you clicked activateLasers button');
  }

  // 해당 컴포넌트
  render() {
    //console.log('this is render')
    return (
      <div>
        <div>
          <span>저는 {this.props.lang} 전문 {this.props.name}입니다!</span>
          <span>현재시각: {this.state.tickTime.toLocaleTimeString()}</span>
          <BasicChild tickTime={this.state.tickTime} />
        </div>
      </div>
    );
  }
}