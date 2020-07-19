import * as React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { ScreenContainer } from 'react-native-screens';

export default function Manager() {
    return (
        <ScreenContainer style={styles.container}>
            <Text>Manager</Text>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
});

