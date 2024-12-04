import { useState } from "react"

export default function Search ({ setter }) {
    const [term, setTerm] = useState("")

    function submit(e) {
        e.preventDefault()
        setter(term)
        setTerm("")
    }

    return(
        <form onSubmit={submit}>
            <input type = "text" 
            placeholder="Search..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            />
        </form>

    )
}