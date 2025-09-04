const GITHUB_USER = "ArmsYT";

const I18N = {
    en: {
        appTitle: "🔑 String Generator",
        siteTitle: "String Generator",
        loading: "Loading...",
        lengthLabel: "Length :",
        uppercase: "Uppercase",
        lowercase: "Lowercase",
        numbers: "Numbers",
        symbols: "Symbols",
        generate: "Generate",
        btnRegenerate: "Regenerate",
        btnCopy: "Copy",
        toastCopied: "Code copied ✅",
        creditsBy: "Created by :",
        profileLoading: "Loading profile…",
        notifBodyCopied: "Your code has been copied to the clipboard.",
    },
    fr: {
        appTitle: "🔑 Générateur de codes",
        siteTitle: "Générateur de codes",
        loading: "Chargement…",
        lengthLabel: "Longueur :",
        uppercase: "Majuscules",
        lowercase: "Minuscules",
        numbers: "Chiffres",
        symbols: "Symboles",
        generate: "Générer le code",
        btnRegenerate: "Régénérer",
        btnCopy: "Copier",
        toastCopied: "Code copié ✅",
        creditsBy: "Créé par :",
        profileLoading: "Chargement du profil…",
        notifBodyCopied: "Votre code a été copié dans le presse-papiers.",
    },
};

function setCookie(name, value, days = 365) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}
    
function getCookie(name) {
    const row = document.cookie.split("; ").find((r) => r.startsWith(name + "="));
    return row ? decodeURIComponent(row.split("=")[1]) : null;
}

const LANG_COOKIE = "lang";
let LANG =
getCookie(LANG_COOKIE) ||
((navigator.language || "").toLowerCase().startsWith("fr") ? "fr" : "en");

function t(key) {
    return (I18N[LANG] && I18N[LANG][key]) || I18N.en[key] || key;
    
}

function isPlaceholder(el) {
    const key = el.dataset.i18n;
    const val = (el.textContent || "").trim();

    if (key === "loading") {
        const placeholders = [
        I18N.en.loading,
        I18N.fr.loading,
        "Loading...",
        "Chargement…",
        "Chargement...",
        ];
        return val === "" || placeholders.includes(val);
    }

    if (key === "profileLoading") {
        const placeholders = [
        I18N.en.profileLoading,
        I18N.fr.profileLoading,
        "Loading profile…",
        "Chargement du profil…",
        ];
        return val === "" || placeholders.includes(val);
    }
    return true;
}

function applyI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.dataset.i18n;

        if (key === "loading" || key === "profileLoading") {
        if (isPlaceholder(el)) el.textContent = t(key);
        } else {
        el.textContent = t(key);
        }
    });

    const regen = document.getElementById("btnRegenerate");
    const copy = document.getElementById("btnCopy");
    if (regen) regen.title = t("btnRegenerate");
    if (copy) copy.title = t("btnCopy");

    const genBtn = document.getElementById("generateBtn");
    if (genBtn) genBtn.textContent = t("generate");

    document.documentElement.lang = LANG;

    const titleEl = document.getElementById("ghwName");
    if (titleEl) {
        const txt = titleEl.textContent;
        const right = txt.includes("|") ? txt.split("|")[1].trim() : "XXXX";
        titleEl.textContent = `${t("siteTitle")} | ${right}`;
    }

    document.getElementById("langFR")?.classList.toggle("active", LANG === "fr");
    document.getElementById("langEN")?.classList.toggle("active", LANG === "en");
}

function setLang(lang) {
    LANG = lang === "fr" ? "fr" : "en";
    setCookie(LANG_COOKIE, LANG, 365);
    applyI18n();
}

const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const rangeEl = document.getElementById("lengthRange");
const toastEl = document.getElementById("toast");

document.getElementById("langFR")?.addEventListener("click", () => setLang("fr"));
document.getElementById("langEN")?.addEventListener("click", () => setLang("en"));

function syncNumber() {
    lengthEl.value = rangeEl.value;
}

function syncRange() {
    rangeEl.value = lengthEl.value;
}

function clampLength() {
    let v = parseInt(lengthEl.value || 12, 10);
    if (v > 50) v = 50;
    if (v < 4) v = 4;
    lengthEl.value = v;
}

function generatePassword() {
    clampLength();
    const length = +lengthEl.value;
    const useUppercase = document.getElementById("uppercase").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+{}[]|:;<>,.?/~`-=";

    let pool = "";
    if (useUppercase) pool += uppercaseChars;
    if (useLowercase) pool += lowercaseChars;
    if (useNumbers) pool += numberChars;
    if (useSymbols) pool += symbolChars;

    if (!pool) {
        resultEl.textContent = "⚠️";
        return;
    }

    let pwd = "";
    for (let i = 0; i < length; i++) {
        const r = Math.floor(Math.random() * pool.length);
        pwd += pool[r];
    }
    resultEl.textContent = pwd;
    setCookie("genPrefs", JSON.stringify({length, useUppercase, useLowercase, useNumbers, useSymbols}))
}

function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 1600);
}

function copyPassword() {
    const val = resultEl.textContent || "";
    if (!val || val.startsWith("⚠️")) return;
    navigator.clipboard.writeText(val).then(() => {
        showToast(t("toastCopied"));
        if (window.Notification && Notification.permission === "granted") {
            new Notification(t("toastCopied"), { body: t("notifBodyCopied") });
        }
    });
}

async function loadGitHubCard() {
    const websiteAvatar = document.getElementById("ghwAvatar");
    const websiteName = document.getElementById("ghwName");
    const avatar = document.getElementById("ghAvatar");
    const link = document.getElementById("ghLink");
    const meta = document.getElementById("ghMeta");
    try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_USER)}`);
        if (!res.ok) throw new Error("GitHub API: " + res.status);
        const u = await res.json();
        avatar.src = `${u.avatar_url}?s=80`;
        avatar.style.opacity = "1";
        if (websiteAvatar) websiteAvatar.href = `${u.avatar_url}?s=80`;
        if (websiteName)
        websiteName.textContent = `${t("siteTitle")} | ${u.name || u.login}`;
        link.href = u.html_url;
        link.textContent = u.name || u.login;
        meta.textContent = `@${u.login}`;
    } catch (e) {
        meta.textContent = t("profileLoading");
    }
}

function restorePrefs() {
    const raw = getCookie("genPrefs");
    if (!raw) return;
    try {
        const p = JSON.parse(raw);
        lengthEl.value = Math.min(50, Math.max(4, p.length ?? 12));
        rangeEl.value = lengthEl.value;
        document.getElementById("uppercase").checked = !!p.useUppercase;
        document.getElementById("lowercase").checked = !!p.useLowercase;
        document.getElementById("numbers").checked = !!p.useNumbers;
        document.getElementById("symbols").checked = !!p.useSymbols;
    } catch {}
}

function init() {
    applyI18n();
    restorePrefs();
    syncRange();
    generatePassword();
    loadGitHubCard();
}
window.addEventListener("load", init);
