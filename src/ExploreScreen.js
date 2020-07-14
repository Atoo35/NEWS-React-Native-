import React,{Component} from 'react';
import {TextInput,View,ScrollView,Text,Keyboard,RefreshControl } from 'react-native';
import Card from "./Card"
import Loading from "./Loading"
import {WebView} from "react-native-webview"
import {Dropdown} from "react-native-material-dropdown"
import { TouchableWithoutFeedback} from 'react-native';
import Modal from "react-native-modal"
import Icon from "react-native-vector-icons/Ionicons"

export default class ExploreScreen extends Component{
  
    constructor(props){
      super(props)
      this.state={
        search:'',
        flag:false,
        flag1:false,
        searchBarFocused:false,
        modalVisible:false,
        url:null,
        filters:false,
        language:'en',
        typeofNews:'everything',
        category:'general',
        refreshing:false
      }
      this.newData = [];
      screenProps=this.props
    }
    getNews(){
      this.setState({
        data:[]
      })
      if(this.state.search=='')
      var search='headlines'
      else
      search=this.state.search
      this.newData=[]
      if(this.state.typeofNews=='everything'){
      var url = 'https://newsapi.org/v2/'+this.state.typeofNews+
            '?q='+search+'&' +
            'sortBy=popularity&language=' +this.state.language+
            '&apiKey=<YOUR API KEY HERE>';
      }
      else{
        var url = 'https://newsapi.org/v2/'+this.state.typeofNews+
            '?q='+this.state.search+'&' +
            'sortBy=popularity&category=' +this.state.category+
            '&apiKey=<YOUR API KEY HERE>';
      }
     
            
  var req = new Request(url);
  
  fetch(req)
      .then(response =>response.json()) 
      .then(data=>{
        this.setState({data: data})
        this.newData.push(data)
        console.log(this.newData)
        this.setState({flag:true})
        if(this.newData[0].articles.length===0){
            this.setState({flag:false})
            this.setState({flag1:true})
        }
      })
    }
    _onRefresh=()=>{
      this.setState({
        data:[]
      })
      this.newData=[]
      if(this.state.typeofNews=='everything'){
      var url = 'https://newsapi.org/v2/'+this.state.typeofNews+
            '?q='+this.state.search+'&' +
            'sortBy=popularity&language=' +this.state.language+
            '&apiKey=<YOUR API KEY HERE>';
      }
      else{
        var url = 'https://newsapi.org/v2/'+this.state.typeofNews+
            '?q='+this.state.search+'&' +
            'sortBy=popularity&category=' +this.state.category+
            '&apiKey=<YOUR API KEY HERE>';
      }
     
            
  var req = new Request(url);
      this.setState({refreshing:true})
      fetch(req)
      .then(response =>response.json()) 
      .then(data=>{
        this.setState({data: data})
        this.newData.push(data)
        console.log(this.newData)
        this.setState({flag:true})
        if(this.newData[0].articles.length===0){
            this.setState({flag:false})
            this.setState({flag1:true})
        }
      }).then(()=>{
        this.setState({refreshing:false})
      })
    }
    componentDidMount(){
      this.keyboardDidShow=Keyboard.addListener(
        'keyboardDidShow',this.keyboardDidShow.bind(this)
      );
      this.keyboardWillShow=Keyboard.addListener(
        'keyboardWillShow',this.keyboardWillShow.bind(this)
      );
      this.keyboardDidHide=Keyboard.addListener(
        'keyboardDidHide',this.keyboardDidHide.bind(this)
      );
      
    }
    keyboardDidShow(){
      this.setState({
        searchBarFocused:true
      })
    }
    
    keyboardWillShow(){
      this.setState({
        searchBarFocused:true
      })
    }
    keyboardDidHide(){
      this.setState({
        searchBarFocused:false
      })
    }
   
    showFilters(visible){
      this.setState({
        filters:visible
      })
      if(!visible)
      this.getNews()
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
     let languageData=[{value:'en',},{value:'fr',},{value:'ru',},{value:'ar',},{value:'de',},
                   {value:'he',},{value:'it',},{value:'nl',},{value:'no',},{value:'pt',},{value:'se',}
                   ,{value:'ud',},{value:'zh',}]

     let typeofNews=[{value:'everything'},{value:'top-headlines'}]

     let category=[{value:'general'},{value:'business'},{value:'entertainment'},{value:'health'},
                   {value:'science'},{value:'sports'},{value:'technology'}]
      return(
        <View style={{flex:1,backgroundColor:'black',}}>
           <View 
            style={{
              height:80,
              justifyContent:"center",
              paddingHorizontal:5
            }}>
            
              <View style={{
                height:50,
                backgroundColor:'white',
                flexDirection:"row",
                padding:5,
                alignItems:"center",
                borderWidth:0.3,
                borderColor:'gray',
                borderRadius:20,
                elevation:10
                }}>
              <Icon name={this.state.searchBarFocused?"md-arrow-back":"ios-search"} style={{fontSize:25,color:"gray"}}/>
            <TextInput placeholder="Search" 
            style={{flex:1,fontSize:15,paddingLeft:15}} 
            onChangeText={(text)=>this.setState({search:text})}
            value={this.state.search}
            onSubmitEditing={this.getNews.bind(this)}
            />
            <TouchableWithoutFeedback onPress={this.showFilters.bind(this,!this.state.filters)}>
            <View><Icon name={"ios-options"} style={{fontSize:25,color:"gray",marginRight:10}}/></View>
            </TouchableWithoutFeedback>  

              </View>
            </View>
            {this.state.flag? <ScrollView 
      // refreshControl={
      //   <RefreshControl
      //   refreshing={this.state.refreshing}
      //   onRefresh={this._onRefresh}/>
      // }
    
      contentContainerStyle={{flexDriection:'row',backgroundColor:'black'}}>
       {this.newData.map((article,index)=>
        (
          article.articles.map((newart,index)=>
         <TouchableWithoutFeedback key={index} onPress={this.showModal.bind(this,!this.state.modalVisible)} onPressIn={this.setUrl.bind(this,newart.url)}>
          <View>
         <Card 
          title={newart.title}
          author={newart.author} 
          url={newart.url} 
          urlToImage={newart.urlToImage}
          date={newart.publishedAt} 
          key={index}></Card>   
          </View>
         </TouchableWithoutFeedback>
  
          )
        ))
        }
        
         
      </ScrollView>: <View style={{flex:1,alignItems:"center",justifyContent:"center",marginBottom:50}}>
            <Icon name={"ios-filing"} style={{color:'rgba(220,220,220,0.8)',fontSize:250}} />
            <Text style={{color:'rgba(220,220,220,0.8)',fontSize:20}}>Seems like there's nothing to search..</Text>
            </View>}
           
     
      <Modal isVisible={this.state.modalVisible} 
      onBackButtonPress={this.showModal.bind(this,!this.state.modalVisible)} 
      onBackdropPress={this.showModal.bind(this,!this.state.modalVisible)}>
        
          <WebView source={{uri:this.state.url}} 
          startInLoadingState={true}
          renderLoading={()=><Loading/>}
          >          
          </WebView>
        
      </Modal>
      <Modal isVisible={this.state.filters} style={{alignItems:"center",justifyContent:"center"}}
      onBackButtonPress={this.showFilters.bind(this,!this.state.filters)} 
      onBackdropPress={this.showFilters.bind(this,!this.state.filters)}>
      <View style={{padding:20,backgroundColor:'white',width:"75%",borderRadius:20}}>
       <Dropdown
      
      label='Type of news'
      data={typeofNews}
       onChangeText={(value)=>this.setState({typeofNews:value})}
       value={this.state.typeofNews}
      />
      {this.state.typeofNews!='top-headlines'?<Dropdown
     
      label='Language'
      data={languageData}
       onChangeText={(value)=>this.setState({language:value})}
       value={this.state.language}
      />:<Dropdown
     
      label='Category'
      data={category}
       onChangeText={(value)=>this.setState({category:value})}
       value={this.state.category}
      />
      }
      
        <View style={{flex:1,alignSelf:"flex-end",paddingRight:20,marginBottom:10,marginTop:10}}>
        
          <Text onPress={this.showFilters.bind(this,!this.state.filters)} style={{color:"black"}}>OK</Text>
        
        </View>  
       
      </View>
    
      </Modal>
      </View>
      )
    }
  }