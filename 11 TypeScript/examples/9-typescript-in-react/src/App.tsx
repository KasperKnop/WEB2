interface AppProps {
    userName: string
}

function App({ userName }: AppProps) {
    return <h1>Hello {userName}!</h1>
}

export default App
