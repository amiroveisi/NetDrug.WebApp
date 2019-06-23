import React , {Component} from 'react';
import {Button, FormGroup, ControlGroup, TextArea, FileInput} from '@blueprintjs/core';

import { Redirect } from 'react-router-dom';
import * as ConstantValues from '../Constants';
import { getBase64 } from '../Utilities/FileHelper';
import { MedicalProduct } from '../Models/MedicalProduct';
import AuthenticationService from '../AuthenticationService';

class NewMedicalProduct extends Component
{
    constructor(args)
    {
        super(args);
        // this.OnLatinNameChanged = this.OnLatinNameChanged.bind(this);
        // this.OnPersianNameChanged = this.OnPersianNameChanged.bind(this);
        // this.OnImageUrlChanged = this.OnImageUrlChanged.bind(this);
        // this.OnImage360UrlChanged = this.OnImage360UrlChanged.bind(this);
        // this.OnProductTypeChanged = this.OnUseCasesChanged.bind(this);
        // this.OnSizeChanged = this.OnSizeChanged.bind(this);
        // this.OnProducerChanged = this.OnProducerChanged.bind(this);
        // this.OnWebsiteChanged = this.OnWebsiteChanged.bind(this);
        // this.OnConsumingZoneChanged = this.OnConsumingZoneChanged.bind(this);
        // this.OnAgeLimitChanged = this.OnAgeLimitChanged.bind(this);
        // this.OnGenderLimitChanged = this.OnGenderLimitChanged.bind(this);
        // this.OnCountInPackageChanged = this.OnCountInPackageChanged.bind(this);
        // this.OnMedicalCodeChanged = this.OnMedicalCodeChanged.bind(this);
        // this.OnGroupChanged = this.OnGroupChanged.bind(this);
        // this.OnPackageTypeChanged = this.OnPackageTypeChanged.bind(this);
        // this.OnBarcodeChanged = this.OnBarcodeChanged.bind(this);
        // this.OnCategoryChanged = this.OnCategoryChanged.bind(this);
        // this.OnDescriptionChanged = this.OnDescriptionChanged.bind(this);
        // this.OnSpecificationsChanged = this.OnSpecificationsChanged.bind(this);
        // this.OnUsecasesChanged = this.OnUsecasesChanged.bind(this);
        // this.OnHowToUseChanged = this.OnHowToUseChanged.bind(this);
        // this.OnHowToKeepChanged = this.OnHowToKeepChanged.bind(this);
        // this.OnCombinationsChanged = this.OnCombinationsChanged.bind(this);
        // this.OnPriceChanged = this.OnPriceChanged.bind(this);
        // this.OnColorChanged = this.OnColorChanged.bind(this);
        // this.OnMaterialChanged = this.OnMaterialChanged.bind(this);
        // this.OnCodeChanged = this.OnCodeChanged.bind(this);
        this.OnFormDataChanged=this.OnFormDataChanged.bind(this);

        this.OnAddButtonClicked = this.OnAddButtonClicked.bind(this);
        this.OnCancelButtonClicked = this.OnCancelButtonClicked.bind(this);
        this.OnImageSelected = this.OnImageSelected.bind(this);
        this.state = {
                Data: new MedicalProduct(),
                IsCanceled : false,
                IsLoading : false,
                SavedSuccessfuly : false
            }
       
        
    }

    render(){
        if(!AuthenticationService.IsLoggedIn())
        {
            return <Redirect to="/login"/>
        }
        if(this.state.IsCanceled || this.state.SavedSuccessfuly)
        {
            return <Redirect to="/medicalproduct/list"/>
        }
        return (
           
            <div className="m-5">
                <ControlGroup vertical={true}>
                    <FormGroup label="Latin Name:" labelFor="text-input">
                        <input type="text" name="LatinName" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Persian Name:" labelFor="text-input">
                        <input type="text" name="PersianName" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Product Type:" labelFor="text-input">
                        <input type="text" name="ProductType" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Size:" labelFor="text-input">
                        <input type="text" name="Size" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Producer:" labelFor="text-input">
                        <input type="text" name="Producer" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Website:" labelFor="text-input">
                        <input type="text" name="Website" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Consuming Zone:" labelFor="text-input">
                        <TextArea growVertically={true} name="ConsumingZone" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Age Limit:" labelFor="text-input">
                        <input type="text" name="AgeLimit" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Gender Limit:" labelFor="text-input">
                        <input type="text" name="GenderLimit"  onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Counts In Package:" labelFor="text-input">
                        <input type="text" name="CountsInPackage" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Medical Code:" labelFor="text-input">
                        <input type="text" name="MedicalCode" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Group:" labelFor="text-input">
                        <input type="text" name="Group" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Package Type:" labelFor="text-input">
                        <input type="text" name="PackageType" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Barcode:" labelFor="text-input">
                        <input type="text" name="Barcode"  onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Category:" labelFor="text-input">
                        <input type="text" name="Category" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Description:" labelFor="text-input">
                        <TextArea growVertically={true} name="Description" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Specifications:" labelFor="text-input">
                        <TextArea growVertically={true} name="Specifications" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Usecases:" labelFor="text-input">
                        <TextArea growVertically={true} name="Usecases" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="How To Use:" labelFor="text-input">
                        <TextArea growVertically={true} name="HowToUse" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="How To Keep:" labelFor="text-input">
                        <TextArea growVertically={true} name="HowToKeep" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Combinations:" labelFor="text-input">
                        <TextArea growVertically={true} name="Combinations" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Price:" labelFor="text-input">
                        <input type="text" name="Price" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Color:" labelFor="text-input">
                        <input type="text" name="Color" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Material:" labelFor="text-input">
                        <input type="text" name="Material" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    <FormGroup label="Code:" labelFor="text-input">
                        <input type="text" name="Code" onChange={this.OnFormDataChanged}/>
                    </FormGroup>
                    {/* <FormGroup label="Image:" labelFor="text-input">
                        <FileInput text="Choose Image..." onInputChange={this.OnImageSelected}/>
                    </FormGroup> */}
                    <div>
                        <Button className="mr-2" intent="primary" text="Add" onClick={this.OnAddButtonClicked}/>
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

    OnAddButtonClicked(event)
    {
         //console.log(this.state);
        this.setState({
            IsLoading : true
        });
        let thisObject = this;
        fetch(`${ConstantValues.WebApiBaseUrl}/${ConstantValues.MedicalProductNewApi}`,
        {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${AuthenticationService.GetAuthToken()}`
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

    OnImageSelected(event)
    {
        let target = event.currentTarget;
        let selectedFile = target.files[0];
        getBase64(selectedFile).then(base64=>{
            this.setState(lastState=>(
                {
                    Data:{
                        ...lastState.Data,
                        ImageData : base64,
                        ImageFileName : selectedFile.name
                    }
                }
            ));
        });
          
    }
}

export default NewMedicalProduct;