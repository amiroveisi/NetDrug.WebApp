import React, { Component } from 'react';
import { Button, FormGroup, ControlGroup, TextArea, FileInput } from '@blueprintjs/core';
import { Redirect } from 'react-router-dom';
import * as ConstantValues from '../Constants';
import { getBase64 } from '../Utilities/FileHelper';
import { MedicalProduct } from '../Models/MedicalProduct';
import AuthenticationService from '../AuthenticationService';

class MedicalProductEdit extends Component {
    constructor(args) {
        super(args);
        this.CurrentSearchQuery = {};
        this.OnFormDataChanged = this.OnFormDataChanged.bind(this);

        this.OnSaveButtonClicked = this.OnSaveButtonClicked.bind(this);
        this.OnCancelButtonClicked = this.OnCancelButtonClicked.bind(this);
        this.OnImageSelected = this.OnImageSelected.bind(this);
        //this.OnRemoveImageButtonClicked = this.OnRemoveImageButtonClicked.bind(this);
        this.state = {
            Data: new MedicalProduct(),
            IsCanceled: false,
            IsLoading: false,
            SavedSuccessfuly: false,
            Images: null
        }


    }
    componentDidMount() {
        const { match: { params } } = this.props;
        if (this.props.location.state)
            this.CurrentSearchQuery = this.props.location.state.currentSearchQuery;
        this.setState({
            IsLoading: true
        });
        let thisObject = this;

        fetch(`${ConstantValues.WebApiBaseUrl}/${ConstantValues.MedicalProductGetApi}/${params.productId}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Authorization': `Bearer ${AuthenticationService.GetAuthToken()}`
                }
            }).then(response => {
                return response.text();

            }
            ).then(responseText => {
                try {
                    return JSON.parse(responseText);
                }
                catch (e) {
                    Promise.reject({ exception: e, body: responseText, type: 'unparsable' });
                }
            }).then(data => {
                if (data.Data && !data.Data.ImageUrl)
                    data.Data.ImageUrl = "";
                thisObject.setState(
                    {
                        Data: data.Data,
                        IsLoading: false,
                        SavedSuccessfuly: false,
                        Images: data.Data.ImageUrl.split('#').map((image, i) => {
                            return {
                                ImageData: null,
                                ImageFileName: image
                            }
                        })
                    }
                );
            });
    }
    OnRemoveImageButtonClicked(imageName) {
        let updatedImages = this.state.Images.filter(image => image.ImageFileName != imageName);
        this.setState(
            {
                Images: updatedImages
            });
            console.log(updatedImages);
    }
    OnImageSelected(event) {

        let target = event.currentTarget;
        let selectedFile = target.files[0];
        let thisObject = this;
        getBase64(selectedFile).then(base64 => {
            thisObject.setState(lastState => (
                {
                    Images: [...lastState.Images, {
                        ImageFileName: selectedFile.name,
                        ImageData: base64
                    }],
                }
            ));
        });

    }

    render() {
        if (this.state.IsCanceled || this.state.SavedSuccessfuly) {
            return <Redirect to={{
                pathname: "/medicalproduct/list",
                state: {
                    currentSearchQuery: this.CurrentSearchQuery
                }
            }} />
        }
        let images = (<div></div>);
        //let splitedImageUrls = this.state.Data.ImageUrl.split('#');
        if (this.state.Images) {
            images = (
                this.state.Images.map((image, i) => {
                    console.log(image);
                    if (image.ImageData || (image.ImageFileName && image.ImageFileName !== "")) {
                        return (<FormGroup label="Image:" key={i}>
                            <img src={image.ImageData || `${ConstantValues.WebApiBaseUrl}/images/medicalproducts/${image.ImageFileName}`} alt={this.state.Data.LatinName}
                                width="200" height="200" />

                            <Button className="ml-2" disabled={false} intent="danger" icon="delete" minimal={true} style={{ verticalAlign: 'baseline' }}
                                onClick={() => { this.OnRemoveImageButtonClicked(image.ImageFileName) }} />

                        </FormGroup>);
                    }
                    return (<div key={i}></div>);
                })
            );
        }
        return (

            <div className="m-5">
                <ControlGroup vertical={true}>
                    <FormGroup label="Latin Name:" labelFor="text-input">
                        <input type="text" className="col-8" name="LatinName" value={this.state.Data.LatinName || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Persian Name:" labelFor="text-input">
                        <input type="text" className="col-8" name="PersianName" value={this.state.Data.PersianName || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Product Type:" labelFor="text-input">
                        <input type="text" className="col-8" name="ProductType" value={this.state.Data.ProductType || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Size:" labelFor="text-input">
                        <input type="text" className="col-8" name="Size" value={this.state.Data.Size || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Producer:" labelFor="text-input">
                        <input type="text" className="col-8" name="Producer" value={this.state.Data.Producer || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Website:" labelFor="text-input">
                        <input type="text" className="col-8" name="Website" value={this.state.Data.Website || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Consuming Zone:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} name="ConsumingZone" value={this.state.Data.ConsumingZone || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Age Limit:" labelFor="text-input">
                        <input type="text" className="col-8" name="AgeLimit" value={this.state.Data.AgeLimit || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Gender Limit:" labelFor="text-input">
                        <input type="text" className="col-8" name="GenderLimit" value={this.state.Data.GenderLimit || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Counts In Package:" labelFor="text-input">
                        <input type="text" className="col-8" name="CountsInPackage" value={this.state.Data.CountInPackage || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Medical Code:" labelFor="text-input">
                        <input type="text" className="col-8" name="MedicalCode" value={this.state.Data.MedicalCode || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Group:" labelFor="text-input">
                        <input type="text" className="col-8" name="Group" value={this.state.Data.Group || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Package Type:" labelFor="text-input">
                        <input type="text" className="col-8" name="PackageType" value={this.state.Data.PackageType || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Barcode:" labelFor="text-input">
                        <input type="text" className="col-8" name="Barcode" value={this.state.Data.Barcode || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Category:" labelFor="text-input">
                        <input type="text" className="col-8" name="Category" value={this.state.Data.Category || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Description:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} name="Description" value={this.state.Data.Description || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Specifications:" labelFor="Specifications">
                        <TextArea className="col-8" growVertically={true} name="Specifications" value={this.state.Data.Specifications || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Usecases:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} name="Usecases" value={this.state.Data.Usecases || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="How To Use:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} name="HowToUse" value={this.state.Data.HowToUse || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="How To Keep:" labelFor="text-input">
                        <TextArea className="col-8" growVertically={true} name="HowToKeep" value={this.state.Data.HowToKeep || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Combinations:" labelFor="Combinations">
                        <TextArea className="col-8" growVertically={true} name="Combinations" value={this.state.Data.Combinations || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Price:" labelFor="text-input">
                        <input type="text" className="col-8" name="Price" value={this.state.Data.Price || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Color:" labelFor="text-input">
                        <input type="text" className="col-8" name="Color" value={this.state.Data.Color || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Material:" labelFor="text-input">
                        <input type="text" className="col-8" name="Material" value={this.state.Data.Material || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    <FormGroup label="Code:" labelFor="text-input">
                        <input type="text" className="col-8" name="Code" value={this.state.Data.Code || ''} onChange={this.OnFormDataChanged} />
                    </FormGroup>
                    {/* <FormGroup label="Image:" labelFor="text-input">
                        <FileInput text="Choose Image..." onInputChange={this.OnImageSelected}/>
                    </FormGroup> */}
                    {images}
                    {/* <FormGroup label="Change Image:" labelFor="text-input">
                        <FileInput text="Choose Image..." className=" bp3-input" onInputChange={this.OnImageSelected} />
                        <Button className="ml-2" disabled={!this.state.Data.ImageFileName} intent="danger" icon="delete" minimal={true} style={{ verticalAlign: 'baseline' }} onClick={this.OnRemoveImageButtonClicked} />
                    </FormGroup> */}
                    <FormGroup label="Code:" labelFor="text-input">
                        <FileInput text="Add Image..." className=" bp3-input" onInputChange={this.OnImageSelected} />
                    </FormGroup>

                    <div>
                        <Button className="mr-2" intent="primary" text="Save" onClick={this.OnSaveButtonClicked} />
                        <Button className="ml-2" intent="none" text="Cancel" onClick={this.OnCancelButtonClicked} />
                    </div>
                </ControlGroup>
            </div>
        );
    }

    OnFormDataChanged(event) {
        let eventTarget = event.currentTarget;
        this.setState(lastState => (
            {
                Data: {
                    ...lastState.Data,
                    [eventTarget.name]: eventTarget.value
                }
            })
        );
    }



    OnCancelButtonClicked(event) {
        this.setState({
            IsCanceled: true
        });
    }

    OnSaveButtonClicked(event) {
        //console.log(this.state);
        this.setState({
            IsLoading: true
        });
        let thisObject = this;
        fetch(`${ConstantValues.WebApiBaseUrl}/${ConstantValues.MedicalProductUpdateApi}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthenticationService.GetAuthToken()}`
                },
                body: JSON.stringify({...this.state.Data, ImageInfos : this.state.Images})
            }).then(response => {
                return response.text();
            }).then(responseText => {
                try {
                    return JSON.parse(responseText);
                }
                catch (e) {
                    Promise.reject({ exception: e, body: responseText, type: 'unparsable' })
                }
            }).then(data => {
                console.log(data);
                thisObject.setState({
                    IsLoading: false,
                    SavedSuccessfuly: true
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