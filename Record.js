import { useState } from 'react';
import {AsyncStorage, Button, Modal, Pressable, StyleSheet, Text, View} from 'react-native'
import { Picker } from 'react-native';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import RecordItem from './RecordItem';
const donePressed= async (type,val)=>
{ 
  let recCount=await AsyncStorage.getItem("recCount")
  if(recCount==null ||recCount==undefined)
    recCount=0
  recCount=parseInt(recCount)
  await AsyncStorage.setItem("data"+(recCount+1),JSON.stringify({type,val,date:new Date()}))
  recCount+=1;
  await AsyncStorage.setItem("recCount",""+recCount)
}
const reloadRecords= async (records,setRecords)=>
{ 
  let recCount=await AsyncStorage.getItem("recCount")
  if(recCount==null || recCount==undefined)
    recCount=0
  recCount=parseInt(recCount)
  let temp1=[]
  for(let i=0;i<recCount;i++)
  { let temp=await AsyncStorage.getItem("data"+(i+1));
    temp=JSON.parse(temp)
    temp1.push([<RecordItem key={i} type={temp.type} val={temp.val} date={temp.date}></RecordItem>])
  }
  setRecords(temp1)
}

export default  ()=>
{
const [type,setType]=useState("");
const [val,setVal]=useState("");
const [modalVisible, setModalVisible] = useState(false);
const [records,setRecords]=useState([]);
return(
  <View onLayout ={()=>reloadRecords(records,setRecords) }>
    <ScrollView>
    {records}
    
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView} >
            <Picker style={{width:250}} onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
              <Picker.Item  value="Choose Record Type" label="Choose Record Type"/>                
              <Picker.Item label="Glucoge Level" value="Glucoge Level"/>
              <Picker.Item label="Blood Pressure" value="Blood Pressure"/>
              <Picker.Item label="Temperature" value="Temperature"/> 
            </Picker>
            <TextInput style={{borderWidth:2,width:200}} onChangeText={(value)=>setVal(value)}>
            </TextInput>
            <View style={{flexDirection:'row'}}>
            <Pressable 
              
              style={[styles.button, styles.buttonClose]}
              onPress={async () => {
                await donePressed(type,val)
                reloadRecords(records,setRecords)
                setModalVisible(!modalVisible)}}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
            <Pressable 
              
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible)}}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Button  title={"+"} onPress={() => setModalVisible(true)}>
      </Button>
    </ScrollView></View>
  )
  
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:5,
    marginLeft:15
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});