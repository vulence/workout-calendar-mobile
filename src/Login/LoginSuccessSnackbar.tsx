import { Portal, Snackbar } from 'react-native-paper';

import { SnackbarProps } from '../../types';

export default function SuccessDialog(props: SnackbarProps) {
    return (
        <Portal>
            <Snackbar visible={props.visible} onDismiss={props.closeSnackbar} action={{ label: 'close' }}>
                {props.snackbarContent}
            </Snackbar>
        </Portal>
    );
}