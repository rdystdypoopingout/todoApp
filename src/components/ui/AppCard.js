import React from 'react'
import { StyleSheet, View } from 'react-native'
import { THEME } from '../../theme'

export const AppCard = (props) => {
    return (
        <View style={{ ...styles.default, ...props.style }}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: THEME.SHADOW_COLOR,
        backgroundColor: THEME.BACKGROUND_COLOR,
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
        elevation: 8,
        borderRadius: 10,
    },
})
