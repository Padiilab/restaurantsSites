import React, {Component} from "react";
import './Home.css'
import './Home.scss'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from 'axios';
import 'react-bootstrap';
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import AddNewRestaurant from "./AddNewRestaurant.js";
import EditPage from "./EditPage";
import Rating from '@material-ui/lab/Rating';
import withStyles from "@material-ui/core/styles/withStyles";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ReviewPage from "./ReviewPage";

const StyledRating = withStyles({})(Rating)


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

    createNewRestaurant = () => {
        this.setState({isAddNew: true});
    }
    updateListRestaurants = () => {
        this.setState({isLoading: true});
        axios.get('https://restaurants-database.herokuapp.com/api/v1/restaurants/')
            .then((response) => {
                 //handle success
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

    render() {
        if (!this.state.isAddNew && !this.state.editMode && !this.state.addReview) {
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
                                {this.state.listRestaurants[index].reviews_quantity ? this.state.listRestaurants[index].reviews_quantity : 0} review
                            </div>

                        </div>
                        <StyledRating emptyIcon={<StarBorderIcon fontSize="inherit"/>} className={"ratingStar"}
                                      name="half-rating-read" defaultValue={this.state.listRestaurants[index].rating}
                                      precision={0.1} readOnly/>
                        <ul className="social-icons">
                            <OverlayTrigger placement="top-start"
                                            overlay={<Tooltip className="errorTooltip">price rating</Tooltip>}>
                                <li><a ><p
                                    className={'priceRange'}>{this.state.listRestaurants[index].price_range}</p></a>
                                </li>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top-start"
                                overlay={<Tooltip className="errorTooltip">Facebook</Tooltip>}
                            >
                                <li><a ><i className="fab fa-facebook"/></a></li>
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
                                <li><a ><i className="fab fa-instagram"/></a></li>
                            </OverlayTrigger>
                        </ul>
                        <button onClick={() => {
                            this.setState({addReview: true, reviewData: this.state.listRestaurants[index]})
                        }} className="btnCard draw-border">Review
                        </button>
                        <button onClick={() => {
                            this.setState({editMode: true, editData: this.state.listRestaurants[index]})
                        }} className="btnCard draw-border">Edit
                        </button>

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
        } else if (this.state.isAddNew) {
            return (
                <>
                    <div className={"content"}>
                        <Header/>
                        <div className={'wrapperHome'}>

                            <div className={"containerHome"}>
                                <AddNewRestaurant
                                    updateListRestaurant={this.updateListRestaurants}
                                    onBackToHome={this.onBackToHome}
                                />
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </>
            )


        } else if (this.state.addReview) {
            return (
                <>
                    <div className={"content"}>
                        <Header/>
                        <div className={'wrapperHome'}>
                            <div className={"containerHome"}>
                                <ReviewPage
                                    editData={this.state.reviewData}
                                    updateListRestaurant={this.updateListRestaurants}
                                    onBackToHome={() => {
                                        this.setState({addReview: false})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </>
            )
        } else {
            return (
                <>
                    <div className={"content"}>
                        <Header/>
                        <div className={'wrapperHome'}>
                            <div className={"containerHome"}>
                                <EditPage
                                    editData={this.state.editData}
                                    updateListRestaurant={this.updateListRestaurants}
                                    onBackToHome={() => {
                                        this.setState({editMode: false})
                                    }}
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