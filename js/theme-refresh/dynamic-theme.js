function setPreferredTheme(){
    const isDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
    const html = document.getElementById("html");

    isDark ? html.setAttribute("data-bs-theme", "dark") : html.setAttribute("data-bs-theme", "light");
}