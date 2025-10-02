const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
}

const ICONS = {
    DARK: '☀️',
    LIGHT: '🌙'
}

const STORAGE_KEYS = {
    currentTheme: 'currentTheme',
    currentUser: 'currentUser'
}

const elements = {
    body: document.querySelector('body'),
    toggleIcon: document.querySelector('.toggle-icon'),
    themeToggle: document.getElementById('themeToggle'),
    loginBtn: document.getElementById('loginBtn'),
    loginModal: document.getElementById('loginModal'),
    displayUserName: document.getElementById('displayUserName'),
    userWelcome: document.getElementById('userWelcome'),
    userNameInput: document.getElementById('userName'),
    userName: document.getElementById('user-name')
}

/**
 * Atualiza o ícone baseado no tema atual
 * @param {string} theme - Tema atual ('dark' ou 'light')
 */
function updateIcon(theme) {
    if (!elements.toggleIcon) return

    elements.themeToggle.textContent = theme === THEMES.DARK
        ? ICONS.DARK
        : ICONS.LIGHT
}

/**
 * Aplica o tema no body e atualiza o ícone
 * @param {string} theme - Tema a ser aplicado
 */
function applyTheme(theme) {
    if (!elements.body) return

    const validTheme = theme === THEMES.DARK
        ? THEMES.DARK
        : THEMES.LIGHT

    elements.body.dataset.theme = validTheme
    updateIcon(validTheme)
}

/**
 * Alterna entre os temas
 */
function toggleTheme() {
    const currentTheme = elements.body?.dataset.theme || THEMES.LIGHT
    const newTheme = currentTheme === THEMES.DARK
        ? THEMES.LIGHT
        : THEMES.DARK

    localStorage.setItem(STORAGE_KEYS.currentTheme, newTheme)
    applyTheme(newTheme)
}

function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.currentTheme) || THEMES.LIGHT
    applyTheme(savedTheme)
}

if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', toggleTheme)
}

initTheme()


function applyUser(user) {
    if (user) closeModal()
    elements.userName.textContent = user
    elements.displayUserName.textContent = user
    console.log(user + ' esse é o user')
}

function closeModal(){
    // Fechar modal
        elements.loginModal.classList.add('hidden')

        // Mostrar mensagem de boas-vindas
        setTimeout(() => {
            elements.userWelcome.classList.add('show')
        }, 300)
}

/**
 * Logar usando usuário
 */
function loginUser() {
    
    const userName = elements.userNameInput.value.trim() // verificar essa entrada
    
    if (userName) {
        elements.displayUserName.textContent = userName
        sessionStorage.setItem(STORAGE_KEYS.currentUser, userName)
        elements.userName.textContent = userName
        closeModal()
    } else {
        // Animação de shake se o campo estiver vazio
        elements.userNameInput.classList.add('shake')
        setTimeout(() => {
            elements.userNameInput.classList.remove('shake')
        }, 500)
        elements.userNameInput.focus()
    }
}

function initUser() {
    const savedUser = sessionStorage.getItem(STORAGE_KEYS.currentUser) || null
    console.log(savedUser + ' User salvo')
    applyUser(savedUser)
}

initUser()

// Login ao clicar no botão
if (elements.loginBtn) {
    elements.loginBtn.addEventListener('click', loginUser)
}

// Login ao pressionar Enter
elements.userNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        elements.loginBtn.click()
    }
})

// Focar no input quando o modal abrir
setTimeout(() => {
    elements.userNameInput.focus()
}, 100)





const condicao = false
if (condicao === true) {
    document.addEventListener('DOMContentLoaded', function () {
        const notificationPanel = document.querySelector('.notification-panel')

        const wellcome = document.createElement('div')
        wellcome.innerHTML = `
        < div class="notification-content" >
            <div class="notification-icon">🔔</div>
            <div class="notification-text">
                <h3>Notificações</h3>
                <p>Deseja recebendo boas vindas novamente?</p>
            </div>
            <div class="notification-toggle">
                <label class="switch">
                    <input type="checkbox" id="notificationToggle" checked>
                    <span class="slider"></span>
                </label>
                <span class="toggle-label" id="toggleLabel">Sim</span>
            </div>
        </div >
    `

        notificationPanel.appendChild(wellcome)
    })
}