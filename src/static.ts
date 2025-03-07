require("./styles.css");
import {
    CookieConfigDefaults,
    CookieConfig,
    CookieContent,
    CookieContentDefaults,
    CookieContentInitalProps,
    CookieConfigInitialProps,
    Cookie,
    CookieConsentData,
    getCookie,
    setCookie
} from "./utils/cookie";
import {
    bindConsentButtons,
    isUrlInWhitelist,
    activateTrackingScripts,
    updateConsentStatusElements
} from "./utils/mutations";

interface Store {
    getState: () => {
        [key: string]: any;
    };
    setState: (newState: any) => void;
    subscribe: (l: any) => void;
    unsubscribe: (l: any) => void;
}

interface GlobalCookieConsentState {
    $container: Element;
    icon?: string;
    title?: string;
    text?: string;
    labelAccept?: string;
    labelDecline?: string;
    zIndex?: number;

    store: Store;
}

const createStore = (initialState = {}) => {
    let state: { [key: string]: any } = initialState;
    let listeners: Array<() => void> = [];

    return {
        getState: () => state,
        setState: (newState: any) => {
            state = {
                ...state,
                ...newState
            };

            listeners.forEach(l => l && l());
        },
        subscribe: (l: any) => {
            listeners = [...listeners, l];
        },
        unsubscribe: (l: any) => {
            const index = listeners.indexOf(l);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    };
};

const buildCookieMarkup = ({
    icon,
    title,
    titleAs,
    text,
    labelAccept,
    labelDecline,
    zIndex,
    handleAccept,
    handleDecline
}: CookieContent & {
    zIndex?: number;
    handleDecline: () => void;
    handleAccept: () => void;
}) => {
    const $CookieView = document.createElement("div");
    $CookieView.className = "CookieConsent isHidden";

    if (zIndex) {
        $CookieView.style.zIndex = zIndex.toString();
    }

    const $CookieViewContent = document.createElement("div");
    $CookieViewContent.className = "CookieConsent__content";

    if (icon) {
        const $CookieIcon = document.createElement("img");
        $CookieIcon.className = "CookieConsent__icon";
        $CookieIcon.setAttribute("src", icon);

        $CookieViewContent.appendChild($CookieIcon);
    }

    if (title) {
        const possibleTitleTags = [
            "h1",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "div"
        ];
        const titleTag =
            possibleTitleTags.indexOf(titleAs || "") >= 0
                ? titleAs || "div"
                : "div";

        const $CookieTitle = document.createElement(titleTag);
        $CookieTitle.className = "CookieConsent__title";
        $CookieTitle.innerHTML = title;

        $CookieViewContent.appendChild($CookieTitle);
    }

    const $CookieText = document.createElement("div");
    $CookieText.className = "CookieConsent__text";
    $CookieText.innerHTML = text;

    $CookieViewContent.appendChild($CookieText);

    const $CookieActions = document.createElement("div");
    $CookieActions.className = "CookieConsent__actions";

    const $CookieActionAccept = document.createElement("button");
    $CookieActionAccept.className =
        "CookieConsent__action  CookieConsent__action--accept";
    $CookieActionAccept.setAttribute(
        "data-gtm",
        "button-cookie-consent-accept"
    );
    $CookieActionAccept.innerHTML = labelAccept;
    $CookieActionAccept.addEventListener("click", handleAccept);

    const $CookieActionDecline = document.createElement("button");
    $CookieActionDecline.className =
        "CookieConsent__action  CookieConsent__action--decline";
    $CookieActionDecline.setAttribute(
        "data-gtm",
        "button-cookie-consent-decline"
    );
    $CookieActionDecline.innerHTML = labelDecline;
    $CookieActionDecline.addEventListener("click", handleDecline);

    $CookieActions.appendChild($CookieActionDecline);
    $CookieActions.appendChild($CookieActionAccept);
    $CookieViewContent.appendChild($CookieActions);

    $CookieView.appendChild($CookieViewContent);

    return $CookieView;
};

const $mountPointCookie = document.querySelector("#cookie-consent");

if ($mountPointCookie) {
    const script = $mountPointCookie.querySelector("script");
    let initialState: CookieConfigInitialProps & CookieContentInitalProps = {};

    if (script) {
        try {
            initialState = JSON.parse(script.innerText);
        } catch (e) {}
    }

    const {
        zIndex,
        name,
        lifetime,
        urlWhitelist,
        consentAcceptStatusMsg,
        consentDeclineStatusMsg,
        noCookieStatusMsg,
        dateFormat,
        timeFormat,
        localeKey,
        icon,
        title,
        titleAs,
        text,
        labelAccept,
        labelDecline
    } = {
        ...CookieConfigDefaults,
        ...CookieContentDefaults,
        ...initialState
    } as CookieConfig & CookieContent;

    const cookie = getCookie(name) as Cookie<CookieConsentData>;

    const store = createStore({
        isVisible: false,
        accepted: !!cookie.data.consent
    });

    (window as any).blatCookieConsent = {
        $container: $mountPointCookie,
        icon,
        title,
        text,
        labelAccept,
        labelDecline,
        zIndex,
        store
    } as GlobalCookieConsentState;

    const $Cookie = buildCookieMarkup({
        icon,
        title,
        titleAs,
        text,
        labelAccept,
        labelDecline,
        zIndex,
        handleDecline: () => {
            console.log("decline");
            setCookie<CookieConsentData>(
                name,
                {
                    consent: false,
                    updatedAt: new Date().getTime()
                },
                lifetime
            );

            store.setState({ isVisible: false, accepted: false });
        },
        handleAccept: () => {
            console.log("accept");
            setCookie<CookieConsentData>(
                name,
                {
                    consent: true,
                    updatedAt: new Date().getTime()
                },
                lifetime
            );
            store.setState({ isVisible: false, accepted: true });
            activateTrackingScripts();
        }
    });

    $mountPointCookie.innerHTML = "";
    $mountPointCookie.appendChild($Cookie);

    store.subscribe(() => {
        // $Cookie.classList.toggle("isHidden", !store.getState().isVisible);
        $Cookie.className = store.getState().isVisible
            ? "CookieConsent"
            : "CookieConsent isHidden";
    });

    const updateStatusElements = () => {
        const cookie = getCookie(name) as Cookie<CookieConsentData>;

        const str = !cookie
            ? noCookieStatusMsg
            : cookie.data.consent
            ? consentAcceptStatusMsg
            : consentDeclineStatusMsg;

        updateConsentStatusElements(
            cookie,
            str,
            dateFormat,
            timeFormat,
            localeKey
        );
    };

    store.subscribe(updateStatusElements);
    updateStatusElements();

    bindConsentButtons(() => store.setState({ isVisible: true }));
    const isInWhitelist = isUrlInWhitelist(
        window.location.pathname,
        urlWhitelist
    );

    if (!isInWhitelist) store.setState({ isVisible: !cookie });
    if (cookie && cookie.data.consent) {
        activateTrackingScripts();
    }
}
