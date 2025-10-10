// ============================================================================
// CONFIGURAÇÕES E CONSTANTES
// ============================================================================

const CONFIG = {
  themes: {
    DARK: 'dark',
    LIGHT: 'light'
  },
  icons: {
    DARK: '☀️',
    LIGHT: '🌙'
  },
  storageKeys: {
    theme: 'currentTheme',
    user: 'currentUser',
    notifications: 'notifications'
  },
  notificationOptions: {
    YES: 'Sim',
    NO: 'Não'
  },
  cookieExpiration: 7, // dias
  animations: {
    modalDelay: 300,
    inputFocusDelay: 100,
    shakeTimeout: 500
  }
}

// ============================================================================
// UTILIDADES DE ARMAZENAMENTO
// ============================================================================

const Storage = {
  /**
   * Define um cookie com suporte a UTF-8 usando Base64
   * @param {string} name - Nome do cookie
   * @param {string} value - Valor do cookie
   * @param {number} days - Dias até expiração
   */
  setCookie(name, value, days = CONFIG.cookieExpiration) {
    const expires = new Date()
    expires.setDate(expires.getDate() + days)

    const encoder = new TextEncoder()
    const bytes = encoder.encode(value)
    const base64 = btoa(String.fromCharCode(...bytes))

    document.cookie = `${name}=${base64}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
  },

  /**
   * Obtém o valor de um cookie com decodificação UTF-8
   * @param {string} name - Nome do cookie
   * @returns {string|null} Valor do cookie ou null
   */
  getCookie(name) {
    const cookies = document.cookie.split(';').map(c => c.trim())
    const cookie = cookies.find(c => c.startsWith(`${name}=`))

    if (!cookie) return null

    try {
      const base64 = cookie.slice(name.length + 1)
      const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
      return new TextDecoder().decode(bytes)
    } catch (error) {
      console.error('Erro ao decodificar cookie:', error)
      return null
    }
  },

  localStorage: {
    /**
     * Obtém um item do localStorage
     */
    get(key) {
      return localStorage.getItem(key)
    },

    /**
     * Define um item no localStorage
     */
    set(key, value) {
      localStorage.setItem(key, value)
    }
  },

  sessionStorage: {
    /**
     * Obtém um item do sessionStorage
     */
    get(key) {
      return sessionStorage.getItem(key)
    },

    /**
     * Define um item no sessionStorage
     */
    set(key, value) {
      sessionStorage.setItem(key, value)
    }
  }
}

// ============================================================================
// GERENCIAMENTO DE ELEMENTOS DOM
// ============================================================================

const DOM = {
  _elements: null,

  /**
   * Inicializa e retorna cache de elementos DOM
   * @returns {Object} Objeto com referências aos elementos
   */
  getElements() {
    if (this._elements) return this._elements

    this._elements = {
      body: document.body,
      themeToggle: document.getElementById('themeToggle'),
      loginBtn: document.getElementById('loginBtn'),
      loginModal: document.getElementById('loginModal'),
      loginForm: document.getElementById('loginForm'),
      userNameInput: document.getElementById('userNameInput'),
      displayUserName: document.getElementById('displayUserName'),
      userWelcome: document.getElementById('userWelcome'),
      userName: document.getElementById('userName'),
      notificationOverlay: document.getElementById('notificationOverlay'),
      notificationPanel: document.querySelector('.notification-panel'),
      notificationToggle: document.getElementById('notificationToggle'),
      toggleLabel: document.getElementById('toggleLabel'),
      confirmBtn: document.getElementById('confirmBtn'),
      notificationFooter: document.querySelector('.notification-footer')
    }

    return this._elements
  },

  /**
   * Adiciona uma classe a um elemento
   */
  addClass(element, className) {
    element?.classList.add(className)
  },

  /**
   * Remove uma classe de um elemento
   */
  removeClass(element, className) {
    element?.classList.remove(className)
  },

  /**
   * Verifica se um elemento possui uma classe
   */
  hasClass(element, className) {
    return element?.classList.contains(className) || false
  },

  /**
   * Alterna uma classe em um elemento
   */
  toggleClass(element, className) {
    element?.classList.toggle(className)
  }
}

// ============================================================================
// GERENCIAMENTO DE TEMA
// ============================================================================

const ThemeManager = {
  /**
   * Atualiza o ícone do botão de tema
   * @param {string} theme - Tema atual
   */
  updateIcon(theme) {
    const elements = DOM.getElements()
    const icon = theme === CONFIG.themes.DARK
      ? CONFIG.icons.DARK
      : CONFIG.icons.LIGHT

    if (elements.themeToggle) {
      elements.themeToggle.textContent = icon
    }
  },

  /**
   * Aplica o tema na interface
   * @param {string} theme - Tema a ser aplicado
   */
  applyTheme(theme) {
    const elements = DOM.getElements()
    const validTheme = theme === CONFIG.themes.DARK
      ? CONFIG.themes.DARK
      : CONFIG.themes.LIGHT

    elements.body.dataset.theme = validTheme
    this.updateIcon(validTheme)
  },

  /**
   * Obtém o tema atual
   * @returns {string} Tema atual
   */
  getCurrentTheme() {
    const elements = DOM.getElements()
    return elements.body.dataset.theme || CONFIG.themes.LIGHT
  },

  /**
   * Alterna entre temas claro e escuro
   */
  toggle() {
    const currentTheme = this.getCurrentTheme()
    const newTheme = currentTheme === CONFIG.themes.DARK
      ? CONFIG.themes.LIGHT
      : CONFIG.themes.DARK

    Storage.localStorage.set(CONFIG.storageKeys.theme, newTheme)
    this.applyTheme(newTheme)
  },

  /**
   * Inicializa o tema com base no localStorage
   */
  init() {
    const savedTheme = Storage.localStorage.get(CONFIG.storageKeys.theme)
      || CONFIG.themes.LIGHT
    this.applyTheme(savedTheme)
  }
}

// ============================================================================
// GERENCIAMENTO DE AUTENTICAÇÃO
// ============================================================================

const AuthManager = {
  /**
   * Fecha o modal de login
   */
  closeModal() {
    const elements = DOM.getElements()
    DOM.addClass(elements.loginModal, 'hidden')

    setTimeout(() => {
      DOM.addClass(elements.userWelcome, 'show')
    }, CONFIG.animations.modalDelay)
  },

  /**
   * Atualiza a interface com o nome do usuário
   * @param {string} userName - Nome do usuário
   */
  displayUser(userName) {
    const elements = DOM.getElements()

    if (elements.userName) {
      elements.userName.textContent = userName
    }
    if (elements.displayUserName) {
      elements.displayUserName.textContent = userName
    }
  },

  /**
   * Aplica o estado de autenticação do usuário
   * @param {string} userName - Nome do usuário
   */
  applyUser(userName) {
    if (!userName) return

    this.displayUser(userName)
    this.closeModal()
  },

  /**
   * Anima o campo de input quando vazio (shake effect)
   */
  shakeInput() {
    const elements = DOM.getElements()
    DOM.addClass(elements.userNameInput, 'shake')

    setTimeout(() => {
      DOM.removeClass(elements.userNameInput, 'shake')
    }, CONFIG.animations.shakeTimeout)

    elements.userNameInput?.focus()
  },

  /**
   * Valida e processa o login do usuário
   */
  login() {
    const elements = DOM.getElements()
    const userName = elements.userNameInput.value.trim()

    if (!userName) {
      this.shakeInput()
      return
    }

    Storage.sessionStorage.set(CONFIG.storageKeys.user, userName)
    this.displayUser(userName)
    this.closeModal()

    // Exibe notificação após login
    const notificationState = elements.toggleLabel?.textContent || CONFIG.notificationOptions.YES
    NotificationManager.show(notificationState)
  },

  /**
   * Foca no campo de input do modal
   */
  focusInput() {
    const elements = DOM.getElements()
    setTimeout(() => {
      elements.userNameInput?.focus()
    }, CONFIG.animations.inputFocusDelay)
  },

  /**
   * Inicializa o estado de autenticação
   */
  init() {
    const savedUser = Storage.sessionStorage.get(CONFIG.storageKeys.user)

    if (savedUser) {
      this.applyUser(savedUser)
    } else {
      this.focusInput()
    }

    // Remove flag de loading após inicialização
    const elements = DOM.getElements()
    elements.body.removeAttribute('data-loading')
  }
}

// ============================================================================
// GERENCIAMENTO DE NOTIFICAÇÕES
// ============================================================================

const NotificationManager = {
  /**
   * Atualiza a cor do label do toggle
   * @param {boolean} enabled - Estado do toggle
   */
  updateToggleColor(enabled) {
    const elements = DOM.getElements()
    if (!elements.toggleLabel) return

    elements.toggleLabel.style.color = enabled ? '#8b5cf6' : '#ef4444'
  },

  /**
   * Define o estado visual da notificação
   * @param {string} state - Estado da notificação ('Sim' ou 'Não')
   */
  setState(state) {
    const elements = DOM.getElements()
    if (!elements.toggleLabel) return

    const validState = state === CONFIG.notificationOptions.NO
      ? CONFIG.notificationOptions.NO
      : CONFIG.notificationOptions.YES

    elements.toggleLabel.textContent = validState
  },

  /**
   * Obtém o estado atual da notificação
   * @returns {string} Estado atual
   */
  getCurrentState() {
    const elements = DOM.getElements()
    return elements.toggleLabel?.textContent || CONFIG.notificationOptions.YES
  },

  /**
   * Alterna o estado da notificação
   */
  toggle() {
    const elements = DOM.getElements()
    const currentState = this.getCurrentState()
    const isCurrentlyNo = currentState === CONFIG.notificationOptions.NO

    // Atualiza checkbox
    if (elements.notificationToggle) {
      elements.notificationToggle.checked = isCurrentlyNo
    }

    // Define novo estado
    const newState = isCurrentlyNo
      ? CONFIG.notificationOptions.YES
      : CONFIG.notificationOptions.NO

    // Atualiza interface
    this.updateToggleColor(isCurrentlyNo)
    Storage.setCookie(CONFIG.storageKeys.notifications, newState)
    this.setState(newState)
  },

  /**
   * Exibe o painel de notificações
   * @param {string} cookieValue - Valor do cookie de notificação
   */
  show(cookieValue) {
    const elements = DOM.getElements()
    const isModalHidden = DOM.hasClass(elements.loginModal, 'hidden')

    if (!isModalHidden) return

    if (cookieValue === CONFIG.notificationOptions.YES) {
      DOM.addClass(elements.notificationOverlay, 'show')
      DOM.addClass(elements.notificationPanel, 'show')
    } else {
      DOM.addClass(elements.notificationPanel, 'show')
      DOM.addClass(elements.notificationFooter, 'hidden')
      console.log('Deu bao')
    }
  },

  /**
   * Oculta o painel de notificações
   */
  hide() {
    const elements = DOM.getElements()
    const notificationState = Storage.getCookie(CONFIG.storageKeys.notifications)
    const shouldShowAgain = notificationState === CONFIG.notificationOptions.YES

    // Remove overlay
    DOM.removeClass(elements.notificationOverlay, 'show')
    DOM.addClass(elements.notificationFooter, 'hidden')

    // Controla exibição do painel baseado na preferência
    if (shouldShowAgain) {
      DOM.removeClass(elements.notificationPanel, 'show')
    } else {
      DOM.addClass(elements.notificationPanel, 'show')
    }
  },

  /**
   * Inicializa o sistema de notificações
   */
  init() {
    try {
      const savedState = Storage.getCookie(CONFIG.storageKeys.notifications)
        || CONFIG.notificationOptions.YES

      const elements = DOM.getElements()

      // Atualiza checkbox
      if (elements.notificationToggle) {
        elements.notificationToggle.checked =
          savedState === CONFIG.notificationOptions.YES
      }

      // Atualiza interface
      this.updateToggleColor(savedState === CONFIG.notificationOptions.YES)
      this.setState(savedState)
      this.show(savedState)
    } catch (error) {
      console.error('Erro ao inicializar notificações:', error)
      // Fallback para estado padrão
      this.setState(CONFIG.notificationOptions.YES)

      const elements = DOM.getElements()
      if (elements.notificationToggle) {
        elements.notificationToggle.checked = true
      }
    }
  }
}

// ============================================================================
// GERENCIAMENTO DE EVENTOS
// ============================================================================

const EventManager = {
  /**
   * Registra evento de alternância de tema
   */
  registerThemeEvents() {
    const elements = DOM.getElements()

    elements.themeToggle?.addEventListener('click', () => {
      ThemeManager.toggle()
    })
  },

  /**
   * Registra eventos de autenticação
   */
  registerAuthEvents() {
    const elements = DOM.getElements()

    // Login ao clicar no botão
    elements.loginBtn?.addEventListener('click', (e) => {
      e.preventDefault()
      AuthManager.login()
    })

    // Login ao submeter o form
    elements.loginForm?.addEventListener('submit', (e) => {
      e.preventDefault()
      AuthManager.login()
    })

    // Login ao pressionar Enter no input
    elements.userNameInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        AuthManager.login()
      }
    })
  },

  /**
   * Registra eventos de notificações
   */
  registerNotificationEvents() {
    const elements = DOM.getElements()

    // Alternar notificação
    elements.notificationToggle?.addEventListener('change', () => {
      NotificationManager.toggle()
    })

    // Confirmar e fechar painel
    elements.confirmBtn?.addEventListener('click', () => {
      NotificationManager.hide()
    })
  },

  /**
   * Registra todos os event listeners
   */
  init() {
    this.registerThemeEvents()
    this.registerAuthEvents()
    this.registerNotificationEvents()
  }
}

// ============================================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ============================================================================

const App = {
  /**
   * Inicializa todos os módulos da aplicação
   */
  init() {
    // Inicializa módulos principais
    ThemeManager.init()
    AuthManager.init()
    EventManager.init()

    // Inicializa notificações após DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        NotificationManager.init()
      })
    } else {
      NotificationManager.init()
    }
  },

  /**
   * Método para debug (remover em produção)
   */
  debug() {
    console.log('🚀 UserPreferences App inicializado')
    console.log('📦 Tema atual:', ThemeManager.getCurrentTheme())
    console.log('👤 Usuário:', Storage.sessionStorage.get(CONFIG.storageKeys.user) || 'Não logado')
    console.log('🔔 Notificações:', Storage.getCookie(CONFIG.storageKeys.notifications) || 'Não configurado')
  }
}

// Inicializa a aplicação
App.init()

// Debug mode (comentar em produção)
// App.debug()