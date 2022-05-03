/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
/* eslint-disable */ 
import React,{useEffect, useState, useCallback} from 'react';

import {
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  Text,
  Animated,
  Easing,
  ActivityIndicator,
  useColorScheme,
  View,
  LogBox
} from 'react-native';

import DragButton from './component/dragButton';

const {width, height} = Dimensions.get('screen');

const App = () => {
  const [active,setActive] = useState(false)
  const [arrowColor,setArrowColor] = useState('black')
  const [result,setResult] = useState(null)
  const [hide,setHide] = useState(false)
  const animation = useState(new Animated.Value(0))[0]
  const animation2 = useState(new Animated.Value(0))[0]
  const animate = ()=>{
    Animated.timing(animation,{
        toValue:-height*0.09,
        duration:1000,
        easing:Easing.linear,
        useNativeDriver:true
    }).start()       
  }
  const animate2 = ()=>{
    Animated.timing(animation2,{
        toValue:height*0.1,
        duration:500,
        easing:Easing.ease,
        useNativeDriver:true
    }).start((result)=>{
      if (result.finished){
        setHide(true)
      }
    })       
  }

  const callAPI = useCallback(()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://api.mocklets.com/p68348/success_case", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);animate();animate2();setResult(result)})
      .catch(error => console.log('error', error));
  })
  const trans = {
    transform:[
        {translateY: animation}
    ]
  }
  const trans2 = {
    transform:[
        {translateY: animation2}
    ]
  }
  LogBox.ignoreAllLogs()
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar backgroundColor={'#1c2121'} />
      <View style={styles.card} >
        {!active?<DragButton setActive={setActive} callAPI={callAPI} />:null}
        {result?
        <Animated.View style={[trans]}>
          <Text style={styles.result}>success</Text>
        </Animated.View>:null}
      </View>
      {!result || !active?<View style={styles.arrowContainer}>
        <View style={styles.ImageContainer}>
          <Image source={require('./Assets/arrow_gif.gif')} style={[styles.arrow]}/>
        </View>        
      </View>:null}
      {!hide?<Animated.View style={[styles.loaderContainer,trans2]}>
        {active?<ActivityIndicator size={width*0.15} color='#57b5a8' />:null}
      </Animated.View>:null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#1c2121',
    flex: 1,
  },
  card: {
    width: width * 0.90,
    height: height * 0.45,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: height*0.05,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex:0
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  result:{
    color:'black',
    fontSize:35,
    fontFamily:'Montserrat-SemiBold',            
  },
  arrowContainer:{
    width:width,
    alignSelf:'center',
    marginTop:width*0.2,
    alignItems:'center'
  },
  loaderContainer:{
    width:width*0.25,
    height:width*0.25,
    alignSelf:'center',
    borderWidth:2,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:height*0.72,
    borderRadius:width*0.25,
    borderColor:'#7b7b7b'
  },
  ImageContainer:{
    width:width*0.08,
    height:width*0.08
  },
  arrow:{
    width:'100%',
    height:'100%'
  },  
});

export default App;
