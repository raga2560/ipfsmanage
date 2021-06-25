// This is DEPRECATED, see a full running example here instead: 
// https://github.com/ipfs/js-ipfs-api/tree/97f6ed27d72b189c02865cb0fdd4f58fafd89625/examples/upload-file-via-browser

import React,  { useState } from 'react'
import IpfsApi from 'ipfs-api'
import { TabView, TabPanel } from 'primereact/tabview';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import './Addmedia.css';
const Buffer = require('buffer/').Buffer

export default class AddMedia extends React.Component {

  settingData;

  constructor () {

  super();
   this.onChangeApiport = this.onChangeApiport.bind(this);
   this.onChangeGatewayport = this.onChangeGatewayport.bind(this);
   this.onChangeRemoteipaddress = this.onChangeRemoteipaddress.bind(this);
   this.onChangeLocalipaddress = this.onChangeLocalipaddress.bind(this);
   this.connectTonetwork = this.connectTonetwork.bind(this);

  this.state = {
            activeIndex: 1,
            uploadstatus: 1
        };

  this.state = {
            remoteipaddress: '1.1.1.1',
            localipaddress: '127.0.0.1',
            apiport: '5001',
            gatewayport: '8080',
            httptype: 'http',
  };



 this.config = {} // set to your IPFS host, port, etc
    this.ipfsApi = IpfsApi(this.config)

  }

  componentDidMount() {
        this.settingData = JSON.parse(localStorage.getItem('settingdata'));

        if (localStorage.getItem('settingdata')) {
            this.setState({
                apiport: this.settingData.apiport,
            })
        } else {
            this.setState({
            apiport: '5001',
            })
        }
    }

   componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('settingdata', JSON.stringify(nextState));
    }


  onChangeApiport(e) {
        this.setState({ apiport: e.target.value })
  }

  onChangeGatewayport(e) {
        this.setState({ gatewayport: e.target.value })
  }

  onChangeRemoteipaddress(e) {
        this.setState({ remoteipaddress: e.target.value })
  }

  onChangeLocalipaddress(e) {
        this.setState({ localipaddress: e.target.value })
  }
  
  connectTonetwork() {

  }

  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new FileReader()
    reader.onloadend = () => this.saveToIpfs(reader)
    reader.readAsArrayBuffer(file)
  }

  saveToIpfs = (reader) => {
    // console.log(this.arrayBufferToString(reader.result))
    let ipfsId
    const buffer = Buffer.from(reader.result)
    this.ipfsApi.add(buffer)
    .then((response) => {
      ipfsId = response[0].Hash
      console.log(ipfsId)
      this.setState({ uploadstatus: ipfsId  })
    })
  }

  arrayBufferToString = (arrayBuffer) => {
    return String.fromCharCode.apply(null, new Uint16Array(arrayBuffer))
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  render () {
    return (
    <div className="p-grid">
    <div className="p-md-2"> 
    </div>
    <div className="p-col-6 p-md-4"> 
   <div className="p-fluid">
    <Card style={{ width: '25rem', height: '15rem', marginBottom: '2em' }}> 
      Upload here
      <form id="captureMedia" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.captureFile} />
      </form>
    </Card> 
    <Card style={{ width: '25rem', height: '10rem', marginBottom: '2em' }}> 
      Uploaded status

      <p> {this.state.uploadstatus  } </p>

    </Card> 
      <Card style={{ width: '25rem', height: '15rem', marginBottom: '2em' }}> 
      List of files
      </Card>
    </div>
    </div>



    <div className="p-col-6 p-md-4">
   <div className="p-fluid">
     <Card style={{ width: '25rem', height: '25rem',  marginBottom: '2em' }}> 
          <div className="tabview-demo">
                <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                    <TabPanel header="Remote node ">
   <div className="p-field p-grid">
    <div className="p-col p-col-9">
        <InputText id="remoteipaddress" type="text" value={this.state.remoteipaddress} />
      <small id="username-help"> Node {this.state.remoteipaddress } .</small>
    </div>
    <div className="p-col-fixed p-col-3">
        <InputText id="apiport" type="text"value={this.state.apiport}/>
      <small id="username-apiport">API port </small>
    </div>
</div>
<div className="p-field p-grid">
    <div className="p-col p-col-9">
    </div>

    <div className="p-col-fixed p-col-3">
        <InputText id="gatewayport" type="text" value={this.state.gatewayport} />
      <small id="username-gatewayport">Gateway port </small>
    </div>


</div>
   <div className="p-field p-grid">
    <div className="p-col p-col-1">
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => this.setState({ httptype: 'https' }) } className="p-button-text" label="HTTPS" />
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => this.setState({ httptype: 'http' }) } className="p-button-text" label="HTTP" />

    </div>
    <div className="p-col p-col-3">
    </div>



    </div>
   <div className="p-field p-grid">
    <div className="p-col p-col-1">
    </div>
    <div className="p-col p-col-8">
       <Button onClick={() => this.connectTonetwork() }  className="p-button-text"  label="Node online" />
    </div>

    <div className="p-col p-col-3">
    </div>
    </div>



                    </TabPanel>
                    <TabPanel header="Local node ">


   <div className="p-field p-grid">
    <div className="p-col p-col-9">
        <InputText id="localipaddress" type="text" value={this.state.localipaddress} />
      <small id="username-help"> Node {this.state.localipaddress} </small>
    </div>
    <div className="p-col-fixed p-col-3">
        <InputText id="apiport" type="text" value={this.state.apiport} />
      <small id="username-apiport">API port </small>
    </div>
</div>
<div className="p-field p-grid">
    <div className="p-col p-col-9">
    </div>

    <div className="p-col-fixed p-col-3">
        <InputText id="gatewayport" type="text" value={this.state.gatewayport} />
      <small id="username-gatewayport">Gateway port </small>
    </div>


</div>
   <div className="p-field p-grid">
    <div className="p-col p-col-1">
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => this.setState({ httptype: 'https' }) } className="p-button-text" label="HTTPS" />
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => this.setState({ httptype: 'http' }) } className="p-button-text" label="HTTP" />

    </div>
    <div className="p-col p-col-3">
    </div>



    </div>
   <div className="p-field p-grid">
    <div className="p-col p-col-1">
    </div>
    <div className="p-col p-col-8">
       <Button onClick={() => this.setState({ activeIndex: 1 }) } className="p-button-text"  label="Node online" />
    </div>

    <div className="p-col p-col-3">
    </div>
    </div>


                    </TabPanel>

                </TabView>
            </div>
  </Card>

    <Card style={{ width: '25rem', height: '15rem', marginBottom: '2em' }}> 
     Enter file hash and save
        <InputText id="filehashtoshave" type="text" value={this.state.ipfsfilehash} />
      <small id="username-gatewayport">IPFS file hash  </small>

       <Button onClick={() => this.setState({ httptype: 'https' }) } className="p-button-text" label="Save" />
    </Card>



   </div>


    <div className="p-md-2"> 
    </div>

    </div>

</div>
   
    )
  }
}
