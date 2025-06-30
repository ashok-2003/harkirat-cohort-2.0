import{ atom, selector } from 'recoil'
import axios from 'axios' 

export const appatom = atom({
    key : 'appatom',
    default : {
        network : 0,
        jobs : 0,
        messaging : 6,
        notification : 4
    }
})

export const totalcount = selector({  // this is used for me to represent the all values here 
    key : 'totalcount',
    get : ({get}) =>{
        const allnotification = get(appatom);
        return allnotification.network + allnotification.jobs + allnotification.messaging + allnotification.notification;
    }
})


// so now here we want to fetch the data from the server so we can do that also here using the atom and default value as 
// selector as selector can have asyn call here 

export const api_app_atom = atom({
    key : 'api_app_atom' , 
    default : selector({
        key : 'api_app_atom_val',
        get : async() => {
            const res = await axios.get("https://www.randomnumberapi.com/api/v1.0/random?min=0&max=100&count=4")
            
            // so now here we have got the data in the form of array so now sending the data here 

            console.log(res)
            return {
                network : res.data[0],
                jobs : res.data[1],
                messaging : res.data[2],
                notification : res.data[3]
            } // so now here returning the all of the data that we got 
        }
    })
})