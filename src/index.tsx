import * as React from "react";
import styles from "./styles.css";

// MODULES
import Icon from "./modules/Icon";
import Title from "./modules/Title";
import Text from "./modules/Text";
import { ActionContainer, Action } from "./modules/Action";

// TYPES | DEFAULTS | FUNCTIONS
import {
    CookieConfig,
    CookieConfigDefaults,
    Cookie,
    CookieConsentData,
    getCookie
} from "./utils/cookie";
import {
    bindConsentButtons,
    isUrlInWhitelist,
    activateTrackingScripts,
    updateConsentStatusElements
} from "./utils/mutations";

const CookieConsent: React.FC<CookieConfig & {
    className?: string;
}> = props => {
    const {
        zIndex,
        name,
        urlWhitelist,
        consentAcceptStatusMsg,
        consentDeclineStatusMsg,
        noCookieStatusMsg,
        dateFormat,
        timeFormat,
        className,
        children
    } = {
        ...CookieConfigDefaults,
        ...props
    };
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        bindConsentButtons(() => setIsVisible(true));

        const cookie = getCookie(name!) as Cookie<CookieConsentData>;
        const containsWhitelist = isUrlInWhitelist(
            window.location.pathname,
            urlWhitelist
        );

        if (!containsWhitelist) setIsVisible(!cookie);
        if (cookie && cookie.data.consent) {
            activateTrackingScripts();
        }
    }, []);

    React.useEffect(() => {
        const cookie = getCookie(name!) as Cookie<CookieConsentData>;

        const str = !cookie
            ? noCookieStatusMsg!
            : cookie.data.consent
            ? consentAcceptStatusMsg!
            : consentDeclineStatusMsg!;

        updateConsentStatusElements(cookie, str, dateFormat!, timeFormat!);
    }, [isVisible]);

    if (!isVisible) return null;
    return (
        <div
            className={`${styles.CookieConsent} ${className}`}
            style={zIndex ? { zIndex } : {}}
        >
            <div className={styles.CookieConsent__content}>{children}</div>
        </div>
    );
};

export default {
    View: CookieConsent,
    Icon,
    Title,
    Text,
    ActionContainer,
    Action
};
