---
emoji: 💾
title: '졸업가능? 프로젝트 회고록 '
date: '2022-12-12'
categories: 회고 프로젝트
---

## 졸업가능? 프로젝트 회고록

![](https://velog.velcdn.com/images/pangkyu/post/eb569ff4-3495-45c2-9b22-e43dfcbdefef/image.png)

> 캡스톤 디자인 프로젝트로 학우들이 기존 수기로 체크하던 졸업사정 셀프 테스트를 자동화시키는 프로젝트를 진행했다.

### 프로젝트 구성

총 4명(프론트2, 백2)으로 팀을 구성했으며, 나는 프론트 개발에서 화면UI 구성, 백엔드와 API 연결 등을 맡았다.

### 프로젝트 중 발생한 이슈

처음으로 배포까지 진행했던 프로젝트였기 때문에, 개발 중 많은 이슈들이 발생했다.

#### 1. CORS 에러

화면을 구성한 뒤, 백엔드에서 데이터를 받아오기 위해 연결을 했는데 받아와지지 않는 에러가 발생했었다. 프론트/백 코드에서는 문제가 없었는데 이런 에러가 발생한 것이 처음에는 잘 이해가 되지 않았다.
![](https://velog.velcdn.com/images/pangkyu/post/f2424e17-7f00-4a4c-b2e3-3602cc8119e5/image.png)
에러를 확인해보니 CORS에러가 발생했다고 하여 이 문제가 무엇인지 찾아보았다.

##### CORS(Cross-Origin Resource Sharing) : 교차 출처 리소스 공유

- http 헤더를 사용하여 서로 다른 출처에서 리소스를 공유하는 방식을 말한다.
- 다른 Origin으로 요청을 보내기 위해 지켜야 하는 정책. 원래대로라면 SOP에 의해 막히게 될 요청을 풀어주는 정책으로 이와 같은 정책을 이용하면 다른 Origin으로도 요청을 보낼 수 있게 한다.
- HTML문서는 기본적으로 Cross-Orgin 정책을 따른다.

  - <code>link</code> 태그의 href 에서 다른 사이트의 css 등 리소스에 접근하는 것이 가능하다.
  - <code>img</code> 태그의 src 에서 다른 사이트의 이미지 등의 리소스에 접근하는 것이 가능하다.

##### SOP(Same-origin policy) : 동일 출처 정책

- 어떤 출처에서 불러온 문서나 스크립트가 다른 출처에서 가져온 리소스와 상호작용하는 것을 제한하는 중요한 보안 방식. 잠재적으로 해로울 수 있는 문서를 분리함으로서 공격받을 수 있는 경로를 줄여준다.

  - script 태그, XMLHttpRequest, Fetch API 등 : 기본적으로 Same-Origin 정책을 따름

  - **다른출처?** : domain(host), scheme(protocol), port를 포함한 것을 말함. 같은 도메인이라도 scheme 또는 port가 다르면 브라우저가 해당 요청을 다른 출처로 판단하고 CORS 정책을 기반으로 권한여부를 확인한다.
  - 예시 : http://hs-graduate-ok.com/ 에서 다음과 같이 리소스 요청을 하면 모두 다른 출처로 판단한다.
    1. 서로 다른 scheme사용 -> https://hs-graduate-ok.com/
    2. 서로 다른 port 사용 -> http://hs-graduate-ok.com:5000 : 서로 다른 port 사용

내가 CORS에러가 발생했던 이유는 백엔드와 포트가 달라서 발생했던 경우였다.

##### 해결 방법

해결하는 방법으로는 첫 번째, 서버에서 해결하는 방법이 있고 두 번째, 프론트에서 해결하는 방법이 있다. 처음에는 서버에서 해결하는 방법을 찾지 못하여 프론트 단에서 해결하도록 방법을 찾았고 proxy를 설정하여 문제를 해결했다.

- proxy 설정 : 외부 도메인 서버에 접근하고자 할때 바로 외부 도메인 서버를 통해 가는 것이 아닌 자신의 서버를 매개로 하여 외부 서버에 요청하는 방식.

![](https://velog.velcdn.com/images/pangkyu/post/a15e4d06-7589-477f-b769-772e7edea0e7/image.png)

서버에서 요청을 하게될 때에는 브라우저의 규약인 CORS 정책에 영향을 받지 않는다고 한다. 그러한 이점을 이용하여 proxy server라는 출처를 통하기 때문에 CORS 정책을 위반하지 않고 우회할 수 있었다.

#### 2. hooks

> react 16.8버전에 새로 추가되었으며, hooks를 사용하면 class를 작성할 필요없이 상태 값과 여러 리액트 기능을 사용할 수 있다.

프로젝트를 하면서 자주 사용해보지 않았던 hooks였다.. 하지만 요즘에는 훅스를 이용하여 많이 프로그램을 만든다고 하여 공부하여 프로젝트에 적용해보기로 했다. <br/>
훅스를 사용하기 위해서는 생명주기부터 이해를 해야한다.(추후 포스팅하여 설명할 예정)

- Mounting, Updating, Unmounting이 있다.(클래스형에서 사용하는 문법)

처음 사용해보는 부분이라 직접 부딪쳐보고 수정해야 되는 부분이 대부분이였다.

#### 2-1. 페이지네이션

그 중에서 페이지네이션을 구현하는 부분이 어려웠다🥲

##### 해결방법

처음에는 프론트단에서 백엔드의 글 목록 전체를 받아와 10개씩 잘라서 구현하려했지만, 그렇게 되면 페이지가 옮겨질 때마다 항상 백엔드에서 전체 글 목록을 받아와야 하기 때문에 로딩 시간이 오래 걸린다는 단점을 발견했다. 백엔드에서 10개씩잘라서 받아와지도록 구현하여 해결했다.

백엔드 단에서 시작 페이지와 끝페이지 정보를 받아와 해당 페이지를 돌면서 array.push하는 방식으로 처리했다.

```js
const paging = () => {
  let array = [];
  for (let i = searchHelper.startPage; i <= searchHelper.endPage; i++) {
    array.push(
      <div className='Board__page--button' onClick={(e) => handlePageClick(i, e)}>
        {i}
      </div>,
    );
  }
  return array;
};
```

```js
/*
페이지 번호를 클릭해서 넘어가는 정보는 다음과 같이 처리했다
*/
const [searchHelper, setSearchHelper] = useState([]);

const handleNextBtn = async (e) => {
  e.preventDefault();
  const response = await axios.get(`${API_URL}${PORT_NUMBER}/Board/?page=${searchHelper.nextBlock}`);
  setSearchHelper(response.data.searchHelper);
  setInputData(response.data.boardDtoList);
};
const handlePrevBtn = async (e) => {
  e.preventDefault();
  const response = await axios.get(`${API_URL}${PORT_NUMBER}/Board/?page=${searchHelper.prevBlock}`);
  setSearchHelper(response.data.searchHelper);
  setInputData(response.data.boardDtoList);
};
const handlePageClick = async (i) => {
  const response = await axios.get(`${API_URL}${PORT_NUMBER}/Board/?page=${i}`);
  setInputData(response.data.boardDtoList);
};
```

#### 2-2 수정

또 구현을 하면서 힘들게했던 부분은 글 수정 기능이었다.
글을 수정하기 위해 들어가면 기존 정보를 보여주고 수정하지 않으면 그대로의 정보를 다시 보내줬어야하는데, 빈값으로 넘어가져서 똑같이 쓰지 않으면 내용이 사라지는 에러가 있었다.

이를 해결하기 위해서 다음과 같이 코드를 작성했다.

##### 해결방법

```js
/**
 * @description submit 이벤트
 */
const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== inputData.brdPassword) {
    alert('비밀번호가 틀립니다. 다시 입력해주세요');
  }
  if (password === inputData.brdPassword) {
    if (title === '' && writer === '' && content === '') {
      await axios.put(`${API_URL}${PORT_NUMBER}/Board/${params}`, {
        brdKey: params,
        brdTitle: EditBoard.brdTitle,
        brdWriter: EditBoard.brdWriter,
        brdContent: EditBoard.brdContent,
        brdPassword: password,
      });
      alert('수정완료 되었습니다.');
      navigate('/Board');
    } else if (title === '' && writer === '') {
      await axios.put(`${API_URL}${PORT_NUMBER}/Board/${params}`, {
        brdKey: params,
        brdTitle: EditBoard.brdTitle,
        brdWriter: EditBoard.brdWriter,
        brdContent: content,
        brdPassword: password,
      });
      alert('수정완료 되었습니다.');
      navigate('/Board');
    } else if (content === '' && writer === '') {
      await axios.put(`${API_URL}${PORT_NUMBER}/Board/${params}`, {
        brdKey: params,
        brdTitle: title,
        brdWriter: EditBoard.brdWriter,
        brdContent: EditBoard.brdContent,
        brdPassword: password,
      });
      alert('수정완료 되었습니다.');
      navigate('/Board');
    } else if (content === '' && title === '') {
      await axios.put(`${API_URL}${PORT_NUMBER}/Board/${params}`, {
        brdKey: params,
        brdTitle: EditBoard.brdTitle,
        brdWriter: writer,
        brdContent: EditBoard.brdContent,
        brdPassword: password,
      });
      alert('수정완료 되었습니다.');
      navigate('/Board');
    } else if (content === '') {
      await axios.put(`${API_URL}${PORT_NUMBER}/Board/${params}`, {
        brdKey: params,
        brdTitle: title,
        brdWriter: writer,
        brdContent: EditBoard.brdContent,
        brdPassword: password,
      });
      alert('수정완료 되었습니다.');
      navigate('/Board');
    } else if (title === '') {
      await axios.put(`${API_URL}${PORT_NUMBER}/Board/${params}`, {
        brdKey: params,
        brdTitle: EditBoard.brdTitle,
        brdWriter: writer,
        brdContent: content,
        brdPassword: password,
      });
      alert('수정완료 되었습니다.');
      navigate('/Board');
    } else if (writer === '') {
      await axios.put(`${API_URL}${PORT_NUMBER}/Board/${params}`, {
        brdKey: params,
        brdTitle: title,
        brdWriter: EditBoard.brdWriter,
        brdContent: content,
        brdPassword: password,
      });
      alert('수정완료 되었습니다.');
      navigate('/Board');
    } else {
      await axios.put(`${API_URL}${PORT_NUMBER}/Board/${params}`, {
        brdKey: params,
        brdTitle: title,
        brdWriter: writer,
        brdContent: content,
        brdPassword: password,
      });
      alert('수정완료 되었습니다.');
      navigate('/Board');
    }
  }
  return;
};
```

- 값에 빈 값이 있다면 빈값인 부분은 기존 부분을 다시 put으로 전송하도록 로직을 작성했다.
- 하지만, 포스팅하면서 코드를 확인해보니 조금 비효율적으로 작성한 로직인가라는 생각도 들고, 중복되는 로직이 꽤 많은 것 같다고 생각하여 리팩토링이 필요한 부분이라고 생각한다.

### 성과

팀원들이 모두 열심히 해줘서 [교내 창의적 종합설계](https://www.hs.ac.kr/kor/4953/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGa29yJTJGMjQlMkYxMzczMDglMkZhcnRjbFZpZXcuZG8lM0Y%3D)에서 대상을 받을 수 있었다. 현재 기준으로 AWS를 통해 배포 서비스를 유지하고 있으며, [여기](http://hs-graduate-ok.com/)에서 확인 가능하다.

### 아쉬운 점

깃으로 형상관리를 처음하면서 브랜치관리, 커밋 컨벤션, 파일 관리 등을 하나도 정하지 못했는데, 나중에 내가 뭘 수정했는지 찾아볼 때 조금 시간이 걸렸던 기억이 있다. 다음에는 개인이든 팀 프로젝트든 규칙을 정하고 진행하면 추후에 나 혹은 다른 팀원이 수정한 부분을 찾을 때 좀 더 용이할 것 같다라고 생각한다. 그리고 aws배포에 대해 지식이 없어서 학교 선배들에게 많은 도움을 받았는데, 배포에 대해서도 공부할 필요가 있다고 느꼈다.

### 마무리

처음 화면을 구성하고, 기능을 구현해야할 때는 이걸 내가 할 수 있을까?라는 생각이 컸는데, 막상
직접 화면을 구성하면서 다양한 css 문법을 사용해보는 경험과 다양한 hooks를 사용하며 프로젝트를 마무리하면서 어렵게 느낀 부분을 해결할 때마다 재미를 많이 느끼고 자신감이 많이 생겼다.

```toc

```
