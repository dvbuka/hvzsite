import {React, useEffect, useState} from "react";
import { Card, Table } from "react-bootstrap";

function Leaderboard() {
    const [players, setPlayers] = useState([{
        name: 'Loading..',
    }])

    const [zombies, setZombies] = useState([{
        name: 'Loading...',
        tags: ''
    }]);

    useEffect(() => {
        fetch("/api/leaderboard").then(res => {
            if(res.ok) {
                return res.json()
            }
            return [{
                name: 'No one :(',
                numtags: 0
            }]
        }).then(jsonRes => setZombies(jsonRes));
        fetch("/api/players").then(res => {
            if(res.ok) {
                return res.json()
            }
            return [{
                name: 'No one :(',
            }]
        }).then(jsonRes => setPlayers(jsonRes));
    }, []);

    return (
        <>
            <Card>
                <Card.Header as="h1">Zombie Leadeboard</Card.Header>
                <Card.Body>
                    <Card.Text>Hidden zombies will not show here until they're exposed.</Card.Text>
                </Card.Body>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Tags</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            zombies.map((zombie, index) =>
                            <>
                             <tr>
                                <td>{index + 1}</td>
                                <td>{zombie.name}</td>
                                <td>{zombie.numtags}</td>
                            </tr>
                            </>
                                )}
                            <tr>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <Card>
            <Card.Header as="h1">Player List</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            players.map((player, index) =>
                            <>
                             <tr>
                                <td>{index + 1}</td>
                                <td>{player.name}</td>
                            </tr>
                            </>
                                )}
                            <tr>
                            </tr>
                        </tbody>
                    </Table>
                    </Card.Body>
            </Card>
        </>
    );
}

export default Leaderboard;