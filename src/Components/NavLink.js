import React from 'react';
import * as AppActions from '../AppActions';

function NavLink(props) {
  const {to, loading = false} = props;

  return (
    <a
      href={to}
      onClick={(evt) => {
        evt.preventDefault();
        AppActions.navigate(to, {loading});
      }}>
      {props.children}
    </a>
  );
}

export default NavLink;
