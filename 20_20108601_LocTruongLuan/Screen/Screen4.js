import { StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';

const product = [
  { id: 1, name: 'donut', image: require('../assets/DATA/Container7(3).png'), price: 2.99, rating: 4.5, title: 'Fluffy Donuts with Irresistible Toppings!' },
  { id: 2, name: 'peach', image: require('../assets/DATA/Container7(1).png'), price: 3.99, rating: 3.5, title: 'Ripe and Sweet Peaches for You !!!' },
  { id: 3, name: 'cherry', image: require('../assets/DATA/Container7.png'), price: 4.99, rating: 2.5, title: 'Fresh and Juicy Cherries for Summer' },
  { id: 4, name: 'Blue Candy', image: require('../assets/DATA/Container7(2).png'), price: 5.99, rating: 3.5, title: 'Delicious Sweets to Satisfy Your Cra' },
];

const size = ['XS', 'S', 'M', 'L', 'XL'];
const quantity = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default function Screen4() {
  const [stProduct, setstProduct] = useState(product[0]);
  const [stSize, setstSize] = useState(size[1]);
  const [squantity, setquantity] = useState(quantity[0]);
  const [total, setTotal] = useState(stProduct.price.toFixed(2));

  const render = ({ item }) => (
    <TouchableOpacity onPress={() => setstProduct(item)}>
      <Image source={item.image} style={styles.produtimg} />
    </TouchableOpacity>
  );

  const renderSize = ({ item }) => (
    <TouchableOpacity onPress={() => setstSize(item)}>
      <Text
        style={[
          styles.txtSize,
          {
            backgroundColor: stSize === item ? 'aqua' : 'white',
            color: stSize === item ? 'white' : 'black',
          },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const cong = () => {
    const newQuantity = parseInt(squantity) + 1;
    setquantity(newQuantity.toString());
    setTotal((newQuantity * stProduct.price).toFixed(2));
  };

  const tru = () => {
    const newQuantity = Math.max(1, parseInt(squantity) - 1);
    setquantity(newQuantity.toString());
    setTotal((newQuantity * stProduct.price).toFixed(2));
  };

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.text}>{stProduct.name}</Text>
        <Image source={stProduct.image} />
        <FlatList
          data={product}
          renderItem={render}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
      </View>
      <View style={styles.view2}>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
          <Text style={{ color: 'aqua', fontWeight: 'bold', fontSize: 30 }}>${stProduct.price}</Text>
          <Text style={{ backgroundColor: 'pink', color: 'red', width: 70, height: 20, borderRadius: 5, marginLeft: 10 }}>Buy 1 get 1</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.text}>{stProduct.name}</Text>
              <Text>{stProduct.title}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginLeft: 15 }}>
              <Image source={require('../assets/DATA/Rating3.png')} />
              <Text>{stProduct.rating}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10, alignSelf: 'flex-start' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Size</Text>
          <FlatList data={size} renderItem={renderSize} horizontal keyExtractor={(item) => item} />
        </View>
        <View><Text>Quantity</Text></View>
        <View style={{ marginTop: 5,alignItems:'center', flexDirection:'row',}}>
          <View style={{ alignItems: 'flex-start' ,flexDirection:'row'}}>
            <TouchableOpacity onPress={tru} style={styles.btnct}><Text>-</Text></TouchableOpacity>
            <Text style={{fontSize:20}}>{squantity}</Text>
            <TouchableOpacity onPress={cong} style={styles.btnct} ><Text>+</Text></TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginLeft:'55%', alignItems:'center',}}>
            <Text style={{color: 'gray'}}>Total</Text>
            <Text style={styles.text}>${total}</Text>
          </View>
        </View>
        <View>
          <View style={{borderBottomColor: '#000',borderBottomWidth: 1, }}/>
          <Text style={styles.mag}>Size guide</Text>
          <View style={{borderBottomColor: '#000',borderBottomWidth: 1, }}/>
          <Text style={styles.mag}>Reviews 99 </Text>
          <View style={{borderBottomColor: '#000',borderBottomWidth: 1, }}/>
          <TouchableOpacity onPress={()=> Alert.alert('đã thêm vào giỏ hàng')}  >
          <View style={{ alignItems:'center', backgroundColor:'aqua',height: 40,justifyContent: 'center', marginTop:5, borderRadius: 5}}> 
          <Text style={{color: 'white',fontWeight: 'bold',}}>Add to Cart</Text>
          </View>
             
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
  },
  view1: {
    flex: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  view2: {
    flex: 5,
    paddingTop: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'flex-start',
  },
  produtimg: {
    width: 75,
    height: 65,
    marginHorizontal: 5,
    margin: 5,
    borderRadius: 15,
  },
  txtSize: {
    borderWidth: 1,
    height: 25,
    width: 25,
    borderColor: 'gray',
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
  },
  btnct:{
    width: 23,
    height: 23,
    color:'white',
    backgroundColor:'aqua',
    borderRadius: 10,
    fontSize: 20,
    alignItems:'center',
    justifyContent: 'center',
  }
  ,mag:{
    marginTop: 5,
    marginBottom: 5
  }
});