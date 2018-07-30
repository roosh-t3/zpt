import React, {Component} from 'react';
import './UserList.css';
import {Image, List} from 'semantic-ui-react';

const UserList = (props) => (
    <List divided selection animated verticalAlign='middle'>
        {props.users.map( (user) => {
            return (
                <List.Item
                    className={props.chatUser !== null && props.chatUser.username === user.username
                        ? 'selected_user' : ''} key={user.id}
                    onClick={(event) => { props.select(user, event) }}>

                    <Image avatar src={`https://api.adorable.io/avatars/127/${user.username}.png`} />
                    <List.Content>
                        <List.Header>{user.username}</List.Header>
                    </List.Content>
                </List.Item>
            )
        })}
    </List>
);

export default UserList



