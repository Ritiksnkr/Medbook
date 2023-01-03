import React, { Component, useRef, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import WebView from 'react-native-webview'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "doctor",
    };
  }
  
  render() {
    return(<>
    <Text style={{textAlign:'center',top:5}}> Click on View list to hide map</Text>
   <WebView source={{ uri: 'https://www.google.com/maps?q='+this.state.val+" near me&types=health+hospitals" }} style={{ marginTop: 20 }} />
   <TextInput editable={false} style={{opacity:100,backgroundColor:'white',borderWidth:2,position:'absolute',height:50,top:45,width:'100%'}} placeholder='Search by Doctors name or speciality' onChangeText={(value)=>this.setState({val:value})} ></TextInput>
    </>)}
}