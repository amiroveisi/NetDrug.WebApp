import React, { Component } from 'react';
import ProductRow from './ProductRow';
class ProductTable extends Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        let rows = []; 
        for (let i = 0; i < this.props.products.length; i++) {
            rows.push( <div>
              
                   
                <ProductRow name={this.props.products[i].name} price={this.props.products[i].price}/>
            
         </div>);
        }
        return(rows);
    }
}
export default ProductTable;