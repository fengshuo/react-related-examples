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
    const { stocked, name, price } = this.props;
    /*
    ES6 destructing
    [a, b, ...rest] = [1, 2, 3, 4, 5]
    var o = {p: 42, q: true};
    var {p, q} = o;
    console.log(p); // 42
    console.log(q); // true
    */
    // <td className={this.props.stocked ? 'normal' : 'red'}>{name}</td>
    return (
      <tr className="row">
        <td className={stocked ? 'normal' : 'red'}>{name}</td>
        <td>{price}</td>
      </tr>
    )
  }
}

class ProductTableColumn extends Component {
  constructor() {
    super();
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
  }

  handleChangeOrder() {
    this.props.changeOrder();
    /*
      For passing props in nested components, there are 4 possible ways:
      1. manually pass down props on every level of components
      2. use things like redux to manage state in one place where state is accessible to all components
      3. use React's context feature, but it's not stable(https://facebook.github.io/react/docs/context.html)
      4. use plugins like react-addons-clone-with-props
    */
  }

  render() {
    return (
      <thead><tr>
        <th>Name</th>
        <th><button onClick={this.handleChangeOrder}>Price</button></th>
      </tr></thead>
    )
  }
}

class ProductTable extends Component {
  render() {
    let rows = [];
    let lastCategory = null;
    let products = this.props.products;
    products.sort((a,b) => {
      /*
        ES6 doesn't allow duplicate declaration of variables if declared with let or const (different from var)
        but you can use block to shadow it
        {
           let a = sth
        }
      */
      let first = parseInt(a.price.substring(1), 10);
      let second = parseInt(b.price.substring(1), 10);

      if (this.props.order === 'aescend') {
        if (first < second) {
          return -1
        } else {
          return 1
        }
      } else {
        if (first > second) {
          return -1
        } else {
          return 1
        }
      }

    })
    products.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return
      }
      if(product.category !== lastCategory) {
        rows.push(<ProductCategoryRow key={product.category} category={product.category}/>)
      }
      rows.push(<ProductRow {...product} key={product.name}/>)
      /*
        JSX:
        Original:
        rows.push(<ProductRow this.props.name={product.name} this.props.price={product.price} key={product.name}/>)
        or rows.push(<ProductRow this.props.product={proudct} key={product.name}/>) // but this is not the point of this comment, just saying
        It is verbose to write every props on the component,(especially when you aren't sure which properties will be used later).
        Using JSX spread attributes `{...product}` like this means the properties of the object in are copies onto the component's props
        so you. This is JSX spread attributes, it is similar to ES6 spead operator.
        ES6 Spread:
        ES6 spread operator is similar, but only works for iterables, such as array.
        Examples:
          function myFunction(x, y, z) { }
          var args = [0, 1, 2];
          myFunction(...args);

          var parts = ['shoulders', 'knees'];
          var lyrics = ['head', ...parts, 'and', 'toes'];

        ES6 Rest:
        ES6 rest operator looks like the same as spread operators with ..., but it is used where you want to compress elements:
        const [x, ...y] = ['a', 'b', 'c']; // x='a'; y=['b', 'c']

        So basically, spread operator is where you want to 'unzip' elements, rest operator is where you want to 'zip' data.
      */
      lastCategory = product.category;
    })
    return(
      <table>
        <ProductTableColumn changeOrder={this.props.changeOrder}/>
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
    /*
      Identify the minimal representation of UI state
      1. is it passed in from a parent via props
      2. does it remain unchanged over time
      3. can you compute it based on other state or props
    */
    this.state = {
      filterText: '',
      inStockOnly: false,
      order: 'aescend'
    }
    this.updateFilterText = this.updateFilterText.bind(this);
    this.updateInStock = this.updateInStock.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
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

  changeOrder() {
    this.setState({
      order: this.state.order === 'aescend' ? 'descend' : 'aescend'
    })
  }

  render() {
  /*
    Break UI into a component hierarchy
  */
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
          order={this.state.order}
          changeOrder={this.changeOrder}
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
