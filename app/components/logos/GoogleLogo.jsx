import React from "react";
import { SvgXml } from "react-native-svg";

// Định nghĩa nội dung SVG của logo Google dưới dạng chuỗi XML
const googleLogoSVG = `
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M33.011 13.9082H17V20.4842H26.149C25.9598 21.5243 25.5617 22.5153 24.9787 23.3972C24.3956 24.2791 23.6399 25.0336 22.757 25.6152V29.8802H28.251C29.9247 28.2682 31.2409 26.3224 32.1141 24.169C32.9874 22.0156 33.3982 19.7026 33.32 17.3802C33.3207 16.216 33.2173 15.054 33.011 13.9082V13.9082Z" fill="#4285F4"/>
  <path d="M28.2516 29.8795L22.7576 25.6145C21.0434 26.7176 19.0385 27.2829 17.0006 27.2375C14.8812 27.2111 12.8234 26.5206 11.117 25.2633C9.41064 24.0059 8.14161 22.245 7.48859 20.2285H1.80859V24.6285C3.22273 27.4456 5.39251 29.8139 8.07538 31.4686C10.7582 33.1234 13.8485 33.9993 17.0006 33.9985C21.139 34.1107 25.1639 32.6372 28.2516 29.8795Z" fill="#34A853"/>
  <path d="M6.95521 17.0002C6.95761 15.9002 7.13759 14.8079 7.48821 13.7652V9.36523H1.80821C0.619186 11.7345 0 14.3488 0 16.9997C0 19.6507 0.619186 22.2649 1.80821 24.6342L7.48821 20.2342C7.1377 19.1919 6.95772 18.0999 6.95521 17.0002Z" fill="#FBBC05"/>
  <path d="M23.4986 9.29919L28.3746 4.42319C25.297 1.53471 21.221 -0.0506794 17.0006 -0.00081138C13.849 -0.00204733 10.7591 0.873139 8.07632 2.52694C5.3935 4.18075 3.22342 6.54801 1.80859 9.36419L7.48859 13.7642C8.14161 11.7477 9.41064 9.9868 11.117 8.72945C12.8234 7.47209 14.8812 6.78159 17.0006 6.75519C19.4169 6.71522 21.7517 7.62927 23.4986 9.29919Z" fill="#EA4335"/>
</svg>`;

export default function GoogleLogo({ size }) {
  return <SvgXml xml={googleLogoSVG} width={size || 36} height={size || 36} />;
}
