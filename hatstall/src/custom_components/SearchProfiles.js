import React, { Component } from 'react';

export let SearchProfiles = () => {
    return (
        <div class="container" style={{marginTop: "10%"}}>
            <h1 style={{textAlign: "center", fontWeight: "bold"}}>Search identities <i class="fa fa-search icon"></i></h1>
            <form action="list" method="POST">
                <div class="input-group">
                    <input class="form-control" id="shsearch" name="shsearch" minlength={3} placeholder="Search identities..."></input>
                    <span class="input-group-btn">
                        <button class="btn btn-info" type="submit">Go!</button>
                    </span>
                </div>
            </form>
        </div>
    );
}