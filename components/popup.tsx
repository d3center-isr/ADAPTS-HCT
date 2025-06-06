import { ReactNode } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Modal } from "react-native";


interface GenericPopup {
    children: ReactNode,
    visible: boolean,
}

export default function GenericPopup({children, visible}: GenericPopup) {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>This is a popup.</Text>
                    {children}
                </View>
            </View>
        </Modal>
    );
}

let styles = StyleSheet.create({
    popupInfoText: {
        marginBottom: 25,
    },
    popup: {
        backgroundColor: "#ff6666",
        borderColor: "#ff0000",
        margin: 0,
        shadowOpacity:1,
    },
    centeredView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    button: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 50,
        paddingRight: 50,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft:25,
        marginRight:25,
    },
    modalView: {
        margin: 0,
        backgroundColor: 'white',
        borderColor: "#aaaaaa",
        borderWidth: 5,
        borderRadius: 20,
        padding: 10,
        flexDirection: "column",
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonView: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 10,
    },


});