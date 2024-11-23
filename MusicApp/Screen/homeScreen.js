import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    Modal,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Audio } from 'expo-av';

export default function HomeScreen({navigation}) {
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedChart, setSelectedChart] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false); // Trạng thái để mở/đóng modal người dùng
    const [currentSong, setCurrentSong] = useState(null); // Lưu bài hát hiện tại
    const [showPlayerModal, setShowPlayerModal] = useState(false); // Điều khiển hiển thị panel phát nhạc

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        handleSearch(searchText);
    }, [searchText, songs]);

    const fetchData = async () => {
      try {
          const songsResponse = await axios.get('http://localhost:3000/songs');
          const artistsResponse = await axios.get('http://localhost:3000/artists');
  
          setSongs(songsResponse.data || []); // 
          setFilteredSongs(songsResponse.data || []);
          setArtists(artistsResponse.data || []);
      } catch (error) {
          Alert.alert('Error', 'Failed to fetch data from server.');
          console.error('Error fetching data:', error);
      }
    };
  
   
    const handleAvatarPress = () => {
      setShowUserModal(true);
    };
    const handleLogout = () => {
      navigation.reset({
          index: 0,
          routes: [{ name: 'Launch' }],
      });
    };
    const playMusic = async () => {
      if (currentSong?.FilePath) {
          try {
              const { sound } = await Audio.Sound.createAsync({ uri: currentSong.FilePath });
              await sound.playAsync();
          } catch (error) {
              Alert.alert('Error', 'Failed to play music.');
              console.error('Error playing music:', error);
          }
      } else {
          Alert.alert('Error', 'No song selected.');
      }
  };
  
    const handleFollow = async (artistId) => {
      try {
          await axios.post(`http://localhost:3000/follow`, { artistId });
          Alert.alert('Follow', `You have followed artist with ID: ${artistId}`);
      } catch (error) {
          Alert.alert('Error', `Failed to follow artist: ${error.message}`);
          console.error(error);
      }
    };


    const handleSearch = (text) => {
      setSearchText(text);
      if (!songs || songs.length === 0) return; // Nếu không có dữ liệu, không làm gì
      if (text.trim() === '') {
          setFilteredSongs(songs);
      } else {
          const filtered = songs.filter((song) =>
              song.Title.toLowerCase().includes(text.toLowerCase()) ||
              song.ArtistName.toLowerCase().includes(text.toLowerCase())
          );
          setFilteredSongs(filtered);
      }
    };
  
    // ham mo panel  phat nhac 
    const openPlayer = (song) => {
      setCurrentSong(song); // Lưu thông tin bài hát hiện tại, bao gồm hình ảnh
      setShowPlayerModal(true);
    };
  
  
    const openChart = async (chartTitle, chartId) => {
      try {
          setSelectedChart(chartTitle); // Cập nhật tiêu đề của Chart
          setShowModal(true); // Hiển thị modal
  
          // Gọi API lấy bài hát theo Chart
          const response = await axios.get(`http://localhost:3000/charts/${chartId}`);
          setFilteredSongs(response.data || []); // Cập nhật danh sách bài hát trong modal
      } catch (error) {
          Alert.alert('Error', 'Failed to fetch songs for the selected chart.');
          console.error('Error fetching chart data:', error);
      }
    };
    const openAlbum = async (artistId, artistName, artistAvatar) => {
        try {
            setSelectedChart(`Album của ${artistName}`); // Hiển thị tiêu đề album
            setShowModal(true); // Hiển thị modal

            // Gọi API lấy danh sách bài hát theo nghệ sĩ
            const response = await axios.get(`http://localhost:3000/albums/${artistId}`);
            setFilteredSongs(response.data || []); // Cập nhật danh sách bài hát
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch songs for the selected album.');
            console.error('Error fetching album data:', error);
        }
    };

  
    const renderUserModal = () => (
      <Modal
          visible={showUserModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowUserModal(false)}
      >
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <Image
                      source={{
                          uri: 'https://framerusercontent.com/images/6LBaLrUCjBXzJqW0ZtQeKpdO3GM.png',
                      }}
                      style={styles.modalAvatar}
                  />
                  <Text style={styles.modalName}>Truong Luan</Text>
                  <Text style={styles.modalEmail}>luan@example.com</Text>
                  <TouchableOpacity
                      style={styles.backButton}
                      onPress={() => setShowUserModal(false)}
                  >
                      <Text style={styles.backButtonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.logoutButton}
                      onPress={handleLogout}
                  >
                      <Text style={styles.logoutButtonText}>Log Out</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>
    );
  
  
    const renderHeader = () => (
      <View style={styles.header}>
        <Image
            source={require('../assets/all_images/Home - Audio Listing/Image36.png')} // Thay bằng đường dẫn logo của bạn
            style={styles.logo}
        />
        <Text style={styles.greeting}>Good morning, {'\n'} Truong Luan</Text>
        <View style={styles.rightHeader}>
            <TouchableOpacity>
                <Image
                    source={require('../assets/all_images/Home - Audio Listing/notifi.png')} // Biểu tượng thông báo
                    style={styles.notificationIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAvatarPress}>
                <Image
                    source={{
                        uri: 'https://framerusercontent.com/images/6LBaLrUCjBXzJqW0ZtQeKpdO3GM.png',
                    }}
                    style={styles.avatar}
                />
            </TouchableOpacity>
        </View>
      </View>
    );


    const renderSearchBar = () => (
        <TextInput
            style={styles.searchBar}
            placeholder="What do you want to listen to?"
            value={searchText}
            onChangeText={handleSearch}
        />
    );
    const renderPlayerModal = () => (
      <Modal
          visible={showPlayerModal}
          transparent={true}
          animationType="none"
          onRequestClose={() => setShowPlayerModal(false)}
      >
          <TouchableOpacity
              style={styles.modalBackground}
              activeOpacity={1}
              onPress={() => setShowPlayerModal(false)}
          />
          <View style={styles.bottomPlayer}>
              <View style={styles.playerContent}>
                  <Image
                      source={{ uri: currentSong?.SongImg || 'https://via.placeholder.com/150' }}
                      style={styles.playerImage}
                  />
                  <View style={styles.songDetails}>
                      <Text style={styles.playerTitle}>{currentSong?.Title || 'No Title'}</Text>
                      <Text style={styles.playerArtist}>{currentSong?.ArtistName || 'Unknown Artist'}</Text>
                  </View>
                  <View style={styles.playerControls}>
                      <TouchableOpacity>
                          <Text style={styles.controlButton}>⏮</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={playMusic}>
                          <Text style={styles.controlButton}>⏯</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                          <Text style={styles.controlButton}>⏭</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      </Modal>
  );
  
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderHeader()}
                {renderSearchBar()}

                {/* Suggestions Section */}
                <Text style={styles.sectionTitle}>Suggestions for You</Text>
                <FlatList
                    data={filteredSongs}
                    horizontal
                    keyExtractor={(item) => item.Id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => openPlayer(item)}>
                            <Image
                                source={{ uri: item.SongImg || 'https://via.placeholder.com/150' }}
                                style={styles.cardImage}
                            />
                            <Text style={styles.cardTitle}>{item.Title}</Text>
                            <Text style={styles.cardSubtitle}>{item.ArtistName}</Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyText}>No songs found</Text>
                    )}
                    showsHorizontalScrollIndicator={false}
                />


                <Text style={styles.sectionTitle}>Charts</Text>
                <FlatList
                  data={[
                      { id: '1', chartId: '1', image: require('../assets/all_images/Home - Audio Listing/Container31.png'), title: 'Top 50 Canada' },
                      { id: '2', chartId: '2', image: require('../assets/all_images/Home - Audio Listing/Container32.png'), title: 'Top 50 Global' },
                      { id: '3', chartId: '3', image: require('../assets/all_images/Home - Audio Listing/Container33.png'), title: 'Top 50 Trending' },
                  ]}
                  horizontal
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                      <TouchableOpacity
                          style={styles.chartImageContainer}
                          onPress={() => openChart(item.title, item.chartId)} // Gọi hàm với title và chartId
                      >
                          <Image source={item.image} style={styles.chartImage} />
                      </TouchableOpacity>
                  )}
                  showsHorizontalScrollIndicator={false}
                />


                {/* Albums Section */}
                <Text style={styles.sectionTitle}>Trending Albums</Text>
                <FlatList
                    data={artists}
                    horizontal
                    keyExtractor={(item) => item.Id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => openAlbum(item.Id, item.Name, item.Avatar)}
                        >
                            <Image
                                source={{ uri: item.Avatar || 'https://via.placeholder.com/150' }} // Hình ảnh nghệ sĩ
                                style={styles.cardImage}
                            />
                            <Text style={styles.cardTitle}>{item.Name}</Text>
                            <Text style={styles.cardSubtitle}>Trending Album</Text>
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                />


                {/* Artists Section */}
                <Text style={styles.sectionTitle}>Popular Artists</Text>
                <FlatList
                    data={artists}
                    horizontal
                    keyExtractor={(item) => item.Id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.artistCard}>
                            <Image
                                source={{
                                    uri: item.Avatar || 'https://cdn-icons-png.flaticon.com/128/64/64572.png',
                                }}
                                style={styles.artistImage}
                            />
                            <Text style={styles.artistName}>{item.Name}</Text>
                            <TouchableOpacity
                                style={styles.followButton}
                                onPress={() => handleFollow(item.Id)}
                            >
                                <Text style={styles.followText}>Follow</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </ScrollView>
            {renderUserModal()}
            {renderPlayerModal()}       

          <Modal visible={showModal} animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{selectedChart}</Text>
                <FlatList
                    data={filteredSongs}
                    keyExtractor={(item) => item.Id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.modalItem}>
                            <Image
                                source={{ uri: item.SongImg || 'https://via.placeholder.com/150' }}
                                style={styles.modalItemImage}
                            />
                            <View style={styles.modalItemContent}>
                                <Text style={styles.modalItemTitle}>{item.Title}</Text>
                                <Text style={styles.modalItemSubtitle}>{item.ArtistName}</Text>
                            </View>
                        </View>
                    )}
                />
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowModal(false)}
                >
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
          </Modal>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    logo: {
        width: 30,
        height: 30,
        borderRadius: 5,
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    rightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 20,
    },
    modalName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalEmail: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#000',
    },
    logoutButton: {
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    chartImageContainer: {
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    chartImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
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
    bottomPlayer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 150,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        padding: 10,
    },
    playerImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    songDetails: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    playerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    playerArtist: {
        fontSize: 14,
        color: 'gray',
    },
    playerControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 100,
    },
    controlButton: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1DB954',
    },
    artistCard: {
        alignItems: 'center',
        marginRight: 10,
    },
    artistImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 5,
    },
    artistName: {
        fontSize: 14,
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    followButton: {
        marginTop: 5,
        backgroundColor: '#1DB954',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    followText: {
        color: '#fff',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalItem: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    modalItemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
    },
    modalItemContent: {
        flex: 1,
    },
    modalItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalItemSubtitle: {
        fontSize: 14,
        color: 'gray',
    },

    closeButton: {
        marginTop: 20,
        backgroundColor: '#1DB954',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },

});
