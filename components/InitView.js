import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from "react-native";
import SharingView from "./SharingView";

export default class InitView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        };
    }

    // START SHARING
    startSharing() {
        this.props.navigator.push({
            title: "Sharing",
            component: SharingView,
            navigationBarHidden: false,
            passProps: { name: this.state.name }
        });
    }

    // RENDER
    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.welcome}>
                    Trevvio
                </Text>

                <Text style={styles.instructions}>
                    What is your name?
                </Text>

                <TextInput
                    style={styles.nameInput}
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
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

AppRegistry.registerComponent("InitView", () => InitView);
