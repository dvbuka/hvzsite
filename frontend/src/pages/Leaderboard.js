import {React, useEffect, useState} from "react";
import { Card, Table } from "react-bootstrap";

function Leaderboard() {
    const [players, setPlayers] = useState([{
        name: '',
        numtags: 0
    }])

    useEffect(() => {
        fetch("/api/leaderboard").then(res => {
            if(res.ok) {
                return res.json()
            }
            return [{
                name: '',
                numtags: 0
            }]
        }).then(jsonRes => setPlayers(jsonRes));
    })

    return (
        <>
            <Card>
                <Card.Header as="h1">Player List</Card.Header>
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
                            players.map((player, index) =>
                            <>
                             <tr>
                                <td>{index + 1}</td>
                                <td>{player.name}</td>
                                <td>{player.numtags}</td>
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