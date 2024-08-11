import React, {Component} from 'react'

class Data extends Component {
  getHour() {
    var hour = new Date().getHours()
    var minute = new Date().getMinutes()
    var hourMinute = `${hour}: ${minute}`
    return hourMinute;
  }
    constructor(props) {
      super(props);
      this.state = {
        items: {},
        value: '',
        isLoaded: false
      };
  
      this.handleChange = this.handleChange.bind(this);
    }
    
  
    componentDidMount() {
      const { value } = this.state;
  
      this.fetchData(value);
    }
  
    handleChange(event) {
      const value = event.target.value;
  
      this.setState({
        value
      });
  
      this.fetchData(value);
    }

    fetchData(value) {
        fetch(
          `https://api.timezonedb.com/v2.1/get-time-zone?key=J9X3EOT2EM8U&format=json&by=zone&zone=${value}`
        )
          .then(res => res.json())
          .then(json => {
            this.setState({
              isLoaded: true,
              items: json
            });
          });
      }
  
    render() {
      const { isLoaded, value } = this.state;
  
      if (!isLoaded) {
        return <div>Loading...</div>;
      }
        return (
            <div>
                <label className="control">
                    {this.state.value !== '' ? 
                        <input className="input is-info" type="text" name="" value={this.state.items.formatted.slice(10 , 16, 18)} />
                            :  
                        <input className="input is-info" type="text" name="" value={this.getHour()} />
                    }
                </label>
                
                <div className="control">
                    <div className="select is-fullwidth is-info">
                        <select onChange={this.handleChange} value={value}>
                            <option value="">Local Time</option>
                            <option value="America/Chicago">Chicago</option>
                            <option value="America/Denver">Denver</option>
                            <option value="Europe/Berlin">Berlin</option>
                            <option value="Europe/Busingen">Busingen</option>
                            <option value="America/Sao_Paulo">São Paulo</option>
                            <option value="America/Fortaleza">Fortaleza</option>
                            <option value="Europe/London">London</option>
                            <option value="Asia/Dubai">Dubai</option>
                        </select>
                    </div>
                </div>

                {/* {JSON.stringify(items)} */}

                {/* <ul>
                    <li>{this.state.items.countryName}</li>
                    <li>{this.state.items.zoneName}</li>
                    <li>{this.state.items.formatted}</li>
                </ul> */}
            </div>
        );
    }
}

export default Data;