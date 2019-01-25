import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { FormControl, Form, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import gql from "graphql-tag";
import { Query } from 'react-apollo';


class ProfilesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            identities: [],
            columns: [{
                dataField: 'profile',
                text: 'Name',
                formatter: linkToProfile,
            },
            {
                dataField: 'profile.email',
                text: 'Email'
            },
            {
                dataField: 'enrollments',
                text: 'Enrollments',
                formatter: listEnrollments
            },
            {
                dataField: 'profile.isBot',
                text: 'Bot?'
            },
            {
                dataField: 'profile.country.name',
                text: 'Country'
            },
            {
                dataField: 'last_modified',
                text: 'Last Modified'
            },
            {
                dataField: 'identities.length',
                text: 'N identities'
            }]
        }

        function linkToProfile(cell, row) {
            return (
                <span>
                    <a href={'/profile/' + row.uuid}>{cell.name}</a>
                </span>
            );
        }

        function listEnrollments(cell, row) {
            return (
                <span>
                    {cell.map(enrollment =>
                        <span>{enrollment.organization.name}, </span>
                    )}
                </span>
            );
        }

    }


    /*componentWillMount(toSearch) {
        let shsearch = this.props.shsearch
        if (toSearch) {
            shsearch = toSearch
        }
        fetch('http://localhost:8000/identities/hatstall/list?username=admin&password=admin&format=json&shsearch=' + shsearch)
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((identities) => {
                this.setState({ identities: identities })
            })
    }*/

    searchIdentities = () => {
        this.setState({ identities: [] })
        //this.componentWillMount(document.getElementById("shsearch_table").value)
        this.state.refetch()
    }

    render() {
        const GET_UIDS = gql`
        {
            uidentities {
              uuid
              profile {
                id
                name
                email
                country {
                    name
                }
                isBot
              }
              identities{
                name
                email
                username
              }
              enrollments {
                organization {
                  name
                }
              }
            }
          }
        `
        return (
            <Query query={GET_UIDS}>
                {({ loading, error, data, refetch }) => {
                    this.state.refetch = refetch
                    if (loading) return <h3 className="text-center">Loading profiles...</h3>;
                    if (error) return <h3 className="text-center">Error :(</h3>;
                    return (
                        <Col sm={12}>
                            <h1>Unique Identities</h1>
                            <div style={{ float: "right", marginBottom: "4px" }}>
                                <div class="input-group">
                                    <FormControl class="form-control" id="shsearch_table" style={{ width: "20%", float: "right" }} name="shsearch" placeholder="Search identities..."></FormControl>
                                    <span class="input-group-btn">
                                        <button class="btn btn-info" onClick={this.searchIdentities}>Go!</button>
                                    </span>
                                </div>
                            </div>


                            <BootstrapTable
                                striped
                                keyField='profile.name'
                                pagination={paginationFactory()}
                                data={data.uidentities}
                                columns={this.state.columns}
                            //selectRow={selectRow} 
                            />
                            <Form action="merge_profiles" method="POST" onSubmit={this.handleSubmit}>
                                <Button style={{ marginBottom: "10px" }} type="submit" bsStyle="success">Merge selected</Button>
                            </Form>

                        </Col>
                    )
                }}
            </Query>
        )
    }
}

export default ProfilesList