import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 ${css`
   body {
     margin: 0;
     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
       'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
       'Helvetica Neue', sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
   }

   div,
   span,
   label,
   h1,
   h2,
   h3,
   h4,
   h5,
   h6,
   a {
     color: ${({ theme }) => theme.textColor};
   }

   code {
     font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
       monospace;
   }

   .element-action > ul > li:last-child span {
     color: ${({ theme }) => theme.danger};
   }
 `}
`;

export default GlobalStyle;
