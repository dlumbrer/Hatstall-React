import React, { Component } from 'react';
import {
    Modal, Button, Table, Form, FormGroup, Col, FormControl, ControlLabel, Row
} from 'react-bootstrap';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";



class ModalAddOrg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let nameOrg;
        const ADD_ORG = gql`
        mutation addOrg($name: String!) {
            addOrganization(name: $name) {
                organization {
                    name
                }
            }
        }
        `;

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
                    <Mutation mutation={ADD_ORG}>
                        {(addOrganization, { data }) => (
                            <Form horizontal id="addOrg" onSubmit={e => {
                                e.preventDefault();
                                let orgs = addOrganization({ variables: { name: nameOrg.value } }).then(function(result){
                                    console.log(result)
                                });
                                nameOrg.value = "";
                                this.props.onHide()
                                this.props.handlerModal(nameOrg)
                            }}>
                                <FormGroup controlId="formHorizontalOrgName">
                                    <Col componentClass={ControlLabel} sm={1}>
                                        Name:
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="name" name="name" placeholder="Organization name" inputRef={node => {
                                            nameOrg = node;
                                        }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={1} sm={11}>
                                        <Button type="submit" bsStyle="success">Add</Button>
                                        <Button style={{ marginLeft: "10px" }} onClick={this.props.onHide}>Close</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        )}
                    </Mutation>
                </Modal.Body>
            </Modal>
        )

    }
}

export default ModalAddOrg;