import React ,{Component}from 'react';
import AUXJ from '../../hoc/AUXJ';
import SideDrawer from '../../SideDrawer/SideDrawer';
import classes from './Layout.module.css';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <AUXJ>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </AUXJ>
        )
    }
}

export default Layout;