import React , {Component} from 'react';
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, VirtualScroll } from '@syncfusion/ej2-react-grids';
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
import AuthenticationService from '../AuthenticationService';

class DrugsGrid extends Component
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
            Data:[{
                GenericNameFarsi:'',
                GenericNameEnglish: '',
                MartindelCategory: '',
                MedicalCategory : '',
                UseCases : '',
                Mechanism : '',
                Pharmacokinetics : '',
                ForbiddenUseCases : '',
                MedicalConflicts : '',
                Wranings : '',
                MedicalRecommendations : '',
                SideEffects : '',
                Id : ''
            }],
            CurrentPage : 0,
            TotalRows : 0,
            IsLoading : true,
            AddNewDrugClicked : false,
            EditDrugClicked : false,
            CanEdit : false,
            DetailsButtonClicked : false,
            LoadingFailed : false

        };
        if(this.state.IsLoading)
        {
            this.LoadDrugs(1,50);
        }
        
    }
    

    render(){
        console.log("rendering");
        if(this.state.AddNewDrugClicked)
        {
            return (<Redirect to="/drug/new"/>);
        }
        if(this.state.EditDrugClicked)
        {
            let url = `/drug/edit/${this.SelectedId}`;
            return (<Redirect to={url}/>);
        }
        if(this.state.IsLoading)
        {
            return (<span>Loading...</span>);
        }
        if(this.state.DetailsButtonClicked)
        {
            let url = `/drug/details/${this.SelectedId}`;
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
                <GridComponent dataSource={this.state.Data} /*enableVirtualization={true} pageSettings={{pageSize : 20}}*/
                /*allowSorting={true} allowFiltering={true}*/ rowSelected={this.OnRowSelected} rowDeselected={this.OnRowDeselected}>
                    
                    <ColumnsDirective>
                        <ColumnDirective field='Id' visible={false}/>
                        <ColumnDirective field='GenericNameFarsi' headerText="Persian Generic Name" width='100' />
                        <ColumnDirective field='GenericNameEnglish' headerText="English Generic Name" width='100'/>
                    </ColumnsDirective>
                    {/* <Inject services={[Page, Sort, Filter, Group, VirtualScroll]} /> */}
                
                 </GridComponent>
            </div>
        </div>
            );
    }

    LoadDrugs(pageNumber, rowsInPage)
    {
        let thisObject = this;
        fetch(`${ConstantValues.WebApiBaseUrl}/${ConstantValues.DrugGetPagedApi}?pagenumber=${pageNumber}&rowsinpage=${rowsInPage}`,
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
                        IsLoading : false
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
        this.LoadDrugs(nextPage,50);
    }
    OnPreviousPageClicked(event)
    {
        let prevPage = this.state.CurrentPage - 1;
        if(prevPage < 1)
            return;
        this.LoadDrugs(prevPage,50);
    }
}

export default DrugsGrid;