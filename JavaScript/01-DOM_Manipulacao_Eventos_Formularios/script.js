const addTec = document.getElementById("addTec")
let countTec= 0;

addTec.addEventListener("click", function (ev) {

    ev.preventDefault()

    countTec += 1

    const formTec = document.getElementById("formTec")

    const lableName = document.createElement("label")
    lableName.setAttribute("for", "nome");
    lableName.innerText = `${countTec}º Tecnologia dominada`

    const nameTec = document.createElement("input")
    nameTec.type = "text"
    nameTec.id = "nameTec"
    nameTec.name = "nameTec"
    nameTec.placeholder = "Digite aqui o nome da tecnologia"
    nameTec.required = true

    const levelTec1 = document.createElement('input')
    levelTec1.type = "radio"
    levelTec1.id = "levelTec1"
    levelTec1.name = "levelTec"
    levelTec1.innerText = "0-2 anos"
    

    formTec.appendChild(lableName)
    formTec.appendChild(nameTec)
    formTec.appendChild(levelTec1)

    console.log("Clicou")
    
})

