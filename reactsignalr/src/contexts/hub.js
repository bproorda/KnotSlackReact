import React, { useContext } from 'react';
import useAuth from './auth';

export const HubContext = React.createContext();

export default function useHub() {
    return useContext(HubContext);
}

export class HubProvider extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user : setUser(),
            setUser : this.setUser, 
        }

        };
    }

    const setUser = () => {
        const { user } = useAuth();
        this.setState({user});
    }
    

}