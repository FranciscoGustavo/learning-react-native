import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Http from 'born/src/libs/http';
import CoinsItem from './CoinsItem';
import colors from 'born/src/res/colors';
import CoinsSearch from 'born/src/components/coins/CoinsSearch'

class CoinsScreen extends Component {

  state = {
    coins: [],
    allCoins: [],
    loading: false,
  }

  componentDidMount = () => {
    this.getCoins();
  }

  getCoins = async () => {
    this.setState({ loading: true });
    const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');
    this.setState({ coins: res.data, allCoins: res.data, loading: false });
  
  }

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', { coin });
  }

  handleSearch = (query) => {
    const { allCoins } = this.state;
    const coinsFilter = allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase())
    });

    this.setState({ coins: coinsFilter })
  }

  render() {

    const { coins, loading } = this.state;

    return (
      <View style={styles.container}>
        <CoinsSearch onChange={this.handleSearch} />
        {
          loading 
            ? <ActivityIndicator
                style={styles.loader}
                color="#FFF"
                size="large"
              />
            : null 
        }
        <FlatList
          data={coins}
          renderItem={({ item }) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  titleText: {
    color: '#FFF',
    textAlign: 'center',
  },
  btn: {
    borderRadius: 8, 
    padding: 8,
    margin: 16,
    backgroundColor: 'blue'
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center'
  },
  loader: {
    marginTop: 60
  }
})

export default CoinsScreen;
