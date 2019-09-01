import React , {Component} from 'react';
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';
import * as ConstantValues from '../Constants';
import '../../node_modules/@syncfusion/ej2-base/styles/bootstrap.css';  
import '../../node_modules/@syncfusion/ej2-buttons/styles/bootstrap.css';  
import '../../node_modules/@syncfusion/ej2-calendars/styles/bootstrap.css';  
import '../../node_modules/@syncfusion/ej2-dropdowns/styles/bootstrap.css';  
import '../../node_modules/@syncfusion/ej2-inputs/styles/bootstrap.css';  
import '../../node_modules/@syncfusion/ej2-navigations/styles/bootstrap.css';
import '../../node_modules/@syncfusion/ej2-popups/styles/bootstrap.css';
import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/bootstrap.css';
import "../../node_modules/@syncfusion/ej2-react-grids/styles/bootstrap.css";
import {Button} from '@blueprintjs/core';
import { Redirect } from 'react-router-dom';
import { MedicalProduct } from '../Models/MedicalProduct';
import AuthenticationService from '../AuthenticationService';

class MedicalProductsGrid extends Component
{
    constructor(props)
    {
        super(props);
        this.SelectedId = '';
        this.OnRowSelected = this.OnRowSelected.bind(this);
        this.OnAddButtonClicked = this.OnAddButtonClicked.bind(this);
        this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
        this.OnRowDeselected = this.OnRowDeselected.bind(this);
        this.OnDetailsButtonClicked = this.OnDetailsButtonClicked.bind(this);
        this.OnNextPageClicked = this.OnNextPageClicked.bind(this);
        this.OnPreviousPageClicked = this.OnPreviousPageClicked.bind(this);
        this.state = {
            Data: [{
                LatinName : '',
                PersianName : '',
                ImageUrl : '',
                Image360Url : '',
                ProductType : '',
                Size : '',
                Producer : '',
                Website : '',
                ConsumingZone : '',
                AgeLimit : '',
                GenderLimit : '',
                CountInPackage : '',
                MedicalCode : '',
                Group : '',
                PackageType : '',
                Barcode : '',
                Category : '',
                Description : '',
                Specifications : '',
                Usecases : '',
                HowToUse : '',
                HowToKeep : '',
                Combinations : '',
                Price : '',
                Color : '',
                Material : '',
                Code : '',
                Id : '',
            }],
            IsLoading : true,
            AddNewDrugClicked : false,
            EditDrugClicked : false,
            CanEdit : false,
            DetailsButtonClicked : false,
            LoadingFailed : false,
            CurrentPage : 0,
            TotalRows : 0,

        };
        if(this.state.IsLoading)
        {
            this.LoadMedicalProducts(1,50);
        }
        
    }
    

    render(){
        console.log("rendering");
        if(this.state.AddNewDrugClicked)
        {
            return (<Redirect to="/medicalproduct/new"/>);
        }
        if(this.state.EditDrugClicked)
        {
            let url = `/medicalproduct/edit/${this.SelectedId}`;
            return (<Redirect to={url}/>);
        }
        if(this.state.IsLoading)
        {
            return (<span>Loading...</span>);
        }
        if(this.state.DetailsButtonClicked)
        {
            let url = `/medicalproduct/details/${this.SelectedId}`;
            return (<Redirect to={url}/>);
        }
        if(this.state.LoadingFailed)
        {
            return (<span>Error while loading data!</span>);
        }
        return (
       <div>
            <div className="ml-5 mr-5 mt-2">
                <Button text="Add" className="mr-2" onClick={this.OnAddButtonClicked}/>
                <Button text="Edit" className="mr-2" onClick={this.OnEditButtonClicked} />
                <Button text="Details" className="mr-2" onClick={this.OnDetailsButtonClicked} />
            </div>        
            <div className="mt-2 mb-5 mr-5 ml-5">
                <div>
                    <span className="mr-2">Page {this.state.CurrentPage} of {Math.ceil(this.state.TotalRows/50)}</span>
                    <Button text="Previous" onClick={this.OnPreviousPageClicked} className="mr-2"/>
                    <Button text="Next" onClick={this.OnNextPageClicked} className="mr-2"/>
                </div>
                <GridComponent dataSource={this.state.Data} allowPaging={true} /*pageSettings={{pageSize : 20}}
                allowSorting={true} allowFiltering={true}*/ rowSelected={this.OnRowSelected} rowDeselected={this.OnRowDeselected}>
                    <ColumnsDirective>
                        <ColumnDirective field='Id' visible={false}/>
                        <ColumnDirective field='LatinName' headerText="Latin Name" width='100' />
                        <ColumnDirective field='PersianName' headerText="Persian Name" width='100'/>
                    </ColumnsDirective>
                    {/* <Inject services={[Page, Sort, Filter, Group]} /> */}
                
                 </GridComponent>
            </div>
        </div>
            );
    }

    LoadMedicalProducts(pageNumber, rowsInPage)
    {
        let thisObject = this;
        fetch(`${ConstantValues.WebApiBaseUrl}/${ConstantValues.MedicalProductGetPagedApi}?pagenumber=${pageNumber}&rowsinpage=${rowsInPage}`,
        {
            method : "GET",
            headers:{
               'Content-Type' : 'text/plain; charset=utf-8',
               'Authorization' : `Bearer ${AuthenticationService.GetAuthToken()}`
            }
        }).then(function(response){
                //console.log(response.text());
                let temp = response.text();
             
                return temp;}
            ).then(responseText =>{
                try{
                    //console.log(responseText);
                    const responseJson = JSON.parse(responseText);
                    return responseJson;
                }
                catch(e)
                {
                    Promise.reject({exception:e, body: responseText, type:'unparsable'});
                    console.log("error on load");
                    thisObject.setState({
                        LoadingFailed : true
                    });
                }
            }).then(data=>{
                thisObject.setState(
                    {
                        Data: data.Data.CurrentPageData,
                        CurrentPage : data.Data.CurrentPage,
                        TotalRows : data.Data.TotalRows,
                        IsLoading : false,
                        LoadingFailed : false
                    }
                );
                //console.log(data);
            }).catch(e=>{
                console.log(e);
                thisObject.setState({
                    LoadingFailed : true,
                    IsLoading : false
                });
            });
                // response.json().then(data => {
                //     if(response.status == 200)
                //     {
                //         thisObject.setState({
                //             Data : data,
                //             IsLoading : false
                //         });                      
                //     }
                //     console.log(data);
                // });
                
           
          
        
    }
    OnRowSelected(event)
    {
        this.SelectedId = event.data.Id;
        // this.setState({
        //     CanEdit : true
        // });
    }
    OnAddButtonClicked(event)
    {
        console.log(this.SelectedId);
        this.setState({
            AddNewDrugClicked : true
        });
    }
    OnEditButtonClicked(event)
    {
        //console.log(this.SelectedId);
        this.setState({
            EditDrugClicked : true
        });
    }
    OnRowDeselected(event)
    {
        this.SelectedId = '';
        // this.setState({
        //     CanEdit : false
        // });
    }
    OnDetailsButtonClicked(event)
    {
        this.setState({
            DetailsButtonClicked : true
        });
    }
    OnNextPageClicked(event)
    {
        let nextPage = this.state.CurrentPage + 1;
        if(nextPage > Math.ceil(this.state.TotalRows / 50))
        {
            return;
        }
        this.LoadMedicalProducts(nextPage,50);
    }
    OnPreviousPageClicked(event)
    {
        let prevPage = this.state.CurrentPage - 1;
        if(prevPage < 1)
            return;
        this.LoadMedicalProducts(prevPage,50);
    }
}

export default MedicalProductsGrid;