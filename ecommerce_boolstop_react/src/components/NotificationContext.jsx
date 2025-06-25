import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({ message: '', type: 'success' });

    // Auto-hide dopo 3s
    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: 'success' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const setMessage = (message, type = 'success') => {
        setNotification({ message, type });
    };

    return (
        <NotificationContext.Provider value={{ setMessage }}>
            {children}
            {notification.message && (
                <div className={`toast-message ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};