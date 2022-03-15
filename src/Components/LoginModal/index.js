import React from 'react';
import SdkLoginModal from 'rev.sdk.js/Components/LoginModal';

function LoginModal(props) {
  return (
    <SdkLoginModal
      canFacebookLogin={true}
      canLineLogin={true}
      canGoogleLogin={true}
      canForgetPassword={true}
      canRegister={true}
      onForgotPasswordClick={null}
      onRegisterClick={null}
    />
  );
}

export default LoginModal;
