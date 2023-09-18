import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./src/components/Header";
import { Timer } from "./src/components/Timer";
import {Audio} from "expo-av"

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [isTime, setIsTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"]


  useEffect(() => {
    let interval = null;

    if(isActive){
      interval = setInterval(() => {
        setIsTime(isTime - 1);
      }, 1000)
    }else {
      clearInterval(interval);
    }

    if(isTime === 0){
      playSoundClock();
      setIsActive(false);
      setIsWorking(prev => !prev);
      setIsTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval)
  }, [isActive, isTime])

  function handleStartStop(){
    playSound()
    setIsActive(!isActive);
  }

  async function playSound(){
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    )

    await sound.playAsync()
  }

  async function playSoundClock(){
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/clock.mp3")
    )

    await sound.playAsync()
  }

  return (
    <View style={[styles.container, { backgroundColor: colors[currentTime]}]}>
      <View 
        style={{ 
          flex: 1,
          padding: 10, 
          paddingTop: 30 
        }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header 
          currentTime={currentTime} 
          setCurrentTime={setCurrentTime} 
          setIsTime={setIsTime} 
        />
        <Timer  isTime={isTime} />
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{color: "white", fontWeight: "bold"}}>{isActive ? 'STOP' : 'START'}</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#333333",
    alignItems: "center",
    padding: 15,
    marginTop: 15,
    borderRadius: 15
  }
});
