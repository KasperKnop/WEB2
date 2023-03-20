import React from "react"
import ReactDOM from "react-dom/client"
import Root from "./routes/Root"
import AboutMe from "./routes/AboutMe"
import FrontPage from "./routes/FrontPage"
import { RouterProvider, createHashRouter } from "react-router-dom"

const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <FrontPage />,
            },
            {
                path: "/about",
                element: <AboutMe />,
            },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
