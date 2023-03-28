import React from "react";
import '../App.css';
import { Card } from "react-bootstrap";

function Home() {
    return (
        <Card>
            <Card.Header as="h1" align="center">Davis Humans Vs. Zombies is back!</Card.Header>
            <Card.Body align="center">__ Registered</Card.Body>
            <Card.Body align="center">__ Zombies __ Humans</Card.Body>
        </Card>
    );
}

export default Home;