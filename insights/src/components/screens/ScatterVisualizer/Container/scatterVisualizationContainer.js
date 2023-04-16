import React, { useState } from 'react';
import axios from 'axios';

import FileUploader from '../../../core/FileUploader/fileUploader';
import { LineChart } from '../../../core/Graphing/LineChart/lineChart';
import CoreButton from '../../../core/Button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faBrain, faRefresh } from '@fortawesome/free-solid-svg-icons'

export default function ScatterVisualizer(props) {

  let [fileUploaderState, setFileUploadState] = useState({
    uploadInProgress: false,
    uploadSuccessful: false,
    uploadFailed: false
  });

  let [interpretOptions, setInterpretOptions] = useState({
    showInterpretOptions: false,
    isGraphLoading: false,
    linRegComputed: false
  })

  let [graphDataState, setGraphDataState] = useState({
    datasets: []
  });

  const uploadFile = (e) => {
    const fileUploadState = {...fileUploaderState};
    fileUploadState.uploadInProgress = true;
    setFileUploadState(fileUploadState);

    const formData = new FormData();
    formData.append("dataset", e.target.files[0]);
    
    axios.post("http://localhost:5555/upload_dataset", formData, {"headers": {"Content-Type": "multipart/form-data"}})
    .then(({data}) => {
      const fileUploadState = {...fileUploaderState};
      fileUploadState.uploadInProgress = false;
      fileUploadState.uploadSuccessful = true;
  
      const d = {datasets: [
        {
          label: 'Dataset',
          data: data["csv_data"],
          backgroundColor: '#fdcf4e',
        }
      ]}
      setFileUploadState(fileUploadState);
      setGraphDataState(d);

      setTimeout(() => {
        setInterpretOptions({showInterpretOptions: true});
      },500)
    })
    .catch((ex) => {
      console.log(ex);
    })
  }

  const resetState = () => {
    setFileUploadState({
      uploadInProgress: false,
      uploadSuccessful: false,
      uploadFailed: false
    });

    setInterpretOptions({
      showInterpretOptions: false,
      isGraphLoading: false
    });

    setGraphDataState({
      datasets: []
    });
  }

  const getLinearRegressionSolution = () => {
    if (graphDataState["datasets"][0]["data"].length) {
      setInterpretOptions({...interpretOptions, isGraphLoading: true});
      axios.post("http://localhost:5555/predict_lin_reg", {'data': graphDataState["datasets"][0]["data"]})
      .then(({data}) => {
        setInterpretOptions({...interpretOptions, isGraphLoading: false});
        const updatedGraphState = {...graphDataState};
        updatedGraphState['datasets'].push({
          label: 'Linear Regression',
          data: data["data"],
          showLine: true,
          fill: true,
          borderColor: '#FFEA00',
          backgroundColor: '#FFEA00'
        });

        setGraphDataState(updatedGraphState);
        setInterpretOptions({...interpretOptions, linRegComputed: true});
      })
      .catch((ex) => {
        setInterpretOptions({...interpretOptions, isGraphLoading: false});
        console.log(ex);
      })
    }
  }

  const renderChart = () => {
    
    if (interpretOptions.isGraphLoading) {
      return <span><h3><FontAwesomeIcon icon={faSpinner} spin={true}/>&nbsp; Uploading file ..</h3></span>
    }
    
    else if (graphDataState.datasets.length) {
      return <LineChart data={graphDataState} />;
    } else {
      return <h1>Upload a file to visualize linear graphs</h1>;
    }
  }

  const displayChartInteraction = () => {
    return <div className='interactions-container'>
      <CoreButton icon={faBrain} disabled={interpretOptions.linRegComputed} onClick={getLinearRegressionSolution} label="Linear Regression"/>
      <CoreButton icon={faRefresh} onClick={resetState} label="Upload Fresh Data"/>
    </div>
  }

  const renderInteraction = () => {
    if (interpretOptions.showInterpretOptions) {
      return displayChartInteraction();
    } else {
      return <FileUploader
        uploadFailed={fileUploaderState.uploadFailed}
        uploadSuccessful={fileUploaderState.uploadSuccessful}
        uploadInProgress={fileUploaderState.uploadInProgress}
        uploadFile={uploadFile}
        isTypeButton={true}
      />
    }
  }

  return (
    <div className='App'>
      <div className='file-upload-container'>
        {renderInteraction()}
      </div>
      <div className='visualization-container'>
        {renderChart()}
      </div>
    </div>
  );
}