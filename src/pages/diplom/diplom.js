import React, {useEffect, useState} from "react";
import Thermometer from 'react-thermometer-component'
import axios from "axios";

import './diplom.css'

export const Diplom = () => {
    const [arduinoData, setArduinoData] = useState(null)

    useEffect(async ()=>{
        setArduinoData((await axios
            .get('http://restaurants-viewer-api.herokuapp.com/arduino/temp')).data)
    },[])

    return <div className='temp-wrapper'><div className='temp-container'>
        <div className='temp-item'>

            <p>Осветлённость</p>
            <br/>
            <Thermometer
                theme="light"
                value={arduinoData?.light||0}
                max="50"
                steps="8"
                format="Люмен"
                size="large"
                height="300"
            />
        </div>

        <div className='temp-item'>
            <p>Влажность</p>
            <br/>
            <Thermometer
                theme="light"
                value={arduinoData?.humidify||0}
                max="100"
                steps="10"
                format="%"
                size="large"
                height="300"
            />
        </div>



        <div className='temp-item'>
            <p>температура</p>
            <br/>
        <Thermometer
            theme="light"
            value={arduinoData?.temp+'' || '0'}
            max="50"
            steps="8"
            format="°C"
            size="large"
            height="300"
        />
        </div>
    </div>
        Последнее обновление : {new Date (arduinoData?.updatedAt).toLocaleTimeString() ||0}
    </div>
}
