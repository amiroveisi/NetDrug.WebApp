import React, { Component } from 'react';
import ProductTable from "./ProductTable";
import SearchBar from './SearchBar';
class FilterableProductTable extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSearchQuery = this.handleSearchQuery.bind(this);
    }
    handleSearchQuery(e){
       
    }
    render()
    {
        const products = [{
            name:'p1',
            price:'1200'
        },
        {
            name: 'p2',
            price: '500'        
        }];
        return(
           
            <div>
                <SearchBar OnlyInStock={true} handleSearchQuery={this.handleSearchQuery}/>
                <ProductTable products={products}/>
            </div>
        );
    }
}
export default FilterableProductTable;