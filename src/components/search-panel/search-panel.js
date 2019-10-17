import React, {Component} from 'react';
import './search-panel.css'

export default class SearchPanel extends Component {

    state = {
        term: ''
    };

    onInputChange = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearchInput(term);
    };

    render() {
        return (
            <input type="text"
                    className="form-control search-input"        
                    placeholder="type to search"
                    onChange={this.onInputChange}
                    value={this.state.term} />
        );
    }
    
};