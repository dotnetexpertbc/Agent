﻿export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('userDetails'));

    if (user && user.token) {
        // for Node.js Express back-end
        return { 'Authorization': `Bearer ${user.token.accessToken}` };
    } else {
        return {};
    }
}