---
title: 'React State 정리 & 기록 (예시 포스트)'
stack: 'react'
slug: 'react-state'
date: '2022-01-13T02:00+0900'
tags: 'React,State,Hook'
---

항상 과거에 완료한 프로젝트들을 보면 JavaScript 언어의 특성 및 기타 프레임워크의 특성을 잘 살리지 못한채 개발했다는
생각이 들었다.  
좀더 클린한 코드와 유연한 설계를 위해 JavaScript 언어부터 조금더 깊게 공부해보는 시간을 가졌고 현재는 React 및 TypeScript도 천천히 다시 공부해보고 있다. 물론 코딩테스트 주력 언어도 JavaScript로 바꾸어 꾸준히 풀고있다..

사실 지금 작성하고 있는 블로그도 React를 사용하여 개발하였다. 개발 당시에는 State, Props, Hook, Lifecycle등 주요 개념만 빠르게 훑어보고 개발을 시작했다. 얕게 공부하고 개발한 결과... 개선해야할 점이 많이 보여서 조만간 리펙토링 해보려고 한다.

서론이 길었는데 아무튼 다음 React 프로젝트 진행시에 내가 조금이라도 더 기억할 수 있게 State에 대한 정리를 해보고자 한다.

## 1. this.state 와 useState 차이

Class형 컴포넌트의 **this.state** 는 객체형식이며 갱신객체가 자동 병합된다.

```jsx
class TestClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = { a: 1, b: 2 }
  }
  handleBtnClick = () => {
    this.setState({ b : 3 })
  }
  ....생략
}
```

clickHandler 의 this.setState 부분을 처리할때 아래와 같이 처리하게 되며
원본 State와 병합되어 b의 값이 변경된다.

```js
Object.assign(this.state, { b: 3 })
```

반면 **useState**는 객체를 병합하지 않고 대체한다

```jsx
function TestFuntion() {
  const [state, setState] = useState({ a: 1, b: 2 })

  const handleBtnClick = () => {
    setState({ b: 3 }) //state 의 원본값이 { b: 3 } 로 대체
  }
  ...생략
}
```

이러한 useState의 특성때문에 모든 state를 단일 객체로 관리하고자 한다면 다음과 같이 함수적 갱신을 사용함과 동시에 기존 객체의 손실을 일으키지 않게 코드를 작성하여야 한다.

```jsx
function TestFuntion() {
  const [state, setState] = useState({ a: 1, b: 2 })

  const handleBtnClick = () => {
    //state의 함수적 갱신
    setState((prevState) => {
      //ES6 Spread 이용
      return { ...prevState, b: 3 }
    })
  }
  ...생략
}
```

함수적 갱신을 사용하여야 하는 이유는 아래에서 알아보도록 하겠다.

## 2. React에서 setState는 비동기적이다

클래스형 컴포넌트의 this.setState와 State Hook의 setState 호출은 모두 비동기적으로 이루어진다.
이는 React가 불필요한 re-rendering을 줄이기 위해 여러 setState 호출을 batch update로 한번에 처리하기 때문이다.
setState 호출이 비동기적이기 때문에 아래와 같은 코드는 기대와 다르게 작동한다.

```jsx
function TestFuntion() {
  const [count, setCount] = useState(0);
  const handleBtnClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }
  ...생략
}
```

위와같은 코드에서 버튼 한번의 클릭으로 count를 3씩 증가시키는 것을 기대하지만 결과는 1이 증가된다.
setCount가 비동기적이기 때문에 호출된 시점에서 count는 즉시 변하지 않는다. 결과적으로 `setCount(0+1)` 만 3번 반복하게 되는것이다.

그렇기 때문에 이전 State 값을 기준으로 현재 State를 업데이트 하기 위해서는 **함수적 갱신**을 사용하여야 한다.

## 3. State의 함수적 갱신

state의 함수적 갱신이란 setState 호출시 인자로 함수를 전달하는 경우이다.

```jsx
function TestFuntion() {
  const [count, setCount] = useState(0);
  const handleBtnClick = () => {
    setCount((count) => count + 1);
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  }
  ...생략
}
```

위와 같이 함수적 갱신을 이용할 경우 한번의 클릭마다 count를 3씩 증가시킬 수 있다.

추가로 useState의 함수적 갱신을 써야할때 유의해야할 점이 있다.

```jsx
function TestFuntion() {
  const [list, setList] = useState([false, false, false]);
  const handleBtnClick = () => {
    setList((prevList) => {
      const curlist = prevList;
      curlist[0] = true;
      return curlist; // curlist === list -> true (리엑트가 변화를 감지하지 못함)
    });
  }
  ...생략
}
```

위와 같은경우에 클릭시에 상태배열이 `[true, false, false]` 로 바뀌길 기대하지만 실제 상태는 바뀌지 않는다
그 이유는 반환한 curlist 배열은 원본 list 배열과 같은 공간을 참조하고 있기때문이다. ( Javascript 에서 배열은 Object 이기때문에 )  
그렇기 때문에 React는 변화를 감지 하지 못하고 re-rendering도 일어나지 않는다

이것을 해결하기 위해서는 새로운 객체를 만들어주어 반환하여야한다.

```jsx
function TestFuntion() {
  const [list, setList] = useState([false, false, false]);
  const handleBtnClick = () => {
    setList((prevList) => {
      const curlist = [...prevList];
      curlist[0] = true;
      return curlist; // curlist === list -> false (리엑트가 변화 감지)
    });
  }
  ...생략
}
```
