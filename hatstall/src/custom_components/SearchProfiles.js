import React, { Component } from 'react';
import ProfilesList from './ProfilesList'
import { FormControl } from 'react-bootstrap';



class SearchProfiles extends Component {
    constructor(props) {
        super(props)
        this.state = { shsearch: "" }
    }

    searchIdentities = () => {
      this.setState((prevState) => ({
        shsearch: document.getElementById("shsearch").value
      }));
    }
    
    render() {
        if (!this.state.shsearch) {
            return (
                <div class="container" style={{ marginTop: "10%" }}>
                    <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Search identities <i class="fa fa-search icon"></i></h1>
                    <form>
                        <div class="input-group">
                            <FormControl class="form-control" id="shsearch" name="shsearch" placeholder="Search identities..."></FormControl>
                            <span class="input-group-btn">
                                <button class="btn btn-info" onClick={this.searchIdentities}>Go!</button>
                            </span>
                        </div>
                    </form>
                </div>
            )
        } else {
            return <ProfilesList shsearch={this.state.shsearch}/>
        }
    };
}

export default SearchProfiles