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

        if(!getCookie(STORAGE_KEYS.cookie.notifications)) {
        elements.notificationOverlay.classList.add('show') // exibir notificações como modal
        console.log("chegou aqui - 1")
        } else {
            getCookie(STORAGE_KEYS.cookie.notifications) === 'Sim'
            ? elements.notificationOverlay.classList.add('show')
            : elements.notificationOverlay.classList.remove('show')

            console.log("chegou aqui - 2")
        }
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

// Função para obter o valor de um cookie
function getCookie(name) {
  const cookieString = document.cookie || '';
  const cookies = cookieString.split(';').map(c => c.trim());
  const token = name + '=';
  const pair = cookies.find(c => c.startsWith(token));
  return pair ? decodeURIComponent(pair.slice(token.length)) : null;
}

// Função para definir um cookie (com expiração e path)
function setCookie(name, value, days = 7) {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie =
    `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
}

// Estado das notificações (inicialmente ativado)
function setNotification () {
    let notificationsEnabled = true
    notificationsEnabled = elements.notificationToggle.checked

    if (notificationsEnabled) {
        elements.toggleLabel.textContent = 'Sim'
        elements.toggleLabel.style.color = '#8b5cf6'
        setCookie(STORAGE_KEYS.cookie.notifications, 'Sim')
        // document.cookie = "notifications=enabled; max-age=31536000; path=/"; // 1 ano
    } else {
        elements.toggleLabel.textContent = 'Não'
        elements.toggleLabel.style.color = '#ef4444'
        setCookie(STORAGE_KEYS.cookie.notifications, 'Nao')
        // document.cookie = "notifications=disabled; max-age=31536000; path=/"; // 1 ano
    }
}

elements.notificationToggle.addEventListener('change', setNotification)

initNotificationState()

function initNotificationState() {
    notificationLoaded = elements.notificationPanel.classList.contains('load')
    if (notificationLoaded) {
        elements.notificationOverlay.classList.add('show')
        elements.notificationPanel.classList.add('show')
        setCookie(STORAGE_KEYS.cookie.notifications, 'Não')
        setNotification ()
    } else {
        elements.notificationOverlay.classList.remove('show')
        elements.notificationPanel.classList.add('show')
        setCookie(STORAGE_KEYS.cookie.notifications, 'Sim')
        setNotification ()
    }
}

elements.confirmBtn.addEventListener('click', () => {
    elements.notificationOverlay.classList.remove('show')
    if (elements.toggleLabel.textContent === 'Sim') {
     elements.notificationPanel.classList.add('load')
     elements.notificationPanel.classList.remove('show')
    } else {
    elements.notificationPanel.classList.remove('load')
    }
})