import React from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface CaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

const SITE_KEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

const Captcha: React.FC<CaptchaProps> = ({ onVerify, onExpire }) => {
  return (
    <HCaptcha
      sitekey={SITE_KEY}
      reCaptchaCompat={false}
      onVerify={onVerify}
      onExpire={onExpire}
    />
  );
};

export default Captcha;
