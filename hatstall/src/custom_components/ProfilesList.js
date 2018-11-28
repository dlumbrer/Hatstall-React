import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

export let ProfilesList = () => {
    return (
        <Col sm={12}>
            <h1>Profiles</h1>
            <div style={{float: "right", marginBottom:"4px"}}>
                <form action="list" method="POST">
                    Search to SH: <input id="shsearch" name="shsearch" value="{{shsearch}}" minlength={3} />
                </form>
            </div>

            <div style={{float:"left", marginBottom:"4px"}}>
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

                        <tr>
                            <td>
                                <input type="checkbox" name="uuid" value="{{uid.profile.uuid}}" />
                            </td>
                            <td><a href="{{uid.profile.uuid}}">uid.profile.name|blank_name</a></td>
                            <td>uid.profile.email</td>
                            <td>
                                enrollment
                            </td>
                            <td>uid.profile.is_bot</td>
                            <td>uid.profile.country.name</td>
                            <td>uid.last_modified</td>
                            <td>uid.identities|length</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </Col>
    );
}