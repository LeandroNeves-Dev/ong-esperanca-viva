/* Módulo de Validação de Formulários e Máscaras */

import { salvarCadastro } from "./storage.js";

/**
 * Configura ouvintes de validação, máscaras e envio no formulário de cadastro.
 */
export function setupFormEvents() {
    const form = document.querySelector("#form-cadastro");
    if (!form) return;

    // Desativa a validação padrão do navegador
    form.setAttribute("novalidate", "true");

    // Aplicação de máscaras nos campos numéricos
    const inputCpf = document.querySelector("#cpf");
    const inputCep = document.querySelector("#cep");
    const inputTelefone = document.querySelector("#telefone");

    if (inputCpf) {
        inputCpf.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, "");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            e.target.value = value.substring(0, 14);
        });
    }

    if (inputCep) {
        inputCep.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, "");
            value = value.replace(/^(\d{5})(\d)/, "$1-$2");
            e.target.value = value.substring(0, 9);
        });
    }

    if (inputTelefone) {
        inputTelefone.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, "");
            value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
            value = value.replace(/(\d)(\d{4})$/, "$1-$2");
            e.target.value = value.substring(0, 15);
        });
    }

    // Intercepta a submissão do formulário
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputNome = document.querySelector("#nome");
        const inputEmail = document.querySelector("#email");
        const selectAjuda = document.querySelector("#tipo-ajuda");

        const nomeValido = validarCampo(inputNome, inputNome.value.trim().length >= 3, "Digite um nome com pelo menos 3 caracteres.");
        const emailValido = validarCampo(inputEmail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value.trim()), "Digite um e-mail válido.");
        const ajudaValida = validarCampo(selectAjuda, selectAjuda.value !== "", "Selecione uma opção de ajuda.");

        if (nomeValido && emailValido && ajudaValida) {
            const novoCadastro = {
                id: Date.now(),
                nome: inputNome.value.trim(),
                email: inputEmail.value.trim(),
                cpf: inputCpf ? inputCpf.value : "",
                cep: inputCep ? inputCep.value : "",
                telefone: inputTelefone ? inputTelefone.value : "",
                tipoAjuda: selectAjuda.value,
                mensagem: document.querySelector("#mensagem") ? document.querySelector("#mensagem").value.trim() : "",
                dataCadastro: new Date().toLocaleDateString("pt-BR")
            };

            salvarCadastro(novoCadastro);
            form.reset();
            alert("Cadastro realizado com sucesso!");
        }
    });
}

/**
 * Altera visualmente as classes do DOM e injeta mensagens de erro.
 */
export function validarCampo(inputElement, condicao, mensagemErro) {
    if (!inputElement) return false;

    let erroContainer = inputElement.parentElement.querySelector(".mensagem-erro-input");
    if (!erroContainer) {
        erroContainer = document.createElement("span");
        erroContainer.className = "mensagem-erro-input";
        inputElement.parentElement.appendChild(erroContainer);
    }

    if (!condicao) {
        inputElement.classList.add("input-invalido");
        inputElement.classList.remove("input-valido");
        erroContainer.innerText = mensagemErro;
        erroContainer.style.display = "block";
        return false;
    } else {
        inputElement.classList.remove("input-invalido");
        inputElement.classList.add("input-valido");
        erroContainer.innerText = "";
        erroContainer.style.display = "none";
        return true;
    }
}