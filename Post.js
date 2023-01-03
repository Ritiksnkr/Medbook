import { useState } from "react";
import { View,Modal,Text } from "react-native"
import { ScrollView } from "react-native";
//import PostItem from "./PostItem"
import PostItem from "./PostItem"
function ObjectId(str)
{
  return str;
}
function homegen(){
  
 
}
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - 50;
};

const loadPost=(setPostItems,setModalVisible,PostItems)=>{
  fetch('https://medbook1.herokuapp.com/home', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"plen":""+PostItems.length})
  }).then((response) => {   
    var a=response.headers.map.content
    a = a.replace(/\'/g, '"')
    //alert(a)
    a=JSON.parse(a)
    var len=Object.keys(a).length
    //var st=len;
    var psts=[]
    for(var i=0;i<len;i++)
    psts.push([<PostItem key={i} use={a[i].use} post={a[i].post}></PostItem>])
    setPostItems(psts)
    setModalVisible(false)
  },(err) => {
    console.debug('Something went wrong',err)
  })
  .catch((error) => {
    console.debug("Something went wrong",error);
    return error;
  });
}
export default Post=()=>
{const[PostItems,setPostItems]=useState([])
  const [modalVisible, setModalVisible] = useState(true);
  const loadPost=()=>{
  fetch('https://medbook1.herokuapp.com/home', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"plen":""+PostItems.length})
  }).then((response) => {   
    var a=response.headers.map.content
    a = a.replace(/\'/g, '"')
    //alert(a)
    a=JSON.parse(a)
    var len=Object.keys(a).length
    //var st=len;
    var psts=[]
    if(len>PostItems.length)
    for(var i=0;i<len;i++)
    psts.push([<PostItem key={i} use={a[i].use} post={a[i].post}></PostItem>])
    if(len>PostItems.length)
    setPostItems(psts)
    setModalVisible(false)
  },(err) => {
    console.debug('Something went wrong',err)
  })
  .catch((error) => {
    console.debug("Something went wrong",error);
    return error;
  });
}
if(PostItems.length==0)
  loadPost(setPostItems,setModalVisible,PostItems);
  return(
    <ScrollView   onScroll={({nativeEvent}) => {
      if (isCloseToBottom(nativeEvent)) {
        loadPost(setPostItems,setModalVisible,PostItems)
        //setModalVisible(!modalVisible)
      }}}>
      {PostItems}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{position:"absolute"}}
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
      height: 2}}}> Loading</Text>
      </Modal>
    </ScrollView>

  )
}