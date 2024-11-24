import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const FeedScreen = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch dữ liệu feed từ API
  const fetchFeedData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/feed');
      const result = await response.json();
      setFeedData(result);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu feed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  const renderFeedItem = ({ item }) => (
    <View style={styles.card}>
      {/* Thông tin người dùng */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: item.UserAvatar || 'https://via.placeholder.com/50' }}
          style={styles.avatar}
        />
        <View style={styles.userDetails}>
          <Text style={styles.username}>{item.Username || 'Người dùng ẩn danh'}</Text>
          <Text style={styles.postedTime}>{new Date(item.CreatedAt).toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreText}>⋮</Text>
        </TouchableOpacity>
      </View>
  
      {/* Nội dung bài đăng */}
      <View style={styles.content}>
        <Text style={styles.contentText}>{item.Content}</Text>
      </View>
  
      {/* Hình ảnh bài đăng */}
      {item.MediaUrl ? (
        <Image
          source={{ uri: item.MediaUrl }}
          style={styles.postImage}
        />
      ) : null}
  
      {/* Các nút tương tác */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>♥ {item.Likes || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 {item.Comments || 0}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  

  return (
    <View style={styles.container}>
      <FlatList
        data={feedData}
        renderItem={renderFeedItem}
        keyExtractor={(item) => item.PostId.toString()}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.loadingText}>Đang tải...</Text>
          ) : (
            <Text style={styles.emptyText}>Không có bài đăng nào.</Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userDetails: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postedTime: {
    fontSize: 12,
    color: '#666',
  },
  moreButton: {
    padding: 5,
  },
  moreText: {
    fontSize: 18,
    color: '#666',
  },
  content: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  media: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 10,
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default FeedScreen;
