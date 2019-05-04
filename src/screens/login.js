import {Alert, Image, StyleSheet, Text, TextInput, TouchableHighlight, View, ActivityIndicator} from "react-native";
import React, {Component} from "react";
import {Icon} from "react-native-elements";

export default class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            serverResponse: '',
            isLoading: false,
        }
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", viewId);
    };

    sendDataToServer = () => {
        this.setState({
            isLoading: true
        });

        var json_output = {username: this.state.username, password: this.state.password};
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
                console.log("response status", responseJson.status);

                this.setState({
                    isLoading: false,
                    serverResponse: responseJson.status
                });
                this.checkServerResponse();
            })
            .catch((err) => console.log(err));

        console.log("user details", JSON.stringify(json_output))
    };

    checkServerResponse = () => {
        switch (this.state.serverResponse) {
            case "User Doesn't Exist":
                Alert.alert("Does Not Exist", "Create a New Account");
                console.log("case 1");
                break;

            case "Incorrect Password":
                Alert.alert("Incorrect Password", "Please Re-Check Your Password");
                console.log("case 2");
                break;

            case "Access Allowed":
                console.log("case 3");
                const {navigate} = this.props.navigation;
                navigate("HomeScreen");
                break;
            default:
                console.log("default", this.state.serverResponse)

        }
    };

    onSubmit = ()=>{

        this.sendDataToServer();

    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Icon
                        name='user'
                        type='font-awesome'
                        color='#b4b4b4'
                        size={25}/>
                    <TextInput style={styles.inputs}
                               placeholder="Username"
                               underlineColorAndroid='transparent'
                               onChangeText={(username) => this.setState({username})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Icon
                        name='lock'
                        type='font-awesome'
                        color="#b4b4b4"
                        size={26}/>
                    <TextInput style={styles.inputs}
                               placeholder="Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(password) => this.setState({password})}/>
                </View>

                {this.state.isLoading?<ActivityIndicator/>:null}
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                                    onPress={() => {
                                        this.onSubmit();
                                    }}>
                    <Text style={[styles.loginText, {fontSize:16}]}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer}
                                    onPress={() => this.onClickListener('restore_password')}>
                    <Text style={{fontSize:16, marginTop: 25}}>Forgot your password?</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
                    <Text style={{color: '#790000', fontSize:16}}>Register</Text>
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
        borderColor: '#cacaca',
        backgroundColor: '#FFFFFF',
        paddingHorizontal:20,
        borderRadius: 30,
        borderWidth: 1,
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
        fontSize:16
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop:7,
        alignItems: 'center',
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        paddingVertical:12,
        backgroundColor: "#ff0000",
    },
    loginText: {
        color: 'white',
    }

});