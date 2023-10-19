export const Conversation = ({ messages = [] }) => {
    return (
        <div className="conversation" id="conversation">
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                    <div className="message-content">
                        {message.content}
                    </div>
                </div>
            ))}
        </div>
    );
};
