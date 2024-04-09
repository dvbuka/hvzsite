import { React, useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Report = ({ discordAuth }) => {

    let navigate = useNavigate();

    let defaultInputs = {
        zombieId: null,
        humanId: null,
    }

    const [inputs, setInputs] = useState(defaultInputs)

    const [players, setPlayers] = useState([{
        name: '',
        numtags: 0
    }])

    const [user, setUser] = useState(false)

    const [submitInfo, setInfo] = useState("")

    useEffect(() => {



        let queryParameters = new URLSearchParams(window.location.search)
        let code = queryParameters.get("code")
        
        if (code != null) {
            console.log(code)
            axios.post("/api/tradecode", { "authCode": code , "redirect_tail": 'report'}).then(res => {
                console.log(res)
                sessionStorage.setItem("access_token", res.headers.access_token)
                sessionStorage.setItem("expires_in", res.headers.expires_in)
                sessionStorage.setItem("refresh_token", res.headers.refresh_token)
                console.log(sessionStorage.getItem("access_token"))
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
                navigate('/report')
            })}

        let username = sessionStorage.getItem("username")
        if(username != null)
            setUser(username)
        if (username == undefined)
            setUser(false)

        fetch("/api/players").then(res => {
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
        setInfo("");
        setInputs(prevInput => { return { ...prevInput, [e.target.name]: e.target.value } })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (inputs.humanId != null && sessionStorage.getItem("access_token")) {
            navigate('/report');
            axios.post("/api/tag", {
                access_token: sessionStorage.getItem("access_token"),
                expires_in: sessionStorage.getItem("expires_in"),
                refresh_token: sessionStorage.getItem("refresh_token"),
                zombieID: inputs.zombieId,
                humanId: inputs.humanId
            }).then(res => {
                sessionStorage.setItem("access_token", res.headers.access_token)
                sessionStorage.setItem("expires_in", res.headers.expires_in)
                sessionStorage.setItem("refresh_token", res.headers.refresh_token)
                setInfo(res.data)
            })
        }
        else {
            setInfo("Submit failed! Make sure to list a zombie, player, and to log in.");
        }
        setInputs(defaultInputs)
    };

    return (
        <Card>
            <Card.Header as="h1">Report an Infection</Card.Header>
            <Card.Body>Use this form to report a confirmed infection.</Card.Body>
            <Card.Body style={{ width: '300px' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label name="userName">Signed in as: {!user ? "Sign in below" : user}</Form.Label>
                        <Button variant="primary" type="submit" href={discordAuth} color="#7289da">{!user ? "Login" : "Logged in"} with Discord</Button>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Zombie name</Form.Label>
                        <Form.Select name="zombieId" onChange={handleChange} disabled={!user}>
                            <option value={null}>Unknown</option>
                            {players.map((player, index) => (
                                <option key={index} value={player._id}>{player.name}</option>))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Human name</Form.Label>
                        <Form.Select name="humanId" onChange={handleChange} disabled={!user}>
                            <option value={null}>Select Human</option>
                            {players.map((player, index) => (
                                <option key={index} value={player._id}>{player.name}</option>))}
                        </Form.Select>
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

export default Report;