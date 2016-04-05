//Your components go here
var App = React.createClass({

  getInitialState: function() {
    return {
      colaboradores: [],
    };
  },

  handleChange: function(e) {
    var _this = this;
    var query = e.target.value.toLowerCase();
    $.getJSON('/cards/data/colaboradores.json', function(data) {
      _this.setState({
        colaboradores: data.filter(c => c.name.toLowerCase().indexOf(query) !== -1),
      });
    });
  },

  render: function() {
    return (
      <div>
        <header className="header">
          <div className="container">
            <div className="col-md-12">
              <form>
                <div className="search-box">
                  <input type="search" className="form-control input-lg" placeholder="Who are you looking for?" onChange={this.handleChange} />
                </div>
              </form>
            </div>
          </div>
        </header>
        <ul className="container list-unstyled">
          {
            this.state.colaboradores.map(function(colaborador, index) {
              return (
                <li className="col-md-6 col-sm-6 col-lg-4" key={index}>
                  <Card {...colaborador} />
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  },
});

var Card = React.createClass({
  render: function() {
    const avatarSrc = this.props.avatar ? this.props.avatar : 'placeholder-photo';
    let ramal;
    if (this.props.ramal) {
      ramal = <p className="card__info-item"><span className="glyphicon glyphicon-earphone"></span> {this.props.ramal}</p>;
    }

    return (
      <div className="card">
        <div className="card__photo-box">
          <img src={`img/${avatarSrc}.jpg`} className="card__photo" />
        </div>
        <div className="card__info">
          <h4>{this.props.name}</h4>
          {ramal}
          <p className="card__info-item"><span className="glyphicon glyphicon-envelope"></span> {this.props.email}</p>
          <p className="card__info-item"><span className="glyphicon glyphicon-map-marker"></span> {this.props.location}</p>
        </div>
      </div>
    );
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
