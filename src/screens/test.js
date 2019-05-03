import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    WebView,
    Text,
    Image,
    Platform,
    processColor,
    ActivityIndicator, TouchableOpacity
} from 'react-native';
import {StackNavigator, SafeAreaView} from 'react-navigation';
import {PieChart} from 'react-native-svg-charts'
import {CheckBox, Icon} from "react-native-elements";
import CheckBoxGroup from "../elements/checkboxgroup";

export default class Test extends React.Component {


    static navigationOptions = {
        title: 'Forum',
    };


    render() {


        return (
            <View style={styles.MainContainer}>
                <Text>Forum Page</Text>
            </View>
        );
    }

}


const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qsNoLabel: {
        backgroundColor: '#ff0000',
        alignSelf: 'baseline',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        fontSize: 16,
        color: '#fff',
        marginTop:30
    },

    qsDesc: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 15
    },
    qsContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 30,
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOpacity: 0,
        shadowOffset: {width: 12, height: 12,},
        margin: 10,
        elevation: 4,
        width: "100%",
    },
    SubmitButton: {
        backgroundColor: '#ff0000',
        justifyContent: 'center',
        alignSelf: 'stretch',
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10,
        borderRadius: 50,
        alignItems: 'center',

    },
    SubmitText: {
        fontSize: 18,
        color: '#fff'
    },
    qsTopic:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:5,
        color: '#8d8d8d'

    },
    hor: {
        height: 0.5,
        width: "100%",
        backgroundColor: "#777777",
        marginTop: 20,
        alignItems: 'stretch'
    },

});
