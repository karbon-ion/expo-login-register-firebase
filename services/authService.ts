import { 
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    UserCredential 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../utils/firebase';

export type UserRole = 'user' | 'restaurant_admin';

interface UserData {
    email: string;
    name: string
    password?: string,
    role?: UserRole,
    createdAt: string
    confirmPassword?: string,
    restaurantName?: string
    userType?: string,
    // Add any other user data fields you need
}

export const registerUser = async (
    values: UserData,
    role: UserRole
): Promise<UserCredential> => {
    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password!);
        
        // Store additional user data in Realtime Database
        sendEmailVerification(userCredential.user)

        const userData: UserData = {
            email: values.email,
            role: role,
            name: values.name,
            createdAt: new Date().toISOString(),
        };
        
        setDoc(doc(firestore, 'users', userCredential.user.uid), userData);
        
        return userCredential;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const getUserRole = async (uid: string): Promise<UserRole> => {
    const snapshot = await getDoc(doc(firestore, 'users', uid));
    if (snapshot.exists()) {
        return snapshot.data().role;
    }
    throw new Error('User data not found');
};

export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if(!userCredential.user.emailVerified){
            logoutUser()
            return {error: 'Email not Varified'}
        }
        const role = await getUserRole(userCredential.user.uid);
        return { ...userCredential.user, role };
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logoutUser = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};
