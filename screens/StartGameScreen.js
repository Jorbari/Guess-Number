import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Inputs from "../components/Input";

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setselectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const closeKeyBoard = () => {
    Keyboard.dismiss();
  };
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };
  const confirmInputHander = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number!", "Number must be a number between 1-99", [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler }
      ]);
      return;
    }
    setConfirmed(true);
    setselectedNumber(chosenNumber);
    setEnteredValue("");
    
    
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = <Text>Chosen Nmber: {selectedNumber}</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={closeKeyBoard}>
      <View style={styles.screen}>
        <Text style={styles.title}> The Game screen </Text>
        <Card style={styles.inputContainer}>
          <View style={styles.inputContainer}>
            <Text> Select a Number </Text>
            <Inputs
              style={styles.input}
              blurOnSubmit
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={numberInputHandler}
              value={enteredValue}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.buttonSize}>
                <Button
                  title="Reset"
                  color={Colors.primary}
                  onPress={resetInputHandler}
                />
              </View>
              <View style={styles.buttonSize}>
                <Button
                  title="Confirm"
                  color={Colors.accent}
                  onPress={confirmInputHander}
                />
              </View>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  buttonSize: {
    width: 80
  },
  input: {
    width: 50,
    textAlign: "center"
  }
});

export default StartGameScreen;
