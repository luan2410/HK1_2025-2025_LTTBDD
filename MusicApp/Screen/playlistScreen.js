import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';

const { width } = Dimensions.get('window');

const PlaylistScreen = () => {
  const [libraryData, setLibraryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('playlists'); // Tab mặc định
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // Playlist đang được chọn
  const [hiddenSongs, setHiddenSongs] = useState(new Set()); // Set để theo dõi các bài nhạc đã ẩn

  // Fetch dữ liệu từ API
  const fetchLibraryData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/library');
      const result = await response.json();
      setLibraryData(result);
      setFilteredData(result); // Khởi tạo dữ liệu được lọc giống dữ liệu ban đầu
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu thư viện:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraryData();
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredData(libraryData); // Reset về dữ liệu ban đầu
    } else {
      setFilteredData(
        libraryData.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  // Lọc theo tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'new tag') {
      // Hiển thị 2 albums và 2 songs ngẫu nhiên cho tab "new tag"
      const randomAlbums = getRandomItems(libraryData.filter((item) => item.type === 'album'), 2);
      const randomSongs = getRandomItems(libraryData.filter((item) => item.type === 'song'), 2);
      setFilteredData([...randomAlbums, ...randomSongs]);
    } else if (tab === 'songs') {
      // Hiển thị 6 bài nhạc ngẫu nhiên cho tab "songs"
      const randomSongs = getRandomItems(libraryData.filter((item) => item.type === 'song'), 6);
      setFilteredData(randomSongs);
    } else if (tab === 'albums') {
      // Hiển thị 2 albums ngẫu nhiên cho tab "albums"
      const randomAlbums = getRandomItems(libraryData.filter((item) => item.type === 'album'), 2);
      setFilteredData(randomAlbums);
    } else if (tab === 'artists') {
      // Hiển thị 4 nghệ sĩ ngẫu nhiên cho tab "artists"
      const randomArtists = getRandomItems(libraryData.filter((item) => item.type === 'artist'), 4);
      setFilteredData(randomArtists);
    } else if (tab === 'playlists') {
      // Hiển thị tất cả playlists (với 2 playlist ngẫu nhiên được chọn)
      const playlists = libraryData.filter((item) => item.type === 'playlist');
      setFilteredData(playlists.slice(0, 2)); // Hiển thị 2 playlist
    }
  };

  // Hàm giúp lấy các phần tử ngẫu nhiên từ danh sách
  const getRandomItems = (arr, count) => {
    let shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Hiển thị bài nhạc trong playlist
  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  // Xử lý ẩn bài nhạc khi nhấn vào trái tim
  const handleLikePress = (songId) => {
    setHiddenSongs(prevState => {
      const newState = new Set(prevState);
      newState.add(songId); // Thêm bài nhạc vào Set (ẩn nó)
      return newState;
    });
  };

  const renderLibraryItem = ({ item }) => {
    // Kiểm tra nếu bài nhạc đã bị ẩn
    if (hiddenSongs.has(item.id)) {
      return null; // Nếu bài nhạc đã bị ẩn, không hiển thị nó
    }

    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.coverImage }} style={styles.coverImage} />
        <View style={styles.details}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        </View>

        {/* Tương tác */}
        {item.type === 'artist' && (
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        )}
        {item.type === 'song' && (
          <TouchableOpacity onPress={() => handleLikePress(item.id)}>
            <Text style={styles.likeButton}>💙</Text>
          </TouchableOpacity>
        )}
        {item.type === 'album' && (
          <TouchableOpacity>
            <Text style={styles.arrowButton}>›</Text>
          </TouchableOpacity>
        )}
        {item.type === 'playlist' && (
          <TouchableOpacity onPress={() => handlePlaylistSelect(item)}>
            <Text style={styles.arrowButton}>▶️</Text> {/* Mũi tên để mở playlist */}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderPlaylistDetails = () => {
    if (!selectedPlaylist) return null;
    const songsInPlaylist = getRandomItems(libraryData.filter((item) => item.playlistId === selectedPlaylist.id && item.type === 'song'), 4);
    return (
      <View style={styles.playlistPanel}>
        <Text style={styles.panelTitle}>Songs in {selectedPlaylist.title}</Text>
        <FlatList
          data={songsInPlaylist}
          renderItem={renderLibraryItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.headerTitle}>Your Library</Text>

      {/* Thanh tìm kiếm */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Tab phân loại */}
      <View style={styles.tabsContainer}>
        {['playlists', 'new tag', 'songs', 'albums', 'artists'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
            onPress={() => handleTabChange(tab)}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách */}
      {loading ? (
        <Text style={styles.loadingText}>Đang tải...</Text>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderLibraryItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Hiển thị chi tiết playlist nếu có */}
      {renderPlaylistDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeTabItem: {
    backgroundColor: '#000',
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  coverImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  followButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  followText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  likeButton: {
    fontSize: 18,
    color: '#1DB954',
  },
  arrowButton: {
    fontSize: 18,
    color: '#ccc',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  playlistPanel: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PlaylistScreen;
