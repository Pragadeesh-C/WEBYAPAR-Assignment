import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonComponent = ({buttonText,onPress,style}) => {
    return (
        <View style={[styles.buttonView,style]}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonComponent

const styles = StyleSheet.create({
    buttonView:{
        
    },
    button:{
        height:50,
        width:'90%',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5F1FFF',
        borderRadius:10,
        marginTop:'7%'
    },
    buttonText:{
        fontSize:18,
        color:'white',
        fontFamily:'Sen-Bold'
    }
})