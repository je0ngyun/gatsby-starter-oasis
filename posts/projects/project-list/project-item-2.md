---
title: "CardMe"
date: "2021-09-10 16:00:30"
tags: "자신을 소개하는 간단한 카드형식의 SVG를 제공하는 서비스"
tech: "Java,SpringBoot,SpringSecurity,JPA,MySql"
period: "2021.09 ~ 2021.11"
desc: "백엔드 부분으로 REST API 구축;기본적인 회원관련 처리 및 사용자가 작성한 정보를 바탕으로 SVG를 생성
;카드생성후 img 태그의 src 속성으로 API요청을 하여 손쉽게 SVG를 제공;개발을 진행하며 IoC DI AOP 등의 개념을 더욱 확고히 숙지하려 노력;여러 구성 부분에서 Best Practice가 무엇인지 생각하며 개발;SpringSecurity를 통한 토큰 기반 인증 방식 적용;Let's Encrypt를 이용한 SSL 적용;팀구성 -- 1인;https://github.com/je0ngyun/cardmeBE"
---

![img](../../../assets/favicon.png)

```js
function a(arg) {
  console.log(arg)
}
```

> 블록쿼터
> ㅁㅁ

```
Text
```

| 예제      | 설명     |
| --------- | -------- |
| 테이블    | 구분기호 |
| 내용 설명 | 마크다운 |
| 문법      | 외우세요 |

# List Test

요건 `인라인코드입니다`

# H1 is better than

## React 에서의 State란?

### h333입니다

## 목차

> - [개요](#프로젝트-개요)
> - [사용예시](#사용예시)
> - [기능구현](#기능구현)

## 프로젝트 개요

![cardme](https://user-images.githubusercontent.com/33706043/140515262-14d29e79-c3f1-4660-875e-723285c9edcc.png)

<img alt="cardme 로고" src="https://user-images.githubusercontent.com/33706043/140515262-14d29e79-c3f1-4660-875e-723285c9edcc.png" width="30%">

개발자들의 Github 및 블로그의 여러 프로필을 둘러보다 보면 Git Stat 을 보기 쉽게 디자인해놓은 SVG 들을 간혹 볼 수 있었습니다.  
이러한 서비스는 보통 마크다운이나 HTML의 img 태그에 src 속성으로 API URI를 입력하여 사용합니다.  
저 또한 위와 비슷하게 자신을 간단하게 소개할 수 있는 카드 형식의 SVG를 제공하는 API를 만들어 보고자 하였습니다.  
위와 같은 서비스는 보통은 로그인 없이 API를 사용하는 형태이지만 저는 SpringBoot 공부 목적으로 회원 관리 기능을 포함시켰습니다.  
추후 서비스 페이지를 SPA로 구성하고 사용자가 로그인 후 카드 생성 기능을 통하여 자신만의 카드를 생성하고 SVG를 제공받도록 하는 것이 목표입니다.

코드는 [**GitHub 에서**](https://github.com/je0ngyun/cardmeBE) 보실 수 있습니다.

## 사용예시

Jenkins를 통하여 Docker Image 기반으로 CI/CD 파이프라인을 구축해놓았습니다.
테스트 서버로의 API요청 주소는 다음과 같습니다.  
[**https://www.je0ngyun.kro.kr/cardme/api/v1/card?userId=je0ngyun&cardName=mycard1**](https://www.je0ngyun.kro.kr/cardme/api/v1/card?userId=je0ngyun&cardName=mycard1)

```html
//e.g
<img
  src="https://www.je0ngyun.kro.kr/cardme/api/v1/card?userId=je0ngyun&cardName=mycard1"
/>
```

### 결과

<img src="https://www.je0ngyun.kro.kr/cardme/api/v1/card?userId=je0ngyun&cardName=mycard1"/><br/>

## 기능구현

### 1. SVG 생성

여러 디자인의 카드가 추가될 것을 고려하여 [기본적인 형태를 가진 SVG 파일](https://github.com/je0ngyun/cardmeBE/blob/master/src/main/resources/static/WhiteDefault.svg?short_path=080f71b)을 토대로 사용자가 기입한 정보를 적용하였습니다.  
HTML 파서인 Jsoup 라이브러리를 사용하여 Dom 객체에 접근하여 SVG를 수정하는 방식을 사용하였습니다.  
또한 SVG 생성에 [Factory method 패턴을 적용하여](https://github.com/je0ngyun/cardmeBE/blob/master/src/main/java/com/jy/cardme/components/card/Card.java) 후에 새로운 디자인의 카드를 쉽게 추가할 수 있게 설계하려 하였습니다.

### 2. 응답형식

성공응답 형식은 다음과 같습니다.

```json
//POST https://www.je0ngyun.kro.kr/cardme/api/v1/card
{
  "message": "카드 생성 성공",
  "httpStatus": 201,
  "timestamp": "2021-12-07T05:35:02.017Z",
  "data": {
    "cardName": "mycard",
    "cardTitle": "Kim Jeong Yun",
    "cardMotto": "Hello everyone! I'm JeongYun",
    "cardEmail": "jeongyunniim@gmail.com",
    "cardDepartment": "Web Developer",
    "cardSkills": [
      "SpringBoot",
      "NodeJS",
      "MySQL",
      "Vue",
      "React",
      "Git",
      "DevOps"
    ],
    "cardType": "WHITE_DEFAULT",
    "cardHighlightColor": "#8195de"
  }
}
```

에러 응답시 에러필드를 나타내도록 하였습니다.

```json
//POST https://www.je0ngyun.kro.kr/cardme/api/v1/card
{
  "message": "잘못된 매서드 매개변수",
  "httpStatus": 400,
  "timestamp": "2021-12-07T05:36:48.225Z",
  "errors": [
    {
      "field": "cardType",
      "value": "WHITE_DEFAULT1",
      "reason": "존재하지 않는 카드 타입입니다."
    },
    {
      "field": "cardName",
      "value": "mycard",
      "reason": "중복된 이름의 카드가 존재합니다."
    }
  ]
}
```

### 3. 에러 핸들링

에러 핸들링을 위해 ControllerAdvice 와 ConstraintValidator 를 상속받은 [CustumValidator를 작성하여](https://github.com/je0ngyun/cardmeBE/tree/master/src/main/java/com/jy/cardme/components/validation) 사용하였습니다.  
ControllerAdvice로 처리할 수 없는 SpringSecurity 의 JWT 에러처리는 [컨트롤러로 리다이렉팅 후](https://github.com/je0ngyun/cardmeBE/blob/master/src/main/java/com/jy/cardme/security/JwtAuthenticationEntryPoint.java) 컨트롤러에서 에러를 throw 시켜 간접적으로 ControllerAdvice 에서 처리할 수 있게 하였습니다.

### 4. AOP

로깅을 위해 [컨트롤러에 AOP를 적용하여](https://github.com/je0ngyun/cardmeBE/blob/master/src/main/java/com/jy/cardme/aspect/ControllerLogAspect.java) 요청 메소드, 경로, 응답상태코드, 소요시간을 나타내도록 하였습니다.

### 5. CI/CD

프로젝트를 진행하면서 배포까지의 단계를 자동화 하였습니다.  
[젠킨스와 도커기반으로 진행](https://je0ngyun.github.io/devops/spring-boot-jenkins-ci-cd)하였으며 [Github branch별 WebHook](https://je0ngyun.github.io/devops/jenkins-branch-webhook)을 통하여 정해진 branch에 push시에만 배포가 되도록 하였습니다.  
젠킨스 플러그인중 하나인 Generic Webhook Trigger 를 사용하였습니다

### 6. SSL

HTTPS를 통해 제공되는 페이지에 안전하지 않은 HTTP 리소스를 로드하지 않기때문에 API에 HTTPS를 적용하였습니다.  
무료 인증서인 Let's Encrypt를 사용하였습니다.
