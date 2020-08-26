import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(datas:any, searchTerm:any): any {
    if(searchTerm!=undefined){
      return datas['data'].filter(item=>{
       return  item['username'].toLowerCase().indexOf(searchTerm.toLowerCase())!=-1 
       || item['location'].toLowerCase().indexOf(searchTerm.toLowerCase())!=-1;
      })
    }
    return datas;
  }

}
