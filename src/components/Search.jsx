import { useState } from "react"

export default function Search () {
    const [term, setTerm] = useState("")

    function submit(e) {
        e.preventDefault()
        console.log(term)
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