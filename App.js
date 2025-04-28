import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from "./redux/store";
import RootNavigator from "./navigation/AppNavigation";
import { AuthProvider } from './contexts/authContext';  // Assurez-vous que le chemin est correct

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});