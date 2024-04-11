import { Card } from "react-bootstrap";
import React from "react";
import discord from "../images/discord.png";
import ig from "../images/instagram.png";

function DNC() {
    return (
        <Card>
            <Card.Header as="h3">Davis Nerf Club</Card.Header>
            <Card.Body> Davis Nerf club is active weekly, bringing fun & free Nerf events to the Davis community. Attendees will be asked to fill out a participation waiver. Learn more either in the Discord or on Instagram!
                <a href="https://instagram.com/davisnerfclub2024">
                    <img src={ig} width="50px" />
                </a>
                <a href="https://discord.gg/PcPhUcCXgE">
                    <img src={discord} width="50px" />
                </a>
            </Card.Body>
        </Card>
    );
}

export default DNC;