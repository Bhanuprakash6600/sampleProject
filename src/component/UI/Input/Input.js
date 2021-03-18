import React from 'react';
import classes from './Input.module.css';
const Input=(props)=>{

    let InputElement=null;
    const inputclasses =[classes.InputElement]
        if(props.invalid && props.shouldValidation){
            inputclasses.push(classes.invalid);
        }
    switch(props.elementType){
        case ('input'):
            InputElement=<input 
            className={inputclasses.join('')}
            {...props.elementConfig} value={props.value}
            onChange={props.changed}/>;
            break;
            case('Textarea'):
            InputElement=<textarea className={classes.InputElement}{...props.elementConfig} value={props.value}
            onChange={props.changed}/>;
            break;
            case('select'):
            InputElement=(
            <select
             className={classes.InputElement} 
             value={props.value} 
             onChange={props.changed}> 
               {props. elementConfig.options.map(option=>(
                   
                   <option key={option.value} value={option.value}>
    
                       {option.displayValue}
                   </option>
               ))}

             </select>);
     
            
            default:
                InputElement=<input className={inputclasses} {...props.elementConfig} value={props.value}/>;

        }

    
    return(
    <div className={classes.InputElement}>
        <label className={classes.Label}> {props.label}</label>
        {InputElement}

    </div>);
};

export default Input;