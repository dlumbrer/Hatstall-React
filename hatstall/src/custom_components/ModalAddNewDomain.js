import React, { Component } from 'react';
import {
    Modal, Button, Checkbox, Form, FormGroup, Col, FormControl, ControlLabel, Row
} from 'react-bootstrap';
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";



class ModalAddNewDomain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let domainStr;
        let isTopDomainCheck;
        let orgName;
        const ADD_DOM = gql`
        mutation addDom($organization: String!, $domain: String!, $isTopDomain: Boolean!) {
            addDomain(organization: $organization,
                        domain: $domain,
                        isTopDomain: $isTopDomain)
            {
                domain {
                    domain
                    isTopDomain
                    organization {
                        name
                    }
                }
            }
        }
        `;
        const GET_ORGS = gql`
        {
            organizations {
              name
              domains {
                domain
              }
            }
        }`


        return (

            <Modal
                {...this.props}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Add New Domain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Mutation mutation={ADD_DOM}>
                        {(addDomain, { data }) => (
                            <Form horizontal id="addDomain" onSubmit={e => {
                                const here = this
                                e.preventDefault();
                                let domain = addDomain({ variables: { domain: domainStr.value, isTopDomain: isTopDomainCheck.value, organization: orgName.value } }).then(function (result) {
                                    console.log(result)
                                    here.props.handlerDomainModal(domainStr)
                                });
                                domainStr.value = "";
                                isTopDomainCheck.value = "false";
                                orgName.value = "";
                                this.props.onHide()
                            }}>
                                <FormGroup controlId="formHorizontalDomainName">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Domain:
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl type="name" name="domain" placeholder="Domain" inputRef={node => {
                                            domainStr = node;
                                        }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalDomainIsTop">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Is top domain:
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl componentClass="select" placeholder="select" inputRef={node => {
                                            isTopDomainCheck = node;
                                        }} >
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                        </FormControl>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalDomainOrg">

                                    <Col componentClass={ControlLabel} sm={2}>
                                        Organization:
                                    </Col>
                                    <Query query={GET_ORGS}>
                                        {({ loading, error, data, refetch }) => {
                                            if (loading) return <option value="Loading">Loading organizations...</option>;
                                            if (error) return <option value="error">Error :(</option>;
                                            return (
                                                <Col sm={9}>
                                                    <FormControl componentClass="select" placeholder="select" inputRef={node => {
                                                        orgName = node;
                                                    }} >
                                                        {data.organizations.map(org =>
                                                            <option value={org.name}>{org.name}</option>
                                                        )}
                                                    </FormControl>
                                                </Col>
                                            )
                                        }}
                                    </Query>
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

export default ModalAddNewDomain;