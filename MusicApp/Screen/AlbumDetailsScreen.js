import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function AlbumDetailsScreen({ route, navigation }) {
    const { albumId } = route.params; // Lấy albumId từ navigation params
    const [album, setAlbum] = useState(null); // Lưu thông tin album
    const [songs, setSongs] = useState([]); // Lưu danh sách bài hát thuộc album

    useEffect(() => {
        fetchAlbumDetails();
    }, []);

    const fetchAlbumDetails = async () => {
        try {
            const albumResponse = await axios.get(`http://localhost:3000/album/${albumId}`);
            const songsResponse = await axios.get(`http://localhost:3000/album/${albumId}/songs`);
            setAlbum(albumResponse.data);
            setSongs(songsResponse.data);
        } catch (error) {
            console.error('Error fetching album details:', error);
        }
    };

    const renderSongItem = ({ item }) => (
        <TouchableOpacity style={styles.songItem} onPress={() => alert(`Play: ${item.Title}`)}>
            <Image source={{ uri: item.SongImg || 'https://via.placeholder.com/150' }} style={styles.songImage} />
            <View style={styles.songDetails}>
                <Text style={styles.songTitle}>{item.Title}</Text>
                <Text style={styles.songArtist}>{item.ArtistName}</Text>
            </View>
        </TouchableOpacity>
    );

    if (!album) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.albumHeader}>
                <Image source={{ uri: album.CoverImage || 'https://via.placeholder.com/150' }} style={styles.albumImage} />
                <View style={styles.albumDetails}>
                    <Text style={styles.albumTitle}>{album.Title}</Text>
                    <Text style={styles.albumArtist}>{album.ArtistName}</Text>
                    <Text style={styles.albumInfo}>{`${songs.length} songs • ${album.ReleaseDate}`}</Text>
                </View>
            </View>
            <FlatList
                data={songs}
                keyExtractor={(item) => item.Id.toString()}
                renderItem={renderSongItem}
                contentContainerStyle={styles.songList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    albumHeader: { flexDirection: 'row', padding: 20, alignItems: 'center' },
    albumImage: { width: 100, height: 100, borderRadius: 10 },
    albumDetails: { marginLeft: 20, flex: 1 },
    albumTitle: { fontSize: 20, fontWeight: 'bold' },
    albumArtist: { fontSize: 16, color: 'gray' },
    albumInfo: { fontSize: 14, color: 'gray', marginTop: 5 },
    songList: { padding: 20 },
    songItem: { flexDirection: 'row', marginBottom: 15, alignItems: 'center' },
    songImage: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
    songDetails: { flex: 1 },
    songTitle: { fontSize: 16 },
    songArtist: { fontSize: 14, color: 'gray' },
});
