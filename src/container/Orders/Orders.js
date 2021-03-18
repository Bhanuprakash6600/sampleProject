import React, { Component } from 'react';
//import Orders from '../../../../Downloads/routing-burger--03-finished/routing-burger--03-finished/src/containers/Orders/Orders';
import Order from '../../component/order/Order';
import axios from '../../axios.order';
import  withErrorHalder from '../../withErrorHandler/withErrorHandler';
class Orders extends Component{
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
}
export default  withErrorHalder(Orders ,axios);