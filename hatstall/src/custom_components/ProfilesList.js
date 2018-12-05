import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';


class ProfilesList extends Component {
    constructor(props) {
        super(props)
        this.state = { identities: [] }
    }

    componentWillMount(toSearch) {
        let shsearch = this.props.shsearch
        if(toSearch){
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
            return (
                <Col sm={12}>
                    <h1>Profiles</h1>
                    <div style={{ float: "right", marginBottom: "4px" }}>
                            <div class="input-group">
                                <FormControl class="form-control" id="shsearch_table" style={{width: "20%", float: "right"}} name="shsearch" placeholder="Search identities..."></FormControl>
                                <span class="input-group-btn">
                                    <button class="btn btn-info" onClick={this.searchIdentities}>Go!</button>
                                </span>
                            </div>
                    </div>

                    <div style={{ float: "left", marginBottom: "4px" }}>
                        <form action="list" method="POST">
                            Show
                    <select id="tableLength" name="table_length" value="{{table_length}}" onchange="this.form.submit()">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            entries
                </form>
                    </div>
                    <form action="merge_profiles" method="POST">

                        <table class="table table-striped" id="myTable">
                            <thead class="thead-dark">
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>Enrollments</th>
                                    <th>Bot?</th>
                                    <th>Country</th>
                                    <th>Last Modified</th>
                                    <th>
                                        <abbr title="identities">ids.</abbr>
                                    </th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <td colspan="5">
                                        <input type="submit" value="Merge" class="btn btn-success" />
                                    </td>
                                    <td colspan="3">
                                        <div id="customPagination"></div>
                                    </td>
                                </tr>
                            </tfoot>
                            <tbody>
                                {this.state.identities.map(uid =>
                                    <tr>
                                        <td>
                                            <input type="checkbox" name="uuid" value="{uid.profile.uuid}}" />
                                        </td>
                                        <td><a href={'/profile/' + uid.profile.uuid}>{uid.profile.name}</a></td>
                                        <td>{uid.profile.email}</td>
                                        <td>
                                            {uid.profile.enrollment}
                                        </td>
                                        <td>{uid.profile.is_bot}</td>
                                        <td>To fix!</td>
                                        <td>{uid.last_modified}</td>
                                        <td>{uid.identities.length}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </form>
                </Col>
            )
        } else {
            return <h3 className="text-center">Loading identities...</h3>
        }
    }
}

export default ProfilesList