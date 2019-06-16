import React , {Component} from 'react';
import {Text, Button, FormGroup, ControlGroup, TextArea} from '@blueprintjs/core';
import { Redirect } from 'react-router-dom';
import * as ConstantValues from './Constants';
import { Drug } from './Models/Drug';

class NewDrug extends Component
{
    constructor(props)
    {
        super(props);
        this.drugId = '';
        this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
        this.state = {
                Data: new Drug(),
                IsCanceled : false,
                IsLoading : false,
                EditButtonClicked : false
            }
       
       
    }
    componentDidMount()
    {
        const { match : {params}} = this.props;
        this.drugId = params.drugId;
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
                        IsLoading : false
                    }
                );
            });
    }
    render(){
        if(this.state.IsCanceled)
        {
            return <Redirect to="/drug/list"/>
        }
        if(this.state.EditButtonClicked)
        {
            let url = `/drug/edit/${this.drugId}`;
            return (<Redirect to={url}/>);
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
                    <FormGroup label="Generic Farsi Name:"  labelFor="text-input">
                        <Text >
                            {this.state.Data.GenericNameFarsi}  
                        </Text>
                    </FormGroup>
                    <FormGroup label="Generic English Name:" labelFor="text-input">
                       <Text>
                           {this.state.Data.GenericNameEnglish}
                       </Text>
                    </FormGroup>
                    <FormGroup label="Martindel Category:" labelFor="text-input">
                       <Text>
                            {this.state.Data.MartindelCategory}
                       </Text>
                    </FormGroup>
                    <FormGroup label="Medical Category:" labelFor="text-input">
                        <Text>
                            {this.state.Data.MedicalCategory}
                        </Text>
                    </FormGroup>
                    <FormGroup label="Use Cases:" labelFor="text-input">
                        <Text>
                            {this.state.Data.UseCases}
                        </Text>
                    </FormGroup>
                    <FormGroup label="Mechanism:" labelFor="text-input">
                        <Text>
                            {this.state.Data.Mechanism}
                        </Text>
                    </FormGroup>
                    <FormGroup label="Pharmacokinetics:" labelFor="text-input">
                        <Text>
                            {this.state.Data.Pharmacokinetics}
                        </Text>
                    </FormGroup>
                    <FormGroup label="Forbidden Use Cases:" labelFor="text-input">
                        <Text>
                            {this.state.Data.ForbiddenUseCases}
                        </Text>
                    </FormGroup>
                    <FormGroup label="Medical Conflicts:" labelFor="text-input">
                        <Text>
                            {this.state.Data.MedicalConflicts}
                        </Text>
                    </FormGroup>
                    <FormGroup label="Warnings:" labelFor="text-input">
                        <Text>
                            {this.state.Data.Warnings}
                        </Text>
                    </FormGroup>
                    <FormGroup label="Medical Recommendations:" labelFor="text-input">
                        <Text>
                            {this.state.Data.MedicalRecommendations}
                        </Text>
                    </FormGroup>
                    <FormGroup label="Side Effects:" labelFor="text-input">
                        <Text>
                            {this.state.Data.SideEffects}
                        </Text>
                    </FormGroup>
                    {imageView}
                    <div>
                        <Button className="mr-2" intent="primary" text="Edit" onClick={this.OnEditButtonClicked}/>
                    </div>
                </ControlGroup>
            </div>
        );
    }

  
    OnCancelButtonClicked(event)
    {
        this.setState({
            IsCanceled : true
        });
    }

    OnEditButtonClicked(event)
    {
        console.log("edit clicked");
        
        this.setState({
            EditButtonClicked : true
        });
    }
}

export default NewDrug;