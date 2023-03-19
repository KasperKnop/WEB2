function App() {
    const [state, setState] = React.useState({
        num1: 3,
        num2: 4,
        response: "",
        score: 0,
        incorrect: false,
    })

    function updateResponse(event) {
        setState({
            ...state,
            response: event.target.value,
        })
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            const answer = parseInt(state.response)
            if (state.num1 + state.num2 === answer) {
                setState({
                    ...state,
                    num1: Math.ceil(Math.random() * 10),
                    num2: Math.ceil(Math.random() * 10),
                    response: "",
                    score: state.score + 1,
                    incorrect: false,
                })
            } else {
                setState({ ...state, response: "", score: state.score - 1, incorrect: true })
            }
        }
    }

    if (state.score === 5) return <h1 id="winner">YOU WON!</h1>

    return (
        <div>
            <div className={state.incorrect ? "incorrect" : ""} id="problem">
                {state.num1} + {state.num2}
            </div>
            <input autoFocus={true} onKeyPress={handleKeyPress} onChange={updateResponse} value={state.response} />
            <div>The score is {state.score}</div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<App />)
