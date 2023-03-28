import React from "react";
import { Card, Form, Button } from "react-bootstrap";

function Report() {
    return (
        <Card>
            <Card.Header as="h1">Report an Infection</Card.Header>
            <Card.Body>Use this form to report a confirmed infection.</Card.Body>
            <Card.Body style={{ width: '500px' }}>
                <Form>
                    <Form.Group className="mb-3" controlId="reportZombieName">
                        <Form.Label>Zombie name</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Select</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="reportZombieName">
                        <Form.Label>Human name</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Select</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Report;