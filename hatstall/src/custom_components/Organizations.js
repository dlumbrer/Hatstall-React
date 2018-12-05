import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Table, Row } from 'react-bootstrap';

class Organizations extends Component {
    constructor(props) {
        super(props)
        this.state = { orgs: [] }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        fetch('http://localhost:8000/identities/hatstall/organizations?username=admin&password=admin&format=json')
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((orgs) => {
                this.setState({ orgs: orgs })
            })
    }

    handleSubmit(event) {
        let self = this 
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('http://localhost:8000/identities/hatstall/organizations?format=json&username=admin&password=admin', {
            method: 'POST',
            body: data,
        }).then((response) => {
            console.log(response)
            return response.json()
        })
        .then((orgs) => {
            console.log(self)
            self.setState({ orgs: orgs })
        })
    }

    render() {

        if (this.state.orgs.length > 0) {
            return (
                <Row>
                    <Col sm={6}>
                        <h1>Organizations</h1>
                        <br></br>
                        <Table striped id="orgsTable">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orgs.map(org =>
                                    <tr>
                                        <td>{org.name}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>

                    <Col sm={6}>
                        <Form horizontal id="addOrg" onSubmit={this.handleSubmit}>
                            <button id="closeAddOrg" type="button" class="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h2>Add organization</h2>
                            <br />
                            <FormGroup controlId="formHorizontalOrgName ">
                                <Col componentClass={ControlLabel} sm={1}>
                                    Name:
                        </Col>
                                <Col sm={11}>
                                    <FormControl type="name" name="name" placeholder="Organization name" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={1} sm={11}>
                                    <Button type="submit" bsStyle="success">Add</Button>
                                </Col>
                            </FormGroup>

                        </Form>
                    </Col>

                </Row>
            )
        } else {
            return <h3 className="text-center">Loading organizations...</h3>
        }

    };
}

export default Organizations