import React from 'react';
import { ActivityIndicator, Modal, Portal } from "react-native-paper";

import { LoadingProps } from '../../types';

export default function LoadingIndicator(props: LoadingProps) {
    return (
        <Portal>
            <Modal visible={props.isLoading} dismissable={false}>
                <ActivityIndicator animating={true} color="rgb(143,27,27)" size="large" />
            </Modal>
        </Portal>
    );
}