import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Modal, Alert } from 'react-native'
import { THEME } from './theme'
import { AppButton } from './components/ui/AppButton'

export const EditModal = ({ visible, onCancel, value, onSave }) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert(
                'Error',
                `Minimal length of Todo is 3 symbol, now you have only ${
                    title.trim().length
                } symbols.`
            )
        } else {
            onSave(title)
        }
    }

    const cancelHandler = () => {
        setTitle(value)
        onCancel()
    }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.wrap}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder="Enter name of Todo"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={64}
                />
                <View style={styles.buttons}>
                    <AppButton
                        onPress={cancelHandler}
                        color={THEME.DANGER_COLOR}
                    >
                        Decline
                    </AppButton>
                    <AppButton onPress={saveHandler}>Save</AppButton>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%',
    },

    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
})
