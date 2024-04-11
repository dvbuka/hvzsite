import { Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import default_avatar from '../images/default_avatar.jpeg';

let humanIcon = "https://img.icons8.com/?size=200&id=ki5noZuRcTcN&format=png"
let zombieIcon = "https://img.icons8.com/?size=200&id=btaZQrhyTUF5&format=png"

function Profile() {

    let params = useParams();

    let navigate = useNavigate();

    const [info, setInfo] = useState({
        player: "Undefined",
        status: "Human",
        tags: 0,
        lifetime: 0,
        achievements: "None"
    })

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE + "/api/player/" + params.user).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(res => {
            console.log(res)
            if (res != null)
                setInfo({ player: res.name, status: res.role, tags: res.numtags, lifetime: res.lifetime, achievements: "None" })
            else {
                navigate('/404')
            }
        })
    }, []);
    return (
        <Card>
            <Card.Header as="h3">Player: {info.player}</Card.Header>
            <Container>
            <Card.Body></Card.Body>
                <Row justify-content="center" width="100%" display="flex">
                    <Col></Col>
                    <Col>
                        <Image src={info.status == "Human" ? humanIcon : zombieIcon} thumbnail width='200px' height='auto' />
                    </Col>
                    <Col>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item variant={info.status == "Zombie" ? "danger" : "success"}><b>Current Status:</b> {info.status}</ListGroup.Item>
                            <ListGroup.Item><b>Current Tags:</b> {info.tags}</ListGroup.Item>
                            <ListGroup.Item><b>Lifetime Tags:</b> {info.lifetime}</ListGroup.Item>
                            <ListGroup.Item><b>Achievements:</b> {info.achievements}</ListGroup.Item>
                        </ListGroup>
                        </Card.Body>
                    </Col>
                    <Col></Col>
                </Row>
                <Card.Body></Card.Body>
            </Container>
        </Card>
    );
}

export default Profile;