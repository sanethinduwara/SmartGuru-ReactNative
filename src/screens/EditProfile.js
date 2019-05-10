import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Image,
    ScrollView, TextInput, ActivityIndicator, TouchableHighlight
} from 'react-native';
import {Icon} from "react-native-elements";


export default class EditProfile extends React.Component {

    username = '';
    static navigationOptions = {
        title: 'Edit',
    };

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            username: '',
            email   : '',
            password: '',
            oldPassword: '',
            serverResponse: '',
        }
    }

    componentDidMount() {

        const URL = `http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/edit/${this.state.userID}`;
        return fetch(URL)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("details", responseJson.toString());
                this.setState({
                    isLoading: false,
                    username: responseJson.username,
                    email: responseJson.email,
                    password: responseJson.password,

                }, function () {

                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    updateProfile = ()=>{
        var json = {username:this.state.username, email:this.state.email, password: this.state.password};
        fetch(`http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/edit`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.toString());
            })
            .catch((err) => console.log(err));

        console.log("user details", JSON.stringify(json))
    };

    render() {
        var {params} = this.props.navigation.state;
        this.username = params.username;
        console.log("username", );
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Icon
                        name='user'
                        type='font-awesome'
                        color='#b4b4b4'
                        size={25}/>
                    <TextInput style={styles.inputs}
                               value={this.state.username}
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
                               value={this.state.email}
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
                               placeholder="Old Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(oldPassword) => this.setState({oldPassword})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Icon
                        name='lock'
                        type='font-awesome'
                        color="#b4b4b4"
                        size={26}/>
                    <TextInput style={styles.inputs}
                               placeholder="New Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
                </View>

                {this.state.isLoading?<ActivityIndicator/>:null}

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onRegisterClick()}>
                    <Text style={[styles.signUpText, {fontSize:16}]}>Save Changes</Text>
                </TouchableHighlight>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        borderColor: '#cacaca',
        backgroundColor: '#FFFFFF',
        paddingHorizontal:20,
        borderRadius: 30,
        borderWidth: 1,
        width: 350,
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
