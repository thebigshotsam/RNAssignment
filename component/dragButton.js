/* eslint-disable */ 
import React, {useEffect,useState,useRef} from "react";
import {StyleSheet, Pressable, Dimensions, PanResponder, Image, View,Animated} from 'react-native'
import Logo from '../Assets/cred.jpg'

const {width, height} = Dimensions.get('screen');

const DragButton = ({setActive, callAPI}) => {
    const [animation,setAnimation] = useState(new Animated.Value(0))
    const [tapped,setTapped] = useState(false)

    const animate = () => Animated.loop(Animated.spring(animation,{
        toValue:height*0.05,
        duration:100,
        friction:1,
        tension:20,
        useNativeDriver:true
    }),{iterations:500,}).start()

    useEffect(()=>{
           animate()
    },[animation])

    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: () => {
            setTapped(true)
            return true
        },
        onPanResponderGrant: () => {
            pan.setOffset({
            x: pan.x._value,
            y: pan.y._value
            });
        },
        onPanResponderMove: Animated.event(
                [
                null,
                { dx: pan.x, dy: pan.y },                
                ]
            ),
        onPanResponderRelease: () => {
            setTapped(false)
            if (parseInt(pan.y._value) >= height*0.16){
                setActive(true)
                callAPI()
            }else{
                
            }
            animate()            
            console.log(pan.y._value )
            console.log('Height ', height*0.15)
            // if ( 
            //     pan.y > height / 2 - 150 && 
            //     pan.y < height / 2 
            //   ) {
            //       Animated.spring(pan, {
            //         toValue: { y: pan.y},
            //         friction: 10,
            //       }).start(() => {
            //         //addLikedMuffin([...likedMuffins, muffins[currentMuffin].name]);
            //         // if (currentMuffin == muffins.length - 1) setDone(true);
            //         // else setCurrentMuffin(currentMuffin + 1);
            //         pan.setValue({x: 0, y: 0});
            //       });
            //   }
            //   // Muffin is in the dislike area
            //   else if (
            //     pan.y > height / 2 - 150 &&
            //     pan.y < height / 2
            //   ) {
            //     Animated.spring(pan, {
            //       toValue: { y: pan.y},
            //       friction: 10,
            //     }).start(() => {
            //     //   addDislikedMuffin([...dislikedMuffins, muffins[currentMuffin].name]);
            //     //   if (currentMuffin == muffins.length - 1) setDone(true);
            //     //   else setCurrentMuffin(currentMuffin + 1);
            //       pan.setValue({x: 0, y: 0});
            //     });
            //   }
            //   //Muffin is neither in the like nor the dislike area
            //   else {
            //     Animated.spring(pan, {
            //       toValue: { y: 0},
            //       friction: 10,
            //     }).start();
            //   }
        }
        })
    ).current;
    const trans = {
        transform:[
            {translateY: animation}
        ]
    }
    
    
  return (      
    <Animated.View  style={[styles.button,trans,tapped?{transform: [ { translateY: pan.y }]}:null]} {...panResponder.panHandlers}>
      <Pressable style={styles.press}>
        <Image style={styles.image} source={Logo} />
      </Pressable>
    </Animated.View>
  )
};

const styles = StyleSheet.create({
    button: {
        width: width * 0.24,
        height: width * 0.24,
        backgroundColor: 'black',
        overflow: 'hidden',
        borderRadius: width * 0.24,
        bottom:0,
        top:'5%',
        zIndex:1        
    },
    press:{
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: width * 0.22,
        height: width * 0.22,
        
    }
})

export default DragButton;