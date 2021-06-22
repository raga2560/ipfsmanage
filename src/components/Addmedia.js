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


  constructor () {
  super();
  this.state = {
            activeIndex: 1
        }
 this.config = {} // set to your IPFS host, port, etc
    this.ipfsApi = IpfsApi(this.config)
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
    <Card style={{ width: '25rem', height: '25rem', marginBottom: '2em' }}> 
      Upload here
      <form id="captureMedia" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.captureFile} />
      </form>
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
        <InputText id="firstname3" type="text"/>
      <small id="username-help">Enter your username to reset your password.</small>
    </div>
    <div className="p-col-fixed p-col-3">
        <InputText id="apiport" type="text"/>
      <small id="username-apiport">API port </small>
    </div>
</div>
<div className="p-field p-grid">
    <div className="p-col p-col-9">
    </div>

    <div className="p-col-fixed p-col-3">
        <InputText id="gatewayport" type="text"/>
      <small id="username-gatewayport">Gateway port </small>
    </div>


</div>
   <div className="p-field p-grid">
    <div className="p-col p-col-1">
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => this.setState({ activeIndex: 1 }) } className="p-button-text" label="HTTPS" />
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => this.setState({ activeIndex: 1 }) } className="p-button-text" label="HTTP" />

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
                    <TabPanel header="Local node ">


   <div className="p-field p-grid">
    <div className="p-col p-col-9">
        <InputText id="firstname3" type="text"/>
      <small id="username-help">Enter your username to reset your password.</small>
    </div>
    <div className="p-col-fixed p-col-3">
        <InputText id="apiport" type="text"/>
      <small id="username-apiport">API port </small>
    </div>
</div>
<div className="p-field p-grid">
    <div className="p-col p-col-9">
    </div>

    <div className="p-col-fixed p-col-3">
        <InputText id="gatewayport" type="text"/>
      <small id="username-gatewayport">Gateway port </small>
    </div>


</div>
   <div className="p-field p-grid">
    <div className="p-col p-col-1">
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => this.setState({ activeIndex: 1 }) } className="p-button-text" label="HTTPS" />
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => this.setState({ activeIndex: 1 }) } className="p-button-text" label="HTTP" />

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

   </div>


    <div className="p-md-2"> 
    </div>

   <div className="p-fluid">
 </div>

    </div>
    <div className="p-col-6">6</div>
    <div className="p-col-6">6</div>
</div>
   
    )
  }
}
