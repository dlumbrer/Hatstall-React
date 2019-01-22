import React, { Component } from 'react';
import {
    Modal, Button, Table, Form, FormGroup, Col, FormControl, ControlLabel, Row
} from 'react-bootstrap';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";



class ModalDeleteDomain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const DELETE_DOM = gql`
        mutation delDom($domain: String!) {
            deleteDomain(domain: $domain) {
              domain {
                domain
                isTopDomain
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
                    <Modal.Title id="contained-modal-title-lg">Are you sure that you want to delete the domain <strong>{this.props.domainToDelete}</strong>?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Mutation mutation={DELETE_DOM}>
                        {(deleteDomain, { data }) => (
                            <Form horizontal id="addOrg" onSubmit={e => {
                                const here = this
                                e.preventDefault();
                                let orgs = deleteDomain({ variables: { domain: this.props.domainToDelete } }).then(function(result){
                                    console.log(result)
                                    here.props.handlerDeleteDomainModal(here.props.domainToDelete)
                                });
                                this.props.onHide()
                            }}>
                                <FormGroup>
                                    <Col sm={12}>
                                        <Button type="submit" bsStyle="danger">Yes</Button>
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

export default ModalDeleteDomain;