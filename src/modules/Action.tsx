import * as React from "react";
import styles from "./../styles.css";

export const ActionContainer: React.FC<{
    className?: "string";
}> = ({ className = "", children }) => (
    <div className={`${styles.CookieConsent__actions} ${className}`}>
        {children}
    </div>
);

export const Action: React.FC<{
    buttonTag?: "a" | "button";
    type?: "accept" | "decline";
    className?: "string";
}> = ({ buttonTag: ButtonTag = "button", type, className = "", children }) => (
    <ButtonTag
        className={`${styles.CookieConsent__action} ${
            type === "accept" ? styles["CookieConsent__action--accept"] : ""
        } ${className}`}
    >
        {children}
    </ButtonTag>
);
