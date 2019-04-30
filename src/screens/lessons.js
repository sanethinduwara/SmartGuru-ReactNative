import React from 'react';
import {View, StyleSheet, Dimensions, WebView, Text, Button} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Quiz from "./lessonbasedquiz";


export default class Lessons extends React.Component {

    static navigationOptions = {
        title: 'Quiz',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button
                    title="Introduction to Computers, Programs, and Java"
                    onPress={() => navigate("QuizLevelSelector", {chapter: "Introduction to Computers, Programs, and Java"})}
                />
                <Button
                    title="Elementary Programming"
                    onPress={() => navigate("QuizLevelSelector", {chapter: "Elementary Programming"})}
                />
                <Button
                    title="Selections"
                    onPress={() => navigate("QuizLevelSelector", {chapter: "Selections"})}
                />
                <Button
                    title="Loops"
                    onPress={() => navigate("QuizLevelSelector", {chapter: "Loops"})}
                />
                <Button
                    title="Methods"
                    onPress={() => navigate("QuizLevelSelector", {chapter: "Methods"})}
                />
                <Button
                    title="Single-Dimensional Arrays"
                    onPress={() => navigate("QuizLevelSelector", {chapter: "Single-Dimensional Arrays"})}
                />
                <Button
                    title="Objects and Classes"
                    onPress={() => navigate("QuizLevelSelector", {chapter: "Objects and Classes"})}
                />
                <Button
                    title="Strings"
                    onPress={() => navigate("QuizLevelSelector", {chapter: "Strings"})}
                />
                <Button
                    title="Thinking in Objects"
                    onPress={() => navigate("QuizLevelSelector", {chapter: "Thinking in Objects"})}
                />
                <Button
                    title="Inheritance and Polymorphism"
                    onPress={() => navigate("QuizLevelSelector", {chapter: "Inheritance and Polymorphism"})}
                />

            </View>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    video: {
        width: Dimensions.get('window').width,
        aspectRatio: 16 / 9,
        padding: 10,
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowOffset: {width: 12, height: 12,},
        elevation: 4


    }
});
