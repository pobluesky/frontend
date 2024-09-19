import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecoilRoot, atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// Atom 생성 함수
const createAtom = (key, defaultValue = '') => {
    return atom({
        key: key,
        default: defaultValue,
        effects_UNSTABLE: [persistAtom],
    });
};

// Selector 생성 함수
const createSelector = (key, atom) => {
    return selector({
        key: key,
        get: ({ get }) => {
            return get(atom);
        },
    });
};

// [Recoil] 고유 키 값으로 역할 및 사용자 정보 변수 선언
export const authByRole = createAtom('authByRole');
export const userName = createAtom('userName');
export const userEmail = createAtom('userEmail');
export const userPassword = createAtom('userPassword');

// [Recoil] Selector로 변수 Get 호출
export const getAuthByRole = createSelector('getAuthByRole', authByRole);
export const getUserName = createSelector('getUserName', userName);
export const getUserEmail = createSelector('getUserEmail', userEmail);
export const getUserPassword = createSelector('getUserPassword', userPassword);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>,
);
