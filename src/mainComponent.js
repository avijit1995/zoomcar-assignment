import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Required componets
import { compose } from 'redux';
import { getCitiesList, getCitiesListSuccess, getCitiesListFail } from './action';

// Main component
class MainComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      hd: false,
      oneway: false
    };
  }

  componentDidMount() {
    const url = 'https://api.zoomcar.com/v4/cities?platform=web';
    // api call to view the created projects list
    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
      .then((dataReceived) => {
        // store the projects list in array of objects
        this.props.getCitiesListSuccess(dataReceived.cities);
      })
      .catch((error) => {
        this.props.getCitiesListFail();
      });
  }

  render() {
    const { cities } = this.props;
    const { search = '', hd, oneway } = this.state;
    let filteredCities = cities.filter(c => {
      return c.name.toLowerCase().includes(search.toLowerCase()) && ((hd && c.hd_enabled) || !hd) && ((oneway && c.one_way_enabled) || !oneway)
    })
    return (
      <div className="main-component-wrapper">
        <h1 style={{ textAlign: 'center' }}>Cities</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input value={search} onChange={(e) => this.setState({ search: e.target.value })} style={{ width: '60%', maxWidth: '300px', flexWrap: 'wrap' }}
            placeholder='Search City'></input>
          <div style={{ display: 'flex', width: '30%', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div>
              <label>HD Enabled</label>
              <input type="checkbox" checked={hd} onChange={(e) => {this.setState({ hd: e.target.checked }) }}></input>
            </div>
            <div>
              <label>One Way Enabled</label>
              <input type="checkbox" checked={oneway} onChange={(e) => { this.setState({ oneway: e.target.checked }) }}></input>
            </div>
          </div>
        </div>
        <h2>Popular</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {filteredCities.filter(c => c.popular).map(city => {
            return <div style={{ padding: '20px', margin: '20px', background: '#ccc', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={city.icon} height='40' width='40' style={{ borderRadius: '50%' }}></img>
              <div style={{ marginTop: '10px' }}>{city.name}</div>
            </div>
          })}
        </div>

        <h2>Others</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            filteredCities.filter(c => !c.popular).map(city => {
              return <div style={{ padding: '20px', margin: '20px', background: '#ccc', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={city.icon} height='40' width='40' style={{ borderRadius: '50%' }}></img>
                <div style={{ marginTop: '10px' }}>{city.name}</div>
              </div>
            })
          }
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    cities: state.app.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCitiesListSuccess: (data) => dispatch(getCitiesListSuccess(data)),
    getCitiesListFail: () => dispatch(getCitiesListFail()),
  };
}

const composeComponent = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)

export default composeComponent(MainComponent);
