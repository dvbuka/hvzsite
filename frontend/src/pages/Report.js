import { React, useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

function Report() {

    const [inputs, setInputs] = useState({
        zombieName: '',
        humanName: ''
    })

    const [players, setPlayers] = useState([{
        name: '',
        numtags: 0
    }])

    useEffect(() => {
        fetch("/api/leaderboard").then(res => {
            if (res.ok) {
                return res.json()
            }
            return [{
                name: '',
                numtags: 0
            }]
        }).then(res => setPlayers(res));
    })

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    function onSubmit() {
        //let zombie = ReactDOM.findDOMNode("reportZombieName");
        console.log("submission: " + inputs.zombieName + " " + inputs.humanName);
    }

    return (
        <Card>
            <Card.Header as="h1">Report an Infection</Card.Header>
            <Card.Body>Use this form to report a confirmed infection.</Card.Body>
            <Card.Body style={{ width: '500px' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Zombie name</Form.Label>
                        <Form.Select name="zombieName" onChange={handleChange}>
                            <option _id={0}>Unknown</option>
                            {players.map((player, index) => (
                                <option key={index} _id={player._id}>{player.name}</option>))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Human name</Form.Label>
                        <Form.Select name="humanName" onChange={handleChange}>
                            {players.map((player, index) => (
                                <option key={index} _id={player._id}>{player.name}</option>))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Report;