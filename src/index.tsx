import * as React from "react";
import styles from "./styles.css";

import Icon from "./modules/Icon";
import Title from "./modules/Title";
import Text from "./modules/Text";
import { ActionContainer, Action } from "./modules/Action";

const CookieConsent: React.FC<{ zIndex?: number; className?: string }> = ({
    zIndex,
    className = "",
    children
}) => {
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
