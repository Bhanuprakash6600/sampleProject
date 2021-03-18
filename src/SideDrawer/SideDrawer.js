import React from 'react';
import Logo from '../../src/Logo/logo';
import NavigationItem from '../NavigationItems/NavigationItem';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../component/UI/Backdrop/Backddrop';
import AUXJ from '../../src/hoc/AUXJ';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <AUXJ>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </AUXJ>
    );
};

export default sideDrawer;