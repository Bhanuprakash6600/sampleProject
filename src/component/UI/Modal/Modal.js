import React, { Component } from 'react';
import classes from './Modal.module.css'
import Backdrop from '../../UI/Backdrop/Backddrop';
import AUXJ from '../../../hoc/AUXJ';

class modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
       return nextProps.show !== this.props.show || nextProps.children !==this.props.children;
    }

    componentDidUpdate(){
        console.log('[modal] willUpdate');
    }
    render(){
        return(<AUXJ>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                {this.props.children}
            </div>
        </AUXJ>
    );
    }
}

export default modal;