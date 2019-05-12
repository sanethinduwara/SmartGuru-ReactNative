import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView, TextInput, ActivityIndicator, TouchableHighlight, AsyncStorage, TouchableOpacity, Alert
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {Icon} from "react-native-elements";
//import Snackbar from 'react-native-snackbar';

export default class EditProfile extends React.Component {

    userID = '';
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Edit',
            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        const {navigate} = navigation;
                        navigate("UserProfile");

                    }}>
                    <View style={{flexDirection: 'row', marginLeft: 7}}>
                        <Icon
                            name='arrow-left'
                            type='feather'
                            color='#000'
                            size={25}/>
                    </View>

                </TouchableOpacity>
            ),
        };

    };


    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            username: '',
            email: '',
            password: '',
            oldPassword: '',
            serverResponse: '',
            savingChanges: false,
            visible: false,
        }
    }

    componentDidMount() {

        const URL = `http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/edit/${this.userID}`;
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

    updateProfile = () => {
        var json = {username: this.state.username, email: this.state.email, password: this.state.password};

        fetch(`http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/edit/${this.userID}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === "saved") {

                    this.setState({
                        savingChanges: false,
                        visible: true
                    });
                }
            })
            .catch((err) => console.log(err));

        console.log("user details", JSON.stringify(json))
    };

    onSavePress() {
        this.setState({
            savingChanges: true
        });
        this.updateProfile();
        (async () => {
            await AsyncStorage.setItem('@username', this.state.username);
        })();
        this.props.navigation.state.params.onNavigateBack(this.state.username);

    };

    render() {
        var {params} = this.props.navigation.state;
        this.userID = params.userID;
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <!--text input for username-->
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

                <!--text input for email-->
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

                <!--text input for password-->
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

                <!--text input for confirm password-->
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

                {
                    //show loading indicator while saving
                    this.state.savingChanges ? <ActivityIndicator/> : null
                }

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                                    onPress={() => this.onSavePress()}>
                    <Text style={[styles.signUpText, {fontSize: 16}]}>Save Changes</Text>
                </TouchableHighlight>


                {
                    //Display that changes saved successfully
                    this.state.visible ? <Snackbar
                        visible={this.state.visible}
                        onDismiss={() => this.setState({visible: false})}>Changes Saved</Snackbar> : null
                }


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
        paddingHorizontal: 20,
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
        fontSize: 16
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop: 7,
        alignItems: 'center',
        width: 250,
        borderRadius: 30,
    },
    signupButton: {
        paddingVertical: 12,
        backgroundColor: "#ff0000",
    },
    signUpText: {
        color: 'white',
    }
});
