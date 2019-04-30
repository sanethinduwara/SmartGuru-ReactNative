import React from 'react';
import {View, StyleSheet, Dimensions, WebView, Text, Image, Platform, processColor} from 'react-native';
import {StackNavigator, SafeAreaView} from 'react-navigation';
import {PieChart} from 'react-native-svg-charts'
import {CheckBox, Icon} from "react-native-elements";

export default class UserProfile extends React.Component {

    keys = [];
    values = [];
    colors = [];
    static navigationOptions = {
        title: 'Profile',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedSlice: {
                label: '',
                value: 0
            },
            labelWidth: 0
        }
    }

    componentDidMount() {

    }

    showIndications = (array) => {
        return array.map((key, index) => {
            return (
                <View style={styles.indicationRow} key={index}>
                    <Icon
                        name='square'
                        type='font-awesome'
                        color={this.colors[index]}
                        size={20}/>
                    <Text style={{marginLeft: 5}}>{key}</Text>
                </View>
            )
        })
    };

    render() {
        const {labelWidth, selectedSlice} = this.state;
        const {label, value} = selectedSlice;

        this.keys = ['Introduction', 'Loops', 'Selections', 'Methods', 'Arrays'];
        this.values = [10, 50, 20, 40, 20];
        this.colors = ['#4466c6', '#e93850', '#f8a105', '#8cc63f', '#169d93'];

        const data = this.keys.map((key, index) => {
            return {
                key,
                value: this.values[index],
                svg: {fill: this.colors[index]},
                arc: {outerRadius: (70 + this.values[index]) + '%', padAngle: label === key ? 0.1 : 0},
                //onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })


            }
        });
        const deviceWidth = Dimensions.get('window').width;

        return (
            <View style={styles.MainContainer}>
                <View style={styles.DetailContainer}>
                    <Image
                        style={styles.ProfileImage}
                        source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    />
                    <Text style={styles.ProfileName}>Saneth Induwara</Text>
                </View>
                <View style={styles.CardView}>
                    <Text>Skills</Text>
                    <View style={styles.HorizontalLine}/>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <PieChart
                            style={{height: 250, width: 250}}
                            outerRadius={'80%'}
                            innerRadius={'45%'}
                            data={data}
                        />

                        <View style={{marginLeft: 10}}>
                            {this.showIndications(this.keys)}
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        alignItems: 'center'
        //padding: 5,
    },
    ProfileImage: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 100
    },
    ProfileName: {
        fontSize: 18,
        marginTop: 5
    },
    DetailContainer: {
        alignItems: 'center',
        backgroundColor: '#d5d5d5',
        padding: 10,
        width: "100%"
    },
    CardView: {
        width: "100%",
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 30,
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOpacity: 0,
        shadowOffset: {width: 12, height: 12,},
        margin: 10,
        elevation: 4
    },
    HorizontalLine: {
        height: 0.5,
        width: "100%",
        backgroundColor: "#c9c9c9",
        marginTop: 5,
        alignItems: 'stretch'
    },
    container: {
        flex: 1,
    },
    chart: {
        //flex: 1
    },
    indicationRow: {
        flexDirection: 'row'
    }
});
