import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

export let Profile = () => {
    return (
        <Col sm={12}>
        <h1>Profile info / <small>profile.profile.uuid</small></h1>
        <div class="row">
            <Col sm={5}>
                <div class="row">
                    <div class="col-lg-12">
                        <form id="profileData" action="" method="POST">
                            <div class="form-group row">
                                <label for="profileName" class="col-sm-2 col-form-label"><b>Name</b></label>
                                <input name="name" type="text" readonly class="col-sm-10 form-control-plaintext" id="profileName" value="{{profile.profile.name}}" />
                            </div>
                            <div class="form-group row">
                                <label for="profileEmail" class="col-sm-2 col-form-label"><b>e-mail</b></label>
                                <input name="email" type="text" readonly class="col-sm-10 form-control-plaintext" id="profileEmail" value="{{profile.profile.email}}" />
                            </div>
                            <div class="form-group row">
                                <label for="profileBot" class="col-sm-2 col-form-label"><b>Bot?</b></label>
                                <input name="bot" type="checkbox" class="col-sm-10 form-control-plaintext" style={{height:"20px", marginTop:"8px"}} id="profileBot" value="{{profile.profile.is_bot}}" disabled />
                            </div>
                            <div class="form-group row">
                                <label for="profileCountry" class="col-sm-2 col-form-label"><b>Country</b></label>
                                <select id="countrySelect" name="country" type="text" disabled="true" class="col-sm-10 form-control" id=" profileCountry" value="{{profile.profile.country.code}}">
                                    <option value="">None</option>
                                    <option value="{{country.code}}">country.name</option>
                                </select>
                            </div>
                            <span id="editProfileData" class="btn btn-primary">Edit</span>
                            <button type="submit" class="btn btn-success" id="submitProfileData" hidden>Submit</button>
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <h2 class="float-left">Enrollments</h2>
                        <button id="addEnrollmentsBtn" type="button" class="btn btn-primary btn-sm float-right">Add <span class="sr-only">enrollments</span></button>
                        <table class="table table-striped table-sm" id="profileEnrollments">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Organization</th>
                                    <th>Dates</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <form action="{% url 'update identity' profile.profile.uuid enrollment.organization.name %}" method="POST">
                                    <tr>
                                        <td>enrollment.organization.name</td>
                                        <td>
                                            <div class="input-group input-daterange">
                                                <input type="text" class="form-control" name="start_date" value="{{enrollment.start|date:'Y-m-d H:i:s'}}" />
                                                <div class="input-group-addon">to</div>
                                                <input type="text" class="form-control" name="end_date" value="{{enrollment.end|date:'Y-m-d H:i:s'}}" />
                                            </div>
                                            <input type="text" readonly hidden name="old_start_date" value="{{enrollment.start|date:'Y-m-d H:i:s'}}" />
                                            <input type="text" readonly hidden name="old_end_date" value="{{enrollment.end|date:'Y-m-d H:i:s'}}" />
                                        </td>
                                        <td>
                                            <button type="submit" class="btn btn-sm btn-success">Update</button>
                                        </td>
                                        <td>
                                            <a href="{% url 'unenroll identity' profile.profile.uuid enrollment.organization.name enrollment.start|date:'Y-m-d H:i:s' enrollment.end|date:'Y-m-d H:i:s' %}">un-enroll</a>
                                        </td>
                                    </tr>
                                </form>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <h2 class="float-left">Profile Identitites</h2>
                        <button id="addIdentitiesBtn" type="button" class="btn btn-primary btn-sm float-right">Add <span class="sr-only">identities</span></button>
                        <div class="">
                            <table class="table table-striped table-sm" id="profileIdsTable">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Name - email - Username - Source</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>identity.name - identity.email - identity.username - identity.source</td>
                                        <td>
                                            <a href="{% url 'unmerge identity from a profile' profile.profile.uuid identity.id %}">unmerge</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Col>
            <Col sm={4}>
                <div id="identities" class="row">


                    <div class="col-lg-12">
                        <h3 class="float-left">Available Unique Identities</h3>
                        <button id="closeIdentities" type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <br/><br/>
                        <div style={{float:"left", marginBottom:"4px"}}>
                            <form method="POST">
                            Search unique identities: <input id="shsearch" name="shsearch" value="{{shsearch}}" minlength={3} />
                            </form>
                        </div>
                        <br/><br/>
                        <div id="uniqueIdentitiesTable" hidden>
                            <div style={{float:"left", marginBottom:"4px"}}>
                                <form method="POST">
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
                            <form action="{% url 'merge to profile' profile.profile.uuid %}" method="POST">
                                <table class="table table-striped" id="identitiesSearchTable">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>email</th>
                                            <th>More</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <td colspan="2"><input type="submit" value="Merge" class="btn btn-success" /></td>
                                            <td colspan="3">
                                                <div id="customPagination"></div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                                <td><input type="checkbox" name="uuid" value="{{identity.profile.uuid}}" /></td>
                                                <td>identity.profile.name</td>
                                                <td>identity.profile.email</td>
                                                <td><a href="javascript:showUniqueIdentity('{{identity.uuid}}');">view</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
                <div id="organizations" hidden class="row">
                    <div class="col-lg-12">
                        <h2 class="float-left">Organizations</h2>
                        <button id="closeOrganizations" type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <table class="table table-striped" id="orgsTable">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>org.name</td>
                                    <td><a href="{% url 'enroll identity' profile.profile.uuid org.name %}">enroll</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Col>
            <Col sm={3} id="uniqueIdentitiesCards">
                    <div class="card" id="{{uuid.uuid}}">
                    <div class="card-body">
                        <button id="close_{{uuid.uuid}}" type="button" class="close" aria-label="Close" onclick="closeUniqueIdentity('{{uuid.uuid}}')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="card-title">uuid.profile.name}}</h4>
                        <form action="{% url 'merge to profile' profile.profile.uuid %}" method="POST">
                            <button type="submit" name="uuid" value="{{uuid.profile.uuid}}" class="btn btn-success" style={{float: "right"}}>Merge</button>
                        </form>
                        <p class="card-text"><b>Email:</b> uuid.profile.email}}</p>
                        <p class="card-text"><b>Bot:</b> uuid.profile.is_bot}}</p>
                        <p class="card-text"><b>Country:</b> uuid.profile.country.name}}</p>
                        <p class="card-text"><b>Last Mod.:</b> uuid.last_modified}}</p>
                        Identities:
                        <ul class="list-group">
                                <li class="list-group-item">identity.name}} - identity.email}} - identity.username}} - identity.source}}</li>
                        </ul>
                    </div>
                    </div>
            </Col>
        </div>
        </Col>
    );
}