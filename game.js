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
        text: 'You wake up in a strange looking forest. The air smells weird and the gravity seems a little stronger than usual.',
        options: [
            {
                text: 'Look around',
                nextText: 2
            },
            {
                text: 'Curl up into a ball',
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: 'You take in your surroundings, noticing a stick on the ground.',
        options: [
            {
                text: 'Take the stick',
                setState: { stick: true },
                nextText: 4
            },
            {
                text: 'Keep looking around',
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: "You don't know where you are, so you do the only reasonable thing and curl up into a ball. Fin"
    },
    {
        id: 4,
        text: "Thanks for playing my super amazing game that's filled with content! Unfortunately, you didn't pay for the $99.99 battle pass so you can't continue."
    }
]

startGame();