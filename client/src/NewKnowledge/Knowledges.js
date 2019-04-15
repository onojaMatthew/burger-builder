// partial text search using node and react frontend

// handling input change and calling the function that calls backend
handleChange = () => {
  this.setState({
    searchTerm: this.search.value
  }, () => {
    if (this.state.searchTerm && this.state.searchTerm.length > 1) {
      if (this.state.searchTerm.length % 2 === 0) {
        this.handleStartupSearch();
      }
    } else if (!this.state.searchTerm) {
      // getStartups(this.props.startup.startup.length)(this.props.dispatch);
    }
  });
}

// search form input field
<input
  type="search"
  className="search-input"
  value={this.state.searchTerm}
  name="searchTerm"
  ref={input => this.search = input}
  onChange={this.handleChange}
  placeholder="Search"
/>

// calling backend api
handleDataSearch = async () => {
  const { searchTerm } = this.state;
  try {
    await startupSearch(searchTerm)(this.props.dispatch);
  }
    catch(error) {

    }
}

// backend implementation of the partial search

exports.searchDB = (req, res, next) => {
  const q = req.query.q;
  Data.find({ "company_basic.primary_industry": {
    $regex: new RegExp(q)
  }}, (err, data) => {
    if (err) return res.status(400).json({
      error: err.message
    });
    res.json(data);
  }).limit(10);
}
