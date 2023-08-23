// global-style.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root{
        --color-main: #12DDCE;
        --color-sub-1: #F5F5F5;
        --color-sub-2: #999999;
        --color-sub-3: #00BBC7;
        --color-danger: #FF4F4F;
        --color-warning: #FBB01F;
        --color-good: #47DD12;
        --width-max: 76.8rem;
        --font-regular: 400;
        --font-bold: 700;
    }
    
    body{
        margin: 0;
        padding: 0;
        font-family: Apple SD Gothic Neo, Roboto, Arial Helvetica, sans-serif;
    }

    a{
        text-decoration: none;
        color: inherit;
    }

    button{
        all: unset;
        cursor: pointer;
    }

    input{
        all: unset;
    }
`;
