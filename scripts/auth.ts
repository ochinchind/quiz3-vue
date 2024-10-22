import { ref } from 'vue'

export const isAuth = ref(false)
export const authUserId = ref('')
export const authJwtToken = ref('')

export function toggleIsAuth() {
    isAuth.value = !isAuth.value
}

export function falseIsAuth() {
    isAuth.value = false;
}

export function trueIsAuth() {
    isAuth.value = true;
}

export function changeIsAuth(val: boolean) {
    isAuth.value = val;
}

export function authUserIdChange(val: string) {
    authUserId.value = val;
}

export function authJwtTokenChange(val: string) {
    authJwtToken.value = val;
}

export function logout() {
    localStorage.removeItem('isAuth');
    changeIsAuth(false);
}

export const showForgetPasswordModal = ref(false)

export function toggleForgetPasswordModal() {
  showForgetPasswordModal.value = !showForgetPasswordModal.value
}

export function closeForgetPasswordModal() {
  showForgetPasswordModal.value = false;
}

export const isLoadingForgetPassword = ref(false);

export async function sendForgetPasswordToEmail() {
    const emailForgetInput = document.getElementById('emailForgetInput') as HTMLInputElement;
    const email = emailForgetInput.value;
    emailForgetInput.disabled = true;
    isLoadingForgetPassword.value = true;

    try {
        const response = await fetch('/api/sendforgetpassword', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email}),
        });

        const result = await response.json();
        if (result.success) {
            alert('Send successfuly!');

        } else {
            alert('Failed to send.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form.');
    } finally {
        emailForgetInput.disabled = false;
        isLoadingForgetPassword.value = false;
    }
}

export const isLoadingForgetChangePassword = ref(false);

export async function changePasswordForget() {
    const emailForgetInput = document.getElementById('emailForgetInput') as HTMLInputElement;
    const email = emailForgetInput.value;
    const secretPhraseForgetPasswordInput = document.getElementById('secretPhraseForgetPasswordInput') as HTMLInputElement;
    const secretPhrase = secretPhraseForgetPasswordInput.value;
    const newPasswordInputForget = document.getElementById('newPasswordInputForget') as HTMLInputElement;
    const newPassword = newPasswordInputForget.value;

    emailForgetInput.disabled = true;
    isLoadingForgetChangePassword.value = true;

    try {
        const response = await fetch('/api/userchangeforgetpassword', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, secretPhrase: secretPhrase, newPassword: newPassword}),
        });

        const result = await response.json();
        if (result.success) {
            alert('Changed successfully!');
            closeForgetPasswordModal();
        } else {
            alert('Failed to change.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form.');
    } finally {
        emailForgetInput.disabled = false;
        isLoadingForgetChangePassword.value = false;
    }
}