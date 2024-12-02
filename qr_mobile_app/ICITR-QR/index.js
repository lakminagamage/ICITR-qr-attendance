import { AppRegistry } from 'react-native';
import App from './App'; // Make sure App.js is in the same directory
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);