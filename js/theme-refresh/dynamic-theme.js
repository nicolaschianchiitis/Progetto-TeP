let temaAttuale = "dark"

function setPreferredTheme(){
    const tema = document.getElementById("html").getAttribute("data-bs-theme");
    const isDark = () => tema == "dark";
    const html = document.getElementById("html");

    isDark() ? html.setAttribute("data-bs-theme", "dark") : html.setAttribute("data-bs-theme", "light");
}

function setTheme(mode){
    const html = document.getElementById("html");
    const btnTema = document.getElementById("btnTema");
    if (mode == "dark" || mode == "light"){
        html.setAttribute("data-bs-theme", mode);
    }
    btnTema
}