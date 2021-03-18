import React from 'react';
import Burgerlogo from '../../src/assests/burger-logo.png';
import classes from './logo.module.css';

const Logo =(props) => (
    <div className={classes.Logo} style={{height: props.height}}>
       <img src={Burgerlogo} alt="My burger"/>
    </div>
);

export default Logo;