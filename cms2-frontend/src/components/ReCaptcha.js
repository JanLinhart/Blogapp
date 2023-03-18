import React, { useState, useRef } from 'react';
import GoogleReCaptcha from 'react-google-recaptcha';

function ReCaptcha(props) {
  const [captchaResponse, setCaptchaResponse] = useState(null);
  const { sitekey, onChange } = props;
  const recaptchaRef = useRef(null);

  const handleLoad = () => {
    console.log('reCAPTCHA widget loaded');
  };

  const handleChange = (response) => {
    console.log('reCAPTCHA response:', response);
    setCaptchaResponse(response);
  };

  const handleSubmit = () => {
    if (captchaResponse) {
      // Send the reCAPTCHA response to the server for verification
      console.log('Submitting reCAPTCHA response:', captchaResponse);
    } else {
      // User has not completed the reCAPTCHA challenge
      console.log('Please complete the reCAPTCHA challenge');
    }
  };

  return (
    <div>
      <GoogleReCaptcha
        ref={recaptchaRef}
        size="normal"
        sitekey={sitekey}
        onChange={onChange}
        onLoad={handleLoad}
        required
      />
    </div>
  );
}

export default ReCaptcha
