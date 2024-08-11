import React, {Component} from 'react'

class Data2 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: {},
        value: "",
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
            {this.state.value === '' ? 
              <input className="input is-info" type="text" name="" value="Select a state" />
                : 
                <input className="input is-info" type="text" name="" value={this.state.items.formatted.slice(10 , 16, 18)} 
            />
          }
            </label>
          

            <div className="control">
                <div className="select is-fullwidth is-info">
                    <select onChange={this.handleChange} value={value}>
                        <option value=""></option>
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
        </div>
      );
    }
}

export default Data2;