const nameP1 = document.getElementById('player1')
const nameP2 = document.getElementById('player2')
const cell = document.querySelectorAll('.cell')
const turnIndicator = document.getElementById(`player-name`)

let indicator = true
const combinationsPlayers = { p1: [], p2: [] }
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

nameP1.addEventListener('blur', () => {
    turnIndicator.textContent = nameP1.value
    console.log(nameP2.value)
})


cell.forEach((cellBtn) => {
    cellBtn.addEventListener('click', () => {
        if (nameP1.value !== '' && nameP2.value !== '') {

            nameP1.disabled = true
            nameP2.disabled = true
            let cellValue = cellBtn.querySelector('.cell-value')

            if (cellValue.textContent === "") {
                if (indicator === true) {
                    cellValue.textContent = 'X'
                    combinationsPlayers.p1.push(Number(cellBtn.dataset.cellIndex))
                    cellBtn.classList.toggle('off')
                    indicator = false
                    turnIndicator.textContent = nameP2.value

                } else if (indicator === false) {
                    cellValue.textContent = 'O'
                    combinationsPlayers.p2.push(Number(cellBtn.dataset.cellIndex))
                    cellBtn.classList.toggle('off')
                    indicator = true
                    turnIndicator.textContent = nameP1.value
                }
            }

            // some(): retorna true se pelo menos um elemento do array satisfizer a condição.
            // every(): retorna true se todos os elementos do array satisfizerem a condição.
            // includes(): retorna true se um valor específico existir dentro do array.
            const p1Winner = winningCombinations.some(innerArray => innerArray.every(v => combinationsPlayers.p1.includes(v)))
            const p2Winner = winningCombinations.some(innerArray => innerArray.every(v => combinationsPlayers.p2.includes(v)))
            console.log(combinationsPlayers, p1Winner, p2Winner)
        } else {
            alert('Informe o nome dos jogadores!')
        }
    })
})