import React, { Component } from 'react';
import {
    Modal, Button, FormControl, Form
} from 'react-bootstrap';

class ModalAddIdentities extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Modal
                {...this.props}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Search identities to merge</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form style={{ marginTop: "20px", marginLeft:"100px", marginRight: "100px", marginBottom: "20px"}}>
                        <div class="input-group">
                            <FormControl class="form-control" id="shsearch" name="shsearch" placeholder="Search identities..."></FormControl>
                            <span class="input-group-btn">
                                <button class="btn btn-info" onClick={this.searchIdentities}><i class="fa fa-search icon"></i></button>
                            </span>
                        </div>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalAddIdentities;