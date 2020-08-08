import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';
import navigatorStyles from './navigatorStyles';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator tabBarOptions={navigatorStyles}>
            <Screen 
                name="TeacherList" 
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color}/>
                        );
                    }
                }}
            />
            <Screen 
                name="Favorites" 
                component={Favorites}
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color}/>
                        );
                    }
                }}
            />
        </Navigator>
    );
}

export default StudyTabs;