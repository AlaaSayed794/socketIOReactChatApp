import React, { useState, useEffect, useRef } from "react"
import io from "socket.io-client"
import TextInputForm from "./TextInputForm"
import { ListGroup } from 'react-bootstrap'
function App() {
	const [state, setState] = useState({ name: "", connected: false })
	const [chat, setChat] = useState([])
	const socket = useRef()

	const handleNameSubmit = (name) => {
		setState({ name })
	}
	const handleMessageSubmit = (message) => {
		socket.current.emit('message', { name: state.name, message })
	}
	const mapChat = (chat) => {
		return chat.map(({ name, message }, index) => <ListGroup.Item style={{ display: "flex", flexDirection: "row" }} key={index}><p style={{ color: "red", marginRight: "10px" }}> <strong>{name} </strong>: </p><p>{message}</p></ListGroup.Item>)
	}

	useEffect(() => {
		if (!state.connected) {
			fetch("history").then(res => {
				console.log(res)
				return res.json()
			}).then(data => {
				console.log(data)
				setChat(data)
				setState({ ...state, connected: true })
			})
		}
		socket.current = io.connect("http://localhost:8000/")
		socket.current.on('message', ({ name, message }) => {
			setChat([...chat, { name, message }])
		})

		return () => {
			socket.current.disconnect()
		}
	}, [chat])

	console.log(state)
	return (
		<div>
			{state.name ? <div>
				{<ListGroup>
					{mapChat(chat)}
				</ListGroup>}
				<TextInputForm handleSubmit={handleMessageSubmit} buttonText="send" />
			</div> : <TextInputForm handleSubmit={handleNameSubmit} buttonText="submit your name" />}
		</div>
	)
}

export default App

