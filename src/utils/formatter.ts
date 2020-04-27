import { CookieConsentData } from "./cookie";

interface DateReplacementHolder {
    [key: string]: (date: Date) => string;
}

export const formatCookieStatusString = (
    cookie: CookieConsentData | undefined,
    str: string,
    dateFormat: string,
    timeFormat: string
) => {
    const placeholders: {
        [key: string]: any;
    } = {
        "%DATE%": cookie ? getFormattedDate(cookie.updatedAt, dateFormat) : "",
        "%TIME%": cookie ? getFormattedTime(cookie.updatedAt, timeFormat) : ""
    };

    str = str.replace(/%\w+%/g, foundString => {
        return placeholders[foundString] || foundString;
    });
    return str;
};

const getFormattedDate = (timestamp: number, format: string) => {
    const date = new Date(timestamp);

    // replace placeholders with values from dateReplacements object
    let dataKeys = Object.keys(dateReplacements);
    for (let i = 0; i < dataKeys.length; i++) {
        format = format.replace(new RegExp(dataKeys[i], "g"), foundString => {
            return dateReplacements[foundString](date);
        });
    }
    return format;
};

const getFormattedTime = (timestamp: number, format: string) => {
    const date = new Date(timestamp);

    // replace placeholders with values from timeReplacements object
    let dataKeys = Object.keys(timeReplacements);
    for (let i = 0; i < dataKeys.length; i++) {
        format = format.replace(new RegExp(dataKeys[i], "g"), foundString => {
            return timeReplacements[foundString](date);
        });
    }
    return format;
};

const dateReplacements: DateReplacementHolder = {
    dd: (date: Date) => {
        return getDay(date);
    },
    DD: (date: Date) => {
        return getDay(date);
    },
    mm: (date: Date) => {
        return getMonth(date);
    },
    MM: (date: Date) => {
        return getMonth(date);
    },
    yy: (date: Date) => {
        return getYear(date);
    },
    YY: (date: Date) => {
        return getYear(date);
    }
};

const timeReplacements: DateReplacementHolder = {
    hh: (date: Date) => {
        return getHours(date);
    },
    HH: (date: Date) => {
        return getHours(date);
    },
    mm: (date: Date) => {
        return getMinutes(date);
    },
    MM: (date: Date) => {
        return getMinutes(date);
    },
    ss: (date: Date) => {
        return getSeconds(date);
    },
    SS: (date: Date) => {
        return getSeconds(date);
    }
};

const getDoubleDigitString = (value: number) => {
    return value < 10 ? "0" + value.toString() : value.toString();
};

const getDay = (date: Date) => {
    return getDoubleDigitString(date.getDate());
};

const getMonth = (date: Date) => {
    return getDoubleDigitString(date.getMonth() + 1);
};

const getYear = (date: Date, full: boolean = false) => {
    let year = date.getFullYear().toString();
    return full ? year : year.substr(-2);
};

const getHours = (date: Date) => {
    return getDoubleDigitString(date.getHours());
};

const getMinutes = (date: Date) => {
    return getDoubleDigitString(date.getMinutes());
};

const getSeconds = (date: Date) => {
    return getDoubleDigitString(date.getSeconds());
};
