import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert, ActivityIndicator
} from 'react-native';
import {Icon, CheckBox} from "react-native-elements";

export default class SignUpView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email   : '',
            password: '',
            confirmPassword: '',
            serverResponse: '',
            studentChecked: true
        }
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
    };

    sendDataToServer = () => {
        this.setState({
            isLoading: true
        });

        var json_output = {username: this.state.username, email: this.state.email, password: this.state.password, userType:this.state.studentChecked===true?"s":"a"};
        fetch(`http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/signup`, {
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

    onRegisterClick = ()=>{

        if (this.state.username==="" || this.state.email==="" || this.state.password==="" || this.state.confirmPassword==="") {
            Alert.alert("Require field is empty", "Please fill all the details")
        }else {
            if (this.state.password===this.state.confirmPassword){
                this.sendDataToServer();
            }else {
                Alert.alert("Password Mismatch", "Please Re-Check your password")
            }
        }


        if (this.state.studentChecked){
            console.log("Student Account Selected")
        }else {
            console.log("Admin Account Selected")
        }

    };

    checkServerResponse = () => {
        switch (this.state.serverResponse) {
            case "User Already Exist":
                Alert.alert("Registration Failed!", "Username or email is already connected to an account");
                console.log("case 1");
                break;

            case "Successfully Registered":
                console.log("case 3");
                const {navigate} = this.props.navigation;
                navigate("HomeScreen");
                break;
            default:
                console.log("default", this.state.serverResponse)

        }
    };

    render() {
        const {navigate} = this.props.navigation;
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
                        name='envelope'
                        type='font-awesome'
                        color="#b4b4b4"
                        size={24}/>
                    <TextInput style={styles.inputs}
                               placeholder="Email"
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
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

                <View style={styles.inputContainer}>
                    <Icon
                        name='lock'
                        type='font-awesome'
                        color="#b4b4b4"
                        size={26}/>
                    <TextInput style={styles.inputs}
                               placeholder="Confirm Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
                </View>

                <Text style={{fontSize:16}}>Account Type</Text>
                <View style={{flexDirection: 'row'}}>
                    <CheckBox
                        title='Student'
                        textStyle={{fontWeight: 'normal'}}
                        checked={this.state.studentChecked}
                        checkedColor='#FF0000'
                        uncheckedColor='#FF0000'
                        containerStyle = {{borderColor: '#fff'}}
                        checkedIcon={<Icon
                            name='check-circle'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        uncheckedIcon={<Icon
                            name='circle-o'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        onPress={() => {
                            this.setState({studentChecked: true});
                            //console.log("this.state.studentChecked ", this.state.studentChecked)
                        }}
                    />
                    <CheckBox
                        title='Admin'
                        textStyle={{fontWeight: 'normal'}}
                        checked={!this.state.studentChecked}
                        checkedColor='#FF0000'
                        uncheckedColor='#FF0000'
                        containerStyle = {{borderColor: '#fff'}}
                        checkedIcon={<Icon
                            name='check-circle'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        uncheckedIcon={<Icon
                            name='circle-o'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        onPress={() => {
                            this.setState({studentChecked: false});
                            //console.log("this.state.studentChecked ", this.state.studentChecked)
                        }}
                    />
                </View>


                {this.state.isLoading?<ActivityIndicator/>:null}

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onRegisterClick()}>
                    <Text style={[styles.signUpText, {fontSize:16}]}>Sign up</Text>
                </TouchableHighlight>

                <Text style={{fontSize:16, marginTop: 25, color: '#8d8d8d'}}>Already have an account?</Text>
                <TouchableHighlight style={styles.buttonContainer} onPress={() =>navigate("Login")}>
                    <Text style={{color: '#790000', fontSize:16}}>Login</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#00b5ec',
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
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop:7,
        alignItems: 'center',
        width: 250,
        borderRadius: 30,
    },
    signupButton: {
        paddingVertical:12,
        backgroundColor: "#ff0000",
    },
    signUpText: {
        color: 'white',
    }
});