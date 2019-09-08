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
import { Button, Alert, Toaster, Spinner } from '@blueprintjs/core';
import { Redirect } from 'react-router-dom';
import AuthenticationService from '../AuthenticationService';
import dotnetify from 'dotnetify';
class DrugsGrid extends Component {
    constructor(props) {
        super(props);

        this.vm = dotnetify.react.connect("SearchViewModel", this);
        this.OnRowSelected = this.OnRowSelected.bind(this);
        this.OnAddButtonClicked = this.OnAddButtonClicked.bind(this);
        this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
        this.OnRowDeselected = this.OnRowDeselected.bind(this);
        this.OnDetailsButtonClicked = this.OnDetailsButtonClicked.bind(this);
        this.OnNextPageClicked = this.OnNextPageClicked.bind(this);
        this.OnPreviousPageClicked = this.OnPreviousPageClicked.bind(this);
        this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
        this.CanCleanSearch = false;
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
            SearchResult: null

        };

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

        if (this.state.AddNewDrugClicked) {
            return (<Redirect to="/drug/new" />);
        }
        if (this.state.EditDrugClicked) {
            let url = `/drug/edit/${this.state.SelectedId}`;
            return (<Redirect to={url} />);
        }

        if (this.state.DetailsButtonClicked) {
            let url = `/drug/details/${this.state.SelectedId}`;
            return (<Redirect to={url} />);
        }
        if (this.state.LoadingFailed) {
            return (<span>Error while loading data!</span>);
        }
        const SearchIcon = (<span className="bp3-icon bp3-icon-search" onClick={event => {
            this.setState({
                SearchResult: null,
                SearchQuery: {...this.state.SearchQuery, Page : 1}
            });
        }}></span>);
        const ClearSearchIcon = (<span className="bp3-icon bp3-icon-delete" onClick={event => {
            this.setState({
                SearchResult: null,
                SearchQuery: {Text : "", Page : 1, RowsInPage : 50}
            });
        }}></span>);
        let SearchBarAction = SearchIcon;
        if (this.CanCleanSearch)
            SearchBarAction = ClearSearchIcon;
        return (
            <div className="pb-2 pt-2">
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
                            />
                        </div>
                    </div>

                </div>
                <div className="container-fluid">
                    <div className="mt-2 mb-5">
                        <div className="mb-2">
                            <span className="mr-2">Page {this.state.SearchResult.Data.CurrentPage} of {Math.ceil(this.state.SearchResult.Data.TotalRows / 50)}</span>
                            <Button text="Previous" icon="arrow-left" onClick={this.OnPreviousPageClicked} className="mr-2" />
                            <Button text="Next" icon="arrow-right" onClick={this.OnNextPageClicked} className="mr-2" />
                        </div>
                        {console.log(this.state.SearchResult)}
                        <GridComponent dataSource={this.state.SearchResult.Data.CurrentPageData} /*enableVirtualization={true} pageSettings={{pageSize : 20}}*/
                /*allowSorting={true} allowFiltering={true}*/ rowSelected={this.OnRowSelected} rowDeselected={this.OnRowDeselected}>

                            <ColumnsDirective>
                                <ColumnDirective field='Id' visible={false} />
                                <ColumnDirective field='GenericNameFarsi' headerText="Persian Generic Name" width='100' />
                                <ColumnDirective field='GenericNameEnglish' headerText="English Generic Name" width='100' />
                            </ColumnsDirective>
                            {/* <Inject services={[Page, Sort, Filter, Group, VirtualScroll]} /> */}

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

    DeleteDrug(drugId) {
        let thisObject = this;
        fetch(`${ConstantValues.WebApiBaseUrl}/${ConstantValues.DrugDeleteApi}/${drugId}`,
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
                this.LoadDrugs(this.state.CurrentPage, ConstantValues.RowsInPage);
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
        let currentQueryText = this.state.SearchQuery.Text;
        this.setState({
            SearchResult: null,
            SearchQuery: {
                Text: currentQueryText,
                Page: nextPage,
                RowsInPage: 50
            }
        });

    }
    OnPreviousPageClicked(event) {
        let prevPage = this.state.SearchResult.Data.CurrentPage - 1;
        if (prevPage < 1)
            return;
        let currentQueryText = this.state.SearchQuery.Text;
        this.setState({
            SearchResult: null,
            SearchQuery: {
                Text: currentQueryText,
                Page: prevPage,
                RowsInPage: 50
            }
        });
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
        this.DeleteDrug(this.state.SelectedId);

    }
}

export default DrugsGrid;