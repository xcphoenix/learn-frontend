import React from "react";

class Weather extends React.Component {
  constructor() {
    super(...arguments);

    this.cityCode = "101110101";
    this.state = {
      weather: null,
    };
  }

  componentDidMount() {
    const apiUrl = `/data/cityinfo/${this.cityCode}.html`;
    fetch(apiUrl)
      .then((response) => {
        // 有状态码就调用 then
        if (response.status !== 200) {
          throw new Error(
            "Failed to get response with status " + response.status
          );
        }
        // 接受到HTTP报头就会调用 then
        response
          .json()
          .then((responseJson) => {
            this.setState({
              weather: responseJson.weatherinfo,
            });
          })
          .catch((error) => {
            this.setState({
              weather: null,
            });
            console.log(error + ", cannot get data");
          });
      })
      .catch((_error) => {
        this.setState({
          weather: null,
        });
      });
  }

  render() {
    if (!this.state.weather) {
      return <div>暂无数据</div>;
    }

    const { city, weather, temp1, temp2 } = this.state.weather;
    return (
      <div>
        {city} {weather} 最低气温 {temp1} 最高气温 {temp2}
      </div>
    );
  }
}

export default Weather;
