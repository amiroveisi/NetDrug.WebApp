import React , {Component} from 'react';
import {Button, FormGroup, ControlGroup, TextArea, FileInput} from '@blueprintjs/core';
import '../Css/netdrug.css';
import { Redirect } from 'react-router-dom';
import * as ConstantValues from '../Constants';
import { getBase64 } from '../Utilities/FileHelper';
import { MedicalProduct } from '../Models/MedicalProduct';
import AuthenticationService from '../AuthenticationService';

class MedicalProductEdit extends Component
{
    constructor(args)
    {
        super(args);
       
        this.OnFormDataChanged=this.OnFormDataChanged.bind(this);

        this.OnSaveButtonClicked = this.OnSaveButtonClicked.bind(this);
        this.OnCancelButtonClicked = this.OnCancelButtonClicked.bind(this);
        //this.OnImageSelected = this.OnImageSelected.bind(this);
        this.state = {
                Data: new MedicalProduct(),
                IsCanceled : false,
                IsLoading : false,
                SavedSuccessfuly : false
            }
       
        
    }
    componentDidMount()
    {
        const { match : {params}} = this.props;
        this.setState({
            IsLoading : true
        });
        let thisObject = this;
        
        fetch(`${ConstantValues.WebApiBaseUrl}/${ConstantValues.MedicalProductGetApi}/${params.productId}`,
        {
            method : "GET",
            headers:{
               'Content-Type' : 'text/plain; charset=utf-8',
               'Authorization' : `Bearer ${AuthenticationService.GetAuthToken()}`
            }
            }).then(response => {
               return response.text();
             
               }
            ).then(responseText =>{
                try{
                    return JSON.parse(responseText);
                }
                catch(e)
                {
                    Promise.reject({exception:e, body: responseText, type:'unparsable'});
                }
            }).then(data=>{
                
                thisObject.setState(
                    {
                        Data: data.Data,
                        IsLoading : false,
                        SavedSuccessfuly : false
                    }
                );
            });
    }
    render(){
        if(this.state.IsCanceled || this.state.SavedSuccessfuly)
        {
            return <Redirect to="/medicalproduct/list"/>
        }
        
        return (
            
            <div className="m-5">
                <ControlGroup vertical={true}>
                    <FormGroup label="Latin Name:" labelFor="text-input">
                        <input type="text" className="col-8" name="LatinName" value={this.state.Data.LatinName} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Persian Name:" labelFor="text-input">
                        <input type="text" className="col-8" name="PersianName" value={this.state.Data.PersianName} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Product Type:" labelFor="text-input">
                        <input type="text" className="col-8" name="ProductType" value={this.state.Data.ProductType} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Size:" labelFor="text-input">
                        <input type="text" className="col-8" name="Size" value={this.state.Data.Size} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Producer:" labelFor="text-input">
                        <input type="text" className="col-8" name="Producer" value={this.state.Data.Producer} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Website:" labelFor="text-input">
                        <input type="text" className="col-8" name="Website" value={this.state.Data.Website} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Consuming Zone:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} name="ConsumingZone" value={this.state.Data.ConsumingZone} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Age Limit:" labelFor="text-input">
                        <input type="text" className="col-8" name="AgeLimit" value={this.state.Data.AgeLimit} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Gender Limit:" labelFor="text-input">
                        <input type="text" className="col-8" name="GenderLimit" value={this.state.Data.GenderLimit} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Counts In Package:" labelFor="text-input">
                        <input type="text" className="col-8" name="CountsInPackage" value={this.state.Data.CountInPackage} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Medical Code:" labelFor="text-input">
                        <input type="text" className="col-8" name="MedicalCode" value={this.state.Data.MedicalCode} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Group:" labelFor="text-input">
                        <input type="text" className="col-8" name="Group" value={this.state.Data.Group} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Package Type:" labelFor="text-input">
                        <input type="text" className="col-8" name="PackageType" value={this.state.Data.PackageType} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Barcode:" labelFor="text-input">
                        <input type="text" className="col-8" name="Barcode" value={this.state.Data.Barcode}  onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Category:" labelFor="text-input">
                        <input type="text" className="col-8" name="Category" value={this.state.Data.Category} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Description:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} name="Description" value={this.state.Data.Description} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Specifications:" labelFor="Specifications">
                        <TextArea className="col-8" growVertically={true} name="Specifications" value={this.state.Data.Specifications} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup  label="Usecases:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} name="Usecases" value={this.state.Data.Usecases} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="How To Use:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} name="HowToUse" value={this.state.Data.HowToUse} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="How To Keep:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} name="HowToKeep" value={this.state.Data.HowToKeep} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Combinations:" labelFor="Combinations">
                        <TextArea className="col-8" growVertically={true} name="Combinations" value={this.state.Data.Combinations} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Price:" labelFor="text-input">
                        <input type="text" className="col-8" name="Price" value={this.state.Data.Price} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Color:" labelFor="text-input">
                        <input type="text" className="col-8" name="Color" value={this.state.Data.Color} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Material:" labelFor="text-input">
                        <input type="text" className="col-8" name="Material" value={this.state.Data.Material} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Code:" labelFor="text-input">
                        <input type="text" className="col-8" name="Code" value={this.state.Data.Code} onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    {/* <FormGroup label="Image:" labelFor="text-input">
                        <FileInput text="Choose Image..." onInputChange={this.OnImageSelected}/>
                    </FormGroup> */}
                    <div>
                        <Button className="mr-2" intent="primary" text="Add" onClick={this.OnSaveButtonClicked}/>
                        <Button className="ml-2" intent="none" text="Cancel" onClick={this.OnCancelButtonClicked}/>
                    </div>
                </ControlGroup>
            </div>
        );
    }

    OnFormDataChanged(event)
    {
        let eventTarget = event.currentTarget;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    [eventTarget.name] : eventTarget.value
                }
            })
        );
    }

  
    
    OnCancelButtonClicked(event)
    {
        this.setState({
            IsCanceled : true
        });
    }

    OnSaveButtonClicked(event)
    {
         //console.log(this.state);
        this.setState({
            IsLoading : true
        });
        let thisObject = this;
        fetch(`${ConstantValues.WebApiBaseUrl}/${ConstantValues.MedicalProductUpdateApi}`,
        {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state.Data)
        }).then(response => {
            return response.text();
        }).then(responseText => {
            try{
                return JSON.parse(responseText);
            }
            catch(e)
            {
                Promise.reject({exception:e, body: responseText, type:'unparsable'})
            }
        }).then(data=>{
            console.log(data);
            thisObject.setState({
                IsLoading : false,
                SavedSuccessfuly : true
            });
        });
    }

    // OnImageSelected(event)
    // {
    //     let target = event.currentTarget;
    //     let selectedFile = target.files[0];
    //     getBase64(selectedFile).then(base64=>{
    //         this.setState(lastState=>(
    //             {
    //                 Data:{
    //                     ...lastState.Data,
    //                     ImageData : base64,
    //                     ImageFileName : selectedFile.name
    //                 }
    //             }
    //         ));
    //     });
          
    // }
}

export default MedicalProductEdit;