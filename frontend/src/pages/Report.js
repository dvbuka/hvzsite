import { React, useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";

function Report() {
    const [inputs, setInputs] = useState({
        zombieId: '-1',
        humanId: '0'
    })

    const [players, setPlayers] = useState([{
        name: '',
        numtags: 0
    }])

    const [submitInfo, setInfo] = useState("")

    useEffect(() => {
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
        setInputs(prevInput => {return { ...prevInput, [e.target.name]: e.target.value }})
    }

    const onSubmit = (e) => {
        setInfo(prevInput => {return ""});
        e.preventDefault();
        if(inputs.zombieId != '0' && inputs.humanId != '0'){
            axios.post("/api/tag", inputs).then(res => console.log("sent!"))
            setInfo(prevInput => {return "Submit worked!"});
        }
        else{
            setInfo(prevInput => {return "Submit failed! Make sure you select a human that was tagged!"});
        }
    };

    return (
        <Card>
            <Card.Header as="h1">Report an Infection</Card.Header>
            <Card.Body>Use this form to report a confirmed infection.</Card.Body>
            <Card.Body style={{ width: '500px' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Zombie name</Form.Label>
                        <Form.Select name="zombieId" onChange={handleChange}>
                            <option value={'-1'}>Unknown</option>
                            {players.map((player, index) => (
                                <option key={index} value={player._id}>{player.name}</option>))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Human name</Form.Label>
                        <Form.Select name="humanId" onChange={handleChange}>
                            <option value={'0'}>Select Human</option>
                            {players.map((player, index) => (
                                <option key={index} value={player._id}>{player.name}</option>))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        Submit
                    </Button>
                </Form>
            </Card.Body>
            <Card.Body variant="warning">{submitInfo}</Card.Body>
        </Card>
    );
}

export default Report;