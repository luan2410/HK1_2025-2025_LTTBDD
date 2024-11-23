import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Screen4() {
  const [account, setAccount] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/accounts')
      .then((response) => {
        setAccount(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>ID: {item.id}</Text>
      <Text>User: {item.user}</Text>
      <Text>Password: {item.password}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={account}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
});
