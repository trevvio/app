import React, { Component } from "react";
import { AppRegistry, NavigatorIOS, StyleSheet } from "react-native";
import InitView from "./components/InitView";

export default class Trevvio extends Component {
    constructor(props) {
        super(props);
    }

    // RENDER
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: "Trevvio",
                    navigationBarHidden: false,
                    component: InitView
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent("Trevvio", () => Trevvio);
