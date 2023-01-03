import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView,Text, View,ScrollView ,Dimensions, Button,Image, TouchableOpacity, AsyncStorage} from 'react-native';
import Post from './Post';
import Record from './Record';
import {Login} from './Login';
import SignUp from './SignUp';
import Doc from './Doc';
import Profile from './Profile'
const windowHeight = Dimensions.get('window').height-150;
const windowWidth = Dimensions.get('window').width/4;

const getData = async (key) => 
{
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      //console.debug(data)
      return data
    }
    else
      return "false"    
  } catch (error) {
    console.debug(error)
  }
}

export default  function App() 
{ 
  
  const [content,setContent]=useState(<Post/>);
  const [loggedIn,setLog]=useState(false);
  const [SignedUp,setSignedup]=useState(false);
  getData("@username")
  .then(data => data)
  .then(value => {
    //console.debug("@username:  " + value)
    setLog(value)
  })
  .catch(err => console.log(err))
  //console.debug(loggedIn)
  const home=()=>
  { //console.debug("homePress")
    setContent(<Post/>)
  }
  const recordpress=()=>
  {//console.debug("recordpress")
    setContent(<Record/>)
  }
  const Docpress=()=>
  {//console.debug("recordpress")
    setContent(<Doc/>)
  }
  const propress=()=>
  {//console.debug("propress")
    setContent(<Profile setc={setContent}/>)
  } 
  if(loggedIn!="false")
  return (
    <SafeAreaView style={{flexDirection:'column'}}>
      <View style={{height:75,backgroundColor:'lightblue',alignItems:'center'}}>
        <Image source={require("./logo.png")}>
        </Image>
      </View>
      <View style={{height:windowHeight}}> 
    {content}
      </View>
      <View style={{height:50,backgroundColor:'lightgreen',flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={home} style={{flex:1,width:windowWidth,alignItems:'center',fontSize:15}}>
          <Text style={{fontSize:20}}>&#127968;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Docpress} style={{flex:1,width:windowWidth,alignItems:'center'}}>
        <Text style={{fontSize:35}}> &#9993;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={recordpress} style={{flex:1,width:windowWidth,alignItems:'center'}}>
        <Text style={{fontSize:20}}> &#128466;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={propress} style={{flex:1,width:windowWidth,alignItems:'center'}}>
        <Text style={{fontSize:20}}> &#129520;</Text>
        </TouchableOpacity> 
     </View>
    </SafeAreaView>
  );
  else if(SignedUp==false)
  return (
    <View style={{flexDirection:'column'}}>
      <View style={{height:75,backgroundColor:'lightblue',alignItems:'center'}}>
        <Image source={require("./logo.png")}>
        </Image>
      </View>
      <Login logcall={setLog} signup={setSignedup}/>
    </View>
  )
  else
  return(
      <View style={{flexDirection:'column'}}>
        <View style={{height:75,backgroundColor:'lightblue',alignItems:'center'}}>
          <Image source={require("./logo.png")}>
          </Image>
        </View>
        <SignUp signsuccess={setSignedup}/>
      </View>
  )
}
