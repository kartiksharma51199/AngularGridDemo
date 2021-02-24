import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {HttpClient} from '@angular/common/http';
import { AgGridAngular } from '@ag-grid-community/angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modules = [ClientSideRowModelModule];
  @ViewChild('agGrid',{static:false}) aggrid:AgGridAngular;
  title = 'AngularAgGridDemo';
  constructor(private http:HttpClient){}
  columnDefs = [
    { field: 'userId', sortable: true, filter: true, checkboxSelection:true },
    { field: 'id', sortable: true, filter: true },
    { field: 'title', sortable: true, filter: true },
    { field: 'body', sortable: true, filter: true },

  ];


  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },

  // ];
  rowData:any;
  ngOnInit(){
    //console.log(this.http.get("https://api.myjson.com/bins/15psn9"))
    this.rowData=this.http.get("https://jsonplaceholder.typicode.com/posts");
  }
  getSelectedRows(){
    const selectedNode=this.aggrid.api.getSelectedNodes();
    const selectedData=selectedNode.map(node=>node.data);
    const selectedDataStringPresent=selectedData.map(node=>node.userId + ' '+ node.id).join(", ");
    console.log(selectedDataStringPresent);
    alert(`Selected nodes: ${selectedDataStringPresent}`);
  }
}
