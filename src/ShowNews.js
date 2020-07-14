import React,{Component} from "react"
import {StyleSheet,View,RefreshControl,ScrollView,Text} from "react-native"
import Card from "./Card"
import Loading from "./Loading"
import {WebView} from "react-native-webview"
import Modal from "react-native-modal"
import { TouchableHighlight } from 'react-native';

export default class ShowNews extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            modalVisible:false,
            refreshing:false
        }
        this.newData=[]

        let source =this.props.navigation.getParam('source','null').toLowerCase()
        console.log(source)


        var url1='https://newsapi.org/v2/top-headlines?sources='+source+'&sortBy=relevancy&apiKey=<YOUR API KEY HERE>'
        var req = new Request(url1);
        
        fetch(req)
        .then(response => response.json())
        .then(data => {
          this.setState({data: data})
          this.newData.push(data)
          //console.log(this.state.data)
          
         // this.state.data.articles[18].author
         console.log(this.newData)
         
        // console.log(this.newData[0].articles[0].author)
        // console.log(this.state.data.articles[18].author)
        this.setState({flag:true})
        })
    }

    _onRefresh=()=>{
      this.newData=[]
      this.setState({data:[]})
      let source =this.props.navigation.getParam('source','null').toLowerCase()
      console.log(source)


      var url1='https://newsapi.org/v2/top-headlines?sources='+source+'&sortBy=relevancy&apiKey=<YOUR API KEY HERE>'
      var req = new Request(url1);
      this.setState({refreshing:true})
      fetch(req)
      .then(response => response.json())
      .then(data => {
        this.setState({data: data})
        this.newData.push(data)
        //console.log(this.state.data)
        
       // this.state.data.articles[18].author
       console.log(this.newData)
       
      // console.log(this.newData[0].articles[0].author)
      // console.log(this.state.data.articles[18].author)
      this.setState({flag:true})
      }).then(()=>{
        this.setState({refreshing:false})
      })
      
    }
    showModal(visible){
        this.setState({
          modalVisible:visible
        })
      }
      setUrl(url){
        this.setState({
          url:url
        })
      }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'black'}}>
            <View style={{height:50,width:"100%",backgroundColor:"#262833",alignContent:'flex-start'}}>
          <Text style={{color:"white",fontSize:22,paddingTop:10}}>Trending News on {this.props.navigation.getParam('name','null')}</Text>
        </View>
            <ScrollView 
            refreshControl={
        <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}/>
      }
            contentContainerStyle={{backgroundColor:'rbg(214,214,214)'}}>
            {this.newData.map((article,index)=>
          (
            article.articles.map((newart,index)=>
           <TouchableHighlight key={index} onPress={this.showModal.bind(this,!this.state.modalVisible)} onPressIn={this.setUrl.bind(this,newart.url)}>
            <Card 
            title={newart.title}
            author={newart.author} 
            url={newart.url} 
            urlToImage={newart.urlToImage}
            date={newart.publishedAt} 
            key={index}></Card>
           </TouchableHighlight>
    
            )
          ))
          }
            </ScrollView>
            <Modal isVisible={this.state.modalVisible} 
        onBackButtonPress={this.showModal.bind(this,!this.state.modalVisible)} 
        onBackdropPress={this.showModal.bind(this,!this.state.modalVisible)}>
          
            <WebView source={{uri:this.state.url}} 
            startInLoadingState={true}
            renderLoading={()=><Loading/>}
            >          
            </WebView>
          
        </Modal>
          </View>
        )
    }
}