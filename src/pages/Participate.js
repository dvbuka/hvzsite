import React from "react";
import { Card } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
function Participate() {
    return (
        <Card>
            <Card.Header as="h1">Participate</Card.Header>
            <Card.Body>Use this form to register as a human!</Card.Body>
            <Card.Body style={{ width: '500px' }}>
                <Form>
                    <fieldset disabled>
                    <Form.Group className="mb-3" controlId="reportZombieName">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="reportTaggerUnknown">
                        <Form.Check type="checkbox" label="Volunteer to be a zombie" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </fieldset>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Participate;