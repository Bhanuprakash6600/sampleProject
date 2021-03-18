import React, { Component } from 'react';

import Button from '../../component/UI/Button/Button';
import Spring from '../../component/UI/Spring/Spring';
import classes from './ContactData.module.css';
import axios from '../../axios.order';
import Input from '../../component/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm:{
            name:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your name'
                },
                value:"",
                validation :{
                    required :true

                },
                valid :false
            },
               street: {
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your street'
                },                
                value:"",
                validation :{
                    required :true

                },
                valid :false
            },
                    zipCode: {
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'ZIP code'
                        },
                        
                value:"",
                validation :{
                    required :true,
                    minLength :5,
                    maxLength :5

                },
                valid :false
                    },
                    country: {
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'your Country'
                        },
                       
                value:"",
                validation :{
                    required :true

                },
                valid :false
                    },
               
                email: {
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'your E-mail'
                    },
                   
                value:"",
                validation :{
                    required :true

                },
                valid :false
                },
           
            deliveryMethod: {
                elementType: 'select',
                elementConfig:
                {
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'cheapest'}

                    ]
                },
                value:""
            }
        },
        
        loading: false
        }
           
       
     

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData ={};
        for(let formElemetIdentifier in this.state.orderForm){
            formData[formElemetIdentifier] = this.state.orderForm[formElemetIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData:formData
           
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    checkValidity(value, rules){
        let isValid = false;
        if(rules.required){
            isValid =  value.trim() !== '' &&isValid
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength&& isValid

        }
        
        if(rules.maxLength){
            isValid=value.length<=rules.maxLength && isValid

        }
        return isValid;
    } 
inputchangehalger= (event ,inputidentifer) =>{
    const updatedorderform={
             ...this.state.orderForm
    };
    const updatedorderElement={
        ...updatedorderform[inputidentifer]
    };
    updatedorderElement.value=event.target.value;
    updatedorderElement.valid=this.checkValidity(updatedorderElement.value,updatedorderElement.validation);
    console.log(updatedorderElement); 
    updatedorderform[inputidentifer]=updatedorderElement;
    this.setState({orderForm:updatedorderform})

}
    render () {
        const formElementArray =[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form on onSubmit={this.orderHandler}>
              
                {formElementArray.map(formElement=>(
                    <Input
                    key={formElement.id}
                     elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                   shouldValidation={formElement.config.validation}
                    changed={(event)=>this.inputchangehalger(event,formElement.id)}/>
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spring />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;