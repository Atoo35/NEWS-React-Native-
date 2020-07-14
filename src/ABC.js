import React,{Component} from 'react';
import { Text, TextInput,View,ScrollView,Dimensions,Keyboard,FlatList,Animated } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class ABC extends Component{

    constructor(props){
        
        super(props)
        this.bgarr=this.props.data
        this.state={
            bgcolor:this.bgarr[Math.floor(Math.random()*this.bgarr.length)],
            bgcolor2:this.bgarr[Math.floor(Math.random()*this.bgarr.length)],
            bgcolor3:this.bgarr[Math.floor(Math.random()*this.bgarr.length)],
            animationValue:0
        }
        
        // this.state={
        //     animationValue:0
        // }
       
        this.Animation=new Animated.Value(0)
        
        this._start()
    }
    
    // componentWillMount(){
    //     // this.setcolors()
       
    //     let one=this.bgarr[Math.floor(Math.random()*this.bgarr.length)]
       

    //     let two=this.bgarr[Math.floor(Math.random()*this.bgarr.length)]
   

    //     let three=this.bgarr[Math.floor(Math.random()*this.bgarr.length)]
       

    //     this.setState({
    //         bgcolor:one,
    //         bgcolor2:two,
    //         bgcolor3:three,
            
    //     })
    //     this._start()
    // }
   
    _start=()=>{
       
        if(this.state.animationValue==0){
        this.Animation.setValue(0)
        this.setState({animationValue:1})
       
        }
        else{
        this.Animation.setValue(1)
        this.setState({animationValue:0})
        
        }
        Animated.timing(this.Animation,{
            toValue:this.state.animationValue,
            duration:3000
        }).start(()=>this._start())
        // setTimeout(() => {
            
        //     this._start()
        // },6500)
        
    }
    
    render(){
        const bckconfig = this.Animation.interpolate({
            inputRange:[0,0.5,1],
            outputRange:[this.state.bgcolor,this.state.bgcolor2,this.state.bgcolor3]
        })
        return(
                
            <Animated.View key={'index'} style={{height:100,width:100,justifyContent:"center",alignItems:"center",backgroundColor:bckconfig,elevation:10,margin:15}}>
             <Text style={{fontSize:18,color:"white"}} key={'item'}>{this.props.name}</Text>
           </Animated.View>
        )
    }
}