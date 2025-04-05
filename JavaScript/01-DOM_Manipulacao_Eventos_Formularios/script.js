const addTec = document.getElementById("addTec")
let cad = []
let countTec = 0

// Alterar o layout e o posicionamento do botão que adiciona um campo de tecnologia
addTec.addEventListener("click", function (ev) {

    ev.preventDefault()

    countTec += 1

    const formCad = document.getElementById("formCad")
    formCad.addEventListener("submit", function (ev) {
        ev.preventDefault()
    })

    // Inicio da funcao que ira chamar os texts

    const techContainer = document.createElement("div")
    techContainer.id = "tech-container"

    const techList = document.createElement("div")
    techList.className = "tech-list"
    techList.id = `tech-list-${countTec}`

    const hr = document.createElement('hr')

    // Cabeçalho lista de tecnologias
    const techListHeader = document.createElement("div")
    techListHeader.className = "tech-list__header"

    const techListRemove = document.createElement("button")
    techListRemove.className = `tech-list__remove ${countTec}`
    techListRemove.innerText = "🗙"

    const techListLabel = document.createElement("label")
    techListLabel.className = "tech-list__label"
    techListLabel.innerText = `${countTec}ª Tecnologia Dominada`
    techListHeader.append(techListRemove, techListLabel)

    // Nome da tecnologia
    const techListInput = document.createElement("input")
    techListInput.type = "text"
    techListInput.name = "nameTe"
    techListInput.className = "tech-list__input"
    techListInput.placeholder = "Digite aqui o nome da tecnologia"

    const levelContainer = document.createElement('div')
    levelContainer.className = "level-container"

    // Iniciante
    const levelBeginner = document.createElement('div')
    levelBeginner.className = "level"


    const beginner = document.createElement('input')
    beginner.type = "radio"
    beginner.id = `beginner-${countTec}`
    beginner.name = `xpTec-${countTec}`

    const levelLabelBeginner1 = document.createElement('label')
    levelLabelBeginner1.setAttribute("for", `beginner-${countTec}`)
    levelLabelBeginner1.className = "level__icon"
    levelLabelBeginner1.innerText = "🌱"

    const levelLabelBeginner2 = document.createElement('label')
    levelLabelBeginner2.setAttribute("for", `beginner-${countTec}`)
    levelLabelBeginner2.className = "level__text"
    levelLabelBeginner2.innerText = "Iniciante 0-2 anos"
    levelBeginner.append(beginner, levelLabelBeginner1, levelLabelBeginner2)

    // Intermediario

    const levelIntermediate = document.createElement('div')
    levelIntermediate.className = "level"

    const intermediate = document.createElement('input')
    intermediate.type = "radio"
    intermediate.id = `intermediate-${countTec}`
    intermediate.name = `xpTec-${countTec}`

    const levelLabelIntermediate1 = document.createElement('label')
    levelLabelIntermediate1.setAttribute("for", `intermediate-${countTec}`)
    levelLabelIntermediate1.className = "level__icon"
    levelLabelIntermediate1.innerText = "🔥"

    const levelLabelIntermediate2 = document.createElement('label')
    levelLabelIntermediate2.setAttribute("for", `intermediate-${countTec}`)
    levelLabelIntermediate2.className = "level__text"
    levelLabelIntermediate2.innerText = "Intermediário 3-4 anos"
    levelIntermediate.append(intermediate, levelLabelIntermediate1, levelLabelIntermediate2)

    // Avançado

    const levelAdvanced = document.createElement('div')
    levelAdvanced.className = "level"

    const advanced = document.createElement('input')
    advanced.type = "radio"
    advanced.id = `advanced-${countTec}`
    advanced.name = `xpTec-${countTec}`

    const levelLabelAdvanced1 = document.createElement('label')
    levelLabelAdvanced1.setAttribute("for", `advanced-${countTec}`)
    levelLabelAdvanced1.className = "level__icon"
    levelLabelAdvanced1.innerText = "🚀"

    const levelLabelAdvanced2 = document.createElement('label')
    levelLabelAdvanced2.setAttribute("for", `advanced-${countTec}`)
    levelLabelAdvanced2.className = "level__text"
    levelLabelAdvanced2.innerText = "Avançado 5+ anos"
    levelAdvanced.append(advanced, levelLabelAdvanced1, levelLabelAdvanced2)

    levelContainer.append(levelBeginner, levelIntermediate, levelAdvanced)

    techList.append(hr, techListHeader, techListInput, levelContainer)

    techContainer.appendChild(techList)

    // Preciso achar um jeito de não criar varios techContainer, e sim apenas um
    // Vou tentar usar o exemplo que fiz para o botão de cadastro de desenvolvedors

    const actionButtons = document.querySelector("div[class='action-buttons']")

    const actionButtonsSubmit = document.createElement("button")
    actionButtonsSubmit.id = "cadTecLast"
    actionButtonsSubmit.className = "action-buttons__submit"
    actionButtonsSubmit.innerText = "💾"

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
        
        document.querySelectorAll("button.tech-list__remove").forEach((element, i) => {
            countTec = i + 1
            element.className = `tech-list__remove ${countTec}`
            element.nextElementSibling.innerText = `${countTec}ª Tecnologia Dominada`
        })
    })

    addTec.scrollIntoView({
        behavior: "smooth",  // Rolagem suave
        block: "nearest"      // Navegador escolherá a posição mais próxima para evitar rolagens desnecessárias
    })
})