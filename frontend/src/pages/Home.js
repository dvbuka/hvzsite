import { Button, Card, Image } from "react-bootstrap";
import { React, useEffect, useState } from "react";
import discord from "../images/discord.png";
import flyer from '../images/flyer.webp';

function Home() {
    const [info, setInfo] = useState({ registered: 0, humans: 0, zombies: 0 })

    async function update() {
        let newInfo = { registered: 0, humans: 0, zombies: 0 };

        await fetch(process.env.REACT_APP_API_BASE + "/api/totzombies").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => newInfo.zombies = jsonRes.length);

        await fetch(process.env.REACT_APP_API_BASE + "/api/tothumans").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => newInfo.humans = jsonRes.length);

        await fetch(process.env.REACT_APP_API_BASE + "/api/players").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => newInfo.registered = jsonRes.length);

        console.log(newInfo);
        setInfo(newInfo);
        console.log(info)
    }
    useEffect(() => {
        update();
    }, []);

    return (
        <Card align="center">
            <Card.Header as="h3" align="center">Davis Humans Vs. Zombies is back!</Card.Header>
            <Card.Body>Event happening week of April 15th, 2024 (Week 3)!<p></p>
                <Button variant="danger" style={{ width: '120px' }}>{info.zombies} Zombie{info.zombies != 1 ? "s" : ""}</Button>{' '}
                <Button variant="outline-light" style={{ width: '120px' }}>{info.registered} Registered</Button>{' '}
                <Button variant="success" style={{ width: '120px' }}>{info.humans} Human{info.humans != 1 ? "s" : ""}</Button><p></p>
                
                <p></p>
                <Image thumbnail src={flyer} width="300px" height='auto' />
                <p></p>
                <Button variant="outline-light" href="https://discord.gg/HzgCTxwqdQ" style={{padding:"3px 10px 3px 10px"}}>
                    Join the Discord <img src={discord} width="35px" />
                </Button> </Card.Body>

        </Card>
    );
}


export default Home;