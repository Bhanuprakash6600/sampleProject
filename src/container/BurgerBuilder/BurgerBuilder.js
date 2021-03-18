import React,{Component} from 'react';
import AUXJ from '../../hoc/AUXJ';
import Burger from '../../component/Burger/Burger';
import classes from '../../component/Burger/Burger.module.css';
import Buildcontrols from '../../component/Burger/Buildcontrols/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios.order';
import Spring from '../.../../../component/UI/Spring/Spring';
import withErrorHalder from '../../withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        Loading:false,
        error :null
    }
    
componentDidMount(){
    axios.get("https://react-my-burger-e2089-default-rtdb.firebaseio.com/ingredients.json")
    .then( response=> {
        this.setState({ingredients:response.data})
    })
    .catch(error =>{
        this.setState({error})
    });
    
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
  
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchasecancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinuesHandler = () => {
       /* this.setState({Loading :true});
        //alert('continues !');
        const order = {
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer :{
                name :"bhanu",
                phone:"7306404577",
                address:{
                    street:"21"

                },
            email:'bhanuprakash321gmail.com'

        },
        delivery:"fast"
    }
        axios.post('/orders.json',order)
        .then( response=> {
            this.setState({Loading:false})
        })
        .catch(error => {
            this.setState({Loading:false})
        })*/
         const queryParams =[];
         for(let i in this.state.ingredients){
             queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]))

         }
         queryParams.push('price='+this.state.totalPrice);
         const queryString =queryParams.join('&')
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString});
}
  

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let ordersummary= null ;
        
        // {salad: true, meat: false, ...}
        let burger =<Spring/>
        if(this.state.ingredients){
            
        burger =(
            <AUXJ>
            <Burger ingredients={this.state.ingredients}/>
            <Buildcontrols
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice} 
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>   
                    </AUXJ>      
            
        );
        ordersummary= <OrderSummary ingredients={this.state.ingredients}
        Price ={this.state.totalPrice}
        purchasecancelled={this.purchaseContinuesHandler}
        purchasecancelled={this.purchaseContinuesHandler}/>;       
        }
        if (this.state.Loading){
            ordersummary= this.state.error ?<p>ingredientAdded is a problem plx check</p>: <Spring/>

        }
                 return (
            <AUXJ>
                <Modal show={this.state.purchasing} modalClosed={this.purchasecancelHandler}>
                    {ordersummary}
                   
                </Modal>
                {burger}
                       </AUXJ>
        );
    }
}

export default withErrorHalder(BurgerBuilder, axios);