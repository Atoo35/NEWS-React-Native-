import React,{Component} from 'react';
import { View,ScrollView,RefreshControl,Text, SafeAreaView } from 'react-native';
import Card from "./Card"
import Loading from "./Loading"
import Geolocation from '@react-native-community/geolocation';
import {WebView} from "react-native-webview"
import Modal from "react-native-modal"
import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import {AsyncStorage} from 'react-native';
import {EatBeanLoader,NineCubesLoader} from "react-native-indicator"
export default class HomeScreen extends Component{
  
    constructor(props){
      super(props)
      this.state = { 
        flag:false,
        data:[],
        showWebView:false,
        latitude:null,
        longitude:null,
        location:"us",
        modalVisible:false,
        refreshing:false
        
      }
      this.newData=[]
      this.country={
        "afghanistan"	:	"af",
        "albania"	:	"al",
        "algeria"	:	"dz",
        "american samoa"	:	"as",
        "andorra"	:	"ad",
       " angola"	:	"ao",
        "anguilla"	:	"ai",
        "antarctica"	:	"aq",
        "antigua and barbuda"	:	"ag",
        "argentina"	:	"ar",
        "armenia"	:	"am",
        "aruba"	:	"aw",
        "australia"	:	"au",
        "austria"	:	"at",
        "azerbaijan"	:	"az",
        "bahamas"	:	"bs",
        "bahrain"	:	"bh",
        "bangladesh"	:	"bd",
        "barbados"	:	"bb",
        "belarus"	:	"by",
        "belgium"	:	"be",
        "belize"	:	"bz",
        "benin"	:	"bj",
        "bermuda"	:	"bm",
        "bhutan"	:	"bt",
        "olivia"	:	"bo",
        "bosnia and herzegovina"	:	"ba",
        "botswana"	:	"bw",
        "bouvet island"	:	"bv",
        "brazil"	:	"br",
        "british indian ocean territory"	:	"io",
        "brunei darussalam"	:	"bn",
        "bulgaria"	:	"bg",
        "burkina faso"	:	"bf",
        "burundi"	:	"bi",
        "cambodia"	:	"kh",
        "cameroon"	:	"cm",
        "canada"	:	"ca",
        "cape verde"	:	"cv",
        "cayman islands"	:	"ky",
        "central african republic"	:	"cf",
        "chad"	:	"td",
        "chile"	:	"cl",
        "people's republic of china"	:	"cn",
        "hristmas island"	:	"cx",
        "cocos (keeling) islands"	:	"cc",
        "colombia"	:	"co",
        "comoros"	:	"km",
        "congo"	:	"cg",
        "congo, the democratic republic of"	:	"cd",
        "cook islands"	:	"ck",
        "costa rica"	:	"cr",
        "côte d'ivoire"	:	"ci",
        "croatia"	:	"hr",
        "cuba"	:	"cu",
        "cyprus"	:	"cy",
        "czech republic"	:	"cz",
        "denmark"	:	"dk",
        "djibouti"	:	"dj",
        "dominica"	:	"dm",
        "dominican republic"	:	"do",
        "ecuador"	:	"ec",
        "egypt"	:	"eg",
        "western sahara"	:	"eh",
        "el salvador"	:	"sv",
        "equatorial guinea"	:	"gq",
        "eritrea"	:	"er",
        "estonia"	:	"ee",
        "ethiopia"	:	"et",
        "falkland islands (malvinas)"	:	"fk",
        "aroe islands"	:	"fo",
        "fiji"	:	"fj",
        "finland"	:	"fi",
        "france"	:	"fr",
        "french guiana"	:	"gf",
        "french polynesia"	:	"pf",
        "french southern territories"	:	"tf",
        "gabon"	:	"ga",
        "gambia"	:	"gm",
        "georgia"	:	"ge",
        "germany"	:	"de",
        "ghana"	:	"gh",
        "gibraltar"	:	"gi",
        "greece"	:	"gr",
        "greenland"	:	"gl",
        "grenada"	:	"gd",
        "guadeloupe"	:	"gp",
        "guam"	:	"gu",
        "guatemala"	:	"gt",
        "guinea"	:	"gn",
        "guinea-bissau"	:	"gw",
        "guyana"	:	"gy",
        "haiti"	:	"ht",
        "heard island and mcdonald islands"	:	"hm",
        "honduras"	:	"hn",
        "hong kong"	:	"hk",
        "hungary"	:	"hu",
        "iceland"	:	"is",
        "india"	:	"in",
        "indonesia"	:	"id",
        "iran, islamic republic of"	:	"ir",
        "iraq"	:	"iq",
        "ireland"	:	"ie",
        "israel"	:	"il",
        "italy"	:	"it",
        "jamaica"	:	"jm",
        "japan"	:	"jp",
        "jordan"	:	"jo",
        "kazakhstan"	:	"kz",
        "kenya"	:	"ke",
        "kiribati"	:	"ki",
        "korea, democratic people's republic of"	:	"kp",
        "korea, republic of"	:	"kr",
        "kuwait"	:	"kw",
        "kyrgyzstan"	:	"kg",
        "lao people's democratic republic"	:	"la",
        "latvia"	:	"lv",
        "lebanon"	:	"lb",
        "lesotho"	:	"ls",
        "liberia"	:	"lr",
        "libyan arab jamahiriya"	:	"ly",
        "liechtenstein"	:	"li",
        "lithuania"	:	"lt",
        "luxembourg"	:	"lu",
        "macao"	:	"mo",
        "macedonia, the former yugoslav republic of"	:	"mk",
        "madagascar"	:	"mg",
        "malawi"	:	"mw",
        "malaysia"	:	"my",
        "maldives"	:	"mv",
        "mali"	:	"ml",
        "malta"	:	"mt",
        "marshall islands"	:	"mh",
        "martinique"	:	"mq",
        "mauritania"	:	"mr",
        "mauritius"	:	"mu",
        "mayotte"	:	"yt",
        "mexico"	:	"mx",
        "micronesia, federated states of"	:	"fm",
        "moldova, republic of"	:	"md",
        "monaco"	:	"mc",
        "mongolia"	:	"mn",
        "montserrat"	:	"ms",
        "morocco"	:	"ma",
        "mozambique"	:	"mz",
        "myanmar"	:	"mm",
        "namibia"	:	"na",
        "nauru"	:	"nr",
        "nepal"	:	"np",
        "netherlands"	:	"nl",
        "netherlands antilles"	:	"an",
        "new caledonia"	:	"nc",
        "new zealand"	:	"nz",
        "nicaragua"	:	"ni",
        "niger"	:	"ne",
        "nigeria"	:	"ng",
        "niue"	:	"nu",
        "norfolk island"	:	"nf",
        "northern mariana islands"	:	"mp",
        "norway"	:	"no",
        "oman"	:	"om",
        "pakistan"	:	"pk",
        "palau"	:	"pw",
        "palestinian territory, occupied"	:	"ps",
        "panama"	:	"pa",
        "papua new guinea"	:	"pg",
        "paraguay"	:	"py",
        "peru"	:	"pe",
        "philippines"	:	"ph",
        "pitcairn"	:	"pn",
        "poland"	:	"pl",
        "portugal"	:	"pt",
        "puerto rico"	:	"pr",
        "qatar"	:	"qa",
        "réunion"	:	"re",
        "romania"	:	"ro",
        "russian federation"	:	"ru",
        "rwanda"	:	"rw",
        "saint helena"	:	"sh",
        "saint kitts and nevis"	:	"kn",
        "saint lucia"	:	"lc",
        "saint pierre and miquelon"	:	"pm",
        "saint vincent and the grenadines"	:	"vc",
        "samoa"	:	"ws",
        "san marino"	:	"sm",
        "sao tome and principe"	:	"st",
        "saudi arabia"	:	"sa",
        "senegal"	:	"sn",
        "serbia"	:	"rs",
        "seychelles"	:	"sc",
        "sierra leone"	:	"sl",
        "singapore"	:	"sg",
        "slovakia"	:	"sk",
        "slovenia"	:	"si",
        "solomon islands"	:	"sb",
        "somalia"	:	"so",
        "south africa"	:	"za",
        "south georgia and south sandwich islands"	:	"gs",
        "spain"	:	"es",
        "sri lanka"	:	"lk",
        "sudan"	:	"sd",
        "suriname"	:	"sr",
        "svalbard and jan mayen"	:	"sj",
        "swaziland"	:	"sz",
        "sweden"	:	"se",
        "switzerland"	:	"ch",
        "syrian arab republic"	:	"sy",
        "taiwan, republic of china"	:	"tw",
        "tajikistan"	:	"tj",
        "tanzania, united republic of"	:	"tz",
        "thailand"	:	"th",
        "timor-leste"	:	"tl",
        "togo"	:	"tg",
        "tokelau"	:	"tk",
        "tonga"	:	"to",
        "trinidad and tobago"	:	"tt",
        "tunisia"	:	"tn",
        "turkey"	:	"tr",
        "turkmenistan"	:	"tm",
        "turks and caicos islands"	:	"tc",
        "tuvalu"	:	"tv",
        "uganda"	:	"ug",
        "ukraine"	:	"ua",
        "united arab emirates"	:	"ae",
        "united kingdom"	:	"gb",
        "united states"	:	"us",
        "united states minor outlying islands"	:	"um",
        "uruguay"	:	"uy",
        "uzbekistan"	:	"uz",
        "venezuela"	:	"ve",
        "vanuatu"	:	"vu",
        "viet nam"	:	"vn",
        "british virgin islands"	:	"vg",
        "u.s. virgin islands"	:	"vi",
        "wallis and futuna"	:	"wf",
        "yemen	":	"ye",
        "zimbabwe"	:	"zw"
         }
      Geolocation.getCurrentPosition(
        position=>{
          const latitude = JSON.stringify(position.coords.latitude)
          const longitude = JSON.stringify(position.coords.longitude)
          const location=JSON.stringify(position)
          this.setState({latitude:latitude,longitude:longitude,location:location})
          var url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+longitude+','+latitude+'.json?types=country&access_token=<YOUR ACCESS TOKEN HERE>'
        var req = new Request(url);
        fetch(req)
        .then((response)=>response.json())
        .then((data)=>{
          this.setState({location:(data.features[0].place_name).toLowerCase()})
          var url1='https://newsapi.org/v2/top-headlines?country='+this.country[this.state.location]+'&sortBy=relevancy&apiKey=<YOUR API KEY HERE>'
          var req = new Request(url1);
          
          fetch(req)
          .then(response => response.json())
          .then(data => {
            this.setState({data: data})
            this.newData.push(data)
           console.log(this.newData)
          this.setState({flag:true})
          })
        } 
        
        )
        }
      )
     
      
       
      }

     

      _onRefresh=()=>{
        this.setState({
          data:[],
          flag:false
        })
        this.newData=[]
        var url1='https://newsapi.org/v2/top-headlines?country='+this.country[this.state.location]+'&sortBy=relevancy&apiKey=<YOUR API KEY HERE>'
        var req = new Request(url1);
        this.setState({refreshing:true})
        fetch(req)
          .then(response => response.json())
          .then(data => {
            this.setState({data: data})
            this.newData.push(data)
           console.log(this.newData)
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
       
        <View style={{flex:1,backgroundColor:'rgb(20,20,20)',alignContent:'center',justifyContent:'center'}}>
        <View style={{height:50,width:"100%",backgroundColor:"#262833",alignContent:'center',justifyContent:"center"}}>
          <Text style={{color:"white",fontSize:22,paddingTop:10,paddingLeft:5}}>Trending News</Text>
        </View>
          <ScrollView 
          refreshControl={
        <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}/>
      }
          contentContainerStyle={{backgroundColor:'rbg(214,214,214)'}}>
          {this.state.flag?this.newData.map((article,index)=>
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
        )):<View style={{alignSelf:"center",paddingTop:"50%"}}><NineCubesLoader size={40}/></View>
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

 