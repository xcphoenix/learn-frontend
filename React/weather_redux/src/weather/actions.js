import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionType.js';

const fetchWeatherStarted = () => ({
  type: FETCH_STARTED
});

const fetchWeatherSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
});

const fetchWeatherFailure = (error) => ({
  type: FETCH_FAILURE,
  error
});

// 异步构造函数
export const fetchWeather = (cityCode) => {
  return (dispatch) => {
    const apiUrl = `/data/cityinfo/${cityCode}.html`;

    dispatch(fetchWeatherStarted());

    fetch(apiUrl).then((response) => {
      if (response.status !== 200) {
        throw new Error('Fail to get response with status ' + response.status);
      }

      response.json().then((responseJson) => {
        dispatch(fetchWeatherSuccess(responseJson.weatherinfo));
      }).catch((error) => {
        throw new Error('Invalid json response: '+ error);
      });
    }).catch((error) => {
      dispatch(fetchWeatherFailure(error));
    });

  }
}