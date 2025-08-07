import { Stack, Group, Modal, PasswordInput, TextInput, Button } from '@mantine/core';
import LoginFields from './LoginFields';
import SignupFields from './SignupFields';

const LoginModal = (props) => {
    const opened = props.opened;
    const onClose = props.onClose;
    const isReturningUser = props.isReturningUser;

    const modalStyle = {
        header: { 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
            backdropFilter: 'blur(5px)', // Frosted glass effect
            WebkitBackdropFilter: 'blur(5px)' // For Safari compatibility
          },
        content: {
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }
    };

    return(
        <Modal opened={opened} onClose={onClose} title="Authentication" centered transitionProps={{ transition: 'rotate-left' }} overlayProps={{ backgroundOpacity: 0.05, blur: 1.5,}} styles={modalStyle}>
            {isReturningUser? <LoginFields /> : <SignupFields />}
        </Modal>
    )
}

export default LoginModal;