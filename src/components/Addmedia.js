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
  storedData;

  constructor () {

  super();
   this.savestate = this.savestate.bind(this);
   this.onChangeLocalRemote = this.onChangeLocalRemote.bind(this);
   this.onChangeRemoteipaddress = this.onChangeRemoteipaddress.bind(this);
   this.onChangeLocalipaddress = this.onChangeLocalipaddress.bind(this);
   this.connectTonetwork = this.connectTonetwork.bind(this);

  this.state = {
            activeIndex: 1,
            uploadstatus: 1,
            localmode: false,
            localnetworkstatus: false,
            remotenetworkstatus: false,
            ipfsfilehash: ''
        };

  this.state = {
            remoteipaddress: '1.1.1.1',
            localipaddress: '127.0.0.1',
            localapiport: '5001',
            localgatewayport: '8080',
            localhttptype: 'http',
            remoteapiport: '5001',
            remotegatewayport: '8080',
            remotehttptype: 'http',
  };



   this.localconfig = {} // set to your IPFS host, port, etc
   this.remoteconfig = {} // set to your IPFS host, port, etc

    this.localipfsApi = IpfsApi(this.localconfig)
    this.remoteipfsApi = IpfsApi(this.remoteconfig)

  }

  componentDidMount() {
        this.settingData = JSON.parse(localStorage.getItem('settingdata'));
        this.storedData = JSON.parse(localStorage.getItem('storeddata'));

        if (localStorage.getItem('settingdata')) {
            this.setState({
                localapiport: this.settingData.localapiport,
                remoteapiport: this.settingData.remoteapiport,
                localgatewayport: this.settingData.localgatewayport,
                remotegatewayport: this.settingData.remotegatewayport,
                localhttptype: this.settingData.localhttptype,
                remotehttptype: this.settingData.remotehttptype,
            })
        } else {
            this.setState({
                localapiport: '5001',
                remoteapiport: '5001',
                localgatewayport: '8080',
                remotegatewayport: '8080',
                localhttptype: 'http',
                remotehttptype: 'http',
            })
        }
    }

   componentWillUpdate(nextProps, nextState) {

   }


  savestate( ) {
    localStorage.setItem('settingdata', JSON.stringify(this.state));
    localStorage.setItem('storeddata', JSON.stringify(this.storedData));
  }

  onChangeLocalRemote(e) {
   this.setState({activeIndex: e.index});

   if(e.index == 0) {
   this.setState({ localmode: true })
   } else {
   this.setState({ localmode: false })
   }

  }

  onChangeRemoteipaddress(e) {
        this.setState({ remoteipaddress: e.target.value })
  }

  onChangeLocalipaddress(e) {
     this.setState({ localipaddress: e.target.value })
  }
  
  connectTonetwork() {
   this.setState({remotenetworkstatus: !this.state.remotenetworkstatus});
  }

  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new FileReader()
    reader.onloadend = () => this.saveToIpfs(reader)
    reader.readAsArrayBuffer(file)
  }

  saveToRemoteIpfs = (reader) => {
    // console.log(this.arrayBufferToString(reader.result))
    let ipfsId
    const buffer = Buffer.from(reader.result)
    this.remoteipfsApi.add(buffer)
    .then((response) => {
      ipfsId = response[0].Hash
      console.log(ipfsId)
      this.setState({ uploadstatus: ipfsId  })
    })
  }

  saveToLocalIpfs = (reader) => {
    // console.log(this.arrayBufferToString(reader.result))
    let ipfsId
    const buffer = Buffer.from(reader.result)
    this.localipfsApi.add(buffer)
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
      { this.state.remotenetworkstatus? <p> Go online before upload </p> : <p> Ready for upload </p>
      } 
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
                <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.onChangeLocalRemote(e)}>
                    <TabPanel header="Remote node ">
   <div className="p-field p-grid">
    <div className="p-col p-col-9">
        <InputText id="remoteipaddress" type="text" value={this.state.remoteipaddress} onChange={(e) => this.onChangeRemoteipaddress(e) } />
      <small id="username-help"> Node {this.state.remoteipaddress } .</small>
    </div>
    <div className="p-col-fixed p-col-3">
        <InputText id="remoteapiport" type="text"value={this.state.remoteapiport} onChange={(e)=>this.setState({remoteapiport: e.target.value})} />
      <small id="username-apiport">API port </small>
    </div>
</div>
<div className="p-field p-grid">
    <div className="p-col p-col-9">
              {this.state.remotehttptype}
    </div>

    <div className="p-col-fixed p-col-3">
        <InputText id="remotegatewayport" type="text" value={this.state.remotegatewayport}  onChange={(e)=>this.setState({remotegatewayport: e.target.value})} />
      <small id="username-gatewayport">Gateway port </small>
    </div>


</div>
   <div className="p-field p-grid">
    <div className="p-col p-col-1">
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => this.setState({ remotehttptype: 'https' }) } className="p-button-text" label="HTTPS" />
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => this.setState({ remotehttptype: 'http' }) } className="p-button-text" label="HTTP" />

    </div>
    <div className="p-col p-col-3">
       <Button onClick={() => this.savestate()  } className="p-button-text" label="Save" />
    </div>



    </div>
   <div className="p-field p-grid">
    <div className="p-col p-col-1">
    </div>
    <div className="p-col p-col-8">
    { this.state.remotenetworkstatus ? 
       <Button onClick={() => this.connectTonetwork() }  className="p-button-text"  label="Node offline" />
       : <Button onClick={() => this.connectTonetwork() }  className="p-button-text"  label="Node online" />
    }
    </div>

    <div className="p-col p-col-3">
    </div>
    </div>



                    </TabPanel>
                    <TabPanel header="Local node ">


   <div className="p-field p-grid">
    <div className="p-col p-col-9">
        <InputText id="localipaddress" type="text" value={this.state.localipaddress} onChange={(e) => this.onChangeLocalipaddress(e) } />
      <small id="localipddress-s"> Node {this.state.localipaddress} </small>
    </div>
    <div className="p-col-fixed p-col-3">
        <InputText id="localapiport" type="text" value={this.state.localapiport} onChange={(e)=>this.setState({localapiport: e.target.value})} />
      <small id="local-apiport">API port </small>
    </div>
</div>
<div className="p-field p-grid">
    <div className="p-col p-col-9">
    </div>

    <div className="p-col-fixed p-col-3">
        <InputText id="localgatewayport" type="text" value={this.state.localgatewayport} onChange={(e)=>this.setState({localgatewayport: e.target.value})} />
      <small id="local-gatewayport">Gateway port </small>
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
       <Button onClick={() => this.savestate()  } className="p-button-text" label="Save" />
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
