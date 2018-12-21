import React, { Component } from 'react';
import person from '../person.png';
import ModalAddOrg from './ModalAddOrg';
import ModalAddIdentities from './ModalAddIdentities';

import {
    FormGroup, Form, Row, Col, FormControl, Button,
    ControlLabel, Table, Image,
    Media
} from 'react-bootstrap';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOrgShow: false,
            modalIdentitiesShow: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.loadOrgsModal = this.loadOrgsModal.bind(this);
        this.loadIdentitiesModal = this.loadIdentitiesModal.bind(this);
        console.log(this.props.match.params.profileId)
    }

    componentWillMount() {
        fetch('http://localhost:8000/identities/hatstall/' + this.props.match.params.profileId + '/?format=json&username=admin&password=admin')
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((profile) => {
                this.setState({ profile: profile })
                console.log(profile)
            })
    }

    getValidationState() {
        /*const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';*/
        return null;
    }

    handleChange(e) {
        //this.setState({ value: e.target.value });
    }

    loadOrgsModal() {
        fetch('http://localhost:8000/identities/hatstall/organizations?username=admin&password=admin&format=json')
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((orgs) => {
                this.setState({orgsModalData: orgs})
            })
        this.setState({ modalOrgShow: true })
    }

    loadIdentitiesModal() {
        this.setState({ modalIdentitiesShow: true })
    }

    render() {
        if (this.state.profile) {
            let modalOrgClose = () => this.setState({ modalOrgShow: false });
            let modalIdentitiesClose = () => this.setState({ modalIdentitiesShow: false });
            return (
                <div className="ProfilePage">
                    <div className="Profile">

                        <Media>
                            <Media.Left align="middle">
                                <Image width={64} height={64} src={person} circle />
                            </Media.Left>

                            <Media.Body>
                                <Media.Heading>{this.state.profile.profile.name}</Media.Heading>
                                <p>{this.state.profile.profile.uuid}</p>
                            </Media.Body>
                        </Media>

                        <Form style={{ marginTop: "20px" }}>

                            <FormGroup
                                controlId="formBasicText"
                            //validationState={this.getValidationState()}
                            >
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.profile.profile.name}
                                    placeholder="Name"
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <FormGroup
                                controlId="formBasicText"
                            //validationState={this.getValidationState()}
                            >
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.profile.profile.email}
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <Row>
                                <Col xs={12} md={12}>
                                    <FormGroup controlId="formControlsSelect">
                                        <ControlLabel>Bot</ControlLabel>
                                        <FormControl componentClass="select" value={this.state.profile.profile.is_bot}>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className="show-grid">
                                <Col xs={12} md={12}>
                                    <FormGroup controlId="formControlsSelect">
                                        <ControlLabel>Country</ControlLabel>
                                        <FormControl componentClass="select">
                                            <option value="male">Spain</option>
                                            <option value="female">France</option>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <style type="text/css">{`
                            .btn-custom {
                                background-color: #4197D5;
                                color: white;
                            }
                            .btn-custom:hover {
                                background-color: #4197D5;
                                color: white;
                                box-shadow: 0 0 6px #4197D5;
                                -moz-box-shadow: 0 0 6px #4197D5;
                                -o-box-shadow: 0 0 6px #4197D5;
                                -ms-box-shadow: 0 0 6px #4197D5;
                                -webkit-box-shadow: 0 0 6px #4197D5;
                            }
                        `}</style>

                            <Button bsStyle="custom" type="submit">Save</Button>

                        </Form>
                        <footer className="Profile-footer"></footer>
                    </div>
                    <div className="Organizations">
                        <h3>Enrollments <Button id="addIdentitiesBtn" type="button" bsStyle="primary" style={{ float: "right", marginBottom: "10px" }} onClick={this.loadOrgsModal}>Add</Button></h3>
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>Organization</th>
                                    <th>Dates</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Test</td>
                                    <td>
                                        <div class="input-group input-daterange">
                                            <input type="text" class="form-control" name="start_date" value="{{enrollment.start|date:'Y-m-d H:i:s'}}"></input>
                                            <div class="input-group-addon">to</div>
                                            <input type="text" class="form-control" name="end_date" value="{{enrollment.end|date:'Y-m-d H:i:s'}}"></input>
                                        </div>
                                        <input type="text" readonly hidden name="old_start_date" value="{{enrollment.start|date:'Y-m-d H:i:s'}}"></input>
                                        <input type="text" readonly hidden name="old_end_date" value="{{enrollment.end|date:'Y-m-d H:i:s'}}"></input>
                                    </td>
                                    <td>
                                        <button type="submit" class="btn btn-sm btn-success">Update</button>
                                    </td>
                                    <td>
                                        <a href="{% url 'unenroll identity' profile.profile.uuid enrollment.organization.name enrollment.start|date:'Y-m-d H:i:s' enrollment.end|date:'Y-m-d H:i:s' %}">un-enroll</a>
                                    </td>
                                </tr>
                                {/* {this.state.enrollments.map(enrollment =>
                                    <tr>
                                        <td>{enrollment.organization.name}</td>
                                        <td>
                                            <div class="input-group input-daterange">
                                                <input type="text" class="form-control" name="start_date" value="{{enrollment.start|date:'Y-m-d H:i:s'}}"></input>
                                                <div class="input-group-addon">to</div>
                                                <input type="text" class="form-control" name="end_date" value="{{enrollment.end|date:'Y-m-d H:i:s'}}"></input>
                                            </div>
                                            <input type="text" readonly hidden name="old_start_date" value="{{enrollment.start|date:'Y-m-d H:i:s'}}"></input>
                                            <input type="text" readonly hidden name="old_end_date" value="{{enrollment.end|date:'Y-m-d H:i:s'}}"></input>
                                        </td>
                                        <td>
                                            <button type="submit" class="btn btn-sm btn-success">Update</button>
                                        </td>
                                        <td>
                                            <a href="{% url 'unenroll identity' profile.profile.uuid enrollment.organization.name enrollment.start|date:'Y-m-d H:i:s' enrollment.end|date:'Y-m-d H:i:s' %}">un-enroll</a>
                                        </td>
                                    </tr>
                                )} */}
                            </tbody>
                        </Table>
                    </div>
                    <div className="ProfileIdentities">
                        <h3>Profile Identities <Button id="addIdentitiesBtn" type="button" bsStyle="primary" style={{ float: "right", marginBottom: "10px" }} onClick={this.loadIdentitiesModal}>Add</Button></h3>
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>Name - email - Username - Source</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.profile.identities.map(identity =>
                                    <tr>
                                        <td>{identity.name} - {identity.email} - {identity.username} - {identity.source}</td>
                                        <td>
                                            <a href="">unmerge</a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                    <ModalAddOrg show={this.state.modalOrgShow} orgs={this.state.orgsModalData} onHide={modalOrgClose} />
                    <ModalAddIdentities show={this.state.modalIdentitiesShow} onHide={modalIdentitiesClose} />
                </div>
            )
        } else {
            return <h3 className="text-center">Loading profile...</h3>
        }
    }
}

export default Profile;
