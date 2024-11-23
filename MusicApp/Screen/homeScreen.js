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
import axios from 'axios';

export default function HomeScreen() {
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedChart, setSelectedChart] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

            setSongs(songsResponse.data);
            setFilteredSongs(songsResponse.data);
            setArtists(artistsResponse.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch data from server.');
            console.error('Error fetching data:', error);
        }
    };

    const handleFollow = async (artistId) => {
        try {
            await axios.post(`http://localhost:3000/follow`, { artistId });
            Alert.alert('Follow', `You have followed artist with ID: ${artistId}`);
        } catch (error) {
            Alert.alert('Error', 'Failed to follow the artist.');
            console.error(error);
        }
    };

    const handleSearch = (text) => {
        setSearchText(text);
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

    const openChart = (chartTitle) => {
        setSelectedChart(chartTitle);
        setShowModal(true);
    };

    // const renderHeader = () => (
    //     <View style={styles.header}>
    //         <Image
    //             source={{
    //                 uri: 'https://framerusercontent.com/images/6LBaLrUCjBXzJqW0ZtQeKpdO3GM.png', // Thay bằng avatar từ API
    //             }}
    //             style={styles.avatar}
    //         />
    //         <Text style={styles.greeting}>Good morning, Truong Luan </Text>
    //     </View>
    // );
    const renderHeader = () => (
      <View style={styles.header}>
          {/* Góc trái: Logo */}
          <Image
              source={require('../assets/all_images/Home - Audio Listing/Image36.png')} // Thay bằng đường dẫn logo của bạn
              style={styles.logo}
          />
          {/* Giữa: Chào người dùng */}
          <Text style={styles.greeting}>Good morning, Truong Luan</Text>
          {/* Góc phải: Biểu tượng thông báo và hình ảnh người dùng */}
          <View style={styles.rightHeader}>
              <TouchableOpacity>
                  <Image
                      source={require('../assets/all_images/Home - Audio Listing/notifi.png')} // Thay bằng biểu tượng thông báo của bạn
                      style={styles.notificationIcon}
                  />
              </TouchableOpacity>
              <Image
                  source={{
                      uri: 'https://framerusercontent.com/images/6LBaLrUCjBXzJqW0ZtQeKpdO3GM.png', // Ảnh user từ API
                  }}
                  style={styles.avatar}
              />
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
                        <TouchableOpacity style={styles.card}>
                            <Image
                                source={{ uri: 'https://via.placeholder.com/150' }}
                                style={styles.cardImage}
                            />
                            <Text style={styles.cardTitle}>{item.Title}</Text>
                            <Text style={styles.cardSubtitle}>{item.ArtistName}</Text>
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
                <Text style={styles.sectionTitle}>Charts</Text>
                  <FlatList
                      data={[
                          { id: '1', title: 'Top 50 Canada', backgroundColor: '#FFD700' }, // Vàng
                          { id: '2', title: 'Top 50 Global', backgroundColor: '#00BFFF' }, // Xanh dương nhạt
                          { id: '3', title: 'Top 50 Trending', backgroundColor: '#FF4500' }, // Đỏ cam
                      ]}
                      horizontal
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                          <TouchableOpacity
                              style={[
                                  styles.chartCard,
                                  { backgroundColor: item.backgroundColor }, // Áp dụng màu nền riêng
                              ]}
                              onPress={() => openChart(item.title)}
                          >
                              <Text style={styles.chartTitle}>{item.title}</Text>
                              <Text style={styles.chartSubtitle}>Updated daily</Text>
                          </TouchableOpacity>
                      )}
                      showsHorizontalScrollIndicator={false}
                  />


                {/* Charts Section
                <Text style={styles.sectionTitle}>Charts</Text>
                <FlatList
                    data={[
                        { id: '1', title: 'Top 50 Canada' },
                        { id: '2', title: 'Top 50 Global' },
                        { id: '3', title: 'Top 50 Trending' },
                    ]}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.chartCard}
                            onPress={() => openChart(item.title)}
                        >
                            <Text style={styles.chartTitle}>{item.title}</Text>
                            <Text style={styles.chartSubtitle}>Updated daily</Text>
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                /> */}

                {/* Albums Section */}
                <Text style={styles.sectionTitle}>Trending Albums</Text>
                <FlatList
                    data={songs}
                    horizontal
                    keyExtractor={(item) => item.Id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card}>
                            <Image
                                source={{ uri: 'https://via.placeholder.com/150' }}
                                style={styles.cardImage}
                            />
                            <Text style={styles.cardTitle}>{item.Album}</Text>
                            <Text style={styles.cardSubtitle}>{item.ArtistName}</Text>
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

            {/* Modal for Top 50 */}
            <Modal visible={showModal} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{selectedChart}</Text>
                    <FlatList
                        data={filteredSongs}
                        keyExtractor={(item) => item.Id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.modalItem}>
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/50' }}
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
    flexDirection: 'row', // Sắp xếp ngang
    alignItems: 'center', // Canh giữa theo trục dọc
    justifyContent: 'space-between', // Khoảng cách đều giữa các phần tử
    paddingVertical: 10,
    paddingHorizontal: 15,
      },
    logo: {
        width: 30,
        height: 30,
        borderRadius: 5, // Tùy chọn bo góc cho logo
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1, // Cho phép text chiếm khoảng trống còn lại
        textAlign: 'center', // Căn giữa nội dung
    },
    rightHeader: {
        flexDirection: 'row', // Sắp xếp biểu tượng thông báo và avatar ngang hàng
        alignItems: 'center', // Canh giữa theo trục dọc
    },
    notificationIcon: {
        width: 24,
        height: 24, // Kích thước biểu tượng thông báo
        marginRight: 10, // Khoảng cách giữa biểu tượng thông báo và avatar
    },
    // avatar: {
    //     width: 40,
    //     height: 40, // Kích thước avatar
    //     borderRadius: 20, // Làm avatar tròn
    // },

    // header: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     margin: 20,
    // },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    // greeting: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    // },
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
        width: 150,
        marginRight: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    chartSubtitle: {
        fontSize: 14,
        color: 'gray',
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
    chartCard: {
    width: 150, // Đặt chiều rộng cố định
    height: 150, // Đặt chiều cao cố định
    marginRight: 10, // Khoảng cách giữa các phần tử
    borderRadius: 10, // Bo góc
    padding: 10, // Khoảng cách giữa nội dung và viền
    justifyContent: 'center', // Canh giữa nội dung theo trục dọc
    alignItems: 'center', // Canh giữa nội dung theo trục ngang
},
chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Màu chữ trắng để nổi bật trên nền màu
    textAlign: 'center',
},
chartSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
},

});
