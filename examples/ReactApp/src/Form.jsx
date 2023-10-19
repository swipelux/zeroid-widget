export const Form = ({onSubmit}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = formData.get("message");
        onSubmit(message, e.target);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-with-button">
                <input required autoFocus type="text" name="message" id="message" placeholder="Your question" />
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}
