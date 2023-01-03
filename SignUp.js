import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View ,Picker,Button} from 'react-native';
import DatePicker from 'react-native-datepicker';
export default SignUp=(props)=> {
const [name,setName]=useState("");
const [username,setUserName]=useState("");
const [password,setPassword]=useState("");
const [gender,setGender]=useState("");
const [dob,setdob]=useState("");
function saveUser(){ 
  alert(JSON.stringify({name,username,password,gender,dob}));
  fetch('https://medbook1.herokuapp.com/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name,username,password,gender,dob})
  }).then((response) => {      
    const statusCode = response.status;
    if(statusCode==200){
      alert("Sign UP sucessful")
      props.signsuccess(false)
    }else{
      "Error Occured"
      setSignedup(false)
    }      
  },(err) => {
    console.debug('error',err)
  })
  .catch((error) => {
    console.debug(error);
    return error;
  });

}
  return (
   <View>
     <Text>Name:</Text>
     <TextInput style={{borderWidth:2,marginTop:2,height:25}} onChangeText={(value)=>setName(value)}>
     </TextInput>
     <Text>Username</Text>
     <TextInput style={{borderWidth:2,marginTop:2,height:25}} onChangeText={(value)=>setUserName(value)}>
     </TextInput>
    <Text>Passworrd</Text>
     <TextInput style={{borderWidth:2,marginTop:2,height:25}} onChangeText={(value)=>setPassword(value)}>
     </TextInput>
     <Text>Gender</Text>
     <Picker onValueChange={(itemValue, itemIndex) => setGender(itemValue)} >
       <Picker.Item value="" label="Select Your Gender"></Picker.Item>
       <Picker.Item value="M" label="M"></Picker.Item>
       <Picker.Item value="F" label="F"></Picker.Item>
     </Picker >
     <Text>Dob</Text>
     <View style={{borderWidth:2}}>
     <DatePicker
        style={{width: 200}}
        placeholder={JSON.stringify(dob)}
        mode="date"
        format="YYYY-MM-DD"
        minDate="1950-05-01"
        maxDate="2004-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => setdob(date)}
      />
      </View>
      <Button title={"Sign UP"} onPress={saveUser}></Button>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
