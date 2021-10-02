import * as React from 'react';
import * as XLSX from "xlsx";
import axios from 'axios'
import { BASE_API_URL } from '../../common/contstants/base-api-url';

// POST request to API
async function sendQuestionsToAPI() {
    const { data } = await axios.post(`${BASE_API_URL}/api/upload-questions/`);
    return data;
}

// Reads the excel file that was uploaded
// Looks through each sheet and gets all the questions
function UploadQuestions() {
    const [items, setItems] = React.useState([]);

    const readExcel = (file) => {
        const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const all_data = [];
                for(var i = 0; i < wb.SheetNames.length; i++) {
                    const wsname = wb.SheetNames[i];
                    console.log(wsname);
                    const ws = wb.Sheets[wsname];
                    const data = [{"exercise": wsname}];
                    data.push(XLSX.utils.sheet_to_json(ws));
                    all_data.push(data);
                }
                console.log(all_data);
                // all_data contains a list of lists of dictionaries
                // each dictionary is a new question
                // need to send all_data to backend
                // need to add error checking
                // need to add authentication/only admin
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
    };

    return (
        <div>
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                }}
            />
        </div>
    );
}

export default UploadQuestions;