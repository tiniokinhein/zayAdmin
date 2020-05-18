import { auth } from './firebase'

export function signIn(email,password) {
    return auth.signInWithEmailAndPassword(email,password)
}

export function logOut() {
    return auth.signOut()
}