import React from 'react';
import {View, Text, Button, StyleSheet, Platform} from 'react-native';
import {createAppContainer, createStackNavigator, StackActions, NavigationActions} from 'react-navigation'; // Version can be specified in package.json
import Video from './src/screens/video';
import Lessons from './src/screens/lessons';
import LessonBasedQuiz from "./src/screens/lessonbasedquiz";
import UserProfile from "./src/screens/userprofile";
import QuizLevelSelector from "./src/screens/difficultylevel"
import RecommendedQuiz from "./src/screens/recommendedquiz"


class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Smart Guru</Text>
                <Button
                    title="Lessons"
                    color={'#FF0000'}
                    style={styles.qsNoLabel}
                    onPress={() => this.props.navigation.push('Lessons')}
                />
                <Button
                    title="Recommended Quiz"
                    onPress={() => this.props.navigation.push('RecommendedQuiz')}
                />
                <Button
                    title="User Profile"
                    onPress={() => this.props.navigation.push('UserProfile')}
                />
                <Button
                    title="Video"
                    onPress={() => this.props.navigation.push('Video')}
                />

            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Details Screen</Text>
            </View>
        );
    }
}

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Video: {
        screen: Video,
    },
    RecommendedQuiz: {
        screen: RecommendedQuiz,
    },
    LessonBasedQuiz: {
        screen: LessonBasedQuiz,
    },
    UserProfile: {
        screen: UserProfile,
    },
    QuizLevelSelector: {
        screen: QuizLevelSelector,
    },

    Lessons: {
        screen: Lessons,
        navigationOptions: () => ({
            title: 'Lessons',
        }),
    },
}, {
    initialRouteName: 'Home',
});

const styles = StyleSheet.create({

    MainContainer: {

        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#e7e9e4',
        padding: 5,
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
        color: '#fff'
    },
});

export default createAppContainer(AppNavigator);