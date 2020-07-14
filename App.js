import React,{Component} from 'react';
import {View,Text,StyleSheet,StatusBar} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import HomeScreen from "./src/HomeScreen"
import ExploreScreen from "./src/ExploreScreen"
import Sources from "./src/Sources"
import {createAppContainer, NavigationEvents} from "react-navigation"
import {createBottomTabNavigator,createMaterialTopTabNavigator} from "react-navigation-tabs"
import {createStackNavigator} from "react-navigation-stack"
import GridSearch from './src/GridSearch';
import ShowNews from "./src/ShowNews"
import {AnimatedCircleBarComponent, withCustomStyle} from "react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent"
export default class App extends Component {

  
 
  render(){
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor("#262823");
    return (
    <AppContainer style={{flex:1,paddingTop:StatusBar.height}}/>
  );
    }
}

const stackNavigator =createStackNavigator(
  {
    Home:{
     screen:GridSearch,
     navigationOptions:{
      // title:'Home',
      headerTitle:'HEHE',
    }
     
    },
    // GridSearch:GridSearch,
    Sources:Sources,
    ShowNews:ShowNews,
   
  },
  {
    initialRouteName:'Home',
     headerMode:"screen",
    defaultNavigationOptions:{
      headerShown:false,
      headerStyle:{
        backgroundColor:'white',
        
      },
      headerTitleStyle:{
        fontWeight:"bold"
      }
    }
    
  },
)

const bottomTabNavigator= createBottomTabNavigator({
  Home: {
    screen:HomeScreen,
    
    navigationOptions:{
      
      tabBarIcon:({tintColor})=>(
        <Icon name="ios-home" color={'rgba(220,220,220,1)'} size={25}/>
      )
      
    }
  },
  Sources: {
    screen:stackNavigator,
    
    navigationOptions:{
      
      tabBarIcon:({tintColor})=>(
        <Icon name="ios-grid" color={'rgba(220,220,220,1)'} size={25}/>
      )
    }
    
  },
  Explore: {
    screen:ExploreScreen,
    navigationOptions:{
      tabBarIcon:({tintColor})=>(
        <Icon name="ios-search" color={'rgba(220,220,220,1)'} size={25}/>
      )
    }
    
    
  },
  
},
{
  initialRouteName:'Home',
 
  tabBarComponent: AnimatedCircleBarComponent,
  // withCustomStyle({
  //   activeTintColor:'black',
  //   inactiveTintColor:'grey',
  //   labelStyle:0,
  //   style:{
     
  //   allowFontScaling:true,
    
  //   }
  // })(FlexibleTabBarComponent),
  
  tabBarOptions:{
    // activeTintColor:'#262833',
    // inactiveTintColor:'grey',
    // allowFontScaling:true,
    // showLabel:false,
    // labelStyle:{
    //   fontSize:10,
    //   fontWeight:"bold"
    // },
    style:{
       backgroundColor:'#262833',
      alignItems:"center",
      justifyContent:"center",
      height:56
    },
  }
}
)
const AppContainer = createAppContainer(bottomTabNavigator)