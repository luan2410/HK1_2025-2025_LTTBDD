import { StyleSheet, Text, View  , Image, FlatList} from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'

export default function Screen2() {
    const data = [
        { id: '1', category: 'Smartphone', name: 'iPhone 12', price: 899, note: 'bestseller', img: require('../assets/Data/1.png') },
        { id: '2', category: 'Smartphone', name: 'Samsung Galaxy S21', price: 799, note: 'bestseller', img: require('../assets/Data/2.png')},
        { id: '3', category: 'Smartphone', name: 'Google Pixel 6', price: 699, note: 'best matched', img: require('../assets/Data/3.png') },
        { id: '4', category: 'Smartphone', name: 'iPhone 13', price: 899, note: 'bestseller', img: require('../assets/Data/1.png') },
        { id: '5', category: 'Smartphone', name: 'Samsung Galaxy S22', price: 799, note: 'bestseller', img: require('../assets/Data/2.png')},
        { id: '6', category: 'Smartphone', name: 'Google Pixel 5', price: 699, note: 'best matched', img: require('../assets/Data/3.png') },
        { id: '7', category: 'Smartphone', name: 'OnePlus 9 Pro', price: 969, note: 'popular', img: require('../assets/Data/4.png') },
        { id: '8', category: 'Smartphone', name: 'iPhone 12', price: 899, note: 'bestseller', img: require('../assets/Data/1.png') },
        { id: '9', category: 'Smartphone', name: 'Samsung Galaxy S21', price: 799, note: 'bestseller', img: require('../assets/Data/2.png')},
        { id: '10', category: 'Smartphone', name: 'Google Pixel 6', price: 699, note: 'best matched', img: require('../assets/Data/3.png') },
        { id: '11', category: 'Smartphone', name: 'iPhone 13', price: 899, note: 'bestseller', img: require('../assets/Data/1.png') },
        { id: '12', category: 'Smartphone', name: 'Samsung Galaxy S22', price: 799, note: 'bestseller', img: require('../assets/Data/2.png')},
        { id: '13', category: 'Smartphone', name: 'Google Pixel 5', price: 699, note: 'best matched', img: require('../assets/Data/3.png') },
        { id: '14', category: 'Smartphone', name: 'OnePlus 9 Pro', price: 969, note: 'popular', img: require('../assets/Data/4.png') },
        { id: '15', category: 'iPad', name: 'iPad Pro 12-inch', price: 799, note: 'bestseller', img: require('../assets/Data/ipad.png')  },
        { id: '16', category: 'iPad', name: 'iPad Air 4', price: 599, note: 'best matched', img: require('../assets/Data/ipad.png')  },
        { id: '17', category: 'iPad', name: 'iPad Pro 13-inch', price: 799, note: 'bestseller', img: require('../assets/Data/ipad.png')  },
        { id: '18', category: 'iPad', name: 'iPad Air 5', price: 599, note: 'best matched', img: require('../assets/Data/ipad.png')  },
        { id: '19', category: 'iPad', name: 'iPad Pro 14-inch', price: 799, note: 'bestseller', img: require('../assets/Data/ipad.png')  },
        { id: '20', category: 'iPad', name: 'iPad Air 6', price: 599, note: 'popular', img: require('../assets/Data/ipad.png')  },
        { id: '21', category: 'iPad', name: 'iPad Pro 12-inch', price: 799, note: 'bestseller', img: require('../assets/Data/ipad.png')  },
        { id: '22', category: 'iPad', name: 'iPad Air 4', price: 599, note: 'best matched', img: require('../assets/Data/ipad.png')  },
        { id: '23', category: 'iPad', name: 'iPad Pro 13-inch', price: 799, note: 'bestseller', img: require('../assets/Data/ipad.png')  },
        { id: '24', category: 'iPad', name: 'iPad Air 5', price: 599, note: 'best matched', img: require('../assets/Data/ipad.png')  },
        { id: '25', category: 'iPad', name: 'iPad Pro 14-inch', price: 799, note: 'bestseller', img: require('../assets/Data/ipad.png')  },
        { id: '26', category: 'iPad', name: 'iPad Air 6', price: 599, note: 'popular', img: require('../assets/Data/ipad.png')  },
        { id: '27', category: 'MacBook', name: 'MacBook Air M2', price: 3999, note: 'popular', img: require('../assets/Data/macbook.png')  },
        { id: '28', category: 'MacBook', name: 'MacBook Pro 16-inch', price: 2499, note: 'bestseller', img: require('../assets/Data/macbook.png')  },
        { id: '29', category: 'MacBook', name: 'MacBook Air M3', price: 1999, note: 'popular', img: require('../assets/Data/macbook.png')  },
        { id: '30', category: 'MacBook', name: 'MacBook Pro 17-inch', price: 2699, note: 'bestseller', img: require('../assets/Data/macbook.png')  },
        { id: '31', category: 'MacBook', name: 'MacBook Air M4', price: 1999, note: 'best matched', img: require('../assets/Data/macbook.png')  },
        { id: '32', category: 'MacBook', name: 'MacBook Pro 18-inch', price: 2599, note: 'bestseller', img: require('../assets/Data/macbook.png')  },
        { id: '33', category: 'MacBook', name: 'MacBook Air M2', price: 3999, note: 'popular', img: require('../assets/Data/macbook.png')  },
        { id: '34', category: 'MacBook', name: 'MacBook Pro 16-inch', price: 2499, note: 'bestseller', img: require('../assets/Data/macbook.png')  },
        { id: '35', category: 'MacBook', name: 'MacBook Air M3', price: 1999, note: 'popular', img: require('../assets/Data/macbook.png')  },
        { id: '36', category: 'MacBook', name: 'MacBook Pro 17-inch', price: 2699, note: 'bestseller', img: require('../assets/Data/macbook.png')  },
        { id: '37', category: 'MacBook', name: 'MacBook Air M4', price: 1999, note: 'best matched', img: require('../assets/Data/macbook.png')  },
        { id: '38', category: 'MacBook', name: 'MacBook Pro 18-inch', price: 2599, note: 'bestseller', img: require('../assets/Data/macbook.png')  },]
        const [sltCatetory,setCatetory] = useState('Smartphone');
        const [sltFiller,setFiller] =useState('bestseller');
        const [showall,setshowall] = useState('false');
        // loc san pham 
        const fillerdata =data.filter(item => item.category == sltCatetory&& item.note == sltFiller);
        const display = showall ? fillerdata : fillerdata.slice(0,4);
  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Text style={[styles.txt1 ] }> {'<   '} Electronics</Text>
        <Image source={require('..//assets/Data/codicon_account.png')} style={{marginLeft: 'auto'}} />
      </View>
      <View>
       <View style={styles.viewsearch}>
            <Image source={require('../assets/Data/search.png')} />
            <TextInput placeholder='Search' style={styles.txtip}></TextInput>
       </View>
       <View style={{flexDirection:'row', alignContent:'center'}}>
            <Text style={styles.txt1}>Categories</Text>
            <Text style={{marginLeft: 'auto', color:'gray'}}>See all</Text>
       </View>
       <View style={{flexDirection:'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={()=> setCatetory('Smartphone')} >
            <Image source={require('../assets/Data/smart.png')} style={styles.imgCate}  />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setCatetory('iPad')}>
            <Image source={require('../assets/Data/ipad.png')} style={styles.imgCate} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setCatetory('MacBook')}>
            <Image source={require('../assets/Data/macbook.png')} style={styles.imgCate} />
          </TouchableOpacity>
       </View>
       <View style={{flexDirection:'row', justifyContent: 'space-between' }} >
          <TouchableOpacity onPress={()=> setFiller('bestseller')}>
            <Text style={styles.txtCate} >Best seller</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setFiller('best matched')}>
            <Text style={styles.txtCate}>Best Matched</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setFiller('popular')}>
            <Text style={styles.txtCate} >Popular</Text>
          </TouchableOpacity>
       </View>
        <View>
          <FlatList data={display} key={item => item.id} renderItem={({item}) =>( 
          <View style={{flexDirection:'row', alignItems: 'center'}}>
            <Image source={item.img}  />
            <View>
              <Text >{item.name}</Text>
              <Image source={require('../assets/Data/Rating5.png')}/>
            </View>
            <Text style={{marginLeft: 'auto', fontWeight: 'bold', fontSize: 20}}>${item.price}</Text>
          </View> )} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        margin: 15,
        backgroundColor:'#fff',
        flex:1,

    },
    header:{
        flexDirection: 'row',
        marginBottom: 25,
       alignItems: 'center',
    },
    txt1:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewsearch:{backgroundColor:'pink',
         borderRadius: 5,
          flexDirection: 'row',
          marginBottom:25} 
    ,
    txtip:{width: '100%',
         height: '100%',
          marginLeft: 5,
          color: 'gray', 
          fontSize:17},
    imgCate:{
      width: 90,
      height:90,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'violet'
      ,
      borderRadius: 5,
    }
    ,
     txtCate:{
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      marginTop: 10,
      width: 90,
      backgroundColor: 'gray',
       borderRadius: 5,


     }
    
})