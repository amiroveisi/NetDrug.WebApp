import React, { Component } from 'react';
import { Checkbox } from '@blueprintjs/core';

class SearchBar extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            searchQuery : this.props.searchQuery,
            onlyInStock : this.props.onlyInStock
        };
        
    }
    render()
    {
        return(
            <div class="bp3-input-group" style={{margin:"20px"}}>
                <span class="bp3-icon bp3-icon-search"></span>
                <input class="bp3-input" type="search" placeholder="Search input" dir="auto"
                value={this.state.searchQuery} onChange={this.props.handleSearchQuery}/>
                <Checkbox style={{margin:"8px"}} checked={this.state.onlyInStock}>Only show products in stock</Checkbox>
            </div>
          
        );
    }
}
export default SearchBar;