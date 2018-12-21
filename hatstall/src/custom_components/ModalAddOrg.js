import React, { Component } from 'react';
import {
    Modal, Button, Table
} from 'react-bootstrap';

class ModalAddOrg extends React.Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    render() {
        console.log(this.props.orgs)
      if (this.props.orgs) {
            return (
                <Modal
                {...this.props}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Available Organizations</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Table striped>
                    <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.orgs.map(org =>
                            <tr>
                                <td>{org.name}</td>
                                <td><a>Enroll</a></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
                </Modal>
            )
        } else {
            return (
                <Modal
                {...this.props}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Available Organizations</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-center">Loading organizations...</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
                </Modal>
                )
        }
    }
  }

  export default ModalAddOrg;