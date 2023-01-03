import {View,Text} from 'react-native';
export default RecordItem=(props)=>
{
  return(
    <View style={{borderWidth:2,marginTop:2}}>
      <Text style={{fontSize:25}}>{props.type}</Text>
      <Text style={{fontSize:25}}>{props.val}</Text>
      <Text style={{fontSize:15}}> {props.date.toString()}</Text>
    </View>
  )
}