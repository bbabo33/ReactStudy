import React, { Component } from 'react';

export default class BasicChild extends Component {

  constructor(props) {
    super(props);

    this.state = {
                  tickTime: props.tickTime
                  , timeFlag: true
                }

    /**
     * 이벤트 바인딩
     * 
     * 
     */
    this.stopTime = this.stopTime.bind(this);
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

  stopTime() {
    // 이건 되긴 하는데 this.state의 값을 직접 바꾸는 것과 비슷함
    // this.setState({timeFlag: !this.state.timeFlag});
    this.setState(prevState => {
      console.log(prevState);
      return {timeFlag: !prevState.timeFlag};
    })
  }

  render() {
    return (
      <div>
        <span>child 현재시각: {this.props.tickTime.toLocaleTimeString()}</span>
        <button onClick={this.stopTime}>Stop Time</button>
      </div>
    );
  }
}