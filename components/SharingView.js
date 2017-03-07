import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Share
} from "react-native";
import easyid from "easyid";

export default class SharingView extends Component {
    constructor(props) {
        super(props);

        this.watchId = null;

        this.state = {
            name: this.props.name,
            id: easyid.generate({
                groups: 1,
                length: 4,
                alphabet: "123456789ABCDEFGHJKMNPQRTUVWXYZabcdefghijklmnpqrstuvwxyz"
            }),
            position: null
        };
    }

    // COMPONENT DID MOUNT
    componentDidMount() {
        // watch the geolocation of the user
        this.watchID = navigator.geolocation.watchPosition(position => {
            this.setState({ position: position.coords });
            this.share();
        });
    }

    shareLink() {
        // open share dialog
        Share.share({
            message: "Follow my position now on: https://trevvio.com/" +
                this.state.id
        });
    }

    // SHARE
    share() {
        fetch("https://trevvio.com", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                latitude: this.state.position.latitude,
                longitude: this.state.position.longitude
            })
        });
    }

    // STOP SHARING
    stopSharing() {
        fetch("https://trevvio.com", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.state.id
            })
        });

        this.props.navigator.pop();
    }

    // RENDER
    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.instructions}>
                    Sending position...
                </Text>

                <TextInput
                    style={styles.nameInput}
                    value={"https://trevvio.com/" + this.state.id}
                />

                <Button
                    onPress={this.stopSharing.bind(this)}
                    title="Stop Sharing"
                    color="#841584"
                    accessibilityLabel="Stop Sharing"
                />

                <Button
                    onPress={this.shareLink.bind(this)}
                    title="Share URL"
                    color="#841584"
                    accessibilityLabel="Share URL"
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
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    },
    nameInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1
    }
});

AppRegistry.registerComponent("SharingView", () => SharingView);
