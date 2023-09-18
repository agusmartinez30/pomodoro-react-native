import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = ({ setIsTime, setCurrentTime, currentTime }) => {
  const options = ["Pomodoro", "Short Break", "Long Break"];

  function handlePress(idx){
    const newTime = idx === 0 ? 25 : idx === 1 ? 5 : 15
    setCurrentTime(idx);
    setIsTime(newTime * 60)
  }

  return (
    <View style={{flexDirection: 'row'}}>
      {options.map((item, idx) => (
        <TouchableOpacity onPress={()=> handlePress(idx)} key={idx} style={[styles.itemStyle, currentTime != idx && {borderColor: 'transparent'}]}>
          <Text style={{fontWeight: 'bold'}}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    width: '33%',
    borderWidth: 3,
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: 20
  }
})

export default Header;
