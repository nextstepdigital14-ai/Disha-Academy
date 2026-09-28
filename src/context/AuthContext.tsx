import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, ClassLevel, TargetExam } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<UserProfile>;
  register: (
    email: string,
    pass: string,
    displayName: string,
    phone?: string,
    studentClass?: ClassLevel,
    targetExam?: TargetExam
  ) => Promise<UserProfile>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getCurrentUser());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthChanged((current) => {
      setUser(current);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    const prof = await authService.login(email, pass);
    setUser(prof);
    return prof;
  };

  const register = async (
    email: string,
    pass: string,
    displayName: string,
    phone?: string,
    studentClass?: ClassLevel,
    targetExam?: TargetExam
  ) => {
    const prof = await authService.register(email, pass, displayName, phone, studentClass, targetExam);
    setUser(prof);
    return prof;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    await authService.resetPassword(email);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = await authService.updateStudentProfile(user.uid, updates);
    setUser(updated);
  };

  const refreshUser = () => {
    const current = authService.getCurrentUser();
    setUser(current);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        login,
        register,
        logout,
        resetPassword,
        updateProfile,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
