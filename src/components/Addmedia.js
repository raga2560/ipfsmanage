// This is DEPRECATED, see a full running example here instead: 
// https://github.com/ipfs/js-ipfs-api/tree/97f6ed27d72b189c02865cb0fdd4f58fafd89625/examples/upload-file-via-browser

import React,  { useState } from 'react'
import IpfsApi from 'ipfs-api'
import { TabView, TabPanel } from 'primereact/tabview';
import { Column } from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
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
//   this.itemTemplate = this.itemTemplate.bind(this);
   this.selectItem = this.selectItem.bind(this);

   this.columns = [ 
	{ field: 'name', header: 'Name'},
	{ field: 'hash', header: 'Hash'},
	{ field: 'place', header: 'Place'},
	{ field: 'network', header: 'Network'},
	{ field: 'link', header: 'Link'},
   ];

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
                localgatewayport: this.settingData.localgatewayport?this.settingData.localgatewayport:'8080',
                remotegatewayport: this.settingData.remotegatewayport?this.settingData.remotegatewayport:'8080',
                localhttptype: this.settingData.localhttptype?this.settingData.localhttptype:'http',
                remotehttptype: this.settingData.remotehttptype?this.settingData.remotehttptype:'http',
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

    let localapi = '/ip4/' + (this.state.localipaddress?this.state.localipaddress:'<empty>') + '/tcp/'+ (this.state.localapiport?this.state.localapiport:'<empty>' ) ;
    let remoteapi = '/ip4/' + (this.state.remoteipaddress?this.state.remoteipaddress:'<empty>') + '/tcp/'+ ( this.state.remoteapiport?this.state.remoteapiport:'<empty>') ;
    let remotegateway = (this.state.remotehttptype?this.state.remotehttptype:'http') + "://"+ (this.state.remoteipaddress?this.state.localipaddress:'<empty>')+ ":" + (this.state.remotegatewayport?this.state.remotegatewayport:'<empty>');
    let localgateway = (this.state.localhttptype?this.state.localhttptype:'http') + "://"+ (this.state.localipaddress?this.state.localipaddress:'<empty>')+ ":" + (this.state.localgatewayport?this.state.localgatewayport:'<empty>');

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
   if(this.state.localmode ) {
   this.setState({localnetworkstatus: !this.state.localnetworkstatus});
    let localapi =  IpfsApi(this.state.localapi);
    this.setState({localipfsApi:  localapi}) ;

   }else {
   this.setState({remotenetworkstatus: !this.state.remotenetworkstatus});
    let remoteapi =  IpfsApi(this.state.remoteapi);
    this.setState({remoteipfsApi:  remoteapi}) ;
   }
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
      this.updatestorage({place: 'remote', hash: ipfsId, network: this.state.remotegateway, name: ''});
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
      this.updatestorage({place: 'local', hash: ipfsId, network: this.state.localgateway, name: ''});
    })
  }

  
  savenewipfs = (place, hash, network,name) => {
    let data = {
      place: place, hash: hash, network: network, name: name
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

  selectItem(e) {
   console.log(e);
  }

  onEditorValueChange(productKey, props, value) {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        this.setState({ [`${productKey}`]: updatedProducts });
  }

   inputTextEditor(productKey, props, field) {
     return <InputText type="text" value={props.rowData[field]} onChange={(e) => this.onEditorValueChange(productKey, props, e.target.value)} />;
   }


  nameEditor(productKey, props) {
        return this.inputTextEditor(productKey, props, 'name');
  }

  hashBodytemplate(rowData) {
    if(rowData.hash ) {
      return (rowData.hash.substring(0, 5) + '..' );
    } else {
     return '...';
    }
  }

/*
  itemTemplate(item) {
 //console.log(JSON.stringify(item));
   return (
       <div className="ipfs-item"  onClick={() =>  console.log(item)  } >  
            <div className="ipfs-item-detail" > 
			<small> {item.name?item.name:'<no name>'}  <a href=""> Link </a> </small>
                        <p className="ipfs-item-place">  {item.place} </p>
                        <p className="ipfs-item-place">  {item.hash} </p>

             </div>  
                   
             <div className="ipfs-item-view" > 
             </div>
	</div>
  );

  }
*/

  render () {
    return (
    <div className="p-grid">
    <div className="p-md-1"> 
    </div>


    <div className="p-col-6 p-md-5"> 
       <div className="p-fluid">
        <Card style={{ width: '25rem', height: '20rem', marginBottom: '2em' }}> 
         <div className="ipfs-name" >
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
     </div>

      Upload here
      <form id="captureMedia" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.captureFile} />
      </form>


      Uploaded status
      <p> {this.state.uploadstatus  } </p>
      <p> {this.state.remotegateway  } </p>
       <a target='_blank' rel="noopener noreferrer"
            href={this.state.remotegateway + '/ipfs/' +  this.state.uploadstatus}>
            Link 
          </a>

    </Card> 

    <Card style={{ width: '25rem', height: '16rem', marginBottom: '2em' }}> 
     <div className="ipfs-name" >
     { this.state.localmode ? 
          <p> Gateway {this.state.localgateway } </p>
       :  
          <p> Gateway {this.state.remotegateway } </p>
     }
    </div>

     Enter file 
        <InputText id="filename" type="text" value={this.state.ipfsfilename} onChange={(e)=>this.setState({ipfsfilename: e.target.value})} />
      <small id="ipfs-filename">IPFS file name  </small>
        <InputText id="filehashtoshave" type="text" value={this.state.ipfsfilehash1} onChange={(e)=>this.setState({ipfsfilehash1: e.target.value})} />
      <small id="ipfs-filehash">IPFS file hash  </small>

     { this.state.localmode ? 
       <Button onClick={() => this.savenewipfs('local', this.state.ipfsfilehash1, this.state.localgateway)  }  className="p-button-text" label="Save" />

      :
       <Button onClick={() => this.savenewipfs('remote', this.state.ipfsfilehash1, this.state.remotegateway)  } className="p-button-text" label="Save" />
     }
    </Card>

   <div className="card">
                    <h5>Basic Cell Editing</h5>
                    <DataTable value={this.state.storagedata} editMode="cell" className="editable-cells-table">
                        <Column field="hash" header="Hash" body={this.hashBodytemplate} ></Column>
                        <Column field="place" header="Place" editor={(props) => this.nameEditor('products1', props)}></Column>
                        <Column field="name" header="Name" editor={(props) => this.nameEditor('storage', props)}></Column>
                        <Column field="link" header="Link" ></Column>
                    </DataTable>
                </div>


 
    </div>
    </div>



    <div className="p-col-6 p-md-6">
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

   </div>


   yyyyyy
    </div>
  zzzzz
</div>
   
    )
  }
}
