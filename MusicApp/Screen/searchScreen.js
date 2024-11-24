import React, { useState, useEffect, useRef } from 'react';
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
import { Ionicons } from '@expo/vector-icons'; // Import icon từ Expo

const { width } = Dimensions.get('window');

const SearchScreen = () => {
  const [activeTab, setActiveTab] = useState('All'); // Tab mặc định
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null); // Index bài hát đang phát
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát nhạc
  const [isListening, setIsListening] = useState(false); // Trạng thái lắng nghe
  const recognitionRef = useRef(null); // Lưu SpeechRecognition instance

  // Kiểm tra nếu trình duyệt hỗ trợ Web Speech API
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN'; // Ngôn ngữ tiếng Việt

      recognition.onstart = () => {
        console.log('Voice recognition started');
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        console.log('Voice recognition result:', event.results);
        if (event.results.length > 0) {
          const transcript = event.results[0][0].transcript;
          setSearchText(transcript); // Ghi kết quả vào ô tìm kiếm
        }
      };

      recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log('Voice recognition ended');
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn('Trình duyệt không hỗ trợ Web Speech API');
    }
  }, []);

  // Bắt đầu lắng nghe giọng nói
  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  // Dừng lắng nghe giọng nói
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

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
        onPress={() => item.Type === 'Song' && handlePlaySong(index)}
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
        <TouchableOpacity onPress={isListening ? stopListening : startListening}>
          <Ionicons
            name={isListening ? 'mic' : 'mic-outline'}
            size={24}
            color={isListening ? 'red' : 'gray'}
            style={styles.voiceIcon}
          />
        </TouchableOpacity>
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
            <TouchableOpacity onPress={handlePlaySong}>
              <Text style={styles.controlButton}>{isPlaying ? '⏸' : '▶'}</Text>
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
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  voiceIcon: {
    marginLeft: 10,
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
    height: 120,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
    marginTop: 20,
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
