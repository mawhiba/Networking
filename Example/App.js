import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {isLoading: true}
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      this.setState({
        isLoading: false,
        dataSource: responseJson.movies,
      }, function(){

      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={{flex:1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex:1, paddingTop:50, paddingLeft: 20}}>
        <FlatList data={this.state.dataSource}
        renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
        />
      </View>
    );
  }
}