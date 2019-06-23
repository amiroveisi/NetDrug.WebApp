import React , {Component} from 'react';
import {Button, FormGroup, ControlGroup, TextArea, FileInput} from '@blueprintjs/core';

import { Redirect } from 'react-router-dom';
import * as ConstantValues from '../Constants';
import { getBase64 } from '../Utilities/FileHelper';
import { Drug } from '../Models/Drug';
import AuthenticationService from '../AuthenticationService';

class NewDrug extends Component
{
    constructor(args)
    {
        super(args);
        this.OnGenericNameFarsiChanged = this.OnGenericNameFarsiChanged.bind(this);
        this.OnGenericNameEnglishChanged = this.OnGenericNameEnglishChanged.bind(this);
        this.OnMartindelCategoryChanged = this.OnMartindelCategoryChanged.bind(this);
        this.OnMedicalCategoryChanged = this.OnMedicalCategoryChanged.bind(this);
        this.OnUseCasesChanged = this.OnUseCasesChanged.bind(this);
        this.OnMechanismChanged = this.OnMechanismChanged.bind(this);
        this.OnPharmacokineticsChanged = this.OnPharmacokineticsChanged.bind(this);
        this.OnMedicalConflictsChaged = this.OnMedicalConflictsChaged.bind(this);
        this.OnWraningsChanged = this.OnWraningsChanged.bind(this);
        this.OnMedicalRecommendationsChanged = this.OnMedicalRecommendationsChanged.bind(this);
        this.OnSideEffectsChanged = this.OnSideEffectsChanged.bind(this);
        this.OnForbiddenUseCases = this.OnForbiddenUseCases.bind(this);
        this.OnAddButtonClicked = this.OnAddButtonClicked.bind(this);
        this.OnCancelButtonClicked = this.OnCancelButtonClicked.bind(this);
        this.OnImageSelected = this.OnImageSelected.bind(this);
        this.state = {
                Data: new Drug(),
                IsCanceled : false,
                IsLoading : false,
                SavedSuccessfuly : false
            }
       
        
    }

    render(){
        if(this.state.IsCanceled || this.state.SavedSuccessfuly)
        {
            return <Redirect to="/drug/list"/>
        }
        return (
           
            <div className="m-5">
                <ControlGroup vertical={true}>
                    <FormGroup label="Generic Farsi Name:" labelFor="text-input">
                        <input type="text" className="col-8" onChange={this.OnGenericNameFarsiChanged}/>
                    </FormGroup>
                    <FormGroup label="Generic English Name:" labelFor="text-input">
                        <input type="text" className="col-8" onChange={this.OnGenericNameEnglishChanged}/>
                    </FormGroup>
                    <FormGroup label="Martindel Category:" labelFor="text-input">
                        <input type="text" className="col-8" onChange={this.OnMartindelCategoryChanged}/>
                    </FormGroup>
                    <FormGroup label="Medical Category:" labelFor="text-input">
                        <input type="text" className="col-8"  onChange={this.OnMedicalCategoryChanged}/>
                    </FormGroup>
                    <FormGroup label="Use Cases:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} onChange={this.OnUseCasesChanged}/>
                    </FormGroup>
                    <FormGroup label="Mechanism:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} onChange={this.OnMechanismChanged}/>
                    </FormGroup>
                    <FormGroup label="Pharmacokinetics:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} onChange={this.OnPharmacokineticsChanged}/>
                    </FormGroup>
                    <FormGroup label="Forbidden Use Cases:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} onChange={this.OnForbiddenUseCases}/>
                    </FormGroup>
                    <FormGroup label="Medical Conflicts:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} onChange={this.OnMedicalConflictsChaged}/>
                    </FormGroup>
                    <FormGroup label="Warnings:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} onChange={this.OnWraningsChanged}/>
                    </FormGroup>
                    <FormGroup label="Medical Recommendations:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} onChange={this.OnMedicalRecommendationsChanged}/>
                    </FormGroup>
                    <FormGroup label="Side Effects:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} onChange={this.OnSideEffectsChanged}/>
                    </FormGroup>
                    <FormGroup label="Image:" labelFor="text-input">
                        <FileInput className="col-8" text="Choose Image..." onInputChange={this.OnImageSelected}/>
                    </FormGroup>
                    <div>
                        <Button className="mr-2" intent="primary" text="Add" onClick={this.OnAddButtonClicked}/>
                        <Button className="ml-2" intent="none" text="Cancel" onClick={this.OnCancelButtonClicked}/>
                    </div>
                </ControlGroup>
            </div>
        );
    }

    OnGenericNameEnglishChanged(event)
    {
        let eventTarget = event.currentTarget;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    GenericNameEnglish : eventTarget.value
                }
            })
        );
    }

    OnGenericNameFarsiChanged(event)
    {
       // console.log(event);
        
        let eventTarget = event.currentTarget;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    GenericNameFarsi : eventTarget.value
                }
            })
        );
    }

    OnMartindelCategoryChanged(event)
    {
        let eventTarget = event.currentTarget;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    MartindelCategory : eventTarget.value
                }
            })
        );
    }

    OnMechanismChanged(event)
    {
        let eventTarget = event.currentTarget;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    Mechanism : eventTarget.value
                }
            })
        );
    }

    OnMedicalCategoryChanged(event)
    {
        let eventTarget = event.currentTarget;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    MedicalCategory : eventTarget.value
                }
            })
        );
    }

    OnMedicalConflictsChaged(event)
    {
        let eventTarget = event.currentTarget;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    MedicalConflicts : eventTarget.value
                }
            })
        );
    }

    OnMedicalRecommendationsChanged(event)
    {
        let eventTarget = event.currentTarget;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    MedicalRecommendations : eventTarget.value
                }
            })
        );
    }

    OnSideEffectsChanged(event)
    {
        let eventTarget = event.currentTarget;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    SideEffects : eventTarget.value
                }
            })
        );
    }

    OnUseCasesChanged(event)
    {
        let eventTarget = event.currentTarget;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    UseCases : eventTarget.value
                }
            })
        );
    }

    OnWraningsChanged(event)
    {
        let eventTarget = event.target;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    Warnings : eventTarget.value
                }
            })
        );
    }

    OnPharmacokineticsChanged(event)
    {
        let eventTarget = event.currentTarget;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    Pharmacokinetics : eventTarget.value
                }
            })
        );
    }

    OnForbiddenUseCases(event)
    {
        let eventTarget = event.currentTarget;
        this.setState(lastState =>(
            {
                Data:{
                    ...lastState.Data,
                    ForbiddenUseCases : eventTarget.value
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
        this.setState({
            IsLoading : true
        });
        let thisObject = this;
        fetch(`${ConstantValues.WebApiBaseUrl}/${ConstantValues.DrugNewApi}`,
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

export default NewDrug;