/* Módulo de Persistência e Gerenciamento de Dados (localStorage) */

const STORAGE_KEY = "ong_cadastros";

/**
 * Salva um novo objeto de cadastro no localStorage.
 * @param {Object} novoCadastro 
 */
export function salvarCadastro(novoCadastro) {
    const cadastrosSalvos = obterCadastros();
    cadastrosSalvos.push(novoCadastro);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cadastrosSalvos));
}

/**
 * Recupera e converte todos os cadastros salvos do localStorage.
 * @returns {Array} Lista de cadastros
 */
export function obterCadastros() {
    const dadosString = localStorage.getItem(STORAGE_KEY);
    return dadosString ? JSON.parse(dadosString) : [];
}