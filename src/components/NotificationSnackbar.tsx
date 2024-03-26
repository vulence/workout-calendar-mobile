import React from 'react';
import { Portal, Snackbar } from 'react-native-paper';

import { SnackbarProps } from '../../types';

export default function NotificationSnackbar(props: SnackbarProps) {
    return (
        <Portal>
            <Snackbar visible={props.visible} onDismiss={props.closeSnackbar} action={{ label: props.action || "close" }}>
                {props.snackbarContent}
            </Snackbar>
        </Portal>
    );
}