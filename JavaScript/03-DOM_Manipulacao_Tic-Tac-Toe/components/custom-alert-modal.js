export function showModal({
    title = '',
    message = '',
    icon = '',
    buttonText = 'OK',
    closeOnEscape = true,
    closeOnBackdrop = true,
    showCloseButton = true,
    onConfirm = null
} = {}) {
    let modal = document.getElementById('modal-component');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-component';
        modal.className = 'modal-container';

        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';

        const box = document.createElement('div');
        box.className = 'modal-box';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');

        const btnClose = document.createElement('button');
        btnClose.className = 'modal-close';
        btnClose.setAttribute('aria-label', 'Fechar');
        btnClose.innerText = '×';

        const iconDiv = document.createElement('div');
        iconDiv.className = 'modal-icon';

        const titleEl = document.createElement('h2');
        titleEl.className = 'modal-title';

        const msgEl = document.createElement('p');
        msgEl.className = 'modal-message';

        const btnConfirm = document.createElement('button');
        btnConfirm.className = 'modal-confirm';

        box.append(btnClose, iconDiv, titleEl, msgEl, btnConfirm)

        modal.append(backdrop, box)

        document.body.appendChild(modal);
    }

    // Set content
    modal.querySelector('.modal-icon').textContent = icon;
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-message').textContent = message;
    modal.querySelector('.modal-confirm').textContent = buttonText;
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Close button
    const btnClose = modal.querySelector('.modal-close');
    btnClose.style.display = showCloseButton ? 'block' : 'none';

    // Close logic
    function close() {
        modal.querySelector(':focus')?.blur();
        modal.setAttribute('aria-hidden', 'true');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Events
    if (closeOnEscape) {
        document.onkeydown = (e) => {
            if (e.key === 'Escape') close();
        };
    }

    if (closeOnBackdrop) {
        modal.querySelector('.modal-backdrop').onclick = close;
    }

    if (showCloseButton) {
        btnClose.onclick = close;
    }

    modal.querySelector('.modal-confirm').onclick = () => {
        if (typeof onConfirm === 'function') onConfirm();
        close();
    };
}

// Possiveis adicioções podem ser usadas com esse codigo:
// function mostrarEmpate() {
//     const template = document.createElement('template')
//     const overlay = createDiv({ className: 'overlay' })
//     const modal = createDiv({ className: 'modal' })
//     const modalHeader = createDiv({ className: 'modal-header' })
//     const modalIcon = document.createElement('span')
//     modalIcon.classList = 'modal-icon'
//     const modalTitle = document.createElement('h3')
//     modalTitle.classList = 'modal-title'
//     const message = document.createElement('p')
//     message.classList = 'message'
//     const okButton = document.createElement('button')
//     okButton.value = 'OK'

//     modalHeader.append(modalIcon, modalTitle)
//     modal.append(modalHeader, message, okButton)
//     overlay.appendChild(modal)
//     template.appendChild(overlay)

//     // criando uma classe que estende (herda de) HTMLElement (classe base para todos os elementos HTML)
//     class CustomAlertComponent extends HTMLElement {
//         constructor() {

//             // Esta chamada é obrigatória em qualquer construtor de uma classe que estende outra.
//             // Ela chama o construtor da classe pai (neste caso, HTMLElement).
//             // Precisa ser a primeira linha do construtor para inicializar corretamente o elemento HTML base.
//             super()

//             //Shadow DOM é uma característica importante dos Web Components que:
//             // Encapsula estilos: CSS definido dentro do Shadow DOM não afeta o resto da página.
//             // Encapsula estrutura: HTML dentro do Shadow DOM fica isolado do resto do documento.
//             // O parâmetro { mode: 'open' } permite que o JavaScript externo acesse o Shadow DOM deste componente (via .shadowRoot).
//             this.attachShadow({ mode: 'open' })

//             // template.content acessa o conteúdo do <template> (o HTML definido dentro dele).
//             // cloneNode(true) cria uma cópia profunda (deep clone) desse conteúdo.
//             // O parâmetro true indica que queremos clonar não apenas o nó principal, mas também todos os seus filhos.
//             this.shadowRoot.appendChild(template.content.cloneNode(true))

//             this.overlay = this.shadowRoot.querySelector('.overlay')
//             this.modal = this.shadowRoot.querySelector('.modal')
//             this.messageBox = this.shadowRoot.querySelector('.message')
//             this.okButton = this.shadowRoot.querySelector('button')
//             this.titleElement = this.shadowRoot.querySelector('.modal-title')
//             this.iconElement = this.shadowRoot.querySelector('.modal-icon')
//         }

//         // Método que permite personalizar vários aspectos do alerta
//         show(options = {}) {
//             return new Promise((resolve) => {
//                 // Configurações padrão
//                 const defaultOptions = {
//                     message: 'Esta é uma mensagem de alerta!',
//                     title: 'Aviso',
//                     buttonText: 'OK',
//                     type: 'info',
//                     showIcon: true
//                 }

//                 // Mesclar opções padrão com as fornecidas
//                 const settings = { ...defaultOptions, ...options }

//                 // Definir ícones para cada tipo
//                 const icons = {
//                     success: '✓',
//                     error: '✕',
//                     warning: '⚠',
//                     info: 'ℹ'
//                 }

//                 // Configurar a mensagem e título
//                 this.messageBox.innerHTML = settings.message
//                 this.titleElement.textContent = settings.title

//                 // Configurar o ícone
//                 if (settings.showIcon) {
//                     this.iconElement.textContent = icons[settings.type] || 'ℹ'
//                     this.iconElement.className = `modal-icon icon-${settings.type}`
//                     this.iconElement.style.display = 'inline'
//                 } else {
//                     this.iconElement.style.display = 'none'
//                 }

//                 // Configurar o botão
//                 this.okButton.textContent = settings.buttonText
//                 this.okButton.className = `btn-${settings.type}`

//                 // Mostrar o alerta com animações
//                 this.overlay.style.display = 'flex'
//                 this.overlay.style.animation = 'fadeIn 0.2s ease-out'
//                 this.modal.style.animation = 'scaleIn 0.3s ease-out'

//                 // Função para fechar o alerta
//                 const handleClick = () => {
//                     this.overlay.style.animation = 'fadeOut 0.2s ease-in forwards'
//                     this.modal.style.animation = 'scaleOut 0.2s ease-in forwards'

//                     setTimeout(() => {
//                         this.overlay.style.display = 'none'
//                         this.okButton.removeEventListener('click', handleClick)
//                         resolve()
//                     }, 200)
//                 }

//                 this.okButton.addEventListener('click', handleClick)
//             })
//         }

//         // Método simples que mantém compatibilidade com seu código original
//         showSimple(message) {
//             return this.show({ message })
//         }
//     }

//     // Registrar o Web Component
//     customElements.define('custom-alert', CustomAlertComponent)

//     // Funções de exemplo para demonstração
//     function showCustomAlert() {
//         const title = document.getElementById('alert-title').value
//         const message = document.getElementById('alert-message').value
//         const buttonText = document.getElementById('button-text').value
//         const type = document.getElementById('alert-type').value
//         const showIcon = document.getElementById('show-icon').checked

//         const customAlert = document.querySelector('custom-alert')
//         customAlert.show({
//             title,
//             message,
//             buttonText,
//             type,
//             showIcon
//         })
//     }

//     function showExampleAlert(type, message) {
//         const customAlert = document.querySelector('custom-alert')
//         customAlert.show({
//             type,
//             message,
//             title: type.charAt(0).toUpperCase() + type.slice(1)
//         })
//     }
// }