import React, {Component} from "react";
import spinner from './Images/spinner1.gif'
import 'bootstrap';
import './Home.css'
import Header from "../Header/Header";

export default class home extends Component {
    render() {
        return (
            <>
                <Header/>
                <div className={'wrapperHome'}>

                    <div className={"container containerHome"}>
                        <img className={'spinner'} src={spinner} alt={''}/>
                    </div>
                </div>
            </>
        );
    }
}