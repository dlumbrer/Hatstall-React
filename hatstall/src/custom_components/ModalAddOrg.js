import React, { Component } from 'react';
import {
    Modal, Button, Table
} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class ModalAddOrg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [{
                dataField: 'name',
                text: 'Name'
            }, {
                dataField: 'name',
                text: 'Enroll',
                formatter: linkToEnroll,
            }]
        }

        function linkToEnroll(cell, row) {
            return (
                <span>
                    <a>Enroll</a>
                </span>
            );
        }
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
                            <BootstrapTable
                                striped
                                keyField='name'
                                pagination={paginationFactory()}
                                data={this.props.orgs}
                                columns={this.state.columns} />
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