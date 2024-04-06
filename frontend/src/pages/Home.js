import { React, useEffect, useState } from "react";
import { Card, Button, Image } from "react-bootstrap";
import flyer from '../images/flyer.webp';
import discord from "../images/discord.png";

function Home() {
    const [info, setInfo] = useState({ registered: 0, humans: 0, zombies: 0 })

    useEffect(async () => {
        let newInfo = { registered: 0, humans: 0, zombies: 0 };

        await fetch("/api/totzombies").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => newInfo.zombies = jsonRes.length);

        await fetch("/api/tothumans").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => newInfo.humans = jsonRes.length);

        await fetch("/api/players").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => newInfo.registered = jsonRes.length);

        console.log(newInfo);
        setInfo(newInfo);

    }, []);

    return (
        <Card align="center">
            <Card.Header as="h1" align="center">Davis Humans Vs. Zombies is back!</Card.Header>
            <Card.Body>
                <Button variant="outline-light" style={{ width: '120px' }}>{info.registered} Registered</Button>{' '}
                <Button variant="danger" style={{ width: '120px' }}>{info.zombies} Zombie{info.zombies != 1 ? "s" : ""}</Button>{' '}
                <Button variant="success" style={{ width: '120px' }}>{info.humans} Human{info.humans != 1 ? "s" : ""}</Button>
            </Card.Body>
            <Card.Body><Image src={flyer} width="300px" height='auto' /> </Card.Body>
            <Card.Body>Event happening week of April 15th, 2024 (Week 3)!</Card.Body>
            <Card.Body> Join the Discord: <a href="https://discord.gg/HzgCTxwqdQ">
                <img src={discord} width="70px" /> </a> </Card.Body>
        </Card>
    );
}


export default Home;