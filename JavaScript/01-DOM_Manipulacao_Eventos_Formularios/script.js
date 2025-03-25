const addTec = document.getElementById("addTec")
let countTec= 0;

addTec.addEventListener("click", function (ev) {

    ev.preventDefault()

    countTec += 1

    const formTec = document.getElementById("formTec")

    // Inicio da funcao que ira chamar os texts
    const labelName = document.createElement("label")
    labelName.setAttribute("for", "name")
    labelName.className = "labelForm"
    labelName.innerText = `${countTec}º Tecnologia dominada`
    
    const nameTec = document.createElement("input")
    nameTec.type = "text"
    nameTec.id = "nameTec"
    nameTec.name = "nameTec"
    nameTec.placeholder = "Digite aqui o nome da tecnologia"
    nameTec.required = true

    // Inicio da funcao que ira chamar os radios
    const levelContainer = document.createElement('div')
    levelContainer.className = "level-container"

    const levelBeginner = document.createElement('div')
    levelBeginner.className = "level"

    const levelTecBeginner = document.createElement('input')
    levelTecBeginner.type = "radio"
    levelTecBeginner.id = `beginner-${countTec}`
    levelTecBeginner.name = `level-${countTec}`

    const levelLabelBeginner1 = document.createElement('label')
    levelLabelBeginner1.setAttribute("for", `beginner-${countTec}`)
    levelLabelBeginner1.className  = "labelLevel1"
    levelLabelBeginner1.innerText = "🌱"
    
    const levelLabelBeginner2 = document.createElement('label')
    levelLabelBeginner2.setAttribute("for", `beginner-${countTec}`)
    levelLabelBeginner2.className  = "labelLevel2"
    levelLabelBeginner2.innerText = "Iniciante 0-2 anos"

    levelBeginner.append(levelTecBeginner, levelLabelBeginner1, levelLabelBeginner2)
    

    const levelIntermediate = document.createElement('div')
    levelIntermediate.className = "level"

    const levelTecIntermediate = document.createElement('input')
    levelTecIntermediate.type = "radio"
    levelTecIntermediate.id = `intermediate-${countTec}`
    levelTecIntermediate.name = `level-${countTec}`

    const levelLabelIntermediate1 = document.createElement('label')
    levelLabelIntermediate1.setAttribute("for", `intermediate-${countTec}`)
    levelLabelIntermediate1.className  = "labelLevel1"
    levelLabelIntermediate1.innerText = "🔥"
    
    const levelLabelIntermediate2 = document.createElement('label')
    levelLabelIntermediate2.setAttribute("for", `intermediate-${countTec}`)
    levelLabelIntermediate2.className  = "labelLevel2"
    levelLabelIntermediate2.innerText = "Intermediário 3-4 anos"

    
    levelIntermediate.append(levelTecIntermediate, levelLabelIntermediate1, levelLabelIntermediate2)


    const levelAdvanced = document.createElement('div')
    levelAdvanced.className = "level"

    const levelTecAdvanced = document.createElement('input')
    levelTecAdvanced.type = "radio"
    levelTecAdvanced.id = `advanced-${countTec}`
    levelTecAdvanced.name = `level-${countTec}`

    const levelLabelAdvanced1 = document.createElement('label')
    levelLabelAdvanced1.setAttribute("for", `advanced-${countTec}`)
    levelLabelAdvanced1.className  = "labelLevel1"
    levelLabelAdvanced1.innerText = "🚀"
    
    const levelLabelAdvanced2 = document.createElement('label')
    levelLabelAdvanced2.setAttribute("for", `advanced-${countTec}`)
    levelLabelAdvanced2.className  = "labelLevel2"
    levelLabelAdvanced2.innerText = "Avançado 5+ anos"

    
    levelAdvanced.append(levelTecAdvanced, levelLabelAdvanced1, levelLabelAdvanced2)


    levelContainer.append(levelBeginner, levelIntermediate, levelAdvanced)

    formTec.append(labelName, nameTec, levelContainer)    
})

