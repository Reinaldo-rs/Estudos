const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
}

const ICONS = {
    DARK: '☀️',
    LIGHT: '🌙'
}

const STORAGE_KEYS = 'currentTheme'

const elements = {
    body: document.querySelector('body'),
    toggleIcon: document.querySelector('.toggle-icon'),
    themeToggle: document.getElementById('themeToggle')
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

    const validTheme = theme === THEMES.DARK ? THEMES.DARK : THEMES.LIGHT

    elements.body.dataset.theme = validTheme
    updateIcon(validTheme)
}

/**
 * Alterna entre os temas
 */
function toggleTheme() {
    const currentTheme = elements.body?.dataset.theme || THEMES.LIGHT
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK

    localStorage.setItem(STORAGE_KEYS, newTheme)
    applyTheme(newTheme)
}

function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS) || THEMES.LIGHT
    applyTheme(savedTheme)
}

if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', toggleTheme)
}

initTheme()



const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const displayUserName = document.getElementById('displayUserName');
const userWelcome = document.getElementById('userWelcome');
const userNameInput = document.getElementById('userName');

let currentUser = null;

// Login ao clicar no botão
loginBtn.addEventListener('click', () => {
    const userName = userNameInput.value.trim();

    if (userName) {
        currentUser = userName;
        displayUserName.textContent = userName;

        // Fechar modal
        loginModal.classList.add('hidden');

        // Mostrar mensagem de boas-vindas
        setTimeout(() => {
            userWelcome.classList.add('show');
        }, 300);

        console.log(`✅ Usuário logado: ${userName}`);
    } else {
        // Animação de shake se o campo estiver vazio
        userNameInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            userNameInput.style.animation = '';
        }, 500);
        userNameInput.focus();
    }
});




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