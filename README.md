# 나만의 캠퍼스 핫스팟
이름은 **박태영**, 공개 주소는 `https://catholictaeyoung.github.io/campus-hotspots/` 입니다.  

## 2주차 실습 과제 · 나만의 캠퍼스 핫스팟
학교 안에서 다른 학생에게 소개하고 싶은 장소 3곳을 골라 만든 작은 홈페이지입니다.

### ✨ 주요 기능
- 장소 추천: 교내에서 가장 아끼고 공유하고 싶은 핫스팟 3곳 소개
- 웹페이지 구현: HTML을 활용한 미니 홈페이지 제작

### 🛠 Tech Stack
- HTML  

## 3주차 실습 과제 · 네 페이지, 네 가지 분위기

- GitHub Pages URL: https://catholictaeyoung.github.io/campus-hotspots/

### 페이지별 스타일
| 페이지 | 의도한 분위기 | 적용한 class | 적용한 CSS |
| --- | --- | --- | --- |
| 프론트페이지 | 통통 튀고 생동감 넘치는 트렌디 대도시 (Vibrant & Playful Urban) | `page-d411` | `background-color: #f0f3ff;`, `transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);`, `transform: translateY(-4px) scale(1.03);` |
| D411 | 석양빛 언덕과 따스한 시야 (Warm Sunset & Soft Round) | `page-d411`, `how_to_get_there`, `what_should_we_do` | `transform: translateY(-3px);` |
| B333 | 픽셀 아트 스타일의 레트로 (8-Bit Arcade & Retro) | `page-b333`, `how_to_get_there`, `what_should_we_do` | `background-image: radial-gradient(#515c72 15%, transparent 16%), radial-gradient(#374259 15%, transparent 16%);` |
| 중앙도서관 | 시원하고 파도 소리가 들리는 듯한 청량함 (Ocean & Aqua Breeze) | `page-library`, `how_to_get_there`, `what_should_we_do` | `transform: translateY(-3px) scale(1.02);` |

### 모바일 스타일
- 적용한 @media 조건: `@media (max-width: 600px) and (prefers-color-scheme: dark)`
- 모바일에서 특별히 바뀌는 부분과 이유: 휴대전화에서 다크모드를 적용하면 어두운 화면에 어울리는 색으로 배경색과 폰트색이 바뀐다!
- 휴대전화에서 네 페이지를 확인한 결과:

| 구분 | 메인페이지 | D411 | B333 | 중앙도서관 |
| --- | --- | --- | --- | --- |
| 라이트모드 | <img src="images/mobile-home-light.png" width="200" alt="메인페이지-라이트모드"> | <img src="images/mobile-d411-light.png" width="200" alt="D411-라이트모드"> | <img src="images/mobile-b333-light.png" width="200" alt="B333-라이트모드"> | <img src="images/mobile-library-light.png" width="200" alt="중앙도서관-라이트모드"> |
| 다크모드 | <img src="images/mobile-home-dark.png" width="200" alt="메인페이지-다크모드"> | <img src="images/mobile-d411-dark.png" width="200" alt="D411-다크모드"> | <img src="images/mobile-b333-dark.png" width="200" alt="B333-다크모드"> | <img src="images/mobile-library-dark.png" width="200" alt="중앙도서관-다크모드"> |

### 출처
- 새로 사용한 이미지·웹폰트의 출처(사용한 경우):

| 서체명 (Font Name) | 구편 / 출처 분류 | 원본 링크 / 폰트 웹사이트 |
| :--- | :--- | :--- |
| **Noto Sans KR** | Google Fonts | [Google Fonts - Noto Sans KR](https://fonts.google.com/specimen/Noto+Sans+KR) |
| **Noto Serif KR** | Google Fonts | [Google Fonts - Noto Serif KR](https://fonts.google.com/specimen/Noto+Serif+KR) |
| **Press Start 2P** | Google Fonts | [Google Fonts - Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) |
| **둥근모꼴** | 눈누 (Noonnu CDN) | [눈누 - 둥근모꼴](https://noonnu.cc/font_page/28) |