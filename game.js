const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('button')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'Donate now: Save the eels today! For every penny you donate, one and a half mandarin eels will be saved.',
        options: [
            {
                text: 'Donate',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You were too late. The last of the mandarin eels have died and they are now forever extinct.',
        options: [

        ]
    },
    {
        id: 3,
        text: "You don't know where you are, so you do the only reasonable thing and curl up into a ball. Fin"
    },
    {
        id: 4,
        text: "While attempting to pick up the stick, you overbalance and fall due to the increased gravity. You decide to give up and curl up into a ball. Fin"
    },
    {
        id: 5,
        text: "While looking around, you notice a large animal sprinting towards you. It tackles you to the ground, and in an attempt to avoid its wrath you decide to give up and curl up into a ball. Fin"
    }
]

startGame();
