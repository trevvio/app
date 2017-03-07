/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from "react-native";

export default class Trevvio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };
    }

    // START SHARING
    startSharing() {
        console.log("Start sharing");
    }

    // RENDER
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Trevvio!
                </Text>
                <Text style={styles.instructions}>
                    What is your name?
                </Text>

                <TextInput
                    style={styles.nameInput}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                />

                <Button
                    onPress={this.startSharing.bind(this)}
                    title="Start Sharing"
                    color="#841584"
                    accessibilityLabel="Start Sharing"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    },
    nameInput: {
        height: 40,
        width: 150,
        borderColor: "gray",
        borderWidth: 1
    }
});

AppRegistry.registerComponent("Trevvio", () => Trevvio);
