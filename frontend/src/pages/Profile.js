import { React, useEffect, useState } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import default_avatar from '../images/default_avatar.jpeg';
import { useParams, useNavigate } from 'react-router-dom';

let humanIcon = "https://img.icons8.com/?size=200&id=ADXitnGEnot3&format=png"
let zombieIcon = "https://img.icons8.com/?size=200&id=5jwkLPvvOsVu&format=png"

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
        }).then(res => {console.log(res)
            if (res != null)
                setInfo({ player: res.name, status: res.role, tags: res.numtags, lifetime: res.lifetime, achievements: "None"})
            else {
               navigate('/404')}})
    }, []);
    return (
        <Card>
            <Card.Header as="h2">Player: {info.player}</Card.Header>
            <Container>
                <Row justify-content="center" width="100%" display="flex" margin="0 auto">
                    <Col></Col>
                    <Col>
                        <Image src={info.status == "Human" ? humanIcon : zombieIcon} roundedCircle width='200px' height='auto' />
                    </Col>
                    <Col>
                        <Card.Body>Current Status: {info.status}</Card.Body>
                        <Card.Body>Current Tags: {info.tags}</Card.Body>
                        <Card.Body>Lifetime Tags: {info.lifetime}</Card.Body>
                        <Card.Body>Achievements: {info.achievements}</Card.Body>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </Card>
    );
}

export default Profile;