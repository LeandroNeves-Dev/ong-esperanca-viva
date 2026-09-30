/* Módulo de Roteamento e Navegação SPA */

import { setupFormEvents } from "./validation.js";

/**
 * Inicializa os ouvintes de eventos globais para controle de rotas da SPA.
 */
export function initSPA() {
    // Intercepta cliques em links de navegação
    document.addEventListener("click", (e) => {
        const targetAnchor = e.target.closest("a");
        if (targetAnchor) {
            const href = targetAnchor.getAttribute("href");
            if (href && (href.endsWith(".html") || ["index.html", "projetos.html", "cadastro.html"].includes(href))) {
                e.preventDefault();
                navigateTo(href);
            }
        }
    });

    // Lida com botões Voltar/Avançar do navegador
    window.addEventListener("popstate", (e) => {
        const route = e.state ? e.state.route : location.pathname.split("/").pop();
        navigateTo(route || "index.html", false);
    });
}

/**
 * Carrega dinamicamente o arquivo de destino e substitui o conteúdo principal.
 * @param {string} targetFile 
 * @param {boolean} pushToHistory 
 */
export async function navigateTo(targetFile, pushToHistory = true) {
    const mainContent = document.querySelector("#conteudo-principal");
    let cleanFileName = targetFile.split("/").pop().split("?")[0].split("#")[0] || "index.html";

    try {
        const response = await fetch(cleanFileName);
        if (!response.ok) throw new Error(`Erro ao carregar ${cleanFileName}`);

        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        const newMain = doc.querySelector("#conteudo-principal");

        if (newMain && mainContent) {
            mainContent.innerHTML = newMain.innerHTML;
            window.scrollTo(0, 0);

            // Reassocia eventos de formulário se for a tela de cadastro
            if (cleanFileName === "cadastro.html") {
                setupFormEvents();
            }

            if (pushToHistory) {
                history.pushState({ route: cleanFileName }, "", cleanFileName);
            }
        }
    } catch (error) {
        console.error("Erro no roteamento SPA:", error);
    }
}