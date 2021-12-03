import React, {useEffect, useState} from "react";
import Thermometer from 'react-thermometer-component'
import axios from "axios";
import {VictoryLine, VictoryChart, VictoryTooltip, VictoryAxis, VictoryVoronoiContainer} from 'victory'

import './diplom.css'

export const Diplom = () => {
    const  sunImage = 'https://raw.githubusercontent.com/KevinMellott91/react-weather-display/master/images/sunny.png'
    const showImage ='https://raw.githubusercontent.com/KevinMellott91/react-weather-display/master/images/snow.png'
    const cloudyImage='https://raw.githubusercontent.com/KevinMellott91/react-weather-display/master/images/cloudy.png'


    const [arduinoData, setArduinoData] = useState(null)

    const [graphData, setGraphData] = useState([]);

    const temp = arduinoData?.temperature?.data || 0;

    const backgroundImage =temp>10 ? sunImage : temp < 0 ? showImage : cloudyImage;

    useEffect(async ()=>{
        try {
            setGraphData((await axios.get(`https://restaurants-viewer-api.herokuapp.com/arduino/plots?dataType=temperature&dateFrom=${(new Date().toDateString())}`)).data.temperatures?.map(one => ({
                x: new Date(one.received),
                y: parseFloat(one.data),
            })))
        }catch
        {
            setGraphData([]);
        }

    },[])

    useEffect(async ()=>{

        setArduinoData((await axios
            .get('https://restaurants-viewer-api.herokuapp.com/arduino/test-data-get?stationId=1')).data.data)

        setInterval(async ()=>{

            setArduinoData((await axios
            .get('https://restaurants-viewer-api.herokuapp.com/arduino/test-data-get?stationId=1')).data.data)},10000)
    },[])

    return <div className='temp-wrapper'><div className='temp-container'>
        {/*<div className='temp-item'>
            <p>Влажность</p>
            <br/>
            <Thermometer
                theme="light"
                value={arduinoData?.humidity?.data||0}
                max="100"
                steps="10"
                format="%"
                size="large"
                height="300"
            />
        </div>
*/}


        <div className='temp-item'>
            <p>температура</p>
            <br/>



            <div className='temp-new-wrapper'>
            {<img className='temperature-image' src={backgroundImage}/>}
            <div className='temp-value'>{temp}°</div>
            </div>
        {/*<Thermometer
            theme="light"
            value={temp}
            max="50"
            steps="8"
            format="°C"
            size="large"
            height="300"
        />*/}
            <VictoryChart containerComponent={
                <VictoryVoronoiContainer voronoiDimension="x"
                                         labels={({ datum }) => `Время: ${datum.x.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                                         Температура: ${datum.y}`}


                                         labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "white"}}/>}
                />
            }   width={1300}
                height={800}
            >

                <VictoryLine
                    style={{ data: { stroke: "#c43a31", strokeWidth: 5, strokeLinecap: "round" } }}
                    interpolation='stepAfter'
                    data={graphData}

                />

            </VictoryChart>
        </div>
    </div>
        <p className='diplom-footer'>
        Последнее обновление : {new Date (arduinoData?.temperature?.received).toLocaleTimeString() ||0}
        </p>
    </div>
}
