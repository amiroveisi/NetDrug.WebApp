import React , {Component} from 'react';
import {Button, FormGroup, ControlGroup, TextArea, FileInput} from '@blueprintjs/core';
import { Redirect } from 'react-router-dom';
import * as ConstantValues from '../Constants';
import { getBase64 } from '../Utilities/FileHelper';
import { Drug } from '../Models/Drug';

class NewDrug extends Component
{
    constructor(props)
    {
        super(props);
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
        this.OnSaveButtonClicked = this.OnSaveButtonClicked.bind(this);
        this.OnCancelButtonClicked = this.OnCancelButtonClicked.bind(this);
        this.OnImageSelected = this.OnImageSelected.bind(this);
        this.state = {
                Data: new Drug(),
                IsCanceled : false,
                IsLoading : false
            }
       
        
    }
    componentDidMount()
    {
        const { match : {params}} = this.props;
        this.setState({
            IsLoading : true
        });
        let thisObject = this;
        
        fetch(`${ConstantValues.WebApiBaseUrl}/${ConstantValues.DrugGetApi}/${params.drugId}`,
        {
            method : "GET",
            headers:{
               'Content-Type' : 'text/plain; charset=utf-8'
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
            return <Redirect to="/drug/list"/>
        }
        if(this.state.IsLoading)
        {
            return (<span>Loading...</span>);
        }
        let imageView =  (<div></div>);
        let imageUrl = `${ConstantValues.WebApiBaseUrl}/images/${this.state.Data.ImageFileName}`;
        if(this.state.Data.ImageFileName)
        {
            imageView = (<FormGroup label="Image:" >
                            <img src={imageUrl} alt={this.state.Data.GenericNameEnglish}
                            width="200" height="200"/>
                        </FormGroup>);
        }
        return (
          
           
            <div className="m-5">
                <ControlGroup vertical={true}>
                    <FormGroup label="Generic Farsi Name:" labelFor="text-input">
                        <input type="text" value={this.state.Data.GenericNameFarsi} onChange={this.OnGenericNameFarsiChanged}/>
                    </FormGroup>
                    <FormGroup label="Generic English Name:" labelFor="text-input">
                        <input type="text" value={this.state.Data.GenericNameEnglish} onChange={this.OnGenericNameEnglishChanged}/>
                    </FormGroup>
                    <FormGroup label="Martindel Category:" labelFor="text-input">
                        <input type="text" value={this.state.Data.MartindelCategory} onChange={this.OnMartindelCategoryChanged}/>
                    </FormGroup>
                    <FormGroup label="Medical Category:" labelFor="text-input">
                        <input type="text" value={this.state.Data.MedicalCategory} onChange={this.OnMedicalCategoryChanged}/>
                    </FormGroup>
                    <FormGroup label="Use Cases:" labelFor="text-input">
                        <TextArea growVertically={true} value={this.state.Data.UseCases} onChange={this.OnUseCasesChanged}/>
                    </FormGroup>
                    <FormGroup label="Mechanism:" labelFor="text-input">
                        <TextArea growVertically={true} value={this.state.Data.Mechanism} onChange={this.OnMechanismChanged}/>
                    </FormGroup>
                    <FormGroup label="Pharmacokinetics:" labelFor="text-input">
                        <TextArea growVertically={true} value={this.state.Data.Pharmacokinetics} onChange={this.OnPharmacokineticsChanged}/>
                    </FormGroup>
                    <FormGroup label="Forbidden Use Cases:" labelFor="text-input">
                        <TextArea growVertically={true} value={this.state.Data.ForbiddenUseCases} onChange={this.OnForbiddenUseCases}/>
                    </FormGroup>
                    <FormGroup label="Medical Conflicts:" labelFor="text-input">
                        <TextArea growVertically={true} value={this.state.Data.MedicalConflicts} onChange={this.OnMedicalConflictsChaged}/>
                    </FormGroup>
                    <FormGroup label="Warnings:" labelFor="text-input">
                        <TextArea growVertically={true} value={this.state.Data.Warnings} onChange={this.OnWraningsChanged}/>
                    </FormGroup>
                    <FormGroup label="Medical Recommendations:" labelFor="text-input">
                        <TextArea growVertically={true} value={this.state.Data.MedicalRecommendations} onChange={this.OnMedicalRecommendationsChanged}/>
                    </FormGroup>
                    <FormGroup label="Side Effects:" labelFor="text-input">
                        <TextArea growVertically={true} value={this.state.Data.SideEffects} onChange={this.OnSideEffectsChanged}/>
                    </FormGroup>
                    {imageView}
                    <FormGroup label="Change Image:" labelFor="text-input">
                        <FileInput text="Choose Image..." onInputChange={this.OnImageSelected}/>
                    </FormGroup>
                    <div>
                        <Button className="mr-2" intent="primary" text="Save" onClick={this.OnSaveButtonClicked}/>
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

    OnSaveButtonClicked(event)
    {
        this.setState({
            IsLoading : true
        });
        let thisObject = this;
        fetch(`${ConstantValues.WebApiBaseUrl}/${ConstantValues.DrugUpdateApi}`,
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