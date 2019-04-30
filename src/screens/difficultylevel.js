import React from 'react';
import { View, StyleSheet, Dimensions, WebView, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Quiz from "./lessonbasedquiz";


export default class Lessons extends React.Component {

    chapter_name ="";

    static navigationOptions = {
        title: '',
    };



    render() {
        //const {navigate} = this.props.navigation;

        var { params } = this.props.navigation.state;
        this.chapter_name = params.chapter;
        console.log("params", params.chapter);
        //this.chapter_name = params.chapter;
        const {navigate} = this.props.navigation;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <Button
                    title="Easy"
                    onPress={() => navigate("LessonBasedQuiz", {chapter: this.chapter_name, level: "easy"})}
                />
                <Button
                    title="Intermediate"
                    onPress={() => navigate("LessonBasedQuiz", {chapter: this.chapter_name, level: "intermediate"})}
                />

            </View>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex :1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    video:{
        width:Dimensions.get('window').width,
        aspectRatio:16/9,
        padding:10,
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOpacity:1,
        shadowOffset: { width: 12, height: 12, },
        elevation:4


    }
});
