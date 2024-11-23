import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const suggestions = [
    { id: '1', title: 'Reflection', artist: 'Christina Aguilera', image: 'path/to/reflection.jpg' },
    { id: '2', title: 'In The Stars', artist: 'Benson Boone', image: 'path/to/in_the_stars.jpg' },
];

const charts = [
    { id: '1', title: 'Top 50 Canada' },
    { id: '2', title: 'Top 50 Global' },
];

const trendingAlbums = [
    { id: '1', title: 'ME', artist: 'Jessica Gonzalez', image: 'path/to/me.jpg' },
    { id: '2', title: 'Magna Nost', artist: 'Brian Thomas', image: 'path/to/magna_nost.jpg' },
];

const popularArtists = [
    { id: '1', name: 'Jennifer Wilson', image: 'path/to/jennifer.jpg' },
    { id: '2', name: 'Elizabeth Hall', image: 'path/to/elizabeth.jpg' },
];

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Good morning, Ashley Scott</Text>
            <Text style={styles.sectionTitle}>Suggestions for You</Text>
            <FlatList
                data={suggestions}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSubtitle}>{item.artist}</Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.sectionTitle}>Charts</Text>
            <FlatList
                data={charts}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.chartCard}>
                        <Text style={styles.chartTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.sectionTitle}>Trending Albums</Text>
            <FlatList
                data={trendingAlbums}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSubtitle}>{item.artist}</Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.sectionTitle}>Popular Artists</Text>
            <FlatList
                data={popularArtists}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.artistCard}>
                        <Image source={{ uri: item.image }} style={styles.artistImage} />
                        <Text style={styles.artistName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    card: {
        width: 150,
        marginRight: 10,
    },
    cardImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    cardSubtitle: {
        fontSize: 14,
        color: 'gray',
    },
    chartCard: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginRight: 10,
    },
    chartTitle: {
        fontSize: 16,
    },
    artistCard: {
        alignItems: 'center',
        marginRight: 10,
    },
    artistImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    artistName: {
        fontSize: 14,
        marginTop: 5,
    },
});
