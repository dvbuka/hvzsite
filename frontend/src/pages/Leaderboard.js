// TODO:
// cache leaderboard into another object internally and call that instead
// every 5 mins maybe?
// makes safer and faster

import { Card, Table } from "react-bootstrap";
import { React, useEffect, useState } from "react";

function Leaderboard() {
    const [players, setPlayers] = useState([{
        name: 'Loading..',
    }])

    const [zombies, setZombies] = useState([{
        name: 'Loading...',
        tags: ''
    }]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE + "/api/leaderboard").then(res => {
            if (res.ok) {
                return res.json()
            }
            return [{
                name: 'No one :(',
                numtags: 0
            }]
        }).then(jsonRes => setZombies(jsonRes));
        fetch(process.env.REACT_APP_API_BASE + "/api/players").then(res => {
            if (res.ok) {
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
                <Card.Header as="h3">Zombie Leaderboard</Card.Header>
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
                                            <td><a href={"profile/" + zombie.userID}>{zombie.name}</a></td>
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
                <Card.Header as="h3">Player List</Card.Header>
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
                                            <td><a href={"profile/" + player.userID}>{player.name}</a></td>
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