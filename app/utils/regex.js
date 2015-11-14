/**
 * Collection of useful regular expressions.
 */
export default {
  EMAIL_ADDRESS: /^[a-zA-Z0-9_/=`~%'!#\\\$\&\?\*\+\-\^\.\{\|\}]{1,50}@[^\s@]+\.[a-zA-Z]{2,20}$/,
  URL: /^http[s]{0,1}:\/\/[\w/.\-?_=\\%&:@]{1,2048}$/
};
