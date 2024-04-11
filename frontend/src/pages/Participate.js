import { React, useEffect, useState } from "react";
import discord from "../images/discord.png";
import { Button, Card } from "react-bootstrap";

function Participate() {
    return <>
        <Card>
            <Card.Header as="h3">Participate</Card.Header>
            <Card.Body>In order to register, please use the Discord bot. This allows you to communicate with your teammates.</Card.Body>
            <Card.Body>Steps:
                <ol>
                    <li>Join the Discord: <Button style={{padding:"5px"}}variant="outline-light" href="https://discord.gg/HzgCTxwqdQ">
                         <img src={discord} width="30px" />
                    </Button></li>
                    <li>Find the commands channel.</li>
                    <li>Type -register [Your name] [Last Initial or name]</li>
                    <li>Check #how-to-register for more information! DM Dasha on Discord if you need more assistance.</li>
                </ol>
            </Card.Body>
        </Card>
    </>
}

export default Participate;

/*
const [taken, setTaken] = useState([{
    name: 'Loading..',
}])

const [submitInfo, setInfo] = useState("")

const [inputs, setInputs] = useState({
    name: "",
    UUID: "-1"
})

let handleChange = (e) => {
    setInputs(prevInput => {return { ...prevInput, [e.target.name]: e.target.value }})
}

const onSubmit = (e) => {
    e.preventDefault();
    if(inputs.name != "" && inputs.humanId != '-1'){
        let res;
        axios.post("/api/register", inputs).then(res => res)
        if(res.ok)
            setInfo(prevInput => {return "S"});
    }
    else{
        setInfo(prevInput => {return "Please provide a name and UUID!"});
    }
};

useEffect(() => {
    fetch("/api/taken").then(res => {
        if (res.ok) {
            return res.json()
        }
        return [{
            name: '',
        }]
        }).then(res => setPlayers(res));
    }, []);

 
return (
    <Card>
        <Card.Header as="h1">Participate</Card.Header>
        <Card.Body>Use this form to register as a human!</Card.Body>
        <Card.Body>If you don't know your UUID, it's easier to join the Discord and to register with the bot! Check out #how-to-register for more info. </Card.Body>
        <Card.Body style={{ width: '500px' }}>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Your name</Form.Label>
                    <Form.Control placeholder="Enter name" name="name" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Your Discord UUID (16 digit number)</Form.Label>
                    <Form.Control placeholder="Enter name" name="UUID" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                <fieldset disabled>
                    <Form.Check type="checkbox" label="Volunteer to be a zombie" />
                </fieldset>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Card.Body>
        <Card.Body variant="warning">{submitInfo}</Card.Body>
    </Card>
);
*/