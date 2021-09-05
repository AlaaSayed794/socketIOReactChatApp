import React, { useState } from 'react'

export default function TextInputForm(props) {
    const [state, setState] = useState({ input: "" })

    const onChange = (e) => {
        setState({
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (state.input) {
            props.handleSubmit(state.input)
            setState({ input: "" })
        }
        else {
            alert("empty input")
        }
    }

    return (
        <form
            onSubmit={onSubmit}
        >
            <input type="text" name="input" value={state.input} onChange={onChange} />
            <input type="submit" value={props.buttonText} />
        </form>
    )
}
