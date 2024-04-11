import { React, useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE

const Admin = ({discordAuth}) => {

    let navigate = useNavigate();
    
    let defaultInputs = {
        player: null,
        newName: null,
        newRole: null,
        newTags: null,
        newMod: null
    }
    const [inputs, setInputs] = useState({defaultInputs})

    const [players, setPlayers] = useState([{
        name: '',
        numtags: 0
    }])

    const [submitInfo, setInfo] = useState("")

    const [user, setUser] = useState(false)

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const code = queryParameters.get("code")

        if (code != null) {
            navigate('/admin')
            axios.post("/api/tradecode", { authCode: code, redirect_tail: "admin" }).then(res => {
                console.log("res tradecode", res)
                sessionStorage.setItem("access_token", res.headers.access_token)
                sessionStorage.setItem("expires_in", res.headers.expires_in)
                sessionStorage.setItem("refresh_token", res.headers.refresh_token)
                return res
            }).then(res => axios.post("/api/identifyuser",{
                access_token: res.headers.access_token,
                expires_in: res.headers.expires_in,
                refresh_token: res.headers.refresh_token
            })).then(res => {
                sessionStorage.setItem("access_token", res.headers.access_token)
                sessionStorage.setItem("expires_in", res.headers.expires_in)
                sessionStorage.setItem("refresh_token", res.headers.refresh_token)
                sessionStorage.setItem("username", res.headers.username)
                sessionStorage.setItem("avatar", res.headers.avatar)
                sessionStorage.setItem("id", res.headers.id)
                setUser(res.headers.username)
                console.log(res.headers.username)
            })}

        let username = sessionStorage.getItem("username")
        if(username != null)
            setUser(username)
        if (username == "undefined")
            setUser(false)

        fetch(process.env.REACT_APP_API_BASE + "/api/users").then(res => {
            if (res.ok) {
                return res.json()
            }
            return [{
                name: '',
                numtags: 0
            }]
        }).then(res => setPlayers(res));
    }, []);

    let handleChange = (e) => {
        setInfo("")
        setInputs(prevInput => { return { ...prevInput, [e.target.name]: e.target.value } })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (inputs.player != null && sessionStorage.getItem("access_token")) {
            axios.post("/api/update", {
                access_token: sessionStorage.getItem("access_token"),
                expires_in: sessionStorage.getItem("expires_in"),
                refresh_token: sessionStorage.getItem("refresh_token"),...inputs}).then(res => {
                setInfo(res.data)
                sessionStorage.setItem("access_token", res.headers.access_token)
                sessionStorage.setItem("expires_in", res.headers.expires_in)
                sessionStorage.setItem("refresh_token", res.headers.refresh_token)
            })
            navigate('/admin');
        }
        else {
            navigate('/admin');
            setInfo("Submit failed! Make sure you select a valid player.");
        }

        window.location.reload()
        setInputs(defaultInputs)
    };

    return (
        <Card>
            <Card.Header as="h1">Admin Dashboard</Card.Header>
            <Card.Body>Update user names, tags, and roles. Need moderator access to save.</Card.Body>
            <Card.Body style={{ width: '300px' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label name="userName">Signed in as: {!user ? "Sign in below" : user}</Form.Label>
                        <Button variant="primary" type="submit" href={discordAuth}>{!user ? "Login" : "Logged in"} with Discord</Button>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Player</Form.Label>
                        <Form.Select name="player" onChange={handleChange} disabled={!user}>
                            <option value={null}>None</option>
                            {players.map((player, index) => (
                                <option key={index} value={player._id}>{player.name}</option>))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>New Name</Form.Label>
                        <Form.Control name="newName" onChange={handleChange} placeholder="Current" disabled={!user}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select name="newRole" onChange={handleChange} disabled={!user}>
                            <option value={null}>Current</option>
                            <option value="Human">Human</option>
                            <option value="Zombie">Zombie</option>
                            <option value="Unregistered">Unregistered</option>
                            <option value="Registered">Registered</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control name="newTags" placeholder="Current" disabled={!user}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check name="newMod" type="switch" id="custom-switch" label="Make moderator" value={inputs.newMod} onChange={handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={onSubmit} disabled={!user}>
                        Submit
                    </Button>
                </Form>
            </Card.Body>
            <Card.Body variant="warning">{submitInfo}</Card.Body>
        </Card>
    );
}

export default Admin;