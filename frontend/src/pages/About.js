import React from "react";
import { Card } from "react-bootstrap";

function About() {
    return (
        <Card>
            <Card.Header as="h1">What is HvZ?</Card.Header>
            <Card.Body>Humans Vs. Zombies is a live-action game played on college campuses around the country. There are two teams: Zombies and Humans. The goal of the humans is the ward off a zombie invasion, while zombies attempt to infect all remaining humans. </Card.Body>

            <Card.Body>HvZ was first introduced to Davis in January 2011, hosted by the Davis Nerf Club. The Humans Vs. Zombies club ran 11 more campaigns between 2011-2014, but disbanded after that. In Spring 2022, Davis Nerf Club brought the event back and the current team is now hosting our third HvZ event Spring 2023!
            </Card.Body>

            <Card.Body>
                More information on Davis HvZ can be found here:
                <ul>
                    <li>
                        <a href="https://localwiki.org/davis/Humans_vs._Zombies" class="link-warning">Localwiki</a>
                    </li>
                </ul>

                More information on HvZ can be found here:
                <ul>
                    <li>
                        <a href="                https://web.archive.org/web/20221027080446/http://humansvszombies.org/" class="link-warning">humansvzzombies.org on Internet Archive</a>

                    </li>
                    <li>
                        <a href="https://en.wikipedia.org/wiki/Humans_vs._Zombies" class="link-warning">Wikipedia</a>
                    </li>
                </ul>
            </Card.Body>
        </Card>
    );
}

export default About;