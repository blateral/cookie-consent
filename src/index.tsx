import * as React from "react";
import styles from "./styles.css";

// ************
// Cookie Container including backdrop
// ************

export const View: React.FC<{ zIndex?: number; className?: string }> = ({
    zIndex,
    className = "",
    children
}) => {
    return (
        <div
            className={`${styles.CookieConsent} ${className}`}
            style={zIndex ? { zIndex } : {}}
        >
            <div className={styles.CookieConsent__backdrop} />
            <div className={styles.CookieConsent__content}>{children}</div>
        </div>
    );
};

// ************
// Cookie Icon
// ************

export const Icon: React.FC<{
    src: string;
    alt?: string;
    className?: string;
}> = ({ src, alt, className = "" }) => (
    <img
        className={`${styles.CookieConsent__icon} ${className}`}
        src={src}
        alt={alt || ""}
    />
);

// ************
// Cookie Title
// ************

export const Title: React.FC<{
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
    className?: "string";
}> = ({ tag: TitleTag = "h2", className = "", children }) => (
    <TitleTag className={`${styles.CookieConsent__title} ${className}`}>
        {children}
    </TitleTag>
);

// ************
// Cookie Text
// ************

export const Text: React.FC<{
    className?: "string";
}> = ({ className = "", children }) => (
    <div className={`${styles.CookieConsent__text} ${className}`}>
        {children}
    </div>
);

// ************
// Cookie ActionContainer
// ************

export const ActionContainer: React.FC<{
    className?: "string";
}> = ({ className = "", children }) => (
    <div className={`${styles.CookieConsent__actions} ${className}`}>
        {children}
    </div>
);

// ************
// Cookie Action
// ************

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

export default {
    View,
    Icon,
    Title,
    Text,
    ActionContainer,
    Action
};
