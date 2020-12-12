import React, {Component} from "react";
import spinner from './Images/spinner1.gif'
import 'bootstrap';
import './Home.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default class home extends Component {
    render() {
        return (
            <>
                <div className={"content"}>
                    <Header/>
                    <div className={'wrapperHome'}>

                        <div className={"container containerHome"}>
                            <div className={"contentHome"}> check
                                <img className={'spinner'} src={spinner} alt={''}/>
                            </div>

                        </div>
                    </div>

                </div>
                <Footer/>

            </>
        );
    }
}