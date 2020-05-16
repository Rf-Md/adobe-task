import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CartItem from './CartItem';

import './cart.css'


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: this.props.cartList.length > 0 ? this.props.cartList : []
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let newState = { ...prevState };

    //Vishnu --TODO
    if (nextProps.cartList.length !== newState.length) {
      return {
        cartList: nextProps.cartList
      }
    } else return newState
  }


  updateItem = (item) => {
    let cartList = [...this.state.cartList]
    let index = cartList.findIndex(i => (i.name === item.name));
    cartList[index] = item
    this.setState({ cartList })
  }

  sumOfActual = _ => {
    let { cartList } = this.state
    var totalPrices = []
    cartList.forEach((i) => { totalPrices.push(parseInt(i.price.actual)) })
    let finalPrice = totalPrices.reduce((total, add) => { return total + add });
    return finalPrice
  }

  sumOfDisplay = _ => {
    let { cartList } = this.state
    var totalPrices = []
    cartList.forEach((i) => { totalPrices.push(parseInt(i.price.display)) })
    let finalPrice = totalPrices.reduce((total, add) => { return total + add });
    return finalPrice
  }

  sumOfDiscount = _ => {
    return this.sumOfDisplay() - this.sumOfActual()
  }

  render() {
    let { cartList } = this.state
    let cartListToDisplay
    if (cartList.length > 0) {
      cartListToDisplay = cartList.map((item, index) =>
        <div id={index} key={index} className={'product-details'}>
          <CartItem updateItem={this.updateItem} item={item} ></CartItem>
        </div>
      );
    }
    return (
      <Fragment>
        {cartList.length > 0 ? cartListToDisplay : 'No Items in the cart'}
        <div className='price-details-wrapper'>
          <span><b>Price Details</b></span>
          <hr></hr>
          <span>Price ({cartList.length} items) :&#x20b9; {cartList.length ? this.sumOfDisplay() : 0} </span>
          <span>Discount :&#x20b9; {cartList.length ? this.sumOfDiscount() : 0}</span>
          <hr></hr>
          <span><b>Total Payable : &#x20b9; {cartList.length ? this.sumOfActual() : 0}</b></span>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cartList: state.cartList.cartList

});

const mapDispatchToProps = {
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cart)
);

