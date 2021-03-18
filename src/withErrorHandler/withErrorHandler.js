import { render } from '@testing-library/react';
import React ,{Component} from 'react';
import AUXJ from '../../src/hoc/AUXJ';
import Modal from '../component/UI/Modal/Modal';

const withErrorHalder =(Wrappedcomponent ,axios) =>{
    return class extends Component{
        state={
            error:null
        }
        componentDidUpdate(){
            axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
                    });
            axios.interceptors.response.use(res =>res ,error=>{
                this.setState({error:error});
                    });
        }

        errorConfirmeedHandler  =() =>{
            this.setState({error: null})
        }
        render(){
            return(
                <AUXJ> 
                    <Modal show={this.state.error}
                    modalClosed={this.errorConfirmeedHandler}>
                        {this.state.error ? this.state.error.message: null}</Modal>      
                         <Wrappedcomponent {...this.props}/>
                         </AUXJ>
    
            );
        }
        
        

    }

}  

export default withErrorHalder;