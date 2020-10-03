import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import {
    ADD_TODO,
    FETCH_TODOS,
    HIDE_LOADER,
    REMOVE_TODO,
    SHOW_ERROR,
    SHOW_LOADER,
    UPDATE_TODO,
} from '../types'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { Http } from '../../http'

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null,
    }

    const { changeScreen } = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async (title) => {
        clearError()
        try {
            const data = await Http.post(
                'https://mytodoapp-5c317.firebaseio.com/todos.json',
                { title }
            )
            dispatch({ type: ADD_TODO, title, id: data.name })
        } catch (e) {
            showError('Somthing is wrong...')
        }
    }

    const updateTodo = async (id, title) => {
        clearError()
        try {
            await Http.patch(
                `https://mytodoapp-5c317.firebaseio.com/todos/${id}.json`
            )
            dispatch({ type: UPDATE_TODO, id, title })
        } catch (e) {
            showError('Somthing is wrong...')
        }
    }

    const fetchTodos = async () => {
        showLoader()
        clearError()
        try {
            const data = await Http.get(
                `https://mytodoapp-5c317.firebaseio.com/todos.json`
            )
            const todos = Object.keys(data).map((key) => ({
                ...data[key],
                id: key,
            }))
            dispatch({ type: FETCH_TODOS, todos })
        } catch (e) {
            showError('Somthing is wrong...')
        } finally {
            hideLoader()
        }
    }
    const showLoader = () => dispatch({ type: SHOW_LOADER })
    const hideLoader = () => dispatch({ type: HIDE_LOADER })
    const showError = (error) => dispatch({ type: SHOW_ERROR, error })
    const clearError = () => dispatch({ type: CLEAR_ERROR })

    const removeTodos = (id) => {
        const todo = state.todos.find((t) => t.id === id)
        Alert.alert(
            'Delete element',
            `Are you sure what you want to delete "${todo.title}"?`,
            [
                {
                    text: 'Decline',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        changeScreen(null)
                        await Http.delete(
                            `https://mytodoapp-5c317.firebaseio.com/todos/${id}.json`
                        )
                        dispatch({ type: REMOVE_TODO, id })
                    },
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                loading: state.loading,
                error: state.error,
                addTodo,
                updateTodo,
                removeTodos,
                fetchTodos,
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}
