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
        regenOnCopy: "Regenerate after copy",
        generate: "Generate",
        generate10: "Generate x10",
        bulkTitle: "Bulk (x10)",
        bulkHint: "Tip: Ctrl/Cmd+Enter generates x10.",
        strengthLabel: "Strength",
        strengthWeak: "Weak",
        strengthFair: "Fair",
        strengthGood: "Good",
        strengthStrong: "Strong",
        warningWeak: "⚠️ Too weak: increase length or enable more character types.",
        shortcutHint: "Shortcuts: Enter = regenerate, Ctrl/Cmd+C = copy, Ctrl/Cmd+Enter = x10",
        btnRegenerate: "Regenerate",
        btnCopy: "Copy",
        btnCopyBulk: "Copy x10",
        btnCloseBulk: "Close",
        drawerTitle: "Copied (x10)",
        drawerHint: "Last copied batch (1 per line).",
        btnCopyDrawer: "Copy x10",
        btnCloseDrawer: "Close",
        toastCopied: "Code copied ✅",
        toastCopiedBulk: "10 codes copied ✅",
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
        regenOnCopy: "Régénérer après copie",
        generate: "Générer le code",
        generate10: "Générer x10",
        bulkTitle: "Lot (x10)",
        bulkHint: "Astuce : Ctrl/Cmd+Entrée génère x10.",
        strengthLabel: "Robustesse",
        strengthWeak: "Faible",
        strengthFair: "Moyenne",
        strengthGood: "Bonne",
        strengthStrong: "Forte",
        warningWeak: "⚠️ Trop faible : augmente la longueur ou active plus de types de caractères.",
        shortcutHint: "Raccourcis : Entrée = régénérer, Ctrl/Cmd+C = copier, Ctrl/Cmd+Entrée = x10",
        btnRegenerate: "Régénérer",
        btnCopy: "Copier",
        btnCopyBulk: "Copier x10",
        btnCloseBulk: "Fermer",
        drawerTitle: "Copié (x10)",
        drawerHint: "Dernier lot copié (1 par ligne).",
        btnCopyDrawer: "Copier x10",
        btnCloseDrawer: "Fermer",
        toastCopied: "Code copié ✅",
        toastCopiedBulk: "10 codes copiés ✅",
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
        const placeholders = [I18N.en.loading, I18N.fr.loading, "Loading...", "Chargement…", "Chargement..."];
        return val === "" || placeholders.includes(val);
    }

    if (key === "profileLoading") {
        const placeholders = [I18N.en.profileLoading, I18N.fr.profileLoading, "Loading profile…", "Chargement du profil…"];
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

    // Titles
    const regen = document.getElementById("btnRegenerate");
    const copy = document.getElementById("btnCopy");
    const copyBulk = document.getElementById("btnCopyBulk");
    const closeBulk = document.getElementById("btnCloseBulk");
    const copyDrawer = document.getElementById("btnCopyDrawer");
    const closeDrawer = document.getElementById("btnCloseDrawer");
    if (regen) regen.title = t("btnRegenerate");
    if (copy) copy.title = t("btnCopy");
    if (copyBulk) copyBulk.title = t("btnCopyBulk");
    if (closeBulk) closeBulk.title = t("btnCloseBulk");
    if (copyDrawer) copyDrawer.title = t("btnCopyDrawer");
    if (closeDrawer) closeDrawer.title = t("btnCloseDrawer");

    // Buttons text (safe if already set by data-i18n)
    const genBtn = document.getElementById("generateBtn");
    const gen10Btn = document.getElementById("generate10Btn");
    if (genBtn) genBtn.textContent = t("generate");
    if (gen10Btn) gen10Btn.textContent = t("generate10");

    document.documentElement.lang = LANG;

    // Website title
    const titleEl = document.getElementById("ghwName");
    if (titleEl) {
        const txt = titleEl.textContent || "";
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
    updateStrengthUI(resultEl.textContent || "");
}

// DOM
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const rangeEl = document.getElementById("lengthRange");
const toastEl = document.getElementById("toast");

const strengthWrapEl = document.getElementById("strengthWrap");
const strengthBarEl = document.getElementById("strengthBar");
const strengthFillEl = document.getElementById("strengthFill");
const strengthTextEl = document.getElementById("strengthText");
const strengthEntropyEl = document.getElementById("strengthEntropy");
const warningEl = document.getElementById("weakWarning");

const bulkWrapEl = document.getElementById("bulkWrap");
const bulkResultEl = document.getElementById("bulkResult");

const bulkDrawerEl = document.getElementById("bulkDrawer");
const bulkDrawerListEl = document.getElementById("bulkDrawerList");

document.getElementById("langFR")?.addEventListener("click", () => setLang("fr"));
document.getElementById("langEN")?.addEventListener("click", () => setLang("en"));

// Charsets
const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+{}[]|:;<>,.?/~`-=";

function getPoolSize() {
    const useUppercase = document.getElementById("uppercase")?.checked;
    const useLowercase = document.getElementById("lowercase")?.checked;
    const useNumbers = document.getElementById("numbers")?.checked;
    const useSymbols = document.getElementById("symbols")?.checked;

    return (useUppercase ? UPPERCASE_CHARS.length : 0) +
        (useLowercase ? LOWERCASE_CHARS.length : 0) +
        (useNumbers ? NUMBER_CHARS.length : 0) +
        (useSymbols ? SYMBOL_CHARS.length : 0);
}

function computeEntropyBits(length, poolSize) {
    if (!length || !poolSize) return 0;
    return length * Math.log2(poolSize);
}

function strengthLevel(entropyBits) {
    if (entropyBits >= 80) return { level: "strong", key: "strengthStrong" };
    if (entropyBits >= 60) return { level: "good", key: "strengthGood" };
    if (entropyBits >= 40) return { level: "fair", key: "strengthFair" };
    return { level: "weak", key: "strengthWeak" };
}

function updateStrengthUI(pwd) {
    if (!strengthWrapEl || !strengthBarEl || !strengthFillEl || !strengthTextEl || !strengthEntropyEl) return;

    const poolSize = getPoolSize();
    const length = +lengthEl.value || 0;

    // Error/warning = reset meter
    if (!pwd || pwd.startsWith("⚠️")) {
        strengthWrapEl.dataset.strength = "none";
        strengthBarEl.setAttribute("aria-valuenow", "0");
        strengthFillEl.style.width = "0%";
        strengthTextEl.textContent = "—";
        strengthEntropyEl.textContent = "—";
        if (warningEl) warningEl.hidden = true;
        return;
    }

    const entropy = computeEntropyBits(length, poolSize);
    const pct = Math.max(0, Math.min(100, Math.round((entropy / 80) * 100)));
    const lvl = strengthLevel(entropy);

    strengthWrapEl.dataset.strength = lvl.level;
    strengthBarEl.setAttribute("aria-valuenow", String(pct));
    strengthFillEl.style.width = `${pct}%`;
    strengthTextEl.textContent = t(lvl.key);
    strengthEntropyEl.textContent = `≈ ${entropy.toLocaleString(LANG, { maximumFractionDigits: 1 })} bits`;

    // Warn if too weak
    if (warningEl) warningEl.hidden = !(entropy < 40);
}

function bindShortcuts() {
    document.addEventListener("keydown", (e) => {
        const tag = (e.target && e.target.tagName ? e.target.tagName.toLowerCase() : "");
        const isTyping =
            tag === "input" ||
            tag === "textarea" ||
            tag === "select" ||
            (e.target && e.target.isContentEditable);

        if (isTyping) return;

        // Escape closes the right list
        if (e.key === "Escape") {
            if (bulkDrawerEl && bulkDrawerEl.classList.contains("open")) {
                e.preventDefault();
                toggleDrawer(false);
            }
            return;
        }

        // Ctrl/Cmd + Enter -> generate x10
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            generateBulk(10);
            return;
        }

        // Enter -> regenerate
        if (e.key === "Enter") {
            e.preventDefault();
            generatePassword();
            return;
        }

        // Ctrl/Cmd + C -> copy
        if ((e.ctrlKey || e.metaKey) && (e.key || "").toLowerCase() === "c") {
            const sel = (window.getSelection ? window.getSelection().toString() : "");
            if (sel) return; // let user copy selection
            e.preventDefault();
            copyPassword();
        }
    });
}

function toggleBulk(show) {
    if (!bulkWrapEl || !bulkResultEl) return;
    bulkWrapEl.hidden = !show;
    if (!show) bulkResultEl.value = "";
}

function toggleDrawer(show, text) {
    if (!bulkDrawerEl || !bulkDrawerListEl) return;

    if (typeof text === "string") {
        bulkDrawerListEl.value = text;
        bulkDrawerListEl.scrollTop = 0;
    }

    bulkDrawerEl.classList.toggle("open", !!show);
    bulkDrawerEl.setAttribute("aria-hidden", show ? "false" : "true");

    if (!show) bulkDrawerListEl.value = "";
}

function openDrawer(text) {
    toggleDrawer(true, text);
}

function copyDrawer() {
    const val = (bulkDrawerListEl?.value || "").trim();
    if (!val) return;
    navigator.clipboard.writeText(val).then(() => {
        showToast(t("toastCopiedBulk"));
    });
}

function buildPool() {
    const useUppercase = document.getElementById("uppercase")?.checked;
    const useLowercase = document.getElementById("lowercase")?.checked;
    const useNumbers = document.getElementById("numbers")?.checked;
    const useSymbols = document.getElementById("symbols")?.checked;

    let pool = "";
    if (useUppercase) pool += UPPERCASE_CHARS;
    if (useLowercase) pool += LOWERCASE_CHARS;
    if (useNumbers) pool += NUMBER_CHARS;
    if (useSymbols) pool += SYMBOL_CHARS;
    return pool;
}

function generateOne(length, pool) {
    let out = "";
    for (let i = 0; i < length; i++) {
        const r = Math.floor(Math.random() * pool.length);
        out += pool[r];
    }
    return out;
}

// UI helpers
function syncNumber() {
    lengthEl.value = rangeEl.value;
}

function syncRange() {
    rangeEl.value = lengthEl.value;
}

function clampLength() {
    let v = parseInt(lengthEl.value || 12, 10);
    if (v > 100) v = 100;
    if (v < 4) v = 4;
    lengthEl.value = v;
}

function savePrefs() {
    const length = +lengthEl.value || 12;
    const useUppercase = document.getElementById("uppercase")?.checked;
    const useLowercase = document.getElementById("lowercase")?.checked;
    const useNumbers = document.getElementById("numbers")?.checked;
    const useSymbols = document.getElementById("symbols")?.checked;
    const regenOnCopy = document.getElementById("regenOnCopy")?.checked;

    setCookie("genPrefs", JSON.stringify({
        length,
        useUppercase,
        useLowercase,
        useNumbers,
        useSymbols,
        regenOnCopy
    }));
}

function restorePrefs() {
    const raw = getCookie("genPrefs");
    if (!raw) return;
    try {
        const p = JSON.parse(raw);
        lengthEl.value = Math.min(100, Math.max(4, p.length ?? 12));
        rangeEl.value = lengthEl.value;
        document.getElementById("uppercase").checked = !!p.useUppercase;
        document.getElementById("lowercase").checked = !!p.useLowercase;
        document.getElementById("numbers").checked = !!p.useNumbers;
        document.getElementById("symbols").checked = !!p.useSymbols;
        document.getElementById("regenOnCopy").checked = !!p.regenOnCopy;
    } catch { }
}

// Core actions
function generatePassword() {
    clampLength();
    const length = +lengthEl.value;

    // Single code generation hides bulk area to avoid confusion
    toggleBulk(false);

    const pool = buildPool();
    if (!pool) {
        resultEl.textContent = "⚠️";
        updateStrengthUI(resultEl.textContent);
        return;
    }

    const pwd = generateOne(length, pool);
    resultEl.textContent = pwd;
    updateStrengthUI(pwd);
    savePrefs();
}

function generateBulk(count = 10) {
    clampLength();
    const length = +lengthEl.value;
    const pool = buildPool();

    if (!pool) {
        toggleBulk(false);
        resultEl.textContent = "⚠️";
        updateStrengthUI(resultEl.textContent);
        return;
    }

    const codes = [];
    for (let i = 0; i < count; i++) {
        codes.push(generateOne(length, pool));
    }

    // Show representative code in the main result
    resultEl.textContent = codes[0];
    updateStrengthUI(codes[0]);

    if (bulkResultEl) bulkResultEl.value = codes.join("\n");
    toggleBulk(true);
    savePrefs();
}

function showToast(msg) {
    if (!toastEl) return;
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
        if (document.getElementById("regenOnCopy")?.checked) {
            generatePassword();
        }
    });
}

function copyBulk() {
    const val = (bulkResultEl?.value || "").trim();
    if (!val) return;

    navigator.clipboard.writeText(val).then(() => {
        showToast(t("toastCopiedBulk"));

        // Open the list on the right with what you just copied
        openDrawer(val);

        if (document.getElementById("regenOnCopy")?.checked) {
            generateBulk(10);
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
        if (websiteName) websiteName.textContent = `${t("siteTitle")} | ${u.name || u.login}`;
        link.href = u.html_url;
        link.textContent = u.name || u.login;
        meta.textContent = `@${u.login}`;
    } catch (e) {
        if (meta) meta.textContent = t("profileLoading");
    }
}

function init() {
    applyI18n();
    restorePrefs();
    syncRange();
    generatePassword();
    loadGitHubCard();
    bindShortcuts();
}

window.addEventListener("load", init);
