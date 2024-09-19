import React from 'react';
import UserAccountOverview from '../../components/templates/UserAccountOverview';
import { User_Account } from '../../assets/css/Auth.css';

export default function UserAccount() {
    return (
        <div className={User_Account}>
            <UserAccountOverview />
        </div>
    );
}
