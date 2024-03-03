const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');


const serverUrl = 'http://localhost:8000/generate_file';



const downloadFile = async () => {
    try {
      const response = await axios.get(serverUrl, { responseType: 'arraybuffer', maxContentLength: 5000000 });
  
      const filePath = './clientdata/received_file.txt';
  
      fs.writeFileSync(filePath, response.data);
      console.log(`File saved successfully at: ${filePath}`);
      console.log("Res: ", response.headers.checksum);
      checksum(filePath, response.data, response.headers.checksum)
    } catch (error) {
      console.error('Error downloading file:', error.message);
    }
};

const checksum = async(filePath, response, checksum)=> {
    try {
        const fileContent = fs.readFileSync(filePath);
        const receivedChecksum = crypto.createHash('sha256').update(fileContent).digest('hex');

        // Verify the checksum received from the server
        console.log(`Received Checksum: ${checksum}`);
        console.log(`Calculated Checksum: ${receivedChecksum}`);

        if (checksum === receivedChecksum) {
            console.log('Checksum verification passed. File integrity is verified.');
        } else {
            console.error('Checksum verification failed. File integrity cannot be guaranteed.');
        }
    }
    catch (error) {
        console.error('Error checksum file:', error.message);
    }
}

downloadFile();




