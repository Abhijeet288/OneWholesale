
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react'


const AddressContext=createContext();

    export const AddressProvider=({ children }) => {
        const[addressList,setaddressList]=useState([]);
        const [editingAddress,setEditingAddress]=useState(null);
        const [tempFarmerName,setTempFarmerName]=useState('')

        useEffect(()=>{
            loadAddressFromStorage();
            
        },[]);

        const addAddress=(newaddress) => {
            const updated=[...addressList,newaddress];
            setaddressList(updated);
            saveAddresstoStorage(updated);

        }
        const deleteAddress=(indextoremove)=>{
            const updated=addressList.filter((_,index)=>index!== indextoremove)
            setaddressList(updated);
            saveAddresstoStorage(updated);
        }

        const editAddress=(index,updateAddress)=>{
            
            const updated=addressList.map((item,i)=>(
                i===index?updateAddress:item
            ))
            setaddressList(updated);
            setEditingAddress(null);
           saveAddresstoStorage(updated);

        }

        const loadAddressFromStorage= async()=>{
            try{
                const storedAddresses=await AsyncStorage.getItem('addressList');
                if(storedAddresses){
                    setaddressList(JSON.parse(storedAddresses));
                }
                else{setaddressList([])}
            }
            catch(error){
                console.log('Error loading address from storage:', error);
            }

        }


        const saveAddresstoStorage=async(addressList)=>{
            try{
                await AsyncStorage.setItem('addressList',JSON.stringify(addressList));
            }
            catch(error){
                console.log('Error saving address to storage:', error);
            }
        }


        return(
            <AddressContext.Provider value={{addAddress,addressList,deleteAddress,editAddress,editingAddress,setEditingAddress,tempFarmerName,setTempFarmerName}}>
                {children}
            </AddressContext.Provider>
        )

    }

export const useAddress=()=>useContext(AddressContext);
export { AddressContext };