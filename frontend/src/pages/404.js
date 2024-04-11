import { Card } from "react-bootstrap";
import React from "react";


function Page404() {
    return (
        <Card>
            <Card.Header as="h1">Oh no!</Card.Header>
            <Card.Body>How did you end up here?</Card.Body>
        </Card>
    );
}

export default Page404;