import { TouchableOpacity, View, Text } from 'react-native';

function Button(props : any) {

    return(
        <View>
            <TouchableOpacity style={{backgroundColor: '#0FE38A', borderRadius: 5, padding: props.padding ? props.padding : 10, marginTop: props.marginTop, width: '100%'}} onPress={props.myFunc} >
                <Text style={{color: 'white', textAlign: 'center', fontSize: props.fontSize, fontWeight: props.fontWeight}}>{props.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Button;