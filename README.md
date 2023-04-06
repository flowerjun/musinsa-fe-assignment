
## MUSINSA FE 공통 과제

해당 과제는 주어진 개발 환경과 요구 사항에 맞춘 웹앱을 구현하는 것을 목표로 하고 있습니다.

---

### 프로젝트 구성

```
  📦public
  ┣ 📂favicon
  ┃ ┣ 📜android-chrome-192x192.png
  ┃ ┣ 📜android-chrome-512x512.png
  ┃ ┣ 📜apple-touch-icon.png
  ┃ ┣ 📜favicon-16x16.png
  ┃ ┣ 📜favicon-32x32.png
  ┃ ┗ 📜favicon.ico
  ┣ 📂fonts
  ┃ ┣ 📜AppleSDGothicNeoB.ttf
  ┃ ┣ 📜AppleSDGothicNeoM.ttf
  ┃ ┣ 📜AppleSDGothicNeoR.ttf
  ┃ ┗ 📜index.css
  ┣ 📂logo
  ┣ 📜.DS_Store
  ┣ 📜index.html
  ┗ 📜manifest.json
  📦src
  ┣ 📂@types
  ┃ ┣ 📜Autocomplete.ts
  ┃ ┣ 📜Filter.ts
  ┃ ┣ 📜Goods.ts
  ┃ ┣ 📜InfiniteScroll.ts
  ┃ ┗ 📜SVG.ts
  ┣ 📂api
  ┃ ┗ 📜fetchGoods.ts
  ┣ 📂assets
  ┃ ┣ 📜.DS_Store
  ┃ ┣ 📜assets-path.tsx
  ┃ ┣ 📜delete-icon.svg
  ┃ ┣ 📜loading-icon.svg
  ┃ ┣ 📜logo.svg
  ┃ ┣ 📜not-found-icon.svg
  ┃ ┣ 📜refresh-icon.svg
  ┃ ┗ 📜search-icon.svg
  ┣ 📂components
  ┃ ┣ 📂goods
  ┃ ┃ ┣ 📜GoodsImage.tsx
  ┃ ┃ ┣ 📜GoodsInfo.tsx
  ┃ ┃ ┗ 📜GoodsLabel.tsx
  ┃ ┣ 📂header
  ┃ ┃ ┣ 📜FilterButton.tsx
  ┃ ┃ ┣ 📜FilterChip.tsx
  ┃ ┃ ┣ 📜HeaderFilters.tsx
  ┃ ┃ ┗ 📜HeaderTitle.tsx
  ┃ ┣ 📜.DS_Store
  ┃ ┗ 📜Autocomplete.tsx
  ┣ 📂constants
  ┃ ┗ 📜constants.ts
  ┣ 📂hooks
  ┃ ┗ 📜useInfinteScroll.ts
  ┣ 📂theme
  ┃ ┣ 📜GlobalStyle.tsx
  ┃ ┗ 📜theme.ts
  ┣ 📂util
  ┃ ┗ 📜uuidv4.ts
  ┣ 📜.DS_Store
  ┣ 📜App.tsx
  ┣ 📜index.tsx
  ┗ 📜react-app-env.d.ts
  📜.gitignore
  📜package.json
  📜README.md
  📜tsconfig.json
```

---

### 개발 환경

- React
  선정 이유
    1) 컴포넌트 기반 아키텍처를 사용하기에 코드의 재사용성을 높일 수 있습니다.
    2) 가상 DOM 사용으로 변경된 부분만 다시 렌더링 되도록 하므로, 불필요한 렌더링을 최소화하고 성능을 향상할 수 있습니다.
- TypeScript
  선정 이유
    1) 타입 검사를 통해 오류를 사전에 방지하므로 코드의 안정성을 높일 수 있습니다.
    2) 런타임에 발생할 수 있는 오류를 처리할 수 있기 때문입니다.

---

### 요구 사항

- [x] 1. 상품 리스트 헤더 컴포넌트
  - [x] 1-1. 페이지 상단에 고정된 타이틀을 보여줍니다.
  - [x] 1-2. 페이지 상단에 고정된 필터를 보여줍니다. 사용자는 해당 필터의 버튼을 클릭하여 활성화/비활성화를 할 수 있으며, 활성화 시에는 해당 필터를 칩으로 보여줍니다.
  - [x] 1-3. 검색 버튼 클릭 시 키워드 입력창을 보여줍니다.
  - [x] 1-4. 검색어가 한 글자라도 포함된 상품이 있다면 검색 결과는 자동완성으로 보여집니다.  
  - [x] 1-5. 자동 완성된 키워드를 클릭하면, 해당 키워드는 필터 하단에 칩으로 보여집니다.
  - [x] 1-6. 필터는 아래와 같은 기능을 제공합니다.
    - [x] 카테고리별 필터링 (단독상품, 세일 상품)
    - [x] 품절 상품 표시 여부 설정 (품절 미포함/품절 포함)
    - [x] 검색 기능 (입력한 키워드가 한 글자라도 포함된 상품을 검색 & 검색 결과 없음 표시)

- [x] 2. 상품 리스트 컴포넌트
  - [x] 2-1. 상품 리스트를 불러와서 보여줍니다.
  - [x] 2-2. 상품 리스트는 Infinite Scroll 기능을 제공하며, 스크롤이 목록의 하단에 닿으면 다음 항목이 자동으로 노출됩니다.
  - [x] 2-3. 상품 리스트는 10개씩 불러옵니다.

- [x] 3. 상품 컴포넌트
  - [x] 3-1. 상품의 이미지, 이름, 가격, 할인율, 할인 가격, 품절/단독 여부를 보여줍니다.
  - [x] 3-2. 할인 상품인 경우 할인율을 보여주고, 할인가격을 보여줍니다.
  - [x] 3-3. 상품의 품절 여부가 true인 경우 품절 상품임을 표시합니다.
  - [x] 3-4. 단독 상품 여부가 true인 경우 단독 상품임을 표시합니다.

- [x] 4. 상품 리스트 API 호출
  - [x] 4-1. 상품 리스트를 불러오는 API 호출 기능을  구현합니다.

---

## 설치 및 구동 방법

### YARN 사용하기 (추천)

```
yarn install
yarn start
```

### NPM 사용하기

```
npm i 또는 npm i --legacy-peer-deps
npm start
```