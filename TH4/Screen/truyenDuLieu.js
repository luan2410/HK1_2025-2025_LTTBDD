import React, { createContext, useState } from 'react';

// Tạo Context
export const AuthContext = createContext();

// Tạo Provider để bọc các thành phần trong App và chia sẻ dữ liệu đăng nhập
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Lưu trạng thái người dùng (null khi chưa đăng nhập)

  // Hàm đăng nhập
  const login = (userData) => {
    setUser(userData); // Cập nhật dữ liệu người dùng vào state
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null); // Xóa dữ liệu người dùng khỏi state
  };

  return (
    <AuthContext.Provider value={{user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
