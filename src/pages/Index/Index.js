import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
    Grid, Segment, Message, Label,
    Button, Form, Header, Input
} from 'semantic-ui-react'
import './Index.css';
import * as actions from '../../store/actions/actions'

class Index extends Component {
    state = {
        username: {
            value: "",
            touched: false,
            valid: false,
            validation: /^[a-z_0-9]{3,}[^-!$%^&*()_+|~=`{}\]\[:";'<>?,.\/]$/,
        },
        validForm: false,
    };

    validateInput = (validation, value) => {
        return validation.test(value);
    };

    loginHandler = event => {
        event.preventDefault();



        if (this.state.username.valid === true) {
            this.props.onLogin(this.state.username.value);
        } else {
            const updatedUsername = {
                ...this.state.username
            };

            updatedUsername.touched = true;

            this.setState({
                username: updatedUsername
            })
        }
    };

    keyPressHandler = (event) => {
        if(event.charCode === 13){
            this.loginHandler(event);
        }
    };


    changeHandler = event => {
        const updatedUsername = {
            ...this.state.username
        };
        updatedUsername.value = event.target.value;
        updatedUsername.touched = true;
        updatedUsername.valid = this.validateInput(updatedUsername.validation, updatedUsername.value);


        this.setState({
            username: updatedUsername,
        })
    };

    render() {

        let authRedirect = null;
        if (this.props.user !== null) {
            authRedirect = <Redirect to='/chat'/>
        }

        return (
            <Fragment>
                {authRedirect}
                <Grid centered verticalAlign='middle' className='grid-x'>
                    <Grid.Column className='column-x'>
                        <Header as='h2' color='orange'>
                            <div className="content">
                                Log-in to have fun
                            </div>
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Field error={this.state.username.touched && !this.state.username.valid}>
                                    <Input icon='user' name="name" iconPosition='left'
                                           placeholder='Your username (Only alphanumeric and _ allowed)'
                                           onChange={this.changeHandler} onKeyPress={this.keyPressHandler}/>

                                    {
                                        (() => {
                                            if (this.state.username.touched && !this.state.username.valid) {
                                                return (<Label basic pointing className='basicColor' active={true}>
                                                    Please enter a valid username
                                                </Label>);
                                            }

                                        })()
                                    }
                                </Form.Field>

                                <Button onClick={this.loginHandler} loading={this.props.loading} color='orange'
                                        size='large' fluid disabled={!this.state.username.valid}>Login</Button>
                            </Segment>
                            <Message error/>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        loading: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (username) => dispatch(actions.login(username)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);