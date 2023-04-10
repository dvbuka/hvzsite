import { React, useEffect, useState } from "react";
import '../App.css';
import { Card } from "react-bootstrap";
import flyer from '../flyer.png';

function Home() {
    const [info, setInfo] = useState({
        registered: 0,
        zombies: 2,
        humans: 30
    })

    useEffect(() => {
        fetch("/api/leaderboard").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(res => setInfo({ ...info, registered: res.length }));
    })

    return (
        <Card align="center">
            <Card.Header as="h1" align="center">Davis Humans Vs. Zombies is back!</Card.Header>
            <Card.Body>
                <img src={flyer} height="300px" width="210px" />
            </Card.Body>
            <Card.Body><a href="https://discord.gg/HzgCTxwqdQ">discord.gg/HzgCTxwqdQ</a></Card.Body>
            <Card.Body align="center">{info.registered} Registered</Card.Body>
            <Card.Body align="center">{info.zombies} Zombies {info.humans} Humans</Card.Body>
        </Card>
    );
}

export default Home;