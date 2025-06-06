const addTec = document.getElementById("addTec")
let cad = []
let countTec = 0

function createDiv({ id, className }) {
    const div = document.createElement("div")
    if (id) div.id = id
    if (className) div.className = className
    return div
}

function createButton({ id, className, innerText }) {
    const button = document.createElement("button")
    if (id) button.id = id
    if (className) button.className = className
    if (innerText) button.innerText = innerText
    return button
}

function createLabel({ htmlFor, className, innerText }) {
    const label = document.createElement("label")
    if (htmlFor) label.setAttribute("for", htmlFor)
    if (className) label.className = className
    if (innerText) label.innerText = innerText
    return label
}

function createInput({ type, id, name, className, placeholder }) {
    const input = document.createElement("input")
    if (type) input.type = type
    if (id) input.id = id
    if (name) input.name = name
    if (className) input.className = className
    if (placeholder) input.placeholder = placeholder
    return input
}

addTec.addEventListener("click", function (ev) {

    ev.preventDefault()

    countTec += 1

    const formCad = document.getElementById("formCad")
    formCad.addEventListener("submit", function (ev) {
        ev.preventDefault()
    })

    const techContainer = createDiv({ id: "tech-container" })
    const techList = createDiv({ className: "tech-list", id: `tech-list-${countTec}` })
    const hr = document.createElement('hr')

    // Cabeçalho lista de tecnologias
    const techListHeader = createDiv({ className: "tech-list__header" })
    const techListRemove = createButton({ className: `tech-list__remove ${countTec}`, innerText: "🗙" })
    const techListLabel = createLabel({ className: "tech-list__label", innerText: `${countTec}ª Tecnologia Dominada` })
    techListHeader.append(techListRemove, techListLabel)

    // Nome da tecnologia
    const techListInput = createInput({ type: "text", name: "nameTech", className: "tech-list__input", placeholder: "Digite aqui o nome da tecnologia" })
    const levelContainer = createDiv({ className: "level-container" })

    // Iniciante
    const levelBeginner = createDiv({ className: "level" })
    const beginner = createInput({ type: "radio", id: `beginner-${countTec}`, name: `xpTec-${countTec}`, className: "level-radio-beginner" })
    const levelLabelBeginner1 = createLabel({ htmlFor: `beginner-${countTec}`, className: "level__icon", innerText: "🌱" })
    const levelLabelBeginner2 = createLabel({ htmlFor: `beginner-${countTec}`, className: "level__text", innerText: "Iniciante 0-2 anos" })
    levelBeginner.append(beginner, levelLabelBeginner1, levelLabelBeginner2)

    // Intermediario
    const levelIntermediate = createDiv({ className: "level" })
    const intermediate = createInput({ type: "radio", id: `intermediate-${countTec}`, name: `xpTec-${countTec}`, className: "level-radio-intermediate" })
    const levelLabelIntermediate1 = createLabel({ htmlFor: `intermediate-${countTec}`, className: "level__icon", innerText: "🔥" })
    const levelLabelIntermediate2 = createLabel({ htmlFor: `intermediate-${countTec}`, className: "level__text", innerText: "Intermediário 3-4 anos" })
    levelIntermediate.append(intermediate, levelLabelIntermediate1, levelLabelIntermediate2)

    // Avançado
    const levelAdvanced = createDiv({ className: "level" })
    const advanced = createInput({ type: "radio", id: `advanced-${countTec}`, name: `xpTec-${countTec}`, className: "level-radio-advanced" })
    const levelLabelAdvanced1 = createLabel({ htmlFor: `advanced-${countTec}`, className: "level__icon", innerText: "🚀" })
    const levelLabelAdvanced2 = createLabel({ htmlFor: `advanced-${countTec}`, className: "level__text", innerText: "Avançado 5+ anos" })
    levelAdvanced.append(advanced, levelLabelAdvanced1, levelLabelAdvanced2)

    levelContainer.append(levelBeginner, levelIntermediate, levelAdvanced)
    techList.append(hr, techListHeader, techListInput, levelContainer)
    techContainer.appendChild(techList)
    const actionButtons = document.querySelector("div[class='action-buttons']")
    const actionButtonsSubmit = createButton({ id: "cadTecLast", className: "action-buttons__submit", innerText: "💾" })

    formCad.append(techContainer, actionButtons)

    if (countTec === 1) {
        actionButtons.appendChild(actionButtonsSubmit)
    }

    const cadTecLast = document.getElementById("cadTecLast")
    if (cadTecLast) {
        actionButtons.appendChild(cadTecLast)
    }

    // Botão de cadastro que armazena as informações em um array e limpa o formulário.
    actionButtonsSubmit.addEventListener("click", function (ev) {
        ev.preventDefault()

        const nameDev = document.querySelector("#nameDev").value
        const tech = []

        document.querySelectorAll("input[type='radio']:checked").forEach(function (element, i) {
            const previousValue = element.closest("div[class='level']").closest("div[class='level-container']").previousElementSibling.value
            const next = element.nextElementSibling.nextElementSibling.innerText
            tech.push({
                id: i,
                nomeTecnologia: previousValue,
                experiencia: next
            })

        })
        cad.push({
            nome: nameDev,
            tecnologias: tech
        })
        console.log(cad)

        document.querySelectorAll("div[id='tech-container']").forEach(function (element) {
            element.remove()
        })

        document.querySelector("button[class='action-buttons__submit']").remove()

        countTec = 0
    })

    techListRemove.addEventListener("click", function (ev) {
        ev.preventDefault()

        techListRemove.closest("div[id='tech-container']").remove()

        // Obter a lista atualizada de botões
        let buttons = document.querySelectorAll("button.tech-list__remove")
        
        // Atualizar o countTec com base no número de botões restantes
        if (buttons.length === 0) {
            countTec = 0
            document.querySelector("button[class='action-buttons__submit']").remove()
        } else {
            countTec = buttons.length
        }

        buttons.forEach((element, i) => {
            element.className = `tech-list__remove ${i + 1}`
            element.nextElementSibling.innerText = `${i + 1}ª Tecnologia Dominada`
            element.closest("div[class='tech-list']").id = `tech-list-${i + 1}`
        })

        const levels = ['beginner', 'intermediate', 'advanced']

        document.querySelectorAll(".level-container").forEach((container, index) => {
            const groupName = `xpTec-${index + 1}`

            levels.forEach(level => {
                // Seleciona o input do nível atual (ex: .level-radio-beginner)
                const input = container.querySelector(`.level-radio-${level}`)
                if (!input) return // Pula se o input não existir (tolerância)

                const id = `${level}-${index + 1}`
                input.id = id
                input.name = groupName

                // Atualiza os próximos dois elementos label associados
                let label = input.nextElementSibling
                for (let i = 0; i < 2 && label; i++) {
                    if (label.tagName.toLowerCase() === 'label') {
                        label.setAttribute('for', id)
                    }
                    label = label.nextElementSibling
                }
            })
        })

    })

    addTec.scrollIntoView({
        behavior: "smooth",  // Rolagem suave
        block: "nearest"      // Navegador escolherá a posição mais próxima para evitar rolagens desnecessárias
    })
})