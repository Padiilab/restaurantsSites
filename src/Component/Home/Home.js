import React, {Component} from "react";
import './Home.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from 'axios';

export default class home extends Component {
    state= {
        listRestaurants: []
    }
    render() {
        let listRestaurants;

        if(this.state.listRestaurants.length===0) {
            axios.get('https://restaurants-database.herokuapp.com/api/v1/restaurants/')
                .then((response) => {
                    // handle success
                    if (this.state.listRestaurants !== response.data.restaurants) {
                        this.setState({listRestaurants: response.data.restaurants})
                    }

                })
        }
        let renderList=[];
        for (let index in this.state.listRestaurants){
            renderList.push(
                <div className="product-wrap">
                    <div className="product-item">
                        <img alt={'restaurantPict'} src="https://media-cdn.tripadvisor.com/media/photo-s/14/07/c6/eb/elissa-bar-restaurant.jpg"/>
                        <div className="product-buttons">

                            <a href="" className="button">Отзывы</a>
                        </div>
                    </div>
                    <div className="product-title">
                        <a href="">{this.state.listRestaurants[index].name}</a>
                        <span className="product-price">Ценовая политика:{this.state.listRestaurants[index].price_range}</span>
                        <br/>
                        <span className="product-price">Город: {this.state.listRestaurants[index].location}</span>
                    </div>
                </div>
            )
        }
        return (
            <>
                <div className={"content"}>
                    <Header/>
                    <div className={'wrapperHome'}>

                        <div className={"container containerHome"}>
                            <div className={"contentHome"}>
                                <div className={"contentRest"}>
                                    {renderList}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <Footer/>

            </>
        );
    }
}