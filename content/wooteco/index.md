---
emoji: 🧑‍💻
title: '우아한테크코스 5기 프리코스 전체 회고록'
date: '2022-11-24'
categories: 회고
---

## 우아한테크코스 5기 프리코스 전체 회고록

#### 프롤로그

~~_항상 velog나 티스토리에서 정보만 얻어갔었는데, 내가 이걸 시작할 줄이야.. _~~

우테코를 하던 중, 참여했던 스터디에서 만난 팀원들이 velog와 github.io를 운영하는 것을 보고 멋있음을 느꼈고 마침 내가 공부한 것들을 정리하고 싶어 이번 기회에 도전해보고 싶다는 마음을 먹고 시작했다.

<p align = "center" >
<img src = "https://velog.velcdn.com/images/pangkyu/post/cab4fc97-b615-4a9c-a27b-47f2e9294b95/image.png" width = "60%" ></p>

<span style = "font-size : 12px"> 열심히 리뷰해주신 팀원분들께 다시 한번 감사드립니다😊</span>

---

### 1. 미션

> 4주간 프리코스가 진행되면서 일주일에 1개씩 프리코스 미션이 나왔다.

1. [자바스크립트 온보딩](https://github.com/pangkyu/javascript-onboarding)

   처음 받은 미션이었는데, 일반 프로그래머스나 백준처럼 알고리즘을 푸는 문제였다.
   생각보다 쉬운 문제도 있었고 까다로운 문제도 있었는데 해결하기에 무리가 있지는 않았던 것 같다. ~~물론 가독성 좋은 코드는 아니였음~~

2. [자바스크립트 베이스볼](https://github.com/pangkyu/javascript-baseball)

우테코를 검색했을 때, 가장 많이 봤던 문제였던 숫자 야구 게임이 2주차 과제였다.
최근에 리액트로 UI만 그리다 보니까 로직을 구성하는 것과는 담을 쌓았었다.
그러다 보니 class 형을 사용하는 것도 어떻게 했는지 기억이 가물가물했고, 당연히 기능적으로 동작만 하게끔 코딩을 해버렸다.
또, 우테코에서 제공한 [MissionUtils 라이브러리](https://github.com/woowacourse-projects/javascript-mission-utils#mission-utils)를 사용해야했다. 오랜만에 콘솔에서 입력받다 보니 어색하기도 하고 기억이 안나서 시간이 좀 걸렸고, 스터디의 필요성을 느낀 주간이었다.

3. [자바스크립트 로또](https://github.com/pangkyu/javascript-lotto)

함수 길이가 15라인이 넘어가지 않아야 한다는 조건이 추가되었다. 처음에는 코드가 길어질 수도 있지 왜 라인 수를 제한하지?라고 생각했고 구현하는 것이 힘들겠구나라는 생각을 했다. 코딩을 하다 보니 한 가지 일만 하도록 분리를 하려하니 코드 수가 확 주는 것을 느꼈다.

```js
class BuyLotto {
  constructor(
    howMany,
    makeNumbers,
    userInputNum,
    userInputBonusNum,
    fifthPrize,
    fourthPrize,
    thirdPrize,
    secondPrize,
    firstPrize,
    sum,
    getYield
  ) {
    this.howMany = howMany;
    this.makeNumbers = makeNumbers;
    this.userInputNum = userInputNum;
    this.userInputBonusNum = userInputBonusNum;
    this.fifthPrize = fifthPrize;
    this.fourthPrize = fourthPrize;
    this.thirdPrize = thirdPrize;
    this.secondPrize = secondPrize;
    this.firstPrize = firstPrize;
    this.sum = sum;
    this.getYield = getYield;
  }
  //하지만 이런 과도한 파라미터를 받아온 것을 줄이고 싶었다 ㅠㅠ
```

다행히 스터디 팀원들의 여러 피드백으로 Map을 통해 인자 관리를 해야겠다는 것을 배웠다👀

4. [자바스크립트 브릿지](https://github.com/pangkyu/javascript-bridge)

이번 미션은 함수 길이가 10라인을 넘어가지 못하도록 구현하라는 요구 사항이 추가되었고, MVC 패턴을 이용해서 구현하라고 유도했다. 그러나 나는 로직과 뷰를 분리하려고는 했지만, 컨트롤러를 따로 분리하지 않고 구현했다..
그리고 매 주차 미션마다 단위 테스트를 해보고 싶었지만, 기능 구현하는데 급해서 신경을 쓸 수 없었고, 요구 사항도 많이 지키지 못했던 거에 아쉬움이 컸다.

<br/><br/>

### 2. 다짐

우테코에서의 4주가 끝났다. 끝난 지 하루밖에 안 지났지만, 좀 더 완성도 있게 미션을 제출할걸이라는 아쉬움이 든다. 짧은 시간이었지만 열심히 하는 사람들을 보고 자극도 받고, 내 코드의 문제점도 찾을 수 있는 기간이였기 때문에 우테코에 신청하기를 잘했다고 생각한다.
합격할지 불합격할지 모르지만, 발표가 나기 전까지 스터디 팀원들이 피드백해준 부분으로 코드 리팩토링을 해보며 그저 한 번의 도전으로 끝나는 것이 아닌 지속해서 발전해나가는 기회로 발전시켜야겠다.

```toc

```
