import {View,Image, TextInput,Text,Button, AsyncStorage, Modal} from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
const setlogloc= async (username)=>{
  await AsyncStorage.setItem("@username",username)
}
const Login=(props)=>
{ const [modalVisible, setModalVisible] = useState(false);
  const [username,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const loginPressed=()=>
  { fetch('https://medbook1.herokuapp.com/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username,password})
  }).then((response) => 
  { setModalVisible(false)
    const status = response.headers.map.hua;
    if(status=="ha")
    {
      props.logcall(true)
      setlogloc(username)
    }
    else
    {
      alert("Incorrect username or Password")
    } 
  },(err) => 
  {
    console.debug('Incorrect username or password')
  }).catch((error) => 
  {
    console.debug("Incorrect Username or password");
    return error;
  });
  }
  return(
      <View>
        <TextInput onChangeText={(value)=>setUserName(value)} defaultValue={"Username or Email"} style={{borderWidth:2}}>
        </TextInput>
        <TextInput onChangeText={(value)=>setPassword(value)} defaultValue={"Password"} secureTextEntry={true} style={{borderWidth:2,marginTop:2}}>
        </TextInput>
        <TouchableOpacity onPress={()=>{alert("Currently we do not support password recovery so sit back and try to remeber your password.")}}>
        <Text> Forget Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{props.signup(true)}}>
          <Text> Sign Up</Text>
        </TouchableOpacity>
        <Button title={"Sign In"} onPress={()=>{
          setModalVisible(true)
          loginPressed()}}></Button>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{}}
      >
      <Text style={ {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    top:200,
    color:'blue',
    textAlign:'center',
    alignItems: "center",
    shadowColor: "#000",
    fontSize:45,
    shadowOffset: {
      width: 0,
      height: 2}}}> Please Wait </Text>
      </Modal>
      </View>
  )
}
export {Login}