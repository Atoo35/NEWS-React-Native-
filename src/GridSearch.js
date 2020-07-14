import React,{Component} from 'react';
import { StyleSheet, Text, TextInput,View,ScrollView,Dimensions,Keyboard,FlatList} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import ABC from "./ABC"
export default class GridSearch extends Component{
    constructor(props){
        super(props)
        this.state = { data: [],
          flag:'false',
          searchKeyword:"",
          showWebView:false,
          url:null,
          text:'null'
          
        }
         this.newData = [];
           this.data=['A','B','C','D','E','F','G','H','I','L','M','N','P','R','S','T','U',
                      'V','W','X','Y']
        //this.bgarr=['#7acc7d','#8ce78d','#e06767','#f37575','rgb(197, 119, 204)','rgb(206, 136, 191)']
        this.bgarr=['rgb(96,166,178)','rgb(157,156,66)','rgb(209,159,71)','rgb(0,99,99)','rgb(245,201,195)','rgb(115,158,203)','rgb(56,237,228)','rgb(99,150,198)','rgb(230,208,100)']
        // this.bgarr[Math.floor(Math.random()*this.bgarr.length)]
       
      }
     
     
          renderButtons(item,index){
            
           return( <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate("Sources",{letter:item})}>
                  <View><ABC name={item} data={this.bgarr}></ABC></View>
                 </TouchableWithoutFeedback>);
          }
          decideItemNum(){
            let width=parseInt(Math.floor(parseInt(Dimensions.get('window').width/100)*100)/115)
            console.log(width)
            return width
          }
      render(){
        return(
          <View style={{flex:1,flexWrap:"wrap",alignItems:'center',justifyContent:"center",backgroundColor:'rgb(45,47,48)'}}>
       <View style={{height:50,width:"100%",backgroundColor:"#262833",alignContent:'center',justifyContent:"center"}}>
          <Text style={{color:"white",fontSize:22,paddingTop:10,paddingLeft:5}}>Sources</Text>
        </View>
        <FlatList 
        style={{padding:10}}
        data={this.data}
        renderItem={({item,index})=>this.renderButtons(item,index)}
        horizontal={false}
        numColumns={this.decideItemNum()}
        >
       
    </FlatList>    
        
        </View>
        
       
        )
      }
}