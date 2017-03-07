/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

export default class Trevvio extends Component {
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
                    style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
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
    }
});

AppRegistry.registerComponent("Trevvio", () => Trevvio);
