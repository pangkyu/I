---
emoji: 📖
title: '[JS] 알고리즘 - 성격 유형 검사'
date: '2023-01-08'
categories: 알고리즘
---

## [JS] 알고리즘 - 성격 유형 검사

![](https://velog.velcdn.com/images/pangkyu/post/ed6d63f2-c406-419b-97cc-055e76ea336a/image.png)

> 2022 카카오 테크 인턴십에 나왔던 알고리즘 문제이다. MBTI를 체크하는 문항처럼 생각하여 구현하고자 했다.

### 구현 전 생각한 부분

- 선택지에 따라 유형 점수가 달라지기 때문에 choices로 들어온 인풋 값을 판단하여 점수를 변환해두자.
- <code>'AN'</code>, <code>'NA'</code>처럼 다르게 들어오는 <code>survey</code>값이 어떻게 들어오냐도 생각해야한다.

### 구현 방법

- <code>convertChoices</code>변수를 선언하여 가공한 <code>choice</code>값들을 받아주도록 했다.

```js
choices.map((item) => {
  convertChoices.push(choicesGrade[item]);
});
```

- <code>choice</code>값이 4보다 크면 뒷 문자열에, 작으면 앞 문자열에 값을 넣었다.

```js
if (choices[i] >= 5) {
  personalityType[splitSurvey[1]] += choicesGrade[choices[i]];
}

if (3 >= choices[i]) {
  personalityType[splitSurvey[0]] += choicesGrade[choices[i]];
}
```

- 삼항연산자를 사용하여 뒷문자열 값이 앞문자열 값보다 크면 뒷문자열을 출력 그 외의 경우에는 앞문자열을 출력하도록 했다.
  - 값이 같은 경우 사전 순으로 더 빠른 문자열이 출력되는 제한조건이 있었기 때문에

```js
personalityType['T'] > personalityType['R'] ? (result += 'T') : (result += 'R');
personalityType['F'] > personalityType['C'] ? (result += 'F') : (result += 'C');
personalityType['M'] > personalityType['J'] ? (result += 'M') : (result += 'J');
personalityType['N'] > personalityType['A'] ? (result += 'N') : (result += 'A');
```

### 전체 코드

```js
/**
 *  23.01.08
 *  0.11ms~0.54ms / 33.4MB ~ 33.7MB
 */

function solution(survey, choices) {
  let result = '';
  const choicesGrade = {
    1: 3,
    2: 2,
    3: 1,
    4: 0,
    5: 1,
    6: 2,
    7: 3,
  };
  const personalityType = {
    R: 0,
    T: 0,
    C: 0,
    F: 0,
    J: 0,
    M: 0,
    A: 0,
    N: 0,
  };
  let convertChoices = [];

  choices.map((item) => {
    convertChoices.push(choicesGrade[item]);
  });

  for (let i = 0; i < survey.length; i++) {
    let splitSurvey = survey[i].split('');

    if (choices[i] >= 5) {
      personalityType[splitSurvey[1]] += choicesGrade[choices[i]];
    }

    if (3 >= choices[i]) {
      personalityType[splitSurvey[0]] += choicesGrade[choices[i]];
    }
  }

  personalityType['T'] > personalityType['R'] ? (result += 'T') : (result += 'R');
  personalityType['F'] > personalityType['C'] ? (result += 'F') : (result += 'C');
  personalityType['M'] > personalityType['J'] ? (result += 'M') : (result += 'J');
  personalityType['N'] > personalityType['A'] ? (result += 'N') : (result += 'A');

  return result;
}
```

### 마무리

- 구현자체가 어려운 문제는 아니였지만, 값을 분리하고 찾는 과정에서 생각보다 시간을 많이 썼다.
- 다양한 객체를 알고리즘에 많이 적용해보며 구현하는데에 시간 단축을 하도록 노력해야겠다.

```toc

```
