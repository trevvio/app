import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from "react-native";
import shortid from "shortid";

export default class SharingView extends Component {
    constructor(props) {
        super(props);

        this.watchId = null;

        this.state = {
            name: this.props.name,
            id: shortid.generate(),
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

    // SHARE
    share() {
        console.log(this.state.id);
        console.log(this.state.position);

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

                <TextInput style={styles.nameInput} value={this.state.id} />

                <Button
                    onPress={this.stopSharing.bind(this)}
                    title="Stop Sharing"
                    color="#841584"
                    accessibilityLabel="Stop Sharing"
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
        width: 150,
        borderColor: "gray",
        borderWidth: 1
    }
});

AppRegistry.registerComponent("SharingView", () => SharingView);
