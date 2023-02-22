import axios from "axios";
import React from "react";

export function adminGet(url, callback) {
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}})
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            callback(false);
        })
}

export function prohibitionNonAdmin() {
    adminGet(`/auth/admin`, (res) => {
        if(!res) {
            alert("접근 권한이 부족해서 접근할 수 없습니다.");
            window.location.href = `/`;
        }
    })
}