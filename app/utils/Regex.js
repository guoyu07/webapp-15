/**
 * Collection of useful regular expressions.
 */
App.Regex = {
    CREDIT_CARD_NUMBER: /^[\d]{13,16}$/,
    CREDIT_CARD_CVM: /^[\d]{3,4}$/,
    DATE: /^(0[\d]{1,1}|10|11|12)\/([0-2]{1,1}[\d]{1,1}|30|31)\/[\d]{4,4}$/,
    DATE_TIME: /^(0[\d]{1,1}|10|11|12)\/([0-2]{1,1}[\d]{1,1}|30|31)\/[\d]{4,4}\s([0-1][\d]{1,1}|20|21|22|23):[0-5][\d]{1,1}:[0-5][\d]{1,1}$/,
    EMAIL_ADDRESS: /^[a-zA-Z0-9_/=`~%'!#\\\$\&\?\*\+\-\^\.\{\|\}]{1,50}@[^\s@]+\.[a-zA-Z]{2,20}$/,
    EMAIL_ADDRESSES: /^([a-zA-Z0-9_/=`~%'!#\\\$\&\?\*\+\-\^\.\{\|\}]{1,50}@[^\s@]+\.[a-zA-Z]{2,20}[,,]{0,1})+$/,
    NAME: /^[\w.\s'!\-@#$%\^&*()_+\-={}|[\]\\:,,.?\/]{1,100}$/,
    PASSWORD: /^[\w`~!@#$%\^&*()_+\-={}|[\]\\:'<>,?,.\/]{6,50}$/,
    DOMAIN_NAME: /^[\w.\-]{1,50}.[a-zA-Z]{2,6}$/,
    SERVER_NAME: /^[\w.\-]+$/,
    LOTUS_SERVER_NAME: /^bt-.*$/,
    SERVER_ELEMENT: /^[a-zA-Z0-9-]+$/,
    URL: /^http[s]{0,1}:\/\/[\w/.\-?_=\\%&:@]{1,2048}$/,
    NUMBER_1_DIGIT: /^[\d]{1,1}$/,
    NUMBER_1_DIGIT_NON_ZERO: /^[1-9]{1,1}$/,
    NUMBER_2_DIGITS: /^[\d]{1,2}$/,
    NUMBER_2_DIGITS_NON_ZERO: /^[1-9]{1,1}[\d]{0,1}$/,
    NUMBER_3_DIGITS: /^[\d]{1,3}$/,
    NUMBER_3_DIGITS_NON_ZERO: /^[1-9]{1,1}[\d]{0,2}$/,
    NUMBER_4_DIGITS: /^[\d]{1,4}$/,
    NUMBER_4_DIGITS_NON_ZERO: /^[1-9]{1,1}[\d]{0,3}$/,
    NUMBER_4_DIGITS_NON_ZERO_ALLOW_NEGATIVE: /^[\-]{0,1}[1-9]{1,1}[\d]{0,3}$/,
    NUMBER_5_DIGITS_NON_ZERO: /^[1-9]{1,1}[\d]{0,4}$/,
    NUMBER_6_DIGITS_NON_ZERO: /^[1-9]{1,1}[\d]{0,5}$/,
    NUMBER_6_DIGITS_NON_ZERO_ALLOW_NEGATIVE: /^[\-]{0,1}[1-9]{1,1}[\d]{0,5}$/,
    COUPTON_CODES: /([\dA-F]{10,20}\s*)+/,
    COUPON_CODE: /[\dA-F]{10,20}/,
    NO_WHITE_SPACE_WITHIN_TEXT: /^[\s]*[^\s]+[\s]*$/,
    ALLOW_SLASH_OR_NO_WHITE_SPACE_WITHIN_TEXT: /^[^\\]+(\\[^\\]+){1,2}$|^([\s]*[^\s\\]+[\s]*)$/, // 2 slashes allowed as in a\b\c for specific IMAP admin login scenarios
    NO_EMAIL_ADDRESS: /^[^@]*$/,
    PUBLIC_FOLDER_PATH: /^[^\\\/][^\\]+$/
};
