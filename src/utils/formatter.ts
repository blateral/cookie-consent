interface DateReplacementHolder {
    [key: string]: () => string;
}

export class StatusFormatter {
    private timestamp: number;
    private input: string;
    private dateFormat: string;
    private timeFormat: string;

    // private localeKey: string;
    private date: Date;

    constructor(
        timestamp: number,
        input: string,
        dateFormat: string,
        timeFormat: string
        // localeKey?: string
    ) {
        this.timestamp = timestamp;
        this.input = input;
        this.dateFormat = dateFormat;
        this.timeFormat = timeFormat;

        // this.localeKey = localeKey ? localeKey : "de";
        this.date = new Date(this.timestamp);
    }

    private dateReplacements: DateReplacementHolder = {
        dd: () => {
            return this.getDay();
        },
        DD: () => {
            return this.getDay();
        },
        mm: () => {
            return this.getMonth();
        },
        MM: () => {
            return this.getMonth();
        },
        yy: () => {
            return this.getYear();
        },
        YY: () => {
            return this.getYear();
        }
    };

    private timeReplacements: DateReplacementHolder = {
        hh: () => {
            return this.getHours();
        },
        HH: () => {
            return this.getHours();
        },
        mm: () => {
            return this.getMinutes();
        },
        MM: () => {
            return this.getMinutes();
        },
        ss: () => {
            return this.getSeconds();
        },
        SS: () => {
            return this.getSeconds();
        }
    };

    public setDate(timestamp: number) {
        this.date = new Date(timestamp);
    }

    /*
    public setLocale(localeKey: string) {
        this.localeKey = localeKey;
    }
    */

    public getFormattedStatus() {
        const placeholders: {
            [key: string]: any;
        } = {
            "%DATE%": this.getFormattedDate(),
            "%TIME%": this.getFormattedTime()
        };

        const formattedInput = this.input.replace(/%\w+%/g, foundString => {
            return placeholders[foundString] || foundString;
        });
        return formattedInput;
    }

    public getFormattedDate() {
        // replace placeholders with values from dateReplacements object
        let dataKeys = Object.keys(this.dateReplacements);
        let formattedDate = this.dateFormat;
        for (let i = 0; i < dataKeys.length; i++) {
            formattedDate = formattedDate.replace(
                new RegExp(dataKeys[i], "g"),
                foundString => {
                    return this.dateReplacements[foundString].call(this);
                }
            );
        }
        return formattedDate;
    }

    public getFormattedTime() {
        // replace placeholders with values from timeReplacements object
        let dataKeys = Object.keys(this.timeReplacements);
        let formattedTime = this.timeFormat;
        for (let i = 0; i < dataKeys.length; i++) {
            formattedTime = formattedTime.replace(
                new RegExp(dataKeys[i], "g"),
                foundString => {
                    return this.timeReplacements[foundString].call(this);
                }
            );
        }
        return formattedTime;
    }

    private getDoubleDigitString(value: number) {
        return value < 10 ? "0" + value.toString() : value.toString();
    }

    private getDay() {
        return this.getDoubleDigitString(this.date.getDate());
    }

    private getMonth() {
        return this.getDoubleDigitString(this.date.getMonth() + 1);
    }

    private getYear(full: boolean = false) {
        let year = this.date.getFullYear().toString();
        return full ? year : year.substr(-2);
    }

    private getHours() {
        return this.getDoubleDigitString(this.date.getHours());
    }

    private getMinutes() {
        return this.getDoubleDigitString(this.date.getMinutes());
    }

    private getSeconds() {
        return this.getDoubleDigitString(this.date.getSeconds());
    }
}
