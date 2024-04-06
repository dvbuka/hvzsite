import React from "react";
import { Card } from "react-bootstrap";

function Page404() {
    return (
        <Card>
            <Card.Header as="h1">Oh no!</Card.Header>
            <Card.Body>How did you end up here?</Card.Body>
        </Card>
    );
}

export default Page404;