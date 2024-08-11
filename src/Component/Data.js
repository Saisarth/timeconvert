import React, { Component } from 'react';

class Data extends Component {
  getHour() {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      value: '',
      isLoaded: false,
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.state.value);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ value }, () => this.fetchData(value));
  }

  fetchData(value) {
    if (!value) {
      this.setState({
        isLoaded: true,
        items: {},
        error: null
      });
      return;
    }

    fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=J9X3EOT2EM8U&format=json&by=zone&zone=${value}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
          error: null
        });
      })
      .catch(error => {
        console.error('Fetch error:', error);
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    const { isLoaded, value, items, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    const formattedTime = items.formatted ? items.formatted.slice(11, 16) : this.getHour();

    return (
      <div>
        <label htmlFor="time-input" className="control">
          Time
          <input
            id="time-input"
            className="input is-info"
            type="text"
            name="time"
            placeholder="Enter time"
            title="Current time"
            value={formattedTime}
            readOnly
          />
        </label>
        
        <div className="control">
          <div className="select is-fullwidth is-info">
            <label htmlFor="timezone-select" className="control">
              Timezone
              <select
                id="timezone-select"
                name="timezone"
                title="Select timezone"
                onChange={this.handleChange}
                value={value}
              >
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
            </label>
          </div>
        </div>

        <ul>
          <li>Country: {items.countryName}</li>
          <li>Zone: {items.zoneName}</li>
          <li>Formatted Time: {items.formatted}</li>
        </ul>
      </div>
    );
  }
}

export default Data;
