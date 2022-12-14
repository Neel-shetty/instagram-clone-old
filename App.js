import { StatusBar } from 'expo-status-bar';
//import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import { View, Text } from 'react-native';
import * as firebase from 'firebase'
import { Provider } from 'react-redux';
import { configureStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ,
  appId: "",
  measurementId: ""
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

//import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import MainScreen from './components/Main'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
      
    })
  }

  render() {
    const {loggedIn, loaded} = this.state
    if(!loaded){
      return(
        <View style={{flex:1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return(
      <Provider store={store}>
        <MainScreen/>
      </Provider>
      
    )
    
  }
}

export default App


/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
