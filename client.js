const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');

// Replace 'http://your-server-url:8000/generate_file' with the actual URL of your server
const serverUrl = 'http://localhost:8000/generate_file';

const res = axios.get(serverUrl);
console.log("Res: ", res)

const get_data=async()=> {
    try {
        const res = await axios.get(serverUrl);
        console.log("Res: ", res.data);
    }
    catch (error) {
        console.log("Error: ", res);
    }
}

get_data();