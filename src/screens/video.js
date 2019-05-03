import React from 'react';
import { View, StyleSheet, Dimensions, WebView, Text } from 'react-native';

class YouTube extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      source:''
    }
  }

  render() {

    //let url = {uri: "https://www.youtube.com/embed/"+this.state.id};

    return (
        <View style={styles.video}>
          <WebView
              source={{uri: "https://www.youtube.com/embed/"+this.props.videoId}}
              style={{borderRadius:100}}

          />
          <Text>{this.source}</Text>
        </View>
    );
  }
}

export default class Video extends React.Component {

  static navigationOptions = {
    title: "Recommended"
  };

  render() {

    return (
        <View style={{alignItems: 'center'}}><YouTube
            videoId="3u1fu6f8Hto"
            //style={styles.video}
        /></View>
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