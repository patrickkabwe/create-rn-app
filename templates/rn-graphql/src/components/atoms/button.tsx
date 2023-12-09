import React from 'react'
import {Pressable} from 'react-native'


export const Button = ({onPress, children}) => {
  return (
    <Pressable onPress={onPress}>
      {children}
    </Pressable>
  )
}
