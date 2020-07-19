import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'mikelegal',
      screens: {
        Home: 'home',
        Profile: 'profile',
        Login: 'login',
        Search: 'search',
        Watch: 'watch',
        Manager: 'manager',
      },
    },
  },
};
