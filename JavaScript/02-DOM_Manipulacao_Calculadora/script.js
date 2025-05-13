const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
    charKeyBtn.addEventListener('click', function () {
        // dataset é usado para acessar os atributos data
        const value = charKeyBtn.dataset.value
        input.value += value
    })
})

document.getElementById('clear').addEventListener('click', function () {
    input.value = ''
    input.focus()
})

// keydown - evento de tecla pressionada
input.addEventListener('keydown', function (ev) {
    ev.preventDefault()
    // ev.key é a tecla associada ao evendo (tecla que o usuário pressionou)
    if (allowedKeys.includes(ev.key)) {
        input.value += ev.key
        return
    }
    if (ev.key === 'Backspace') {
        // O método slice é usado para extrair uma parte da string
        // slice(0, -1) significa: comece no índice 0 e vá até o último caracter mas sem incluir o ultimo
        input.value = input.value.slice(0, -1)
    }
    if (ev.key === 'Enter') {
        calculate()
    }
})

document.getElementById('equal').addEventListener('click', calculate)

function calculate() {
    // Exibe 'ERROR' como valor inicial para indicar falha se o cálculo der erro no eval
    resultInput.value = 'ERROR'
    resultInput.classList.add('error')
    //  eval() é uma função do que executa uma string como se fosse código JavaScript (é perigosa de usar)
    const resul = eval(input.value)
    resultInput.value = resul
    resultInput.classList.remove('error')
}

document.getElementById('copyToClipboard').addEventListener('click', function (ev) {
    const button = ev.currentTarget
    if (button.innerText === 'Copiar') {
        button.innerText = 'Copiado!'
        // classList.add adiciona uma classe CSS ao elemento
        button.classList.add('success')
        // navigator.clipboard.writeText copia o texto fornecido para a área de transferência (clipboard)
        navigator.clipboard.writeText(resultInput.value)
    } else {
        button.innerText = 'Copiar'
        button.classList.remove('success')
    }
})

document.getElementById('themeSwitcher').addEventListener('click', function () {
    if (main.dataset.theme === "dark") {
        // setProperty define dinamicamente o valor de uma variável CSS (custom property) no estilo do elemento.
        root.style.setProperty("--bg-color", "#f1f5f9")
        root.style.setProperty("--border-color", "#aaa")
        root.style.setProperty("--font-color", "#212529")
        root.style.setProperty("--primary-color", "#7e57c2")
        main.dataset.theme = "light"
    } else {
        root.style.setProperty("--bg-color", "#212529")
        root.style.setProperty("--border-color", "#666")
        root.style.setProperty("--font-color", "#f1f5f9")
        root.style.setProperty("--primary-color", "#b388ff")
        main.dataset.theme = "dark"
    }
})