import React, { Component } from "react";
import Dash from "react-native-dash";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Share,
    Dimensions,
    KeyboardAvoidingView
} from "react-native";
import easyid from "easyid";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

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
            position: null,
            sent: 0,
            viewers: 0
        };
    }

    // COMPONENT DID MOUNT
    componentDidMount() {
        // watch the geolocation of the user
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                var sent = this.state.sent + 1;
                this.setState({
                    position: position.coords,
                    sent: sent
                });
                this.sendPosition();
            },
            e => {},
            {
                enableHighAccuracy: true
            }
        );
    }

    // COMPONENT WILL UNMOUNT
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    shareLink() {
        // open share dialog
        Share.share({
            message: "Follow current my position in real-time on: https://trevvio.com/" +
                this.state.id
        });
    }

    // SEND POSITION
    sendPosition() {
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
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    viewers: responseJson.viewers
                });
            })
            .catch(error => {
                console.error(error);
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

                <View style={styles.numberRow}>
                    <View style={styles.numberRowItem}>
                        <Text style={styles.numberHero}>{this.state.sent}</Text>
                        <Text style={styles.instructions}>
                            positions sent
                        </Text>
                    </View>
                    <Dash
                        style={{
                            width: 1,
                            height: 120,
                            flexDirection: "column"
                        }}
                        dashColor="lightgrey"
                        dashThickness={2}
                    />
                    <View style={styles.numberRowItem}>
                        <Text style={styles.numberHero}>
                            {this.state.viewers}
                        </Text>
                        <Text style={styles.instructions}>
                            people watching
                        </Text>
                    </View>
                </View>

                {/* MAP VIEW */}
                <MapView
                    region={{
                        latitude: this.state.position !== null
                            ? this.state.position.latitude
                            : 37.78825,
                        longitude: this.state.position !== null
                            ? this.state.position.longitude
                            : -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    style={styles.map}
                >
                    {/* render position martker */}
                    {this.state.position !== null
                        ? <MapView.Marker
                              coordinate={{
                                  latitude: this.state.position.latitude,
                                  longitude: this.state.position.longitude
                              }}
                              title="Me"
                              pinColor={"#e74c3c"}
                          />
                        : null}

                </MapView>

                <Text style={{ marginTop: 10, color: "grey" }}>
                    Your position is not visible on:
                </Text>

                <TextInput
                    style={styles.nameInput}
                    value={"https://trevvio.com/" + this.state.id}
                />

                <View style={styles.numberRow}>

                    <View style={{ margin: 10 }}>
                        <Icon.Button
                            name="power-off"
                            backgroundColor="#e74c3c"
                            onPress={this.stopSharing.bind(this)}
                        >
                            Stop Session
                        </Icon.Button>
                    </View>

                    <View style={{ margin: 10 }}>
                        <Icon.Button
                            name="share"
                            backgroundColor="#3498db"
                            onPress={this.shareLink.bind(this)}
                        >
                            Share the Link
                        </Icon.Button>
                    </View>
                </View>

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
    instructions: {
        textAlign: "center",
        color: "grey",
        marginBottom: 5
    },
    nameInput: {
        height: 40,
        width: width,
        borderColor: "gray",
        textAlign: "center",
        backgroundColor: "white",
        margin: 10
    },
    numberHero: {
        fontSize: 60
    },
    numberRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    numberRowItem: {
        marginTop: 10,
        width: 150,
        alignItems: "center"
    },
    map: {
        width: width,
        height: 120,
        marginTop: 20,
        marginBottom: 20
    }
});

AppRegistry.registerComponent("SharingView", () => SharingView);
