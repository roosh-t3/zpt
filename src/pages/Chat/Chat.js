import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux'
import {Grid, Image, List, Icon, Menu,
    Button, Form, Message, Input} from 'semantic-ui-react'
import ChatArea from '../../components/ChatArea/ChatArea';
import UserList from '../../components/UserList/UserList';
import * as actions from '../../store/actions/actions'
import './Chat.css';


class Chat extends Component {
    state = {
        chat: {
            value: "",
            touched: false,
            valid: false,
            validation: /.+/
        },
    };

    componentDidMount(){
        this.props.onFetchUsers();
    }

    validateInput = (validation, value) => {
        return validation.test(value);
    };

    keyPressHandler = (event) => {
        if(event.charCode === 13){
            this.chatHandler(event);
        }
    };

    chatHandler = event => {
        event.preventDefault();

        if (this.state.chat.valid === true) {

            const messageObj = {
                user: this.props.user,
                chatUser: this.props.chatUser,
                message: this.state.chat.value,
            };

            const updatedChat = {
                ...this.state.chat
            };
            updatedChat.value = '';
            updatedChat.touched = false;
            updatedChat.valid = false;


            this.setState({
                chat: updatedChat,
            });


            this.props.onChatSend(messageObj);



        } else {
            const updatedChat = {
                ...this.state.chat
            };

            updatedChat.touched = true;

            this.setState({
                chat: updatedChat
            })
        }
    };

    logoutHandler = (event) => {
        event.preventDefault();

        this.props.onLogout(this.props.user);
    };

    changeHandler = event => {
        const updatedChat = {
            ...this.state.chat
        };
        updatedChat.value = event.target.value;
        updatedChat.touched = true;
        updatedChat.valid = this.validateInput(updatedChat.validation, updatedChat.value);


        this.setState({
            chat: updatedChat,
        })
    };

    selectHandler = (user, event) => {
        this.props.onSelectUser(user);
    };

    render(){

        let chat = null;

        if(this.props.chatUser !== null){
            chat = (<div className='chat_area_holder'>
                <ChatArea />
                <Form.Field error={this.state.chat.touched && !this.state.chat.valid}>
                    <Input icon={<Icon name='send' circular link onClick={this.chatHandler} />} size='large' onChange={this.changeHandler} onKeyPress={this.keyPressHandler} loading={this.props.msgLoading} placeholder='Say something...' className='send_chat' value={this.state.chat.value}/>
                </Form.Field>
            </div>)
        } else {
            chat = (
                <div className='chat_area_holder'>
                <Message color='brown'>
                    <p>
                        Select one user from right bar to start the chat.
                    </p>
                </Message>
                </div>
            );
        }

        return (
            <Fragment>
                <Menu pointing secondary>
                    <Menu.Item name='home' active={true}/>
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            onClick={this.logoutHandler}
                        />
                    </Menu.Menu>
                </Menu>
                <Grid>
                    <Grid.Column width={12}>
                        {chat}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <UserList select={this.selectHandler} users={this.props.users} chatUser={this.props.chatUser} />
                    </Grid.Column>
                </Grid>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        users: state.users,
        user: state.user,
        messages: state.messages,
        chatUser: state.chatUser,
        msgLoading: state.messageSendLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch( actions.fetchUsers() ),
        onLogout: (user) => dispatch( actions.logout(user) ),
        onChatSend: (content) => dispatch( actions.sendMessage(content) ),
        onSelectUser: (user) => dispatch ( actions.initiateChat(user) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);