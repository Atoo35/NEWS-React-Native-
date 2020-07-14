import React,{Component} from 'react';
import { StyleSheet, Text, TextInput,View,ScrollView,TouchableHighlight,Keyboard } from 'react-native';
import {EatBeanLoader,NineCubesLoader} from "react-native-indicator"

export default class Loading extends Component{
    render(){
        return(
            <View style={{flex:1,alignItems:"center",marginBottom:"75%"}}><NineCubesLoader size={40}/></View>
                
            
        )
    }
}