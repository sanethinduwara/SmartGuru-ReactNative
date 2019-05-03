import {Alert, Image, StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import React, {Component} from "react";

export default class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            serverResponse: ''
        }
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Username:" + this.state.email + " Password: " + this.state.password);
    };

    sendDataToServer = () => {
        var json_output = {email: this.state.email, password: this.state.password};
        fetch(`http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json_output),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.toString());

                this.setState({
                    serverResponse: responseJson.status
                })
            })
            .catch((err) => console.log(err));

        console.log("user details", JSON.stringify(json_output))
    };

    checkInputs = () => {
        switch (this.state.serverResponse) {
            case "User Doesn't Exist":
                Alert.alert("Does Not Exist", "Create a New Account");
                break;

            case "Incorrect Password":
                Alert.alert("Incorrect Password", "Please Re-Check Your Password");
                break;

            case "Access Allowed":
                //Navigate to HomeScreen
                break;

        }
    };

    onSubmit = ()=>{
        this.sendDataToServer();
        //this.checkInputs();
        const {navigate} = this.props.navigation;
        navigate("HomeScreen")
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon}
                           source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Email"
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon}
                           source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(password) => this.setState({password})}/>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                                    onPress={() => this.onSubmit()}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer}
                                    onPress={() => this.onClickListener('restore_password')}>
                    <Text>Forgot your password?</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }

});