import React from "react";
import * as Status from '../weather/status.js';
import {connect} from 'react-redux'

const Weather = ({status, cityName, weather, lowestTemp, highestTemp}) => {
  switch (status) {
    case Status.LOADING: {
      return (
        <div>天气信息请求中</div>
      )
    }
    case Status.SUCCESS: {
      return (
        <div>
          {cityName} {weather} 最低气温 {lowestTemp} 最高气温 {highestTemp}
        </div>
      )
    }
    case Status.FAILURE: {
      return (
        <div>天气信息装载失败</div>
      )
    }
    default: {
      console.log(status);
      throw new Error('unexpected status ' + status);
    }
  }
}

const mapStateToProps = (state) => {
  const weatherData = state.weather;
  console.log(weatherData.status);
  return {
    status: weatherData.status,
    cityName: weatherData.city,
    weather: weatherData.weather,
    lowestTemp: weatherData.temp1,
    highestTemp: weatherData.temp2
  }
}

export default connect(mapStateToProps, null)(Weather);
