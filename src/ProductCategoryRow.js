import React, { Component } from 'react';

class ProductCategoryRow extends Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div>
                <span>{this.props.name}</span>
            </div>
        );
    }
}

export default ProductCategoryRow;