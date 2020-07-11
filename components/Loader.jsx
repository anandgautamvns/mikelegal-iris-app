import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Loader() {
  return (
    <View style={styles.loaderContainer}>
        <Image
            source={require('../assets/Gifs/hdt.gif')}
            style={styles.loaderImage}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    loaderImage: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
});
