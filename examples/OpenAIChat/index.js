const zeroID = ZeroIdSdk.initStorage(document.getElementById('zero-id'));

const conversation = createReactiveArray(render);

const form = document.querySelector('form');
form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get('message');
    sendToOpenAI(message, conversation);
    e.target.reset();
};


function render(conversation) {
    const section = document.getElementById('conversation');
    section.innerHTML = '';

    conversation.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(message.role);

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerText = message.content;

        messageElement.appendChild(messageContent);
        section.appendChild(messageElement);
    });
}


function createReactiveArray(callback) {
    const array = [];
    const arrayProxy = new Proxy(array, {
        set(target, property, value) {
            const result = Reflect.set(target, property, value);
            callback(array);
            return result;
        },
    });

    return arrayProxy;
}


async function sendToOpenAI(text, conversation) {
    const OPEN_AI_API_PATH = 'https://api.openai.com/v1/chat/completions';

    const userMessage = {
        role: 'user',
        content: text
    };

    conversation.push(userMessage);

    // Set up the request data
    const requestData = {
        messages: conversation,
        model: "gpt-3.5-turbo",
    };

    const apiKey = (await zeroID.getOpenAIKey()).value;

    // Make a POST request to OpenAI using fetch
    const response = await fetch(OPEN_AI_API_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestData)
    });

    if (response.status === 200) {
        const responseData = await response.json();
        const message = responseData.choices[0].message;
        conversation.push(message);
    } else {
        conversation.pop();
        alert('Error: Unable to get a response from OpenAI.');
    }
}
