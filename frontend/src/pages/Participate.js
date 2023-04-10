import {React} from "react";
import { Card } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
function Participate() {
    return (
        <Card>
            <Card.Header as="h1">Participate</Card.Header>
            <Card.Body>Use this form to register as a human!</Card.Body>
            <Card.Body>If you don't know your UUID, it's easier to join the Discord and to register with the bot! Check out #how-to-register for more info. </Card.Body>
            <Card.Body style={{ width: '500px' }}>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Your Discord UUID (16 digit number)</Form.Label>
                        <Form.Control placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="volunteer">
                    <fieldset disabled>
                        <Form.Check type="checkbox" label="Volunteer to be a zombie" />
                    </fieldset>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Participate;