import { useState } from 'react';
import {AsyncStorage, Modal, Text, View} from 'react-native';
import { Button } from 'react-native';
import { TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import Post from './Post';
const windowHeight = Dimensions.get('window').height-185;
var use=""
const getlogloc=async ()=>{
  try{
  var log=await AsyncStorage.getItem("@username")
  if(log==null)
     log="false"
  return log;
  }
  catch(error)
  {
    console.debug(error)
  }
}
const getlog = async ()=>
{ await getlogloc()
.then(data => data)
.then(value => {
  use=value
})
.catch(err => console.log(err))}
getlog()
const logout=async (setc)=>{
  await AsyncStorage.setItem("@username","false")
  setc(<Post></Post>)
}
export default Profile=(props)=>{
  const [modalVisible, setModalVisible] = useState(false);
  const [post,setPost]=useState("")
  const createPost=()=>
  {fetch('https://medbook1.herokuapp.com/post', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({use,post})
  }).then((response) => {   
    const status = response.status;
    if(status==200){
      setModalVisible(false)
      alert("Post Created")

    }else{
      alert("Something went wrong")
    } 
  },(err) => {
    console.debug("Something went wrong")
  })
  .catch((error) => {
    console.debug("Something went wrong");
    return error;
  });
}
  return(
  <View>
    <View>
      <TextInput multiline={true} onChangeText={(value)=>setPost(value)} style={{borderWidth:2,maxHeight:windowHeight}}></TextInput>
      <Button title='Create Post' onPress={()=>{
        setModalVisible(true)
        createPost()}}></Button>
      <View style={{marginTop:5}}>
        <Button  title='Logout' onPress={()=>{logout(props.setc)}}></Button>
      </View>
    </View>
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
  </View>)
}
