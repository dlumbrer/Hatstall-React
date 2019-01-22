import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ModalAddNewOrg from './ModalAddNewOrg';
import ModalAddNewDomain from './ModalAddNewDomain';
import gql from "graphql-tag";
import { Query } from 'react-apollo';

class Organizations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orgs: [],
            columns: [{
                dataField: 'name',
                text: 'Name'
            },
            {
                dataField: 'domains',
                text: 'Domains',
                formatter: listDomains,
            }]
        }
        this.loadAddNewOrgModal = this.loadAddNewOrgModal.bind(this);
        this.loadAddNewDomainModal = this.loadAddNewDomainModal.bind(this);
        this.handlerModal = this.handlerModal.bind(this)
        this.handlerDomainModal = this.handlerDomainModal.bind(this)

        function listDomains(cell, row) {
            return (
                <span>
                    {cell.map(domain =>
                        domain.domain + ", "
                    )}
                </span>
            );
        }
    }

    handlerModal(orgsModal) {
        this.state.refetch()
    }

    handlerDomainModal(domainModal) {
        this.state.refetch()
    }

    loadAddNewOrgModal() {
        this.setState({ modalAddNewOrgShow: true })
    }

    loadAddNewDomainModal() {
        this.setState({ modalAddNewDomainShow: true })
    }


    render() {
        let modalAddNewOrgClose = () => this.setState({ modalAddNewOrgShow: false });
        let modalAddNewDomainClose = () => this.setState({ modalAddNewDomainShow: false });
        const GET_ORGS = gql`
        {
            organizations {
              name
              domains {
                domain
              }
            }
        }
        `

        return (
            <Query query={GET_ORGS}>
                {({ loading, error, data, refetch }) => {
                    this.state.refetch = refetch
                    if (loading) return <h3 className="text-center">Loading organizations...</h3>;
                    if (error) return <h3 className="text-center">Error :(</h3>;
                    return (
                        <div className="OrganizationsIdentity">
                            <h1>Organizations <Button id="addIdentitiesBtn" type="button" bsStyle="success" style={{ float: "right", marginBottom: "10px" }} onClick={this.loadAddNewOrgModal}>Add Organization</Button><Button id="addIdentitiesBtn" type="button" bsStyle="success" style={{ float: "right", marginBottom: "10px", marginRight: "10px" }} onClick={this.loadAddNewDomainModal}>Add Domain</Button></h1>
                            <br></br>
                            <div className="Orgstablecontainer">
                                <BootstrapTable
                                    striped
                                    hover
                                    keyField='name'
                                    pagination={paginationFactory()}
                                    data={data.organizations}
                                    columns={this.state.columns} />
                            </div>
                            <ModalAddNewOrg handlerModal={this.handlerModal} show={this.state.modalAddNewOrgShow} onHide={modalAddNewOrgClose} />
                            <ModalAddNewDomain handlerDomainModal={this.handlerDomainModal} show={this.state.modalAddNewDomainShow} onHide={modalAddNewDomainClose} />
                        </div>
                    )
                }}
            </Query>
        )

    };
}

export default Organizations