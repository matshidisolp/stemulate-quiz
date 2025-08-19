import { useState } from 'react';
import { useAuthStore } from '../../store/auth.store';

const LoginPage = () => {
    // State and Store management
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useAuthStore();

    const handleLogin = async () => {
        try {
            await login(email, password);
            // Navigate to home page of quiz on success
        } catch (error) {
            console.log('Login failed', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            {/* ... input fields */}
            <button type="submit" diabled={isLoading}>
                {isLoading ? 'Logging in...': 'Login'}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
};