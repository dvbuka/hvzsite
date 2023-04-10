import React from "react";
import { Card } from "react-bootstrap";
import ig from "../images/instagram.png";
import discord from "../images/discord.png";

function DNC() {
    return (
        <Card>
            <Card.Header as="h1">Davis Nerf Club</Card.Header>
            <Card.Body>Check out Davis Nerf Club here:
                <a href="instagram.com/davis_nerfclub">
                    <img src={ig} width="70px"/>
                </a>
                <a href="https://discord.gg/PcPhUcCXgE">
                    <img src={discord} width="70px"/>
                </a>
            </Card.Body>
        </Card>
    );
}

export default DNC;