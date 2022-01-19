import React, {useCallback, useEffect, useState} from 'react';
import ResetEmail from 'rev.sdk.js/Templates/ResetEmail';

const ResetEmailPage = ({location}) => {
  return <ResetEmail location={location}></ResetEmail>;
};
export default ResetEmailPage;
