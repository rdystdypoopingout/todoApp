import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { THEME } from '../theme'
import { AppTextBold } from '../components/ui/AppTextBold'

export const Navbar = (props) => {
    return (
        <View
            style={{
                ...styles.navbar,
                ...Platform.select({
                    ios: styles.navbarIOS,
                    android: styles.navbarAndroid,
                }),
            }}
        >
            <AppTextBold
                style={{
                    ...styles.text,
                    ...Platform.select({
                        ios: styles.textIOS,
                        android: styles.textAdroid,
                    }),
                }}
            >
                {props.title}
            </AppTextBold>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },

    navbarAndroid: {
        backgroundColor: THEME.MAIN_COLOR,
    },

    navbarIOS: {
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 1,
    },

    text: {
        fontSize: 20,
    },

    textIOS: {
        color: THEME.MAIN_COLOR,
    },

    textAdroid: {
        color: THEME.BACKGROUND_COLOR,
    },
})
