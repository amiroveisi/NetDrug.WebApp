import React, { Component } from 'react';

class ProductRow extends Component
{
    constructor(props)
    {
        super(props);
    }
    
    render()
    {
        var rowData = this.props.name + "- $" + this.props.price;
        return(
            <div>
                <span>{rowData}</span>
            </div>
        );
    }
};

export default ProductRow;