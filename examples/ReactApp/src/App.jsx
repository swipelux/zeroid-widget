import {useZeroID} from "./providers/ZeroIDProvider.jsx";
import {useEffect, useRef, useState} from "react";
import {Conversation} from "./Conversation.jsx";
import {Form} from "./Form.jsx";

function App() {
  const ZeroID = useZeroID();
  const ref = useRef();
  const [zeroIDWidget, setZeroIDWidget] = useState();
  const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (ZeroID && !zeroIDWidget && ref.current) {
            const widget = ZeroID.initStorage(ref.current);
            setZeroIDWidget(widget);
        }
    }, [ZeroID, zeroIDWidget]);

    const openAIApiKey = async () => {
        if (!zeroIDWidget) {
            throw new Error("ZeroID widget not initialized");
        }

        const res = await zeroIDWidget.openAIKey();
        return res.value;
    }

    const sendMessage = async (message, form) => {
        const OPEN_AI_API_PATH = 'https://api.openai.com/v1/chat/completions';

        const userMessage = {
            role: 'user',
            content: message,
        };

        setMessages((messages) => [...messages, userMessage]);

        // Set up the request data
        const requestData = {
            messages: [...messages, userMessage],
            model: "gpt-3.5-turbo",
        };

        const apiKey = await openAIApiKey();

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
            setMessages((messages) => [...messages, message]);
            form.reset();
        } else {
            setMessages((messages => messages.slice(0, -1)));
            alert('Error: Unable to get a response from OpenAI.');
        }
    }




  return (
      <>
      <header>
          <h1>Chat GPT messenger</h1>
          <div ref={ref} />
      </header>
      <section>
          <Conversation messages={messages} />
          <Form onSubmit={sendMessage} />
      </section>
      </>
  )
}

export default App
