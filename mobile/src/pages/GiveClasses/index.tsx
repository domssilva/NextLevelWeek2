import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';

const GiveClasses: React.FC = () => {

    const { goBack } = useNavigation();

    function handleNavigateBack() {
        goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={giveClassesBgImage} 
                style={styles.content}
            >
                <Text style={styles.title}>
                    Would you like to become a Proffy?
                </Text>
                <Text style={styles.description}>
                    Register to our platform to begin giving lessons.
                </Text>
            </ImageBackground>

            <RectButton onPress={handleNavigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>
                    It's ok
                </Text>
            </RectButton>
        </View>
    )
}

export default GiveClasses;
