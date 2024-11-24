import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const SearchScreen = () => {
  const [activeTab, setActiveTab] = useState('All'); // Tab mặc định
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null); // Index bài hát đang phát
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát nhạc

  // Fetch dữ liệu từ API
  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = `http://localhost:3000/api/search/${activeTab.toLowerCase()}?query=${searchText}`;
      const response = await fetch(endpoint);
      const result = await response.json();

      if (activeTab === 'All') {
        const sortedData = [
          ...result.filter((item) => item.Type === 'Album'),
          ...result.filter((item) => item.Type === 'Artist'),
          ...result.filter((item) => item.Type === 'Song'),
        ];
        setData(sortedData);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, searchText]);

  const handlePlaySong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (currentSongIndex < data.filter((item) => item.Type === 'Song').length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setIsPlaying(true);
    }
  };

  const renderItem = ({ item, index }) => {
    let imageStyle = styles.trackImage;

    if (item.Type === 'Album' || activeTab === 'Albums') {
      imageStyle = styles.albumImage;
    }

    if (item.Type === 'Artist' || activeTab === 'Artists') {
      imageStyle = styles.artistImage;
    }

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => item.Type === 'Song' && handlePlaySong(index)} // Nhấp vào bài nhạc để mở panel
      >
        <Image
          source={{ uri: item.Image || 'https://via.placeholder.com/150' }}
          style={imageStyle}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{item.Title || item.Name}</Text>
          {item.ArtistName && (
            <Text style={styles.subTitle}>Artist: {item.ArtistName}</Text>
          )}
          {item.Duration && (
            <Text style={styles.subTitle}>Duration: {item.Duration}s</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const currentSong =
    currentSongIndex !== null && currentSongIndex < data.length
      ? data[currentSongIndex]
      : null;

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['All', 'Tracks', 'Albums', 'Artists'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Danh sách */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.Id.toString()}
        />
      )}
      {/* Panel phát nhạc */}
      {currentSong && (
        <View style={styles.musicPanel}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setCurrentSongIndex(null)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.panelLeft}>
            <Image
              source={{ uri: currentSong.Image || 'https://via.placeholder.com/150' }}
              style={styles.panelImage}
            />
            <View style={styles.panelDetails}>
              <Text style={styles.panelTitle}>{currentSong.Title}</Text>
              <Text style={styles.panelSubtitle}>{currentSong.ArtistName}</Text>
            </View>
          </View>
          <View style={styles.panelControls}>
            <TouchableOpacity onPress={handlePrevious}>
              <Text style={styles.controlButton}>⏮</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
              <Text style={styles.controlButton}>{isPlaying ? '⏸' : '▶'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext}>
              <Text style={styles.controlButton}>⏭</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tabItem: {
    padding: 10,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#1DB954',
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  trackImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  albumImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  artistImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  musicPanel: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 120, // Chiều cao panel
    backgroundColor: '#f9f9f9', // Màu trắng sữa
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Đường viền nhạt
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#333',
  },
  panelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20, // Để tránh chạm nút đóng
  },
  panelImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  panelDetails: {
    marginLeft: 10,
  },
  panelTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  panelSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  panelControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    fontSize: 25,
    color: '#333',
    marginHorizontal: 10,
  },
});

export default SearchScreen;
