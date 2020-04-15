import {
    CookieConfigDefaults,
    CookieConfig,
    CookieContent,
    CookieContentDefaults,
    CookieContentInitalProps,
    CookieConfigInitialProps
} from "./utils/cookie";

const buildCookieMarkup = ({
    icon,
    title,
    text,
    labelAccept,
    labelDecline,
    zIndex
}: CookieContent & { zIndex?: number }) => {
    const $CookieView = document.createElement("div");
    $CookieView.className = "CookieConsent";

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
        const $CookieTitle = document.createElement("h2");
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
    $CookieActionAccept.innerText = labelAccept;
    $CookieActionAccept.addEventListener("click", () => {
        console.log("accept");
    });

    const $CookieActionDecline = document.createElement("button");
    $CookieActionDecline.className = "CookieConsent__action";
    $CookieActionDecline.setAttribute(
        "data-gtm",
        "button-cookie-consent-decline"
    );
    $CookieActionDecline.innerText = labelDecline;
    $CookieActionDecline.addEventListener("click", () => {
        console.log("decline");
    });

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
        // name,
        // lifetime,
        // urlWhitelist,
        // consentAcceptStatusMsg,
        // consentDeclineStatusMsg,
        // noCookieStatusMsg,
        // dateFormat,
        // timeFormat,
        icon,
        title,
        text,
        labelAccept,
        labelDecline
    } = {
        ...CookieConfigDefaults,
        ...CookieContentDefaults,
        ...initialState
    } as CookieConfig & CookieContent;

    const generatedCookie = buildCookieMarkup({
        icon,
        title,
        text,
        labelAccept,
        labelDecline,
        zIndex
    });

    $mountPointCookie.innerHTML = "";
    $mountPointCookie.appendChild(generatedCookie);
}
