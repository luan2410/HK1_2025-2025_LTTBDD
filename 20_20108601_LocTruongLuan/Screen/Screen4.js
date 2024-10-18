import { StyleSheet, Text, View , Image, FlatList} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native';

const product = [
  {id:1,
    name: 'donut',
    image:require('../assets/DATA/Container7(3).png'),
    price: 2.99,
    rating: 4.5,
    title:'Fluffy Donuts with Irresistible Toppings!'
  },
  {id:2,
    name: 'peach',
    image:require('../assets/DATA/Container7(1).png'),
    price: 3.99,
    rating: 3.5,
    title:'Ripe and Sweet Peaches for You !!!'
  },
  {id:3,
    name: 'cherry',
    image:require('../assets/DATA/Container7.png'),
    price: 4.99,
    rating: 2.5,
    title:'Fresh and Juicy Cherries for Summer'
  },
  {id:1,
    name: 'Blue Candy',
    image:require('../assets/DATA/Container7(2).png'),
    price: 5.99,
    rating: 3.5,
    title:'Delicious Sweets to Satisfy Your Cra'
  },
];
const size =['XS','S','M','L','XL'];
const quantity=['1','2','3','4','5','6'];
export default function Screen4() {
  const [stProduct,setstProduct] = useState(product[0]);
  const [stSize,setstSize] = useState(size[1]);
  const [sProduct,setProduct] = useState(quantity[0]);
  const render =({item}) =>(
    <TouchableOpacity onPress={() => setstProduct(item)}>
        <Image source={item.image} style={styles.produtimg}  />
    </TouchableOpacity>
  )
  return (
    <View style={styles.container}>

      <View style={styles.view1} >
            <Text style={styles.text}>{stProduct.name}</Text>
            <Image source={stProduct.image} />
            <FlatList data={product} renderItem={render} keyExtractor={(item)=> item.id.toString} horizontal >

            </FlatList>
      </View>
      <View style={styles.view2}>
            <View style={{flexDirection: 'row', alignItems:'center', alignSelf: 'flex-start', marginLeft: 19  }}>
                  <Text style={{color: 'aqua',fontWeight:'bold',fontSize: 30}}>${stProduct.price}</Text>
                  <Text style={{backgroundColor:'pink', color: 'red', width:70 , height: 20, marginLeft:20, borderRadius: 5 }}>Buy 1 get 1</Text>
            </View>
            <View style={{marginTop:10}}>
                  <View style={{flexDirection:'row',alignItems:'center',}}>
                      <View style={{flexDirection:'column'}}>
                          <Text style={styles.text}>{stProduct.name}</Text>
                          <Text>{stProduct.title}</Text>
                      </View>

                      <View style={{marginLeft:10, flexDirection:'row', alignSelf:'flex-end'}}>
                        <Image source={require('../assets/DATA/Rating3.png')}/>
                        <Text>{stProduct.rating}</Text>
                      </View>
                     
                  </View>
                  
            </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'red',
    margin:15,

  },
  view1:{
    flex:5,
    alignItems: 'center',
    alignSelf:'center',
  

  },
  view2:{
    flex:5,
    width: '85%',
    alignItems:'center',
    paddingTop:20,
  },
  text:{
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'flex-start',

  },
  produtimg:{
      width:  75,
      height: 75,
      marginHorizontal:5,
      margin:5,
      borderRadius: 15,
  }


})