import React, { Component } from 'react';
import AUXJ from '../../../hoc/AUXJ';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentDidUpdate(){
        console.log('[OrderSummary] WillUpdate');
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return<li> <span style={{textTranform :'capitalize'}}>{igKey}</span>
             :{this.props.ingredients[igKey]}</li> 
        
    });

        return(<AUXJ>
            <h1>your order</h1>
            <p>a declious burger with following ingredients</p>
            <ul>
             {ingredientSummary}
            </ul>
            <p><strong>Total Price :{this.props.Price.toFixed(2)}</strong></p>
            <p>continue to checkorder??</p>
            <Button btnType="Danger" clicked={this.props.purchasecancelled}>cancel</Button>
            <Button btnType="Success"clicked={this.props.purchasecancelled}>continue</Button>
        </AUXJ>
);
    }

    };


export default OrderSummary;