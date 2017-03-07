import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image,
    KeyboardAvoidingView
} from "react-native";
import SharingView from "./SharingView";
import Icon from "react-native-vector-icons/FontAwesome";

export default class InitView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        };
    }

    // START SHARING
    startSharing() {
        if (this.state.name.length > 0) {
            this.props.navigator.push({
                title: "Sharing",
                component: SharingView,
                navigationBarHidden: true,
                passProps: { name: this.state.name }
            });
        }
    }

    // RENDER
    render() {
        return (
            <View style={styles.container}>

                <Image
                    source={require("../resources/logo.png")}
                    style={styles.backgroundImage}
                />

                <Text style={styles.welcome}>
                    Trevvio
                </Text>

                <Text style={styles.instructions}>
                    To start a session, tell us your name:
                </Text>

                <KeyboardAvoidingView
                    behavior={"padding"}
                    style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <TextInput
                        style={styles.nameInput}
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                        placeholder={"Your name"}
                    />

                    <View style={styles.startButton}>
                        <Icon.Button
                            name="flash"
                            backgroundColor="#2ecc71"
                            onPress={this.startSharing.bind(this)}
                        >
                            Start Session
                        </Icon.Button>
                    </View>
                </KeyboardAvoidingView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
    },
    welcome: {
        fontSize: 40,
        textAlign: "center",
        marginTop: 20,
        marginBottom: 40,
        fontFamily: "Helvetica"
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    },
    nameInput: {
        height: 40,
        width: 300,
        borderColor: "gray",
        textAlign: "center",
        backgroundColor: "white",
        shadowColor: "black",
        shadowOpacity: 0.16,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        margin: 10
    },
    backgroundImage: {
        height: 150,
        width: 150
    },
    startButton: {
        width: 130
    }
});

AppRegistry.registerComponent("InitView", () => InitView);
