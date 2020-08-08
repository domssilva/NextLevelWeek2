import React, {useState} from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const TeacherList: React.FC = () => {

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [ teachers, setTeachers] = useState([]);
    const [ subject, setSubject] = useState('');
    const [ week_day, setWeekDay] = useState('');
    const [ time, setTime] = useState('');
    
    function loadFavorites() {
        AsyncStorage
            .getItem('favorites')
            .then(response => {
                if (response) {
                    const favoritedTeachers = JSON.parse(response);
                    const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                        return teacher.id;
                    });
                    setFavorites(favoritedTeachersIds);
                }
            });
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    function handleFilterIconPress() {
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();
        
        const response = await api.get('classes', {
            params: {
                subject: subject.toLowerCase(),
                week_day,
                time,
            }
        });

        setIsFilterVisible(false);
        setTeachers(response.data);
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title='Available Proffys' 
                headerRight={(
                    <BorderlessButton onPress={handleFilterIconPress}>
                        <Feather name="filter" size={20} color="#FFF"/>
                    </BorderlessButton>
                )}
            >
                { isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>
                            Subject
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder='Pick a subject'
                            placeholderTextColor="#c1bcc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>
                                    Day of the week
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder="Pick a day"
                                    placeholderTextColor="#c1bcc"
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>
                                    Time
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Pick the time"
                                    placeholderTextColor="#c1bcc"
                                />
                            </View>
                        </View>

                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>
                                Filter
                            </Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24,
                }}
            >
                { teachers.map((teacher: Teacher) => (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)}
                    />
                )) }
            </ScrollView>
        </View>
    );
}

export default TeacherList;