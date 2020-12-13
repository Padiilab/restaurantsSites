import React, {Component} from "react";
import 'bootstrap';
import './Home.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from 'axios';

export default class home extends Component {
    render() {
        axios.get('localhost:8000/api/v1/restaurants' )
            .then(function (response) {
                // handle success
                console.log(response);
            })

        return (
            <>
                <div className={"content"}>
                    <Header/>
                    <div className={'wrapperHome'}>

                        <div className={"container containerHome"}>
                            <div className={"contentHome"}>

                                {/*<div className="product-wrap">*/}
                                {/*    <div className="product-item">*/}
                                {/*        <img alt={'restaurantPict'} src="https://media-cdn.tripadvisor.com/media/photo-s/14/07/c6/eb/elissa-bar-restaurant.jpg"/>*/}
                                {/*            <div className="product-buttons">*/}

                                {/*                <a href="" className="button">Отзывы</a>*/}
                                {/*            </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="product-title">*/}
                                {/*        <a href="">Name</a>*/}
                                {/*        <span className="product-price">Ценовая политика:1</span>*/}
                                {/*        <br/>*/}
                                {/*        <span className="product-price">Город: Киев</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                        </div>
                    </div>

                </div>
                <Footer/>

            </>
        );
    }
}