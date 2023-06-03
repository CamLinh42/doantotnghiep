import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import { app, db } from '../Firebase/Firebase.config';
import { collection, getDocs, orderBy, query, startAt, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
export const AuthContext=createContext();
    const auth = getAuth(app);
    
    const AuthProvider = ({children}) => {
    // const navigate = useNavigate();
    const [users, setUsers] = useState()
    const [user, setUser]=useState(null)
    const [userDb, setUserDb] = useState()
    const [loading, setLoading]=useState(false);
    const createUser=(email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login=(email, password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    const updateUser=(userInfo)=>{
        return updateProfile(auth.currentUser, userInfo);
    }
    const logOut=()=>{
        setUser(null)
        setUserDb(null)
        return signOut(auth);
    }
    const listAllUsers = async (idBv) => {
        const all = [];
        let querySnapshot
        if(idBv){
            const q = query(collection(db, "users"), where("hospital", "==", idBv));
            querySnapshot = await getDocs(q);
            querySnapshot.docs.forEach((item) => {
                const row = item.data();
                
                if(row.role == 2){
                    row.id = item.id;
                    all.push(row);
                }
            });
            setUsers(all)
        }else {
            querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.docs.forEach((item) => {
                const row = item.data();
                    row.id = item.id;
                    all.push(row);
            });
            setUsers(all)
        }
            
    };

    const getRole = async () => {
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserDb(doc.data())
        });
    }
    useEffect(() => {
        if(user&& user.email){
            getRole()
        }
    }, [user])

    useEffect(() => {
        if(userDb&& userDb.block){
            signOut(auth)
            toast.error("Tài khoản bị khóa")
            setUserDb(null)
            setUser(null)
        }
    }, [userDb, user])

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, currentUser=>{
            console.log('user Observing');
            setUser(currentUser);
            setLoading(false);
        });
        return ()=>unsubscribe();
    },[])

    const searchUser = async (e) => {
        const all = [];
        const q = query(collection(db, "users"),
            orderBy("email"),
            startAt(e.target.value));
       const querySnapshot = await getDocs(q);
       querySnapshot.forEach((doc) => {
        all.push(doc.data())
       });
        setUsers(all)
      }

    const authInfo={
        user,
        users,
        loading,
        createUser,
        login,
        logOut,
        updateUser,
        listAllUsers,
        userDb,
        searchUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;