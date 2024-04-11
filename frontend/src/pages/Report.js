import { Button, Card, Form } from "react-bootstrap";
import { React, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const utils = require('../api_utils.js');

const Report = ({ discordAuth }) => {

    axios.defaults.baseURL = process.env.REACT_APP_API_BASE

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

    async function update() {
        let queryParameters = new URLSearchParams(window.location.search)
        let code = queryParameters.get("code")

        if (code != null) {
            navigate('/report')
            await utils.trade_code(axios, code, 'report')
        }

        let username = sessionStorage.getItem("username")

        setUser(false)

        if (username != undefined && username != null)
            setUser(username)

        fetch(process.env.REACT_APP_API_BASE + "/api/players").then(res => {
            if (res.ok) {
                return res.json()
            }
            return [{
                name: '',
                numtags: 0
            }]
        }).then(res => setPlayers(res));
    }
    useEffect(() => {
        update();
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
                ...sessionStorage,
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
            window.location.reload()
            setInfo("Submit failed! Make sure to list a zombie, player, and to log in.");
        }
        setInputs(defaultInputs)
    };

    return (
        <Card>
            <Card.Header as="h3">Report an Infection</Card.Header>
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