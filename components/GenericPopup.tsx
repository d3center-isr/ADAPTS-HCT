import { ReactNode } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Modal } from "react-native";


interface GenericPopup {
    children: ReactNode,
    visible: boolean,
    horizontalMargins: number,
}

/**
 * A pop-up container with predefined style and animations -- meant to make the app interface look more consistent.
 * @param {ReactNode} children - content to place inside of the container. Place content in between the > and the <, like 
 * in any other container (ie View, Text, etc.)
 * @param {boolean} visible - determines whether the popup is shown or not. This should be a state. Changing this during runtime 
 * will cause an animation to play as it appears/disappears.
 * @param {number} horizontalMargins - Set between 0 and 0.5. Controls the margin width to the left and right of the modal.
 * A value of 0 causes no margins (popup stretches from horizontal border to horizontal border), and 0.5 makes popup width 0.
 */
export default function GenericPopup({children, visible, horizontalMargins}: GenericPopup) {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent={true}
            style = {styles.modalView}
        >
            <View style={styles.centeredView}>
                <View style = {{flex: horizontalMargins}}></View>
                <View style={[styles.modalView, {flex: 1-2*horizontalMargins}]}>
                    {children}
                </View>
                <View style = {{flex: 0.05}}></View>
            </View>
        </Modal>
    );
}

let styles = StyleSheet.create({
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
});