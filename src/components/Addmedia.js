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
   this.updatestorage = this.updatestorage.bind(this);
   this.savenewipfs = this.savenewipfs.bind(this);
   this.savestate = this.savestate.bind(this);
   this.createapi = this.createapi.bind(this);
   this.onChangeLocalRemote = this.onChangeLocalRemote.bind(this);
   this.onChangeRemoteipaddress = this.onChangeRemoteipaddress.bind(this);
   this.onChangeLocalipaddress = this.onChangeLocalipaddress.bind(this);
   this.connectTonetwork = this.connectTonetwork.bind(this);

  this.state = {
            activeIndex: 1,
            uploadstatus: 1,
            localmode: false,
            localnetworkstatus: true,
            remotenetworkstatus: true,
            remoteapi: '',
            localapi: '',
            localgateway: '',
            remotegateway: '',
            storagedata: [],
            ipfsfilehash1: '',
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
   this.remoteconfig =  "/ip4/3.249.193.188/tcp/5001";
//      "Gateway": "/ip4/54.169.57.146/tcp/8081"

    this.state = {
      localipfsApi : {},
      remoteipfsApi: {}
    };

    //this.localipfsApi = IpfsApi(this.localconfig)
    // this.remoteipfsApi = IpfsApi(this.remoteconfig)

  }

  componentDidMount() {
        this.settingData = JSON.parse(localStorage.getItem('settingdata'));
        let storagedata =  JSON.parse(localStorage.getItem('storeddata'));

        if(storagedata && storagedata.length > 0) {
           this.setState({storagedata, storagedata});
        }else {
           let xx = [];
           this.setState({storagedata, xx});
        }

        if (localStorage.getItem('settingdata')) {
            this.setState({
                localipaddress: this.settingData.localipaddress,
                localapiport: this.settingData.localapiport,
                remoteipaddress: this.settingData.remoteipaddress,
                remoteapiport: this.settingData.remoteapiport,
                localgatewayport: this.settingData.localgatewayport,
                remotegatewayport: this.settingData.remotegatewayport,
                localhttptype: this.settingData.localhttptype,
                remotehttptype: this.settingData.remotehttptype,
            })
        } else {
            this.setState({
                localipaddress: '127.0.0.1',
                remoteipaddress: '1.1.1.1',
                localapiport: '5001',
                remoteapiport: '5001',
                localgatewayport: '8080',
                remotegatewayport: '8080',
                localhttptype: 'http',
                remotehttptype: 'http',
            })
        }
        this.createapi();
    }

   componentWillUpdate(nextProps, nextState) {

   }


  savestate( ) {
    localStorage.setItem('settingdata', JSON.stringify(this.state));
    if(this.state.storagedata.length > 0)
    localStorage.setItem('storeddata', JSON.stringify(this.state.storagedata));
  }

  onChangeLocalRemote(e) {
   this.setState({activeIndex: e.index});
   console.log(e.index );
   if(e.index == 0) {
   this.setState({ localmode: false })
   } else {
   this.setState({ localmode: true })
   }

   this.createapi();
  }

  createapi() {

    let localapi = '/ip4/' + this.state.localipaddress + '/tcp/'+ this.state.localapiport ;
    let remoteapi = '/ip4/' + this.state.remoteipaddress + '/tcp/'+ this.state.remoteapiport ;
    let remotegateway = this.state.remotehttptype + "://"+ this.state.remoteipaddress+ ":" + this.state.remotegatewayport;
    let localgateway = this.state.localhttptype + "://"+ this.state.localipaddress+ ":" + this.state.localgatewayport;

    this.setState({ localapi: localapi })
    this.setState({ remoteapi: remoteapi })
    this.setState({ remotegateway: remotegateway })
    this.setState({ localgateway: localgateway })
  }

  onChangeRemoteipaddress(e) {
     this.setState({ remoteipaddress: e.target.value })
     this.createapi();
  }

  onChangeLocalipaddress(e) {
     this.setState({ localipaddress: e.target.value })
     this.createapi();
  }
  
  connectTonetwork() {
   this.setState({remotenetworkstatus: !this.state.remotenetworkstatus});
    let remoteapi =  IpfsApi(this.state.remoteapi);
    let localapi =  IpfsApi(this.state.localapi);
    this.setState({remoteipfsApi:  remoteapi}) ;
    this.setState({localipfsApi:  localapi}) ;
  }

  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new FileReader()
    if(this.state.localmode == true) {
      reader.onloadend = () => this.saveToLocalIpfs(reader)
    } else {
      reader.onloadend = () => this.saveToRemoteIpfs(reader)
    }
    reader.readAsArrayBuffer(file)
  }

  saveToRemoteIpfs = (reader) => {
    // console.log(this.arrayBufferToString(reader.result))
    let ipfsId
    const buffer = Buffer.from(reader.result)
    let remoteapi =  IpfsApi(this.state.remoteapi);
    remoteapi.add(buffer)
    .then((response) => {
      console.log(JSON.stringify(response));
      ipfsId = response[0].hash
      console.log(ipfsId)
      this.setState({ uploadstatus: ipfsId  })
      this.updatestorage({place: 'remote', hash: ipfsId, network: this.state.remotegateway});
    }).catch(err => {

      console.log(JSON.stringify(err));
    })
  }

  saveToLocalIpfs = (reader) => {
    // console.log(this.arrayBufferToString(reader.result))
    let ipfsId
    const buffer = Buffer.from(reader.result)
    let localapi =  IpfsApi(this.state.localapi);
    localapi.add(buffer)
    // this.state.localipfsApi.add(buffer)
    .then((response) => {
      ipfsId = response[0].Hash
      console.log(ipfsId)
      this.setState({ uploadstatus: ipfsId  })
      this.updatestorage({place: 'local', hash: ipfsId, network: this.state.localgateway});
    })
  }

  
  savenewipfs = (place, hash, network) => {
    let data = {
      place: place, hash: hash, network: network
    }
 
    this.updatestorage(data);
  }

  updatestorage = (data) => {

    console.log(JSON.stringify(this.state.storagedata));

    let storagedata =  JSON.parse(localStorage.getItem('storeddata'));

    if(!storagedata) { 
    storagedata = [];
    storagedata.push(data);
    this.setState({ storagedata: storagedata  })
    } else {
      storagedata.push(data)
    this.setState({ storagedata: storagedata  })
    }
    localStorage.setItem('storeddata', JSON.stringify(this.state.storagedata));
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
      { this.state.localmode? <p> 
          { this.state.localnetworkstatus? <p> local Go online before upload </p> : <p> local Ready for upload </p>
          }
          </p>
          : 
          <p>
          { this.state.remotenetworkstatus? <p> remote Go online before upload </p> : <p> remote Ready for upload </p>
          }
          </p>
      } 
      Upload here
      <form id="captureMedia" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.captureFile} />
      </form>
    </Card> 
    <Card style={{ width: '25rem', height: '10rem', marginBottom: '2em' }}> 
      Uploaded status

      <p> {this.state.uploadstatus  } </p>
      <p> {this.state.remotegateway  } </p>
       <a target='_blank' rel="noopener noreferrer"
            href={this.state.remotegateway + '/ipfs/' +  this.state.uploadstatus}>
            Link 
          </a>


    </Card> 
      <Card style={{ width: '25rem', height: '15rem', marginBottom: '2em' }}> 
      List of files 

      { (this.state.storagedata && this.state.storagedata.length > 0) ? 
           this.state.storagedata.map((a, index) =>      
                <div key={'ggggs'+index} >  <h4> {a.place} </h4>  
            		<a href=""> {a.hash} </a> 
		</div>
           )
          : <p> No files </p>
       }

 
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
              {this.state.remoteapi}
    </div>

    <div className="p-col-fixed p-col-3">
        <InputText id="remotegatewayport" type="text" value={this.state.remotegatewayport}  onChange={(e)=> this.setState({remotegatewayport: e.target.value})} />
      <small id="username-gatewayport">Gateway port </small>
    </div>


</div>
   <div className="p-field p-grid">
    <div className="p-col p-col-1">
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => { this.setState({ remotehttptype: 'https' }); this.createapi(); } } className="p-button-text" label="HTTPS" />
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => { this.setState({ remotehttptype: 'http' }); this.createapi(); } } className="p-button-text" label="HTTP" />

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
              {this.state.localapi}
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
       <Button onClick={() => this.setState({ localhttptype: 'https' }) } className="p-button-text" label="HTTPS" />
    </div>
    <div className="p-col p-col-4">
       <Button onClick={() => this.setState({ localhttptype: 'http' }) } className="p-button-text" label="HTTP" />

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
     { this.state.localmode ? 
          <p> Gateway {this.state.localgateway } </p>
       :  
          <p> Gateway {this.state.remotegateway } </p>
     }
     Enter file hash and save
        <InputText id="filehashtoshave" type="text" value={this.state.ipfsfilehash1} onChange={(e)=>this.setState({ipfsfilehash1: e.target.value})} />
      <small id="username-gatewayport">IPFS file hash  </small>

     { this.state.localmode ? 
       <Button onClick={() => this.savenewipfs('local', this.state.ipfsfilehash1, this.state.localgateway)  }  className="p-button-text" label="Save" />

      :
       <Button onClick={() => this.savenewipfs('remote', this.state.ipfsfilehash1, this.state.remotegateway)  } className="p-button-text" label="Save" />
     }
    </Card>



   </div>


    <div className="p-md-2"> 
    </div>

    </div>

</div>
   
    )
  }
}
