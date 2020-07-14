import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { TouchableWithoutFeedback} from 'react-native';
import {EatBeanLoader,NineCubesLoader} from "react-native-indicator"
export default class Sources extends Component{
  static navigationOptions={
    title:'Sources',
  }
    constructor(props){
        super(props)
        this.state={
            flag:false,
            data:[],
            letter:null
        }
        this.newData=[]
    }
    componentWillMount(){
        var url1='https://newsapi.org/v2/sources?apiKey=<YOUR API KEY HERE>'
        var req = new Request(url1);
        
        fetch(req)
        .then(response => response.json())
        .then(data => {
          this.setState({data: data})
          this.newData.push(data)
         console.log(this.newData)
        this.setState({flag:true})
        })
        let letter =this.props.navigation.getParam('letter','null').toLowerCase()
       
        this.setState({
            letter:letter
        })
     
    }
    render(){
      return(
        <View style={{flex:1,backgroundColor:'rgb(45,47,48)'}}>
        <View style={{height:50,width:"100%",backgroundColor:"#262833",alignContent:'flex-start'}}>
          <Text style={{color:"white",fontSize:22,paddingTop:10}}>News Channels</Text>
        </View>
        {/* <Text>{this.props.navigation.getParam('letter','null')}</Text> */}
         <ScrollView contentContainerStyle={{backgroundColor:'rgb(45,47,48)',padding:20,marginBottom:50}}>
      
      {this.state.flag?
          this.newData.map((article,index)=>(
            article.sources.filter((source)=> source.id.startsWith(this.state.letter))
            .map((newart,index)=>
            <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate("ShowNews",{source:newart.id,name:newart.name})}>
            <View style={{width:"95%",height:50,flexDirection:"row",marginLeft:10,marginTop:20,backgroundColor:'#262833',elevation:10}}>
           <Text key={index} style={{flex:5,fontSize:20,padding:5,color:'rgba(220,220,220,1)'}}>{newart.name}</Text>
           <Icon name="ios-arrow-forward" style={{flex:1,fontSize:25,color:"rgba(220,220,220,1)",textAlign:"right",marginRight:10,marginTop:10}}></Icon>
           </View>
           </TouchableWithoutFeedback>
            )
        )):<View style={{alignSelf:"center",paddingTop:"50%"}}><NineCubesLoader size={40}/></View>
        
      }
  
      </ScrollView>
        </View>
      )
    }
  }