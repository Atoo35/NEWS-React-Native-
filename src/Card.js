import React,{Component} from 'react'
import { Dimensions } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    Linking,
    Image} from 'react-native'
import {WebView} from "react-native-webview"
export default class Card extends Component{
    constructor(props){
        super(props)
        this.state={
            showWebView:false
        }
    }
    datePosted(datePosted,author){
        if(author==null || author.startsWith("http"))
        author=''
        const words=datePosted.split('T')
        return(words[0]+' '+author)
    }
    showWebView(url){
        return <WebView source={{uri:url}}/>
    }
    render(){
        return(
            <View style={styles.card}>
                <View style={{flex:1,flexDirection:'column',justifyContent:"center",alignItems:"center"}}>
                   
                    <View style={{flex:3}}>
                    <Image
                        style={{flex:1,height:120,width:Dimensions.get('window').width*0.95,resizeMode:'cover'}}
                        source={{uri:this.props.urlToImage}}></Image>
                    </View>
                    
                    <View style={{flex:1}}>
                    <ScrollView style={{flex:1,alignContent:'flex-start'}} nestedScrollEnabled={true}>
                    <Text style={{flex:1,fontSize:18,color:'rgba(220,220,220,1)',fontWeight:"bold"}}>
                        {this.props.title}
                    </Text>
                    <Text style={{flex:1,fontSize:10,color:'grey',}}>{this.datePosted(this.props.date,this.props.author)}</Text>
                    </ScrollView>
                    </View>
                </View>
               
            </View>
        );
    }
}
const styles=StyleSheet.create({
    card:{
        //  flex:1,
        // flexDirection:'column',
        // width:"70%",
        padding:0,
        paddingBottom:0,
        paddingEnd:0,
        // alignItems:"flex-start",
        justifyContent:'center',
        // height:"25%",
        // borderRadius:20,
        backgroundColor:'#202020',
        borderWidth:0.8,
        borderColor:'black',
        margin:10,
        elevation:10
      }
});