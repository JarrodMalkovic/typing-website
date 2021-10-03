import * as React from 'react';
import { Button } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from 'axios'
import { BASE_API_URL } from '../../common/contstants/base-api-url';

// need to add authentication

async function getExercises(){
  const {data} = await axios.get(`${BASE_API_URL}/api/exercises/`)
  return data;
}

async function getQuestions(slug){
  const {data} = await axios.get(`${BASE_API_URL}/api/download-questions/${slug}/`)
  return data;
}

const ExportToExcel = ({fileName}) => {
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const [wb, setWb] = React.useState({SheetNames: [], Sheets: []})

  React.useEffect(async () => {
    const currentWb = {SheetNames: [], Sheets: []}
    const exercises = await getExercises();

    // for each exercise, create a worksheet and append that to the workbook
    for(const exercise of exercises) {
      const exercise_name = exercise['exercise_name'];
      const exercise_slug = exercise['exercise_slug'];
      
      // Does not work with dictation
      if(exercise_name != "Diction") {
        const questions = await getQuestions(exercise_slug);

        const currentWs = XLSX.utils.json_to_sheet(questions);
        currentWb.SheetNames.push(exercise_name);
        currentWb.Sheets[exercise_name] = currentWs;
      };
    };
    
    setWb(currentWb)
  }, [])
  

  const exportToCSV = (fileName) => {
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <Button
        bgColor="blue.400"
        color="white"
        onClick={(e) => exportToCSV(fileName)}
        leftIcon={<ArrowUpIcon />}
        variant="solid"
        >
        Upload Questions
      </Button>
    </>
  );
};

export default ExportToExcel;