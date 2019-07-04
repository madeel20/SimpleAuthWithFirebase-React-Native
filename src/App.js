import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
    state = { loggedIn: null };
       componentWillMount() {
            firebase.initializeApp({
                apiKey: 'AIzaSyBVFCC_QsmpCRD1EKG_BjW2NyoY6Kkfw-Y',
                authDomain: 'firstapp-3cb1c.firebaseapp.com',
                databaseURL: 'https://firstapp-3cb1c.firebaseio.com',
                projectId: 'firstapp-3cb1c',
                storageBucket: 'firstapp-3cb1c.appspot.com',
                messagingSenderId: '855405306828'
              });  
              firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.setState({ loggedIn: true });
                } else {
                    this.setState({ loggedIn: false });
                }
              });
       }
       renderContent() {
           switch (this.state.loggedIn) {
               case true:
               return <CardSection><Button buttonClickEvent={() => firebase.auth().signOut()}> Log Out </Button></CardSection>;
               case false:
               return <LoginForm />;
               default:
               return <View style={styles.mainWrapperStyle}><Spinner size={'large'} /></View>;
           }   
       }
    render() {
        return (
            <View>
                {this.renderContent()}
            </View>
            
        );
    }
}
const styles = {
    mainWrapperStyle: {
        justifyContent: 'center',
        height: 500,
    }
};
export default App;
