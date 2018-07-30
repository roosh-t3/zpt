import React, {Component} from 'react';
import {connect} from 'react-redux'
import './ChatArea.css';
import {Image, List} from 'semantic-ui-react';

class ChatArea extends Component {

    componentDidUpdate() {
        let objDiv = document.getElementsByClassName("chat_area")[0];
        objDiv.scrollTop = objDiv.scrollHeight;
    }


    render() {
        return (
            <div className="chat_area">
                <div className="chat_area_wrapper">

                    <List verticalAlign='middle'>
                        {
                            this.props.messages.map((x, i) => {


                                if(x.type === 0){
                                    return (
                                        <List.Item key={i}>
                                            <List.Content floated='right'>
                                                {x.message} &nbsp;&nbsp;
                                                <Image avatar src={`https://api.adorable.io/avatars/127/${x.username}.png`}/>
                                            </List.Content>
                                        </List.Item>
                                    )
                                } else {
                                    return (
                                        <List.Item key={i}>
                                            <List.Content floated='left'>
                                                <Image avatar src={`https://api.adorable.io/avatars/127/${x.username}.png`}/>
                                                &nbsp;&nbsp; {x.message}
                                            </List.Content>
                                        </List.Item>
                                    )
                                }


                            })
                        }

                    </List>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        messages: state.messages,
        user: state.user,
        chatUser: state.chatUser
    };
};
export default connect(mapStateToProps, null)(ChatArea);


