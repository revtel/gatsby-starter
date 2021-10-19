import React from 'react';
import * as PathUtil from 'rev.sdk.js/Utils/PathUtil';
import * as AppActions from '../AppActions';

function NavLink(props) {
  const {to, loading = false, extraStyle} = props;

  return (
    <a
      href={PathUtil.normalizedRoute(to)}
      style={extraStyle}
      onClick={(evt) => {
        evt.preventDefault();
        AppActions.navigate(to, {loading});
      }}>
      {props.children}
    </a>
  );
}

export default NavLink;
