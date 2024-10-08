import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from 'react';

export default function App({ navigation }) {
    const [data, setData] = useState([
        { key: '1', type: 'Vegetable', name: 'Apple', price: '28.00', image: require('../assets/data/Image 101.png') },
        { key: '2', type: 'Vegetable', name: 'Peach', price: '28.00', image: require('../assets/data/Image 102.png') },
        { key: '3', type: 'Vegetable', name: 'Pear', price: '28.00', image: require('../assets/data/Image 103.png') },
        { key: '4', type: 'Vegetable', name: 'Pear', price: '28.00', image: require('../assets/data/Image 105.png') },
        { key: '5', type: 'Vegetable', name: 'Orginz', price: '28.00', image: require('../assets/data/Image 106.png') },
        { key: '6', type: 'Vegetable', name: 'Peach', price: '28.00', image: require('../assets/data/Image 107.png') },
        { key: '7', type: 'Seafood', name: 'Seafood_1', price: '28.00', image: require('../assets/data/Image 95.png') },
        { key: '8', type: 'Seafood', name: 'Seafood_2', price: '28.00', image: require('../assets/data/Image 95.png') },
        { key: '9', type: 'Seafood', name: 'Seafood_3', price: '28.00', image: require('../assets/data/Image 95.png') },
        { key: '10', type: 'Seafood', name: 'Seafood_4', price: '28.00', image: require('../assets/data/Image 95.png') },
        { key: '11', type: 'Seafood', name: 'Seafood_5', price: '28.00', image: require('../assets/data/Image 95.png') },
        { key: '12', type: 'Drink', name: 'Drink_1', price: '28.00', image: require('../assets/data/Image_96.png') },
        { key: '13', type: 'Drink', name: 'Drink_2', price: '28.00', image: require('../assets/data/Image_96.png') },
        { key: '14', type: 'Drink', name: 'Drink_3', price: '28.00', image: require('../assets/data/Image_96.png') },
        { key: '15', type: 'Drink', name: 'Drink_4', price: '28.00', image: require('../assets/data/Image_96.png') },
        { key: '16', type: 'Drink', name: 'Drink_5', price: '28.00', image: require('../assets/data/Image_96.png') },
    ]);

    const [type, setType] = useState('Vegetable');
    const [initialItemCount, setInitialItemCount] = useState(6);

    return (
        <ScrollView stickyHeaderIndices={[0]}>
            {/* Header  */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.navigate("screen1") }}>
                    <Image source={require('../assets/data/Image 182.png')} style={styles.headerImage} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
            />

            {/* Category Buttons */}
            <View style={styles.categoryContainer}>
                <CategoryButton title="Vegetable" selected={type === 'Vegetable'} onPress={() => { setType('Vegetable'); setInitialItemCount(6); }} />
                <CategoryButton title="Seafood" selected={type === 'Seafood'} onPress={() => { setType('Seafood'); setInitialItemCount(6); }} />
                <CategoryButton title="Drinks" selected={type === 'Drink'} onPress={() => { setType('Drink'); setInitialItemCount(6); }} />
            </View>

            {/* Title and See All Button */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Order your favorite</Text>
                <TouchableOpacity onPress={() => { setInitialItemCount(data.length); }}>
                    <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
            </View>

            {/* FlatList of Items */}
            <FlatList
                data={data.filter((item) => item.type === type).slice(0, initialItemCount)}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => { navigation.navigate('screen3'); }}>
                            <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
                        </TouchableOpacity>
                        <Text style={styles.itemName}>{item.name}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.key}
                numColumns={2} // Thêm dòng này để hiển thị 2 cột
            />


        </ScrollView>
    );
}

// Category Button Component
const CategoryButton = ({ title, selected, onPress }) => (
    <TouchableOpacity
        style={[styles.categoryButton, { backgroundColor: selected ? 'green' : 'white' }]}
        onPress={onPress}
    >
        <Text style={styles.categoryButtonText}>{title}</Text>
    </TouchableOpacity>
);

// Styles
const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    headerImage: {
        width: 25,
        height: 25,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        width: '90%',
        height: 50,
        alignSelf: 'center',
        marginTop: 20,
        paddingLeft: 20,
        fontSize: 20,
    },
    categoryContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    categoryButton: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 40,
    },
    categoryButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    titleText: {
        fontSize: 25,
        color: 'green',
    },
    seeAllText: {
        fontSize: 25,
        color: 'pink',
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%', // Đặt width nhỏ hơn 50% để có khoảng trống giữa các cột
        marginHorizontal: '1%', // Đặt margin nhỏ giữa các cột
        marginVertical: 10,
        padding: 15,
    },

    itemImage: {
        width: 150,
        height: 150,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
