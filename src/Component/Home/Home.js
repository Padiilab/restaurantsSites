import React, {Component} from "react";
import './Home.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from 'axios';
import 'react-bootstrap';
import Swal, {isLoading} from 'sweetalert2'
import spinner from './Spinner-1s-200px.gif';

export default class home extends Component {
    state = {
        listRestaurants: [],
        isLoading: true,
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

    render() {
        let listRestaurants;

        if (this.state.listRestaurants.length === 0) {
            axios.get('https://restaurants-database.herokuapp.com/api/v1/restaurants/')
                .then((response) => {
                    // handle success
                    if (this.state.listRestaurants !== response.data.restaurants) {
                        this.setState({listRestaurants: response.data.restaurants,isLoading: false})
                    }

                })
                .catch(() => {
                    this.setState({isLoading: false});
                });
        }
        let renderList = [];
        for (let index in this.state.listRestaurants) {
            renderList.push(
                <div className="product-wrap">
                    <div className="product-item">
                        <img alt={'restaurantPict'}
                             src="https://media-cdn.tripadvisor.com/media/photo-s/14/07/c6/eb/elissa-bar-restaurant.jpg"/>
                        {this.renderWebsite(index)}
                    </div>
                    <div className="product-title">
                        <a href={""}>{this.state.listRestaurants[index].name}</a>
                        <span className="product-price">Price: {this.state.listRestaurants[index].price_range}</span>
                        <br/>
                        <span className="product-price">Location: {this.state.listRestaurants[index].location}</span>
                        <br/>
                        <i className="basketForDelete fas fa-trash-alt fa-lg"
                           onClick={(event) => this.deleteCurrentRestaurant(index, event)}/>
                    </div>

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
                                        className={"createRest btn"}>Add institution
                                </button>
                                {this.spinnerOrRestaurants(renderList)}
                            </div>

                        </div>
                    </div>

                </div>
                <Footer/>

            </>
        );
    }

    spinnerOrRestaurants = (renderList) => {
        if (this.state.isLoading) {
            return (
                <div>
                    <img className={'Spinner'} alt={'spinner'} src={spinner}/>
                </div>);
        } else {
            return (
                <div className={"contentRest"}>
                    {renderList}
                </div>);
        }
    }
}