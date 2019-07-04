import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View } from 'react-native';
import { CardSection, Card, Button, Input, Header, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', Password: '', error: '', loading: false };
    onButtonPress() {
        const { email, Password } = this.state;
        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, Password).then(
            this.onLoginSuccess.bind(this)
        ).catch(
            () => {
                firebase.auth().createUserWithEmailAndPassword(email, Password).then(
                    this.onLoginSuccess.bind(this)
                ).catch(
                 this.onLoginFail.bind(this)
                );
            }
        );
    }
    onLoginFail() {
        this.setState({ error: 'Authentication Failed!', loading: false });
    }
    onLoginSuccess() {
        this.setState({
            email: '',
            Password: '',
            error: '',
            loading: false
        });
    }
    renderButton() {
          if (this.state.loading) {
            return <Spinner size={'small'} />;
          }
            return <Button buttonClickEvent={this.onButtonPress.bind(this)}> Log In</Button>;
    }
    render() {
        return (
            <View>
            <Header headerText={'Authentication!'} />
            <Card>
            <CardSection>
                <Input
                label={'Email'} 
                placeholder={'abc@gmail.com'}
                onChangeText={email => this.setState({ email })} 
                value={this.state.text} 
                />
            </CardSection>
            <CardSection >
                <Input
                placeholder={'password'}
                label={'Password'} 
                secureTextEntry
                onChangeText={Password => this.setState({ Password })} 
                value={this.state.text} 
                />
                </CardSection>
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            <CardSection>
                {this.renderButton()}
            </CardSection>
            </Card>
            </View>
        );
    }
    
}
const styles = {
    errorTextStyle: {
        fontSize: 20,
        color: 'red',
        alignSelf: 'center'
    }
};

export default LoginForm;
