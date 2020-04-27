import { CookieConsentData } from "./cookie";

export const formatCookieStatusString = (
    cookie: CookieConsentData | undefined,
    str: string,
    dateFormat: string,
    timeFormat: string
) => {
    const placeholders: {
        [key: string]: any;
    } = {
        "%DATE%": cookie
            ? getFormattedDateFromTimestamp(cookie.updatedAt, dateFormat)
            : "",
        "%TIME%": cookie
            ? getFormattedTimeFromTimestamp(cookie.updatedAt, timeFormat)
            : ""
    };

    str = str.replace(/%\w+%/g, function(foundString) {
        return placeholders[foundString] || foundString;
    });
    return str;
};

const getFormattedDateFromTimestamp = (timestamp: number, format: string) => {
    const date = new Date(timestamp);
    format = format.replace(/(dd|DD|mm|MM|yy|YY|yyyy|YYYY)/g, foundString => {
        switch (true) {
            case foundString === "dd" || foundString === "DD":
                return getDoubleDigitStringFromNumber(date.getDate());
            case foundString === "mm" || "MM":
                return getDoubleDigitStringFromNumber(date.getMonth() + 1);
            case foundString === "yy" || foundString === "YY":
                return date
                    .getFullYear()
                    .toString()
                    .substr(-2);
            case foundString === "yyyy" || foundString === "YYYY":
                return date.getFullYear().toString();
            default:
                return "";
        }
    });
    return format;
};

const getFormattedTimeFromTimestamp = (timestamp: number, format: string) => {
    const date = new Date(timestamp);
    format = format.replace(/(hh|HH|mm|MM|ss|SS)/g, foundString => {
        switch (true) {
            case foundString === "hh" || foundString === "HH":
                return getDoubleDigitStringFromNumber(date.getHours());
            case foundString === "mm" || foundString === "MM":
                return getDoubleDigitStringFromNumber(date.getMinutes());

            case foundString === "ss" || foundString === "SS":
                return getDoubleDigitStringFromNumber(date.getSeconds());
            default:
                return "";
        }
    });
    return format;
};

const getDoubleDigitStringFromNumber = (value: number) => {
    return value < 10 ? "0" + value.toString() : value.toString();
};
