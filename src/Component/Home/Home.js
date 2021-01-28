import React, {Component} from "react";
import './Home.css'
import './Home.scss'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from 'axios';
import 'react-bootstrap';
import Swal from 'sweetalert2'
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import AddNewRestaurant from "./AddNewRestaurant.js";

export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRestaurants: [],
            isLoading: true,
        }
    }

    onBackToHome = () => {
        this.setState({isAddNew: false})
    }
    deleteCurrentRestaurant = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://restaurants-database.herokuapp.com/api/v1/restaurants/${this.state.listRestaurants[index].id}`)
                    .then((response) => {
                        this.updateListRestaurants();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    });
            }
        })


    }
    createNewRestaurant = () => {
        this.setState({isAddNew: true});
    }
    updateListRestaurants = () => {
        this.setState({isLoading: true});
        axios.get('https://restaurants-database.herokuapp.com/api/v1/restaurants/')
            .then((response) => {
                // handle success
                if (this.state.listRestaurants !== response.data.restaurants) {
                    this.setState({listRestaurants: response.data.restaurants, isLoading: false})
                }

            })
            .catch(() => {
                this.setState({isLoading: false});
            });
    }
    renderWebsite = (index) => {
        if (this.state.listRestaurants[index].website) {
            return (
                <div className="product-buttons">

                    <a target={"_blank"} href={this.state.listRestaurants[index].website} className="button">Сайт</a>
                </div>)
        }
    }
    updateListRestaurant = () => {
        axios.get('https://restaurants-database.herokuapp.com/api/v1/restaurants/')
            .then((response) => {
                // handle success
                this.setState({listRestaurants: response.data.restaurants, isLoading: false})

            })
            .catch(() => {
                this.setState({isLoading: false});
            });
    }

    render() {
        if (!this.state.isAddNew) {
            let listRestaurants;

            if (this.state.listRestaurants.length === 0) {
                axios.get('https://restaurants-database.herokuapp.com/api/v1/restaurants/')
                    .then((response) => {
                        // handle success
                        if (this.state.listRestaurants !== response.data.restaurants) {
                            this.setState({listRestaurants: response.data.restaurants, isLoading: false})
                        }

                    })
                    .catch(() => {
                        this.setState({isLoading: false});
                    });
            }
            let renderList = [];
            for (let index in this.state.listRestaurants) {
                renderList.push(
                    <div className="cardRest">
                        <img
                            src="https://media-cdn.tripadvisor.com/media/photo-s/14/07/c6/eb/elissa-bar-restaurant.jpg"
                            alt="Person" className="card__image"/>
                        <p className="card__name">{this.state.listRestaurants[index].name}</p>
                        <div className="grid-container">
                            <OverlayTrigger
                                placement="top-start"
                                overlay={<Tooltip className="errorTooltip">Location</Tooltip>}
                            >
                                <div className="grid-child-posts">

                                    {this.state.listRestaurants[index].location}
                                </div>
                            </OverlayTrigger>


                            <div className="grid-child-followers">
                                {this.state.listRestaurants[index].review_quantity ? this.state.listRestaurants[index].review_quantity : 0} review
                            </div>

                        </div>
                        <ul className="social-icons">
                            <OverlayTrigger placement="top-start"
                                            overlay={<Tooltip className="errorTooltip">price rating</Tooltip>}>
                                <li><a href="#"><p
                                    className={'priceRange'}>{this.state.listRestaurants[index].price_range}</p></a>
                                </li>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top-start"
                                overlay={<Tooltip className="errorTooltip">Facebook</Tooltip>}
                            >
                                <li><a href="#"><i className="fab fa-facebook"/></a></li>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top-start"
                                overlay={<Tooltip className="errorTooltip">Web Site</Tooltip>}
                            >
                                <li><a href={this.state.listRestaurants[index].website} target={"_blank"}><i
                                    className="fas fa-satellite"/></a></li>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top-start"
                                overlay={<Tooltip className="errorTooltip">Instagram</Tooltip>}
                            >
                                <li><a href="#"><i className="fab fa-instagram"/></a></li>
                            </OverlayTrigger>
                        </ul>
                        <button className="btnCard draw-border">Review</button>
                        <button className="btnCard draw-border">Edit</button>

                    </div>
                )
            }
            return (
                <>
                    <div className={"content"}>
                        <Header/>
                        <div className={'wrapperHome'}>

                            <div className={"containerHome"}>
                                <div className={"contentHome"}>
                                    <button onClick={this.updateListRestaurants} type="button"
                                            className={"updateList btn"}>Update list
                                    </button>
                                    <button onClick={this.createNewRestaurant} type="button"
                                            className={"updateList btn"}>Add
                                    </button>
                                    {this.spinnerOrRestaurants(renderList)}
                                </div>

                            </div>
                        </div>

                    </div>
                    <Footer/>

                </>
            );
        } else {
            return (
                <>
                    <div className={"content"}>
                        <Header/>
                        <div className={'wrapperHome'}>

                            <div className={"containerHome"}>
                                <AddNewRestaurant
                                    updateListRestaurant={this.updateListRestaurant}
                                    onBackToHome={this.onBackToHome}
                                />
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </>
            )
        }
    }

    spinnerOrRestaurants = (renderList) => {
        if (this.state.isLoading) {
            return (
                <div>
                    <div className={"mainSpinner spinner-grow text-secondary"}/>
                </div>);
        } else {
            if (renderList.length) {
                return (
                    <div className={"contentRest"}>
                        {renderList}
                    </div>);
            } else {
                return (
                    <div className={"contentRest"}>
                        <div>
                            <i className="flagForNotFound far fa-flag"/>
                            <h2>No restaurants found, please add first</h2>
                        </div>
                    </div>
                )
            }
        }
    }
}