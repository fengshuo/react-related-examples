import React, { Component, PropTypes } from 'react';

class ProductCategoryRow extends Component {
  render() {
    return (
      <tr className="categoryRow">
        {this.props.category}
      </tr>
    )
  }
}

class ProductRow extends Component {
  render() {
    return (
      <tr className="row">
        <td className={this.props.inStock ? 'normal' : 'red'}>{this.props.name}</td>
        <td>{this.props.price}</td>

      </tr>
    )
  }
}

class ProductTable extends Component {
  render() {
    let rows = [];
    let lastCategory = null;
    this.props.products.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return
      }
      if(product.category !== lastCategory) {
        rows.push(<ProductCategoryRow key={product.category} category={product.category}/>)
      }
      rows.push(<ProductRow name={product.name} price={product.price} inStock={product.stocked} key={product.name}/>)
      lastCategory = product.category;
    })
    return(
      <table>
        <thead><tr>
          <th>Name</th>
          <th>Price</th>
        </tr></thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class SearchBar extends Component {
  constructor() {
    super();
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleStockChange = this.handleStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    let text = e.target.value;
    this.props.updateFilterText(text);
  }

  handleStockChange(e) {
    let status = e.target.checked;
    this.props.updateInStock(status);
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="search sth..." onChange={this.handleFilterTextChange}/>
        <p>
          <input type="checkbox" placeholder="search sth..." onChange={this.handleStockChange}/>
        </p>
      </form>
    )
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
      inStockOnly: false
    }
    this.updateFilterText = this.updateFilterText.bind(this);
    this.updateInStock = this.updateInStock.bind(this);
  }

  updateFilterText(text) {
    this.setState({
      filterText: text
    })
  }

  updateInStock(status) {
    this.setState({
      inStockOnly: status
    })
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          updateFilterText={this.updateFilterText}
          updateInStock={this.updateInStock}
          />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          />
      </div>
    )
  }
}

SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  inStockOnly: PropTypes.bool.isRequired,
  updateFilterText: PropTypes.func.isRequired,
  updateInStock: PropTypes.func.isRequired,
}

ProductTable.propTypes = {
  filterText: PropTypes.string.isRequired,
  inStockOnly: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired
}

export default App;
