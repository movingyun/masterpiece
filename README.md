# 🏷️ rnasterpiece - 나만의 한글 NFT 플랫폼
![logo](/uploads/5b202de05967997f4f197d6ad939b48a/logo.png)


## 👉 [rnasterpiece Web Page Link](https://j7a508.p.ssafy.io)

<br>

## 📆 프로젝트 진행 기간
 - 2022.8.29(월) ~ 2022.10.07(금)  
 - SSAFY 7기 2학기 특화프로젝트(디지털화폐)

<br>

## 📖 기획 배경
- ### **한글의 예술성, 과학성**
  - 한글은 외국인이 보았을 때 그림같은 문자라는 인식이 있고, 타투나 옷 디자인에 사용되는 등 인기가 있다.
  - 한글은 발성 기관 및 천지인(하늘,땅,사람)에서 모양을 본떠 그 자체로 형상적 의미가 있다.
  - 한글은 초성, 중성, 종성으로 규칙적인 결합성을 지니고 있다.
  - 한글은 적은 수의 낱글자(자모음)으로 10,000여개의 음절을 표기할 수 있다.
<br>

- ### **NFT 시장 성장**
  - NFT는 현재 트렌드이다.
  - 전 세계 NFT 시장 규모가 꾸준히 증가할 것으로 전망된다.
<br>

  => 한글날을 앞두고 외국인들에게 자연스럽게 한글을 알리기 위한 취지

<br>

## 🔎 개요
- ### **한글 단어 조합을 통해 과학성을, 한글을 자신만의 작품으로 꾸미는 과정을 통해 예술성을 알리자**

  - 사용자는 한글의 자음과 모음을 인벤토리에 보유하고 있습니다.
  - 자음과 모음을 소모하여 한글 단어를 조합할 수 있습니다.
  - 티켓을 통해 랜덤 뽑기를 하여 자음과 모음을 얻을 수 있습니다.
  - 티켓은 4개의 보기가 주어지고, 들려주는 발음과 일치하는 선택지를 고르는 게임을 플레이하여 얻을 수 있습니다.
  - 만든 한글 단어를 글꼴, 그림자, 색상, 애니메이션 등의 다양한 효과를 적용하여 꾸밀 수 있습니다.
  - 만든 결과를 민팅하여 자신만의 작품을 NFT로 생성하고, 거래할 수 있습니다.

<br>

## ✔ 주요 기능

- ### MetaMask 로그인
  [시연 gif]
    - 구글 확장 프로그램인 메타마스크(MetaMask)를 통해 로그인
    - 메타마스크와의 연동을 통해 간편하게 지갑 주소로 회원가입 및 로그인
    
- ### 한글 단어 합성
  ![단어 합성](/uploads/e9288738ef588d3f2d398d55f6c193ec/ezgif.com-gif-maker.gif)
    - 초성, 중성, 종성에 해당하는 칸을 클릭하면 보유중인 자음 및 모음이 표시되고, 클릭하여 사용
    - 음절을 조합하고, 드래그 앤 드랍으로 배치하여 단어 만들기
    - 만들고 싶은 뜻의 단어가 있다면, 사전 UI를 이용하여 한글 단어를 검색 가능
    - 조합된 음절을 분해하려면 드래그하여 분해 영역에 드랍
    
- ### 한글 NFT 민팅
  ![꾸미기_민팅](/uploads/383a4312b460c4f7e3a5356bf2b2cb60/꾸미기_민팅.gif)
    - 중앙에는 NFT화 할 결과물 미리보기 표시
    - 상단에서 애니메이션 효과 변경 가능
    - 우측에서 폰트, 그림자, 색상의 속성 변경 가능
    
- ### NFT 거래
  [시연 gif]
    - 보유한 NFT를 마이페이지에서 판매 등록 가능
    - NFT List 화면에서 판매 중인 NFT 조회 및 검색 가능
    - BUY 버튼을 통해 해당 NFT 구매 가능

<br>

## 🛠️ 주요 기술

**Frontend**
- Visual Studio Code IDE
- Node.js LTS(16.17.0, npm 8.15.0)
- Typescript 4.8.3
- React 18.2.0
- Redux 4.2.0 
- React-Router 6.4.0

**Backend**
- IntelliJ IDE 2022.1.4(Ultimate Edition)
- JDK 11.0.15.1
- Springboot 2.7.3
- MySQL 8.0.30
- Hibernate 5.6.10.Final
- Swagger 3.0.0
- Amazon S3
- Selenium 4.40
- Chrome Driver 106.0.5249.61

**Smart Contract**
- truffle  v5.5.31
- Solidity  ^0.8.4
- web3.js  v1.8.0
- MetaMask
- Pinata API

**CI/CD**
- AWS EC2 Ubuntu 20.04 LTS
- NGINX 
- Docker 

<br>

## 📐 서비스 아키텍처
![서비스_아키텍처](/uploads/912dbbe47060217f8a26ad4054c2fe3c/서비스_아키텍처.PNG)

<br>

## 🗂️ 프로젝트 파일 구조
### Frontend
```
📦frontend
 ┣ 📂.idea
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┣ 📂audio
 ┃ ┣ 📂commons
 ┃ ┃ ┣ 📂HangulMaker
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂byLot
 ┃ ┃ ┣ 📂composeHangul
 ┃ ┃ ┣ 📂createNFT
 ┃ ┃ ┣ 📂decorateHangul
 ┃ ┃ ┣ 📂hangulGame
 ┃ ┃ ┣ 📂header
 ┃ ┃ ┣ 📂learnSyllables
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┣ 📂NFTDetail
 ┃ ┃ ┣ 📂NFTList
 ┃ ┃ ┣ 📂signup
 ┃ ┃ ┗ 📂userPage
 ┃ ┣ 📂fonts
 ┃ ┣ 📂function
 ┃ ┣ 📂img
 ┃ ┃ ┣ 📂ticket
 ┃ ┣ 📂json
 ┃ ┣ 📂lib
 ┃ ┣ 📂pages
 ┃ ┣ 📂_css
 ┃ ┣ 📂_hook
 ┃ ┣ 📂_slice
 ┃ ┣ 📂_store
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜etherium.d.ts
 ┃ ┣ 📜fonts.d.ts
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜shims‑png.d.ts
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.json
 ┣ 📜babel.config.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜tsconfig.json
```

### Backend
```
📦backend
 ┣ 📂gradle
 ┃ ┗ 📂wrapper
 ┣ 📂src
 ┃ ┗ 📂main
 ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂ssafy
 ┃ ┃ ┃ ┃ ┃ ┗ 📂backend
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂db
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜BackendApplication.java
 ┣ 📜.gitignore
 ┣ 📜build.gradle
 ┣ 📜chromedriver.exe
 ┣ 📜gradlew
 ┣ 📜gradlew.bat
 ┗ 📜settings.gradle
```

### Smart Contract
```
📦smart-contracts
 ┣ 📂build
 ┃ ┗ 📂contracts
 ┣ 📂contracts
 ┃ ┣ 📂access
 ┃ ┣ 📂token
 ┃ ┃ ┣ 📂ERC20
 ┃ ┃ ┃ ┣ 📂extensions
 ┃ ┃ ┗ 📂ERC721
 ┃ ┃ ┃ ┣ 📂extensions
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📂introspection
 ┃ ┃ ┣ 📂math
 ┣ 📂migrations
 ┣ 📂test
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┗ 📜truffle-config.js
```

<br>

## ✔ 팀원 역할 분배
### 배준성
  - Team Leader
  - FE
    - 로그인, 마이페이지
    - NFT 목록, 상세, 거래 페이지
    - 한글 게임, 뽑기 페이지

### 박민호
  - FE Leader
    - UI/UX
    - 한글 조합
    - 랜딩 페이지

### 장태경
  - FE
    - UI/UX
    - 한글 꾸미기
    - 한글 민팅 페이지
  - UCC

### 김수만
  - BE Leader
  - Smart Contract
    - ERC20 / ERC721 / web3.js

### 유동윤
  - BE
  - CI/CD
    - EC2 / Nginx / Docker

<br>

## 📟 프로젝트 관련 링크
- [컨벤션](https://www.notion.so/cf30e73c26214c7a8328ffdab38cb2e8)
- [와이어프레임](https://www.figma.com/file/9bDpXrTghaTNQZmQzqTH7d/%ED%8A%B9%ED%99%94%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0%3A1)
- [기능명세서](https://docs.google.com/spreadsheets/d/1lJt-ZLvL39sNxfzCKx66yuQB1Nuv1I2TNJ1JewsCXyU/edit#gid=0)
- [ERD](https://www.erdcloud.com/d/P9BYGYDBrzrNrYbGR)
- [API](https://www.notion.so/a5606b0c346a4bc3b1caab6e52b3d223?v=d3128dbb831847d38211675b0b3647de)
