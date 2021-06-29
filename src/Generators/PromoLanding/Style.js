import React from 'react';
import {css} from 'styled-components';

const Bg = css`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${(props) =>
    props.bg?.indexOf('#') === 0
      ? `
background-color: ${props.bg};
`
      : `
background-image: url(${props.bg});
`}
`;

export {Bg};
