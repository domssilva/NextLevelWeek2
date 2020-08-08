import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';

import styles from './styles';
import api from '../../services/api';

export interface Teacher {
    id: number,
    avatar: string,
    bio: string,
    cost: number,
    name: string,
    subject: string,
    whatsapp: string,
}

interface TeacherItemProps {
    teacher: Teacher,
    favorited: boolean,
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {

    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id: teacher.id,
        });

        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');                      // get current favorites
        let favoritesArray = [];                                                        // init favoritesArray as an empty array

        if (favorites) {                                                                // if favorites returns any result, parse it
            favoritesArray = JSON.parse(favorites);
        }

        if (isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {  // iterate over favoritesArray to search for the unfavorited teacher id
                return teacherItem.id === teacher.id;                                   
            });     

            favoritesArray.splice(favoriteIndex, 1);                                    // remove teacher from favoritesArray
            setIsFavorited(false);                                                       // update isFavorited state
        } else {
            favoritesArray.push(teacher);                                               // add new teacher to favorites
            setIsFavorited(true);                                                       // update isFavorited state
            await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));    // stringify array, then save it to mobile storage
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Price/hour {'   '}
                    <Text style={styles.priceValue}>{teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton 
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton, 
                            isFavorited ? styles.favorited : {},
                        ]}>
                           {
                                isFavorited ? 
                                    <Image source={unfavoriteIcon} /> 
                                    : <Image source={heartOutlineIcon} />
                            }
                    </RectButton>
                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
                        <Image source={whatsappIcon}/>
                        <Text style={styles.contactButtonText}>
                            Get in touch
                        </Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;
