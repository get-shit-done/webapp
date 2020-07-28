// https://gist.github.com/vincentbollaert/e90def9b351d8d97c90ef7cfd887685e

import { UNIT_SIZE, FONT_SIZE } from './variables'

export default `
  html {
    height: 100%;
    background-color: var(--white-smoke);
    color: var(--sonic-silver);
    font-family: 'Barlow Semi Condensed', sans-serif;
    box-sizing: border-box;
    font-size: 62.5%;
    
    --font-size-xxsm: ${FONT_SIZE.xxsm};
    --font-size-xsm: ${FONT_SIZE.xsm};
    --font-size-sm: ${FONT_SIZE.sm};
    --font-size-md: ${FONT_SIZE.md};
    --font-size-lg: ${FONT_SIZE.lg};
    --font-size-xlg: ${FONT_SIZE.xlg};

    --size-xsm: ${UNIT_SIZE.xsm};
    --size-sm: ${UNIT_SIZE.sm};
    --size-md: ${UNIT_SIZE.md};
    --size-lg: ${UNIT_SIZE.lg};
    --size-xlg: ${UNIT_SIZE.xlg};

    --capri: #3dc3ff;
    --sky-blue: #78E0FF;
    --light-sea-green: #21baa6;
    --amazonite: #03d2b6;
    --steel-blue: #607D8B;

    --pastel-green: #7bd37c;
    --sunset-orange: #ff5d5d;
    --red-orange: #ff4d4d;
    --very-light-tangelo: #ffae74;

    --white: #fff;
    --white-smoke: #f5f5f5;
    --snow: #fafafa;
    --isabelline: #eee;
    --lavender: #e2e7f9;
    --gainsboro: #dedede;
    --pastel-gray: #ccc;
    --gray-x11: #bbb;
    --quick-silver: #a2a2a2;
    --rhythm: #71788f;
    --sonic-silver: #787878;
    --sonic-silver-transparency: #f5f5f573;
    --roman-silver: #838899;
    --cool-gray: #8f99b9;
    --granite-gray: #666;
    --arsenic: #444;
    --onyx: #393939;
    --independence: #4f5466;
    --jet: #333;
    --charcoal: #3d4150;
    --charleston-green: #282828;
    --charleston-green-2: #2d2d2d;
    --raisin-black: #222121;
    --eerie-black: #1e1e1e;
    --dark-transparency: rgba(0, 0, 0, 0.4);

    --transition: 0.2s ease-out;
    --transition-type: ease-out;
  }
  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    height: 100%;
    font-size: 1.2rem;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: var(--sonic-silver);
    text-decoration: none;
    cursor: pointer;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  input,
  button {
    border: none;
    outline: none;
  }
  input {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  button {
    padding: 0;
    line-height: 1;
    font-family: inherit;
    color: inherit;
    text-transform: inherit;
    font-weight: inherit;
    text-align: inherit;
    background: transparent;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
    font-family: 'Barlow Semi Condensed', sans-serif
  }
  p {
    margin: 0;
  }
  table {
    border-collapse: collapse;
    table-layout: fixed;
    text-align: center;
    width: 100%;
  }
  th {
    text-align: left;
  }
`
