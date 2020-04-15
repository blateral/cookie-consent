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
    onClick?: () => void;
    type?: "accept" | "decline";
    gtmIdentifier?: string;
    className?: "string";
}> = ({
    buttonTag: ButtonTag = "button",
    type,
    className = "",
    children,
    onClick,
    gtmIdentifier
}) => (
    <ButtonTag
        onClick={onClick}
        className={`${styles.CookieConsent__action} ${
            type === "accept" ? styles["CookieConsent__action--accept"] : ""
        } ${className}`}
        data-gtm={
            gtmIdentifier || type === "accept"
                ? "button-cookie-consent-accept"
                : "button-cookie-consent-decline"
        }
    >
        {children}
    </ButtonTag>
);
