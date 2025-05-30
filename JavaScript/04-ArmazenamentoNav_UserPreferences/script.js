



const condicao = false
if(condicao === true){
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
})}