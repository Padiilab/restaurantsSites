import React,{Component} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import spinner from "../Home/Images/spinner1.gif";
export default class about extends Component {
    render() {
        return (
            <>
                <div className={"content"}>
                    <Header/>
                    <div className={'wrapperHome'}>

                        <div className={"container containerHome"}>
                            <div className={"contentHome"}>
                                Аля вторая страница
                            </div>

                        </div>
                    </div>

                </div>
                <Footer/>
            </>
        );
    }
}