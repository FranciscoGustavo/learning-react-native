import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, SectionList, FlatList, Pressable, Alert } from 'react-native';
import colors from 'born/src/res/colors';
import HTTP from 'born/src/libs/http';
import CoinMarketItem from 'born/src/components/coinDetail/CoinMarketItem';
import Storage from 'born/src/libs/storage';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false
  }

  toggleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  }

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;

    const stored = await Storage.instance.store(key, coin);

    console.log('stored', stored);

    if (stored) {
      this.setState({ isFavorite: true });
    }
  }

  removeFavorite = async () => {

    Alert.alert("Remove favorite", "Are you sure?", [
      {
        text: "cancel",
        onPress: () => {},
        style: "cancel"
      },
      {
        text: "Remove",
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`;
          await Storage.instance.remove(key);
          this.setState({ isFavorite: false });
        },
        style: "destructive"
      }
    ]);

  }

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;
      const favStr = await Storage.instance.get(key);
      if(favStr != null) {
        this.setState({ isFavorite: true });
      }

    } catch(err) {
      console.log("get favorites err", err);
    }

  }

  getSymbolIcon = (name) => {

    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }

  }

  getSections = (coin) => {
    const  section = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd]
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24]
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h]
      }
    ];

    return section;
  }

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await HTTP.instance.get(url);
    this.setState({ markets });
  }

  componentDidMount() {
    const { coin } = this.props.route.params;
    this.props.navigation.setOptions({ title: coin.symbol })
    this.getMarkets(coin.id);
    this.setState({ coin }, () => {
      this.getFavorite();
    });
  }

  render() {
    
    const { coin, markets, isFavorite } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImage}
              source={{ uri: this.getSymbolIcon(coin.name) }}
              /> 
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>
          
          <Pressable 
            onPress={this.toggleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite
                ? styles.btnFavoriteRemove
                : styles.btnFavoriteAdd
            ]}>
            <Text style={styles.btnFavoriteText}>{ isFavorite ? 'Remove favorite' : 'Add favorites'}</Text>
          </Pressable>
        </View>

        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => 
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          }
          renderSectionHeader={({ section }) => 
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          }
        />

        <Text style={styles.marketTitle}>Markets</Text>

        <FlatList
          style={styles.list}
          data={markets}
          renderItem={({ item }) => <CoinMarketItem item={item}/>}
          horizontal={true}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  titleText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  iconImage: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    color: colors.white,
    fontSize: 14
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketTitle: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8
  },
  btnFavoriteText: {
    color: colors.white
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine
  }
});

export default CoinDetailScreen;
