import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Table, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ModalAddNewOrg from './ModalAddNewOrg';
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "http://127.0.0.1:8000/graphql/"
});

class Organizations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orgs: [],
            columns: [{
                dataField: 'name',
                text: 'Name'
            }]
        }
        this.loadAddNewOrgModal = this.loadAddNewOrgModal.bind(this);
        this.handlerModal = this.handlerModal.bind(this)
    }

    handlerModal(orgsModal) {
        console.log("Added org", orgsModal)
        this.componentWillMount()
    }

    componentWillMount() {
        client
            .query({
                query: gql`
                {
                    organizations {
                      name
                    }
                }
                 `
            })
            .then(result => this.setState({ orgs: result.data.organizations }));
    }

    loadAddNewOrgModal() {
        this.setState({ modalAddNewOrgShow: true })
    }


    render() {
        let modalAddNewOrgClose = () => this.setState({ modalAddNewOrgShow: false });
        if (this.state.orgs.length > 0) {
            return (
                <div className="OrganizationsIdentity">
                    <h1>Organizations <Button id="addIdentitiesBtn" type="button" bsStyle="primary" style={{ float: "right", marginBottom: "10px" }} onClick={this.loadAddNewOrgModal}>Add</Button></h1>
                    <br></br>
                    <div className="Orgstablecontainer">
                        <BootstrapTable
                            striped
                            hover
                            keyField='name'
                            pagination={paginationFactory()}
                            data={this.state.orgs}
                            columns={this.state.columns} />
                    </div>
                    <ModalAddNewOrg handlerModal={this.handlerModal} show={this.state.modalAddNewOrgShow} onHide={modalAddNewOrgClose} />
                </div>
            )
        } else {
            return <h3 className="text-center">Loading organizations...</h3>
        }

    };
}

export default Organizations