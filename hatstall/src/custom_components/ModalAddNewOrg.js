import React, { Component } from 'react';
import {
    Modal, Button, Table, Form, FormGroup, Col, FormControl, ControlLabel, Row
} from 'react-bootstrap';

class ModalAddOrg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let self = this
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.onHide()

        fetch('http://localhost:8000/identities/hatstall/organizations?format=json&username=admin&password=admin', {
            method: 'POST',
            body: data,
        }).then((response) => {
            console.log(response)
            return response.json()
        })
            .then((orgs) => {
                this.props.handlerModal(data)
            })
    }

    render() {
        return (
            <Modal
                {...this.props}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Add New Organization</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal id="addOrg" onSubmit={this.handleSubmit}>
                        <FormGroup controlId="formHorizontalOrgName">
                            <Col componentClass={ControlLabel} sm={1}>
                                Name:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="name" name="name" placeholder="Organization name" />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalOrgDomain">
                            <Col componentClass={ControlLabel} sm={1}>
                                Domain:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="name" name="domain" placeholder="Organization domain" />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={1} sm={11}>
                                <Button type="submit" bsStyle="success">Add</Button>
                                <Button style={{ marginLeft: "10px" }} onClick={this.props.onHide}>Close</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        )

    }
}

export default ModalAddOrg;