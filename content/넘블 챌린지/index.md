---
emoji: 🧑‍💻
title: '넘블 챌린지 - 신년메시지 주고받는 사이트'
date: '2023-01-09'
categories: 회고 프로젝트
---

## 넘블 챌린지 - 신년메시지 주고받는 사이트

![](https://velog.velcdn.com/images/pangkyu/post/38dea7e5-25f9-4955-8db2-86acc5fc2a9b/image.png)

> 새해를 맞이하여 더 많은 프로젝트를 구현해보고 싶었는데, 넘블에서 바닐라 자바스크립트를 이용하여 SPA를 구현하여 배포하는 챌린지가 있다는 것을 알았다. 바닐라 자바스크립트만을 이용하여 배포까지 해본 경험이 없었기 때문에 도전해보고자 챌린지를 신청하게 되었다.

## 1. 챌린지 주제

SPA로 동작하는 신년 메시지를 주고 받는 서비스를 개발하는 것이 주제였다.
바닐라 자바스크립트를 사용하여 개발해야 했는데, 리액트로만 SPA를 구성해보고, 바닐라로는 해본 경험이 없었기 때문에 어떻게 구성해야할지 고민했다.

### 1-1. 진행 방법 & 요구사항

- ES6 문법 사용
- 상태관리 라이브러리 사용 불가
- 사용 가능한 라이브러리
  - 정적 파일 제공을 위한 express 사용 가능
  - axios 및 http 관련 라이브러리 사용 가능
  - css 전처리기 자율적 사용 가능하며, 이에 따른 필요 라이브러리 사용 가능
  - 이미지 업로드 구현을 위한 aws-sdk 사용 가능
- 디자인
  - 모바일 기준 가로 넓이 최대 640px
  - 기본적인 가이드라인 지켜야함
- 이미지 업로드 : 기본적으로 unsplash api를 활용하여 랜덤이미지를 띄움
  - 다른 방식 사용 가능하나, 파일 업로드 시 url만 가능
- 배포 : aws, 네이버 클라우드 등
- 버전 관리 : git

## 2. 구현 중 발생한 이슈

### 2-1. Failed to load module script...

![](https://velog.velcdn.com/images/pangkyu/post/e05e7db3-88c2-4f56-af96-79f3c613f217/image.png)

바닐라JS로 SPA를 구현하려는 데 이런 에러가 발생하면서 원하는 UI코드가 출력되지 않았다. 모듈 스크립트를 로드하지 못했다는 에러로서 HTML 규격별 모듈 스크립트에 대해 엄격한 MIME 유형 검사가 발생하기 때문에 생긴 에러였다.

#### MIME란?

- Multipurpose Internet Mail Extensions의 약자로서, 클라이언트에게 전송된 문서의 다양성을 알려주기 위한 메커니즘으로서, **웹을 통해 여러 형태의 파일을 전달**하는데 사용되고 있다.

#### 해결방법

엄격하게 지켜야하는 만큼 파일 경로를 명확하게 명시하면 된다.

```js
import App from 'App'; // x
import App from './App'; // x
import App from './App.js'; // o
```

리액트 환경에서는 <code>.js</code>를 붙이지 않아도 경로에 대해 에러를 나타내지 않았는데 바닐라 자바스크립트를 쓸 때는 명확한 표시를 해줘야한다는 것을 알았다.

#### 끝나지 않는 MIME의 벽

![](https://velog.velcdn.com/images/pangkyu/post/17885ffa-c9ab-4724-b876-348a47253757/image.png)

CRUD 기능을 구현하던 도중 이 에러가 또 발생했다. 처음 해결방법을 봤던 것 처럼 파일 경로에 대해 자세하게 살펴봤는데 <code>~~.js</code>까지 다 명시를 해놓았는데 왜 이런 에러가 계속 발생하는 지 모르겠다. 같은 방식으로 Upload.js를 실행한 부분은 제대로 출력이 되는데 동적 라우팅으로 작업하는 부분이라 다르게 작용하는 건가 싶어서 절대경로를 통해 <code>import</code>파일을 관리하려고 했지만, 아예 적용조차 되지가 않아 절대경로를 사용할 수 없었다.

### 2-2. appendChild

![](https://velog.velcdn.com/images/pangkyu/post/ae1b049b-39e3-4538-97fd-458789626c0f/image.png)

#### appendChild가 뭔데?

선택한 요소 안에 자식요소를 추가하는 것이다. <code>createElement()</code>로 요소를 만들어도 다른 요소에 집어 넣는 코드가 없으므로 볼 수 없는 데, <code>appendChild()</code>를 사용하면 요소를 삽입할 수 있다.

#### 발생한 이슈

외부 API에서 get한 데이터를 화면에 출력시켜주는 과정에서 문제가 생겼었다.

- <code>main_listArea--img</code> 클래스와 <code>main_listArea--text</code> 클래스를 <code>main_list-area</code>에 각각 넣어 개별적으로 출력하고 싶었는데 아래와 같은 코드로 작성하니 첫번째 <code>main_list-area</code>에만 모조리 데이터가 들어갔었다.

```js
/*문제 코드 */
for (let i = 0; i < response.data.posts.length; i++) {
  let area = document.createElement('div');
  let image = document.createElement('img');

  area.innerHTML = '';
  area.className = `main__list-area`;
  document.querySelector('.main__list').appendChild(area);

  image.innerHTML = response.data.posts[i].image;
  image.src = `https://source.unsplash.com/random/360×360`;
  image.className = `main__listArea--img`;
  document.querySelector('.main__listArea--img').appendChild(image);
}
```

#### 해결방법

처음 만난 클래스 네이밍에 <code>appendChild</code>가 되었기 때문에 읽어오는 과정에서 인덱스 값을 추가하여 클래스명을 생성하도록 했다.

```js
//code..
for (let i = 0; i < response.data.posts.length; i++) {
  let area = document.createElement('div');
  let image = document.createElement('img');
  let title = document.createElement('div');
  let content = document.createElement('div');

  area.innerHTML = '';
  area.className = `main__list-area` + i;
  document.querySelector('.main__list').appendChild(area);

  image.innerHTML = response.data.posts[i].image;
  image.src = `https://source.unsplash.com/random/360×360`;
  image.className = `main__listArea--img`;
  document.querySelector(`.main__list-area` + i).appendChild(image);

  title.innerHTML = response.data.posts[i].title;
  title.className = `main__listArea-text-title`;
  document.querySelector(`.main__list-area` + i).appendChild(title);

  content.innerHTML = response.data.posts[i].content;
  content.className = `main__listArea-text-content`;
  document.querySelector(`.main__list-area` + i).appendChild(content);
}
//code..
return `
    <div class = 'main__list'>
    </div>
    `;
```

![](https://velog.velcdn.com/images/pangkyu/post/2c7e92ed-8889-4843-afab-aafe38fc746a/image.png)

#### 코드 리팩토링

<code>map()</code>함수를 이용하여 따로 <code>innerHTML</code>, <code>appendChild()</code>같은 문법을 사용하지 않고 값에 접근하여 생성하도록 만들었다.

```js
 async getPosts() {
    const response = await fetch(`http://43.201.103.199/posts/`);
    const data = response.json();
    return data;
  }

  async getHtml() {
    const postList = await this.getPosts();
    console.log(postList.data);

    return /*html*/ `
    <div class="waves-effect waves-light btn z-depth-3 write-btn" onclick="location.href = '/upload'">
        글 작성하기
    </div>
    <div class = 'main__list'>
      ${postList.data.posts
        .map(
          (item) =>
            `

          <div class = 'main__list-area' data-link = '/post/${item.postId}' >
            <img src = ${item.image} class = 'main__list-img' data-link = '/post/${item.postId}' />
            <div class = 'main__list--text' data-link = '/post/${item.postId}'>
              <div class = 'main__list--text-title' data-link = '/post/${item.postId}'>${item.title}</div>
              <div class = 'main__list--text-content' data-link = '/post/${item.postId}'>${item.content}</div>
            </div>
          </div>
          `
        )
        .join("")}
    </div>`;
  }
```

같은 UI와 기능을 보여주는 코드지만 가독성이 훨~씬 나아졌다😄

### 2-3 라우팅 - 상세 글 조회

상세 글 조회를 위해 라우팅 처리를 하는 데, 제대로 적용이 되지 않는 문제점이 발생했다.

##### 해당 api

<code>GET /post/:postId </code>로 상세 글 조회 라우팅 처리를 하기 위해 다음과 같이 코드를 구성했다.

```js
// index.js
/* 
  code ..
*/
const routes = [
  // code..
  {
    path: '/post/:postId',
    view: Post,
  },
];
```

```js
// main.js
/*
  code ..
*/
// 시도 1
area.setAttribute(
  "onclick",
  `location.href ='/post/'+ ${response.data.posts[i].postId}`
);
// 시도 2
area.setAttribute(
  'data-link',
  `post/${response.data.posts[i].postId)`
);
```

- <code>시도 1</code>과 <code>시도 2</code> 모두 라우팅이 제대로 처리 되지 않았다.

#### 처리 되지 않은 이유

<code>${response.data.posts[i].postId</code>를 콘솔 값으로 찍어보니 string값이 나왔었다. 따라서 <code>'/post/:postId'</code>부분에서 <code>'/post/256'</code>과 같은 값이 들어가면 저 문자열 그 자체로 들어가서 동적 라우팅이 먹히지 않았다.

~~<code>typeof</code>만 찍어봤어도 찾아볼 수 있는 간단한 이유였는데, 나는 계속 숫자형으로 들어가지는 줄 알고 뭐가 문제인지 하루동안 머리를 감쌌다...~~

#### 라우팅?

> 라우팅(Routing)은 특정 네트워크에서 다른 네트워크로 가기 위한 최적의 경로를 선택하여 패킷을 전달하는 것으로, 네트워크 계층(레이어 3계층)에서 수행되는 것이다.

사용자가 요청한 테스크를 수행하기 위해 화면에서 화면을 전환하는 네비게이션을 관리하기 위한 기능을 의미하며, 사용자가 요청한 URL 또는 이벤트를 해석하고 새로운 페이지로 전환하기 위해 필요한 데이터를 서버에 요청하고 페이지를 전환하는 행위로 화면을 전환하는 경우는 아래와 같다.

- 브라우저의 주소창에 URL을 입력하면 해당 페이지로 이동
- 웹 페이지의 링크(<code>a 태그</code>)를 클릭하면 해당 페이지로 이동한다.
- 브라우저의 뒤로가기 혹은 앞으로가기 버튼을 클릭하면 사용자 방문 기록의 뒤 또는 앞으로 이동한다. **history 관리를 위해서는 각 페이지에서 브라우저의 주소창을 구별할 수 있는 유일한 URL을 소유해야 한다. **

##### 정적 라우팅 (Static Routing) / 동적 라우팅(Dynamic Routing)

- 정적 라우팅은 수동으로 미리 경로를 지정하는 방식, 동적 라우팅은 변화하는 상황에 맞추어 라우터가 경로를 재설정하는 방식이다.

#### 해결 방법

입력되는 <code>:postId</code> 값을 숫자형으로 바꿔주기 위해 아래와 같이 처리했다.

```js
// index.js
let postId = 0;

const router = async (url) => {
  if (typeof url === "string") {
    if (url.includes("post")) {
      let splitNumber = url.split("/");
      postId = splitNumber[2];
    }
  }
const routes = [
  {
    path : '/post' + postId,
    view : Post,
  }
];
```

다른 글들을 찾아보니 정규표현식으로 처리하는 경우도 있었는데, 내가 적용했을 때는 실패해서 <code>split</code>으로 잘라서 숫자가 있는 부분을 받아오도록 작성했다.

## 3. 마무리

&nbsp;먼저, 부족함을 많이 느꼈던 챌린지였다. 리액트로 CRUD 기능도 구현해본 경험이 있고 자바스크립트에 대해 계속 공부하고 있다고 생각해 자신감이 있었는데, 막상 바닐라로 구현하다가 정신차려보니 클래스형과 함수형을 짬뽕으로 섞어 쓰고 있는 나를 발견했다.
이유를 생각해보니 <code>fetch</code>나 <code>querySelector</code>등 바닐라에서 자주 사용하는 문법에 익숙하지 않았고, 노드 서버를 설정하는 부분에서도 이해없이 인터넷에 있는 코드를 일단 가져다가 썼기 때문이라고 생각한다. 구현을 하며 코드에 대해 이해하고 공부하고있지만 <code>MIME</code>라든지 비동기처리 단계에서의 에러 등 다양한 에러가 내 머리를 지끈거리게 하고 있다.

&nbsp;챌린지가 끝난 이후에도 같은 팀원분들과 좀 더 이어서 진행하여 완성도를 높이고자 했기 때문에 그 전까지는 배포까지 도전해야겠다. **일단 async await 공부.. **

```toc

```
