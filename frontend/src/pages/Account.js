// TODO:
// page with options to change player name
// also add a profile picture, use discord avatar by default

import { React, useEffect, useState } from "react";
import { Card, Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import default_avatar from '../images/default_avatar.jpeg';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE

const Account = ({ discordAuth }) => {

    let navigate = useNavigate();

    let defaultInputs = {
        newName: null,
        registerMe: null,
        newAvatar: null,
    }

    const [inputs, setInputs] = useState(defaultInputs)

    const [user, setUser] = useState(false)

    const [submitInfo, setInfo] = useState("")

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const code = queryParameters.get("code")

        if (code != null) {
            navigate('/account')
            axios.post("/api/tradecode", { "authCode": code, "redirect_tail": 'account' }).then(res => {
                console.log(res)
                sessionStorage.setItem("access_token", res.headers.access_token)
                sessionStorage.setItem("expires_in", res.headers.expires_in)
                sessionStorage.setItem("refresh_token", res.headers.refresh_token)
                return res
            }).then(res => axios.post("/api/identifyuser",{
                access_token: res.headers.access_token,
                expires_in: res.headers.expires_in,
                refresh_token: res.headers.refresh_token
            })).then(res => {
                sessionStorage.setItem("access_token", res.headers.access_token)
                sessionStorage.setItem("expires_in", res.headers.expires_in)
                sessionStorage.setItem("refresh_token", res.headers.refresh_token)
                sessionStorage.setItem("username", res.headers.username)
                sessionStorage.setItem("avatar", res.headers.avatar)
                sessionStorage.setItem("id", res.headers.id)
                setUser(res.headers.username)
            })
        }

        let username = sessionStorage.getItem("username")
        if(username != null)
            setUser(username)

    }, []);

    let handleChange = (e) => {
        setInfo("");
        setInputs(prevInput => { return { ...prevInput, [e.target.name]: e.target.value } })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (sessionStorage.getItem("access_token") != null) {
            navigate('/account');
            axios.post("/api/userupdate", {
                access_token: sessionStorage.getItem("access_token"),
                expires_in: sessionStorage.getItem("expires_in"),
                refresh_token: sessionStorage.getItem("refresh_token"),...inputs}).then(res => {
                setInfo(res.data)
                sessionStorage.setItem("access_token", res.headers.access_token)
                sessionStorage.setItem("expires_in", res.headers.expires_in)
                sessionStorage.setItem("refresh_token", res.headers.refresh_token)
            })
        }
        else {
            setInfo("Submit failed! Make sure to log in.");
        }
        window.location.reload()
        navigate('/account');
        setInputs(defaultInputs)
    };

    return (
        <Card>
            <Card.Header as="h1">Update profile</Card.Header>
            <Card.Body>Use this form to update your profile.</Card.Body>
            <Card.Body style={{ width: '300px' }}>
                <Form>
                <Form.Group className="mb-3">
                        <Form.Label name="userName">Signed in as: {!user ? "Sign in below" : user}</Form.Label>
                        <Button variant="primary" type="submit" href={discordAuth}>{!user ? "Login" : "Logged in"} with Discord</Button>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check type="switch" id="custom-switch" label="Register for event" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>New Name</Form.Label>
                        <Form.Control name="newName" onChange={handleChange} placeholder="Current" disabled={!user} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={onSubmit} disabled={!user}>
                        Submit
                    </Button>
                </Form>
            </Card.Body>
            <Card.Body variant="warning">{submitInfo}</Card.Body>
        </Card>
    );
}

export default Account;

/*
                    <Form.Group className="mb-3">
                        <Form.Label>Update profile picture</Form.Label>
                        <Image src={'https://cdn.discordapp.com/avatars/' + sessionStorage.getItem("id") + '/' + sessionStorage.getItem("avatar")} roundedCircle width='200px' height='auto' />
                        <Form.Control type="file" />
                    </Form.Group>
*/