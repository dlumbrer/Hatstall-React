import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { FormControl, Form, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


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
                dataField: 'profile.enrollment',
                text: 'Enrollments'
            },
            {
                dataField: 'profile.is_bot',
                text: 'Bot?'
            },
            {
                dataField: 'profile.country',
                text: 'Country'
            },
            {
                dataField: 'last_modified',
                text: 'Las Modified'
            },
            {
                dataField: 'identities.length',
                text: 'N identities'
            }]
        }

        function linkToProfile(cell, row) {
            return (
                <span>
                    <a href={'/profile/' + cell.uuid}>{cell.name}</a>
                </span>
            );
        }

    }


    componentWillMount(toSearch) {
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
    }

    searchIdentities = () => {
        this.setState({ identities: [] })
        this.componentWillMount(document.getElementById("shsearch_table").value)
    }

    render() {
        if (this.state.identities.length > 0) {
            const selectRow = {
                mode: 'checkbox',
            };
            return (
                <Col sm={12}>
                    <h1>Profiles</h1>
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
                        data={this.state.identities}
                        columns={this.state.columns}
                        selectRow={selectRow} />
                    <Form action="merge_profiles" method="POST" onSubmit={this.handleSubmit}>
                        <Button style={{ marginBottom: "10px" }} type="submit" bsStyle="success">Merge selected</Button>
                    </Form>

                </Col>
            )
        } else {
            return <h3 className="text-center">Loading identities...</h3>
        }
    }
}

export default ProfilesList