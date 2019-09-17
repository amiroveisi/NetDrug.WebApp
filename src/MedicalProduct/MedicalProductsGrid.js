import React, { Component } from 'react';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
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
import { NonIdealState, Button, Alert, Toaster, Spinner } from '@blueprintjs/core';
import { Redirect } from 'react-router-dom';
import AuthenticationService from '../AuthenticationService';
import dotnetify from 'dotnetify';
class DrugsGrid extends Component {
    constructor(props) {
        super(props);
        let authHeader = { Authorization: `Bearer ${AuthenticationService.GetAuthToken()}` };
        this.vm = dotnetify.react.connect("MedicalProductsSearchViewModel", this,
            {
                headers: authHeader
            });
        this.OnRowSelected = this.OnRowSelected.bind(this);
        this.OnAddButtonClicked = this.OnAddButtonClicked.bind(this);
        this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
        this.OnRowDeselected = this.OnRowDeselected.bind(this);
        this.OnDetailsButtonClicked = this.OnDetailsButtonClicked.bind(this);
        this.OnNextPageClicked = this.OnNextPageClicked.bind(this);
        this.OnPreviousPageClicked = this.OnPreviousPageClicked.bind(this);
        this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
        this.OnUserEnteredPage = this.OnUserEnteredPage.bind(this);
        this.OnGoToPageKeyPress = this.OnGoToPageKeyPress.bind(this);
        this.OnPageNumberLostFocus = this.OnPageNumberLostFocus.bind(this);
        this.CanCleanSearch = false;
        this.LastValidPage = 1;
        this.state = {

            AddNewDrugClicked: false,
            EditDrugClicked: false,
            CanEdit: false,
            DetailsButtonClicked: false,
            LoadingFailed: false,
            SelectedId: null,
            IsDeleteAlertOpen: false,
            SearchQuery: {
                Text: "",
                Page: 1,
                RowsInPage: 50
            },
            SearchResult: null,
            UserEnteredPage: 1

        };

    }
    componentDidMount() {
        if (this.props.location.state) {
            let currentSearchQuery = this.props.location.state.currentSearchQuery;
            this.LoadMedicalProducts({
                ...currentSearchQuery
            });
        }
    }
    componentWillUnmount() {
        this.vm.$destroy();
    }

    render() {
        if (!this.state.SearchResult) {
            this.vm.$dispatch({
                Search: this.state.SearchQuery
            });
            if (this.state.SearchQuery.Text === "")
                this.CanCleanSearch = false;
            else
                this.CanCleanSearch = true;
            return (<div className="h-100 container">
                <div className="row h-100 justify-content-center align-items-center">
                    <Spinner size="60" intent="primary"></Spinner>
                </div>
            </div>);
        }
        let grid = (<div className="h-100 container">
            <div className="row h-100 justify-content-center align-items-center">
                <NonIdealState title="No search result :(" description="Try searching for something else"
                    icon="search" />
            </div>
        </div>);
        if (this.state.SearchResult.Data) {
            grid = (
                <div className="container-fluid">
                    <div className="container">
                        <div className="mt-2 mb-2 row justify-content-center align-items-center no-gutters">
                            <div className="col-*">

                                <Button icon="arrow-left" onClick={this.OnPreviousPageClicked} className="mr-2" />
                            </div>
                            <div className="col-*">
                                <span className="mr-2">Page </span>
                            </div>
                            <div className="col-* ">
                                <input type="number"
                                    className="bp3-input mr-2" value={this.state.SearchQuery.Page}
                                    onKeyPress={this.OnGoToPageKeyPress}
                                    onChange={this.OnUserEnteredPage}
                                    onFocus={event => event.target.select()}
                                    onBlur={this.OnPageNumberLostFocus}
                                    style={{ width: '45px' }} />
                            </div>
                            <div className="col-*">
                                <span className="mr-2"> of {Math.ceil(this.state.SearchResult.Data.TotalRows / 50)}</span>
                            </div>
                            <div>
                                <Button icon="arrow-right" onClick={this.OnNextPageClicked} className="mr-2" />
                            </div>

                        </div>
                    </div>
                    <div className="container-fluid">

                        <div className="mb-5 row">
                            <GridComponent className="persian-font" dataSource={this.state.SearchResult.Data.CurrentPageData} /*enableVirtualization={true} pageSettings={{pageSize : 20}}*/
                                rowSelected={this.OnRowSelected} rowDeselected={this.OnRowDeselected}>

                                <ColumnsDirective>
                                    <ColumnDirective field='Id' visible={false} />
                                    <ColumnDirective field='LatinName' headerText="Persian Generic Name" width='100' />
                                    <ColumnDirective field='PersianName' headerText="English Generic Name" width='100' />
                                </ColumnsDirective>

                            </GridComponent>
                        </div>
                    </div>
                    <Alert cancelButtonText="Cancel"
                        confirmButtonText="Yes, Delete It!"
                        icon="delete"
                        intent="danger"
                        isOpen={this.state.IsDeleteAlertOpen}
                        onCancel={() => { this.setState({ IsDeleteAlertOpen: false }) }}
                        onConfirm={() => { this.OnDeleteAlertConfirm() }}>
                        <p>
                            Are you sure you want to delete the selected item? this action can not be undone!
                             </p>
                    </Alert>
                </div>
            );
        }


        if (this.state.AddNewDrugClicked) {
            return (<Redirect to="/medicalproduct/new" />);
        }
        if (this.state.EditDrugClicked) {
            let url = `/medicalproduct/edit/${this.state.SelectedId}`;
            return (<Redirect to={
                {
                    pathname: url,
                    state: {
                        currentSearchQuery: this.state.SearchQuery
                    }
                }} />);
        }

        if (this.state.DetailsButtonClicked) {
            let url = `/medicalproduct/details/${this.state.SelectedId}`;
            return (<Redirect to={url} />);
        }
        if (this.state.LoadingFailed) {
            return (<span>Error while loading data!</span>);
        }
        const SearchIcon = (<span className="bp3-icon bp3-icon-search cursor-pointer" onClick={event => {
            this.LoadMedicalProducts({ ...this.state.SearchQuery, Page: 1 });
        }}></span>);
        const ClearSearchIcon = (<span className="bp3-icon bp3-icon-delete cursor-pointer" onClick={event => {
            this.LoadMedicalProducts({
                Text: "",
                Page: 1,
                RowsInPage: ConstantValues.RowsInPage
            })

        }}></span>);
        let SearchBarAction = SearchIcon;
        if (this.CanCleanSearch)
            SearchBarAction = ClearSearchIcon;
        return (
            <div className="container-fluid h-100 pb-2 pt-2">
                <div className="container-fluid">

                    <div className="row no-gutters">
                        <div className="col-*">
                            <Button text="Add" icon="add" className="mr-2" onClick={this.OnAddButtonClicked} />
                            <Button text="Edit" icon="edit" disabled={!this.state.SelectedId} className="mr-2" onClick={this.OnEditButtonClicked} />
                            <Button text="Details" icon="list-detail-view" disabled={!this.state.SelectedId} className="mr-2" onClick={this.OnDetailsButtonClicked} />
                            <Button text="Delete" icon="delete" intent="danger" disabled={!this.state.SelectedId} className="mr-2" onClick={this.OnDeleteButtonClicked} />

                        </div>
                        <div className="bp3-input-group col">
                            {SearchBarAction}
                            <input className="bp3-input" type="search" placeholder="Search" dir="auto"
                                onChange={event => {
                                    this.setState({
                                        SearchQuery: {
                                            Text: event.target.value,
                                            Page: this.state.SearchResult.Data.CurrentPage,
                                            RowsInPage: 50
                                        }
                                    });
                                }} value={this.state.SearchQuery.Text}
                                onKeyPress={event => {
                                    if (event.charCode === 13) {
                                        this.LoadMedicalProducts({ ...this.state.SearchQuery, Page: 1 });
                                    }
                                }
                                }
                            />
                        </div>
                    </div>

                </div>
                {grid}



            </div>
        );
    }

    OnPageNumberLostFocus(event) {
        if (!this.state.SearchQuery.Page) {
            this.setState({
                SearchQuery: {
                    ...this.state.SearchQuery,
                    Page: this.LastValidPage
                }
            });
        }
    }
    OnGoToPageKeyPress(event) {
        if (event.charCode === 13 && this.state.SearchQuery.Page) {
            this.LoadMedicalProducts(this.state.SearchQuery);
        }
    }
    OnUserEnteredPage(event) {
        let page = event.target.value;
        if (page && page <= 0 || page > Math.ceil(this.state.SearchResult.Data.TotalRows / 50))
            return;
        if (event.target.value)
            this.LastValidPage = event.target.value;
        else
            this.LastValidPage = this.state.SearchQuery.Page;
        this.setState({
            SearchQuery: { ...this.state.SearchQuery, Page: event.target.value }
        });
    }
    DeleteMedicalProduct(medicalProductId) {
        let thisObject = this;
        fetch(`${ConstantValues.WebApiBaseUrl}/${ConstantValues.MedicalProductDeleteApi}/${medicalProductId}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${AuthenticationService.GetAuthToken()}`
                }
            }).then(function (response) {
                //console.log(response.text());
                let temp = response.text();

                return temp;
            }
            ).then(responseText => {
                try {
                    const responseJson = JSON.parse(responseText);
                    return responseJson;
                }
                catch (e) {
                    Promise.reject({ exception: e, body: responseText, type: 'unparsable' });
                    console.log("error on load");
                    thisObject.setState({
                        LoadingFailed: true
                    });
                }
            }).then(data => {
                console.log(data);
                Toaster.create({
                    position: ConstantValues.ToasterPosition
                }).show({
                    message: "Deleted Successfuly",
                    intent: "success",

                });
                this.LoadMedicalProducts(this.state.SearchQuery);
                // thisObject.setState(
                //     {
                //         Data: data.Data.CurrentPageData,
                //         CurrentPage : data.Data.CurrentPage,
                //         TotalRows : data.Data.TotalRows,
                //         IsLoading : false,
                //         LoadingFailed : false
                //     }
                // );
                //console.log(data);
            }).catch(e => {
                console.log(e);
                thisObject.setState({
                    LoadingFailed: true,
                    IsLoading: false
                });
            });
    }

    LoadMedicalProducts(searchquery) {
        this.setState({
            SearchResult: null,
            SearchQuery: searchquery
        });
    }
    OnRowSelected(event) {
        this.setState({
            SelectedId: event.data.Id
        })
    }
    OnAddButtonClicked(event) {
        this.setState({
            AddNewDrugClicked: true
        });
    }
    OnEditButtonClicked(event) {
        this.setState({
            EditDrugClicked: true
        });
    }
    OnRowDeselected(event) {
        this.setState({
            SelectedId: null
        });
    }
    OnDetailsButtonClicked(event) {
        this.setState({
            DetailsButtonClicked: true
        });
    }
    OnNextPageClicked(event) {
        let nextPage = this.state.SearchResult.Data.CurrentPage + 1;
        if (nextPage > Math.ceil(this.state.SearchResult.Data.TotalRows / 50)) {
            return;
        }
        this.LoadMedicalProducts({ ...this.state.SearchQuery, Page: nextPage });
    }
    OnPreviousPageClicked(event) {
        let prevPage = this.state.SearchResult.Data.CurrentPage - 1;
        if (prevPage < 1)
            return;
        this.LoadMedicalProducts({ ...this.state.SearchQuery, Page: prevPage });
    }
    OnDeleteButtonClicked(event) {
        this.setState(
            {
                IsDeleteAlertOpen: true
            });
    }
    OnDeleteAlertConfirm() {
        this.setState({
            IsDeleteAlertOpen: false
        });
        Toaster.create({
            position: ConstantValues.ToasterPosition
        }).show({
            message: "Deleting in progress...",
            intent: "danger",

        });
        this.DeleteMedicalProduct(this.state.SelectedId);

    }
}

export default DrugsGrid;