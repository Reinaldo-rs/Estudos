const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
}

const ICONS = {
    DARK: '☀️',
    LIGHT: '🌙'
}

const STORAGE_KEYS = {
    local: {
        currentTheme: 'currentTheme',
    },
    session: {
        currentUser: 'currentUser',
    },
    cookie: {
        notifications: 'notifications',
    },
}

const POPUP_RESPONSE = {
    YES: 'Sim',
    NO: 'Não'
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
    userName: document.getElementById('user-name'),
    notificationOverlay: document.querySelector('.notification-overlay'),
    notificationPanel: document.querySelector('.notification-panel'),
    confirmBtn: document.getElementById('confirm-btn'),
    toggleLabel: document.getElementById('toggleLabel'),
    notificationToggle: document.getElementById('notificationToggle'),
    notificationBtn: document.querySelector('.notification-btn')
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

    localStorage.setItem(STORAGE_KEYS.local.currentTheme, newTheme)
    applyTheme(newTheme)
}

function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.local.currentTheme) || THEMES.LIGHT
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
}

function closeModal() {
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
        sessionStorage.setItem(STORAGE_KEYS.session.currentUser, userName)
        elements.userName.textContent = userName
        closeModal()
        showPopup(elements.toggleLabel.textContent)
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
    const savedUser = sessionStorage.getItem(STORAGE_KEYS.session.currentUser) || null
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

// ------------NOTIFICAÇAO--------------

// Função para definir um cookie com suporte a caracteres especiais e acentos
function setCookie(name, value, days = 7) {
    const expires = new Date()
    expires.setDate(expires.getDate() + days)

    // Converte string para bytes UTF-8 e depois para Base64
    const encoder = new TextEncoder()
    const bytes = encoder.encode(value)
    const base64 = btoa(String.fromCharCode(...bytes))

    document.cookie = `${name}=${base64}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

// Função para obter o valor de um cookie
function getCookie(name) {
    const cookieString = document.cookie || ''
    const cookies = cookieString.split(';').map(c => c.trim())
    const token = name + '='
    const pair = cookies.find(c => c.startsWith(token))

    if (!pair) return null

    try {
        // Decodifica do Base64 para bytes UTF-8 e depois para string
        const base64 = pair.slice(token.length)
        const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
        const decoder = new TextDecoder()
        return decoder.decode(bytes)
    } catch (e) {
        console.error('Erro ao decodificar cookie:', e)
        return null
    }
}

function setPopupState(popup) {
    if (!elements.userName) return

    const validPopup = popup === POPUP_RESPONSE.NO
        ? POPUP_RESPONSE.NO
        : POPUP_RESPONSE.YES

    elements.toggleLabel.textContent = validPopup
}

function togglePopup() {
    const isCurrentlyNo = elements.toggleLabel?.textContent === POPUP_RESPONSE.NO
    elements.notificationToggle.checked = isCurrentlyNo
    const newPopup = isCurrentlyNo ? POPUP_RESPONSE.YES : POPUP_RESPONSE.NO
    updateToggleLabel(isCurrentlyNo)
    console.log(newPopup)
    setCookie(STORAGE_KEYS.cookie.notifications, newPopup)
    setPopupState(newPopup)
}

function updateToggleLabel(enabled) {
  elements.toggleLabel.style.color = enabled ? '#8b5cf6' : '#ef4444';
}

function initPopup() {
    try {
        // Busca o valor salvo no cookie
        const savedPopup = getCookie(STORAGE_KEYS.cookie.notifications)

        // Define valor padrão se não existir
        const popupState = savedPopup !== null ? savedPopup : 'Sim'

        // Atualiza o checkbox se existir
        if (elements.notificationToggle) {
            elements.notificationToggle.checked = (popupState === 'Sim')
        }

        // Aplica o estado
        setPopupState(popupState)

        console.log('Popup inicializado:', popupState)
        showPopup(popupState)
    } catch (error) {
        console.error('Erro ao inicializar popup:', error)
        // Fallback para estado padrão em caso de erro
        setPopupState('Sim')
        if (elements.notificationToggle) {
            elements.notificationToggle.checked = true
        }
    }
}


if (elements.notificationToggle) {
    elements.notificationToggle.addEventListener('change', togglePopup)
}

function showPopup(cookieExists) {
    const modalHidden = elements.loginModal?.classList.contains('hidden')

    if (!modalHidden) return

    if (cookieExists === 'Sim') {
        elements.notificationOverlay.classList.add('show')
        elements.notificationPanel.classList.add('show')
    } else {
        elements.notificationPanel.classList.add('show')
        elements.notificationBtn.classList.add('hidden')
    }
}

// Executa de forma segura
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopup)
} else {
    initPopup()
}


elements.confirmBtn.addEventListener('click', () => {
    elements.notificationOverlay.classList.remove('show')
    elements.notificationBtn.classList.add('hidden')
 })