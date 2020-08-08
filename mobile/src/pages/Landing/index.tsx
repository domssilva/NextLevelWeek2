import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import heartIcon from '../../assets/images/icons/heart.png';
import giveClasses from '../../assets/images/icons/give-classes.png';
import styles from './styles';

const Landing:React.FC = () => {

    const { navigate } = useNavigation();

    function handleNavigateToGiveClassesPage() {
        navigate('GiveClasses');
    }

    function handleNavigateToStudyPage() {
        navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image source={landingImg}/>
            <Text style={styles.title}>
                Welcome, {'\n'}
            </Text>
            <Text style={styles.titleBold}>
                What would you like to do?
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton 
                    onPress={handleNavigateToStudyPage} 
                    style={[styles.button, styles.buttonPrimary]}
                >
                    <Image source={studyIcon}/>
                    <Text style={styles.buttonText}>Study</Text>
                </RectButton>

                <RectButton 
                    onPress={handleNavigateToGiveClassesPage} 
                    style={[styles.button, styles.buttonSecondary]}
                >
                    <Image source={giveClasses}/>
                    <Text style={styles.buttonText}>Teach</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                285 connections made {'\n'}
                in total <Image source={heartIcon}/>
            </Text>
        </View>
    );
}

export default Landing;
