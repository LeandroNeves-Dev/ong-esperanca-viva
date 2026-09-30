/* Ponto de Entrada da Aplicação (Orquestrador) */

import { initSPA } from "./router.js";
import { setupFormEvents } from "./validation.js";

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa a navegação SPA
    initSPA();

    // Inicializa os eventos de validação se a página inicial carregada for a de cadastro
    setupFormEvents();
});