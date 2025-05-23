import { showModal } from './components/custom-alert-modal.js'

const nameP1 = document.getElementById('player1')
const nameP2 = document.getElementById('player2')
const root = document.querySelector(':root')
const gameBoard = document.getElementById('gameBoard')
const cells = document.querySelectorAll('.cell')
const turnIndicator = document.getElementById(`player-name`)
const resetButton = document.getElementById('resetButton')

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
const rootInfo = {
    0: ['0deg', '100%', '16%', '50%'],
    1: ['0deg', '100%', '50%', '50%'],
    2: ['0deg', '100%', '84%', '50%'],
    3: ['90deg', '100%', '50%', '16%'],
    4: ['90deg', '100%', '50%', '50%'],
    5: ['90deg', '100%', '50%', '84%'],
    6: ['45deg', '140%', '50%', '50%'],
    7: ['-45deg', '140%', '50%', '50%']
}

function positionLine(key) {
    const [a, b, c, d] = rootInfo[key] || []
    root.style.setProperty('--line-inclination', a)
    root.style.setProperty('--line-length', b)
    root.style.setProperty('--line-top', c)
    root.style.setProperty('--line-left', d)

    const lineCheck = document.querySelector('.line-winner')
    const lineWinner = createDiv({ className: 'line-winner' })
    !lineCheck && gameBoard.appendChild(lineWinner)

}

function removeCellListeners() {
    cells.forEach((cell) => {
        cell.classList.add('off')
        cell.removeEventListener('click', cellClick)
    })
}

nameP1.addEventListener('blur', () => {
    turnIndicator.textContent = nameP1.value
})

function playerWinner(result) {
    result.forEach((posição) => {
        const element = document.querySelector(`[data-cell-index='${posição}']`)
        element.classList.add('win')
        positionLine(winningCombinations.indexOf(result))
        removeCellListeners()
    })
}

function createDiv({ className }) {
    const div = document.createElement('div')
    if (className) div.className = className
    return div
}

function cellClick(event) {
    if (nameP1.value !== '' && nameP2.value !== '') {

        nameP1.disabled = true
        nameP2.disabled = true

        let cellValue = event.currentTarget.querySelector('.cell-value')
        if (cellValue.textContent === '') {
            if (indicator === true) {
                cellValue.textContent = 'X'
                combinationsPlayers.p1.push(Number(event.currentTarget.dataset.cellIndex))
                event.currentTarget.classList.add('off')
                indicator = false
                turnIndicator.textContent = nameP2.value

            } else if (indicator === false) {
                cellValue.textContent = 'O'
                combinationsPlayers.p2.push(Number(event.currentTarget.dataset.cellIndex))
                event.currentTarget.classList.add('off')
                indicator = true
                turnIndicator.textContent = nameP1.value
            }
        }

        // Foi criado pelo gpt
        function checkWinningCombination(playerCombinations, winningCombinations) {
            return winningCombinations.find(
                combination => combination.every(position => playerCombinations.includes(position))
            ) || null
        }

        function draw() {
            const totalPlays = combinationsPlayers.p1.length + combinationsPlayers.p2.length
            if (totalPlays === 9) {
                showModal({
                    title: 'Empatou!',
                    icon: '😑🟰😑',
                    buttonText: 'OK'
                })
                reset()
            }
        }

        const resultP1 = checkWinningCombination(combinationsPlayers.p1, winningCombinations)
        const resultP2 = checkWinningCombination(combinationsPlayers.p2, winningCombinations)
        const winner = resultP1 || resultP2

        if (winner) {
            playerWinner(winner)
        } else {
            draw()
        }

    } else {
        showModal({
            title: 'Informe o nome dos jogadores',
            icon: '⚠️',
            buttonText: 'OK'
          })
    }
}

cells.forEach((cell) => {
    cell.addEventListener('click', cellClick)
})

resetButton.addEventListener('click', reset)

function reset() {
    const lineWinner = document.querySelector('.line-winner')
    lineWinner && lineWinner.remove()
    lineWinner && cells.forEach((cell) => {
        cell.addEventListener('click', cellClick)
    })
    indicator = true
    nameP1.value = ''
    nameP2.value = ''
    nameP1.disabled = false
    nameP2.disabled = false
    turnIndicator.textContent = 'Player 1'
    combinationsPlayers.p1.splice(0, combinationsPlayers.p1.length)
    combinationsPlayers.p2.splice(0, combinationsPlayers.p2.length)
    cells.forEach((cell) => {
        cell.querySelector('.cell-value').textContent = ''
        cell.classList.remove('off')
        cell.classList.remove('win')
    })
}