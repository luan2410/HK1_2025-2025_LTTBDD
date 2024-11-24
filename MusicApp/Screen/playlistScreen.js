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
    const filteredTabData = libraryData.filter((item) => item.type === tab);
    setFilteredData(filteredTabData);
  };

  const renderLibraryItem = ({ item }) => (
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
        <TouchableOpacity>
          <Text style={styles.likeButton}>💙</Text>
        </TouchableOpacity>
      )}
      {item.type === 'album' && (
        <TouchableOpacity>
          <Text style={styles.arrowButton}>›</Text>
        </TouchableOpacity>
      )}
    </View>
  );

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
            style={[
              styles.tabItem,
              activeTab === tab && styles.activeTabItem,
            ]}
            onPress={() => handleTabChange(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
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
    marginBottom: 15,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeTabItem: {
    backgroundColor: '#000',
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
});

export default PlaylistScreen;
