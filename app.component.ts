import { Component ,ViewChild,OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem,CdkDrag} from '@angular/cdk/drag-drop';
import { comp } from "./comp";
import { Title } from '@angular/platform-browser';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
import { NgbSlideEvent, NgbSlideEventSource,NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ImageItem } from 'ng-gallery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { ImageData, DisplayConfig, SameSizeConfig, ImageEffect } from '@creativeacer/ngx-image-display';


enum hoverEffect {
  zoom = 'zoom',
  lighten = 'lighten',
  darken = 'darken',
  greyscale = 'greyscale',
  sepia = 'sepia'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery!: NgxImageGalleryComponent;
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };
  
  
  images: GALLERY_IMAGE[] = [
    {
      url: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=1260", 
      altText: 'woman-in-black-blazer-holding-blue-cup', 
      title: 'woman-in-black-blazer-holding-blue-cup',
      thumbnailUrl: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260", 
      altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain', 
      extUrl: 'https://www.pexels.com/photo/two-woman-standing-on-the-ground-and-staring-at-the-mountain-669006/',
      thumbnailUrl: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60"
    },
  ];
  // samesizeConfig: SameSizeConfig={
  //   active: true,
  //   imgContainerHeight: '250px'
  // };
  // displayconfig: DisplayConfig={
  //   imageminwidth: '250px',
  //   containerwidth: '80%',
  //   containerheight: '500px',
  //   fullScreenView: true // Set to false to hide the top right full screen option
  // };
  // hovereffect: ImageEffect={
  //   hoverEffectActive: false
  // };
  samesizeoption: boolean= true;
  fullscreenoption!: boolean;
  hoverEffect: string = ''; 


  isgallery:boolean=false;
  istodo:boolean=false;
  isdone:boolean=false;
  isimgdrop:boolean=false;
  isdetail:boolean=false;
  imgcount:number=0;
  isimg:boolean=false;

  
  todoValue:string="";
  list: comp[]=[];
  title !: Title;
  rep:boolean=true;

  ngOnInit() {
    this.list = [];
    this.todoValue = "";
    this.title.setTitle('Angular Cascading or Dependent Dropdown');
  }
  
  
  
  istodofn(){
    this.istodo=!this.istodo;
    this.isdone=!this.isdone;
  }

  isdonefn(){
    this.isdone=!this.isdone;
    this.istodo=!this.istodo;
  }

  isimgdropfn(){
    this.isimgdrop=!this.isimgdrop;
  }

  isdetailfn(){
    this.isdetail=!this.isdetail;
  }

  galleryopen(){
    this.isgallery=!this.isgallery;
    if(this.imgcount===0){this.isimg=true}
    else{this.isimg=false}
    
  }
  alert(){
    window.alert("uploaded");
  }

  todo = ['Task todo','Task 1','Task 2','Task 3','Task 4','Task 5',
  'Task 6','Task 7','Task 8','Task 0'
];

  done = ['Task done','Task 0','Task 3','Task 7','Task 1'];

  


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      {let idx=event.container.data.indexOf(event.previousContainer.data[event.previousIndex]);
      if(idx != -1){
        return;}}
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  repPredicate(item: CdkDrag<string>) {
    this.done.forEach(element => {
      if(item.data===element)
      this.rep=false;
  });
    return this.rep;
  }

  noPredicate() {
    return this.rep;
  }

  files: File[] = [];

	onSelect(event:any) {
		console.log(event);
		this.files.push(...event.addedFiles);
    this.imgcount=this.files.length;
    if(this.imgcount===0){this.isimg=true}
    else{this.isimg=false}
	}
  

	onRemove(event:any) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
    this.imgcount=this.files.length;
    if(this.imgcount===0){this.isimg=true}
    else{this.isimg=false}
  }
  
  // imagesBasic = this.files;

  // setImages() {
  //   this.images = this.files;}

  
  //   logImage(image:any){
  //     alert('image clicked - you have the image data in your function');
  //   }
    
  // sameSizeimages(showSame:any){
  //   this.samesizeoption = showSame;
  // }

  // hoverEffectFn(effect:any) {
  //   let chosenEffect;
  //   let effectActive;
  //   switch (effect) {
  //       case '':
  //         chosenEffect = hoverEffect.zoom;
  //         effectActive = false;
  //         this.hoverEffect = '';
  //         break;
  //       case 'zoom':
  //         chosenEffect = hoverEffect.zoom;
  //         effectActive = true;
  //         this.hoverEffect = 'zoom';
  //         break;
  //       case 'lighten':
  //         chosenEffect = hoverEffect.lighten;
  //         effectActive = true;
  //         this.hoverEffect = 'lighten';
  //         break;
  //       case 'darken':
  //         chosenEffect = hoverEffect.darken;
  //         effectActive = true;
  //         this.hoverEffect = 'darken';
  //         break;
  //       case 'greyscale':
  //         chosenEffect = hoverEffect.greyscale;
  //         effectActive = true;
  //         this.hoverEffect = 'greyscale';
  //         break;
  //       case 'sepia':
  //         chosenEffect = hoverEffect.sepia;
  //         effectActive = true;
  //         this.hoverEffect = 'sepia';
  //         break;
  //       default:
  //         break;
  //     }
  //   this.hovereffect = {
  //     hoverEffectActive: effectActive,
  //     hoverEffect: chosenEffect
  //   };
  //   this.samesizeoption = !this.samesizeoption;
  // }

  selectedCountry: String = "--Choose Country--";
  
	Countries: Array<any> = [
		{ name: 'Spain', states: [ {name: '', cities: ['Barcelona','Madrid','Valencia']} ] },
		{ name: 'USA', states: [ {name: 'Alaska', cities: ['Anchorage','Juneau','Fairbanks']},{name: 'Texas', cities: ['Houston','San Antonio	','Dallas']},{name: 'California', cities: ['Los Angeles	','San Diego']} ] },
		{ name: 'India', states: [ {name: 'Maharashtra', cities: ['Mumbai','Pune','Nagpur','Thane']},{name: 'TamilNadu', cities: ['Chennai','Coimbatore','Madurai','Tiruchirappalli']},{name: 'Kerala', cities: ['Thiruvananthapuram','Kochi','Kozhikode','Thrissur']} ], },
	];
  
    
	states: Array<any> = []; 


	cities: Array<any> = []; 

  changeCountry(country: any) { 
		this.states = this.Countries.find((cntry: any) => cntry.name == country.target.value).states; 
	}

	
	changeState(state: any) { 
		this.cities = this.Countries.find((cntry: any) => cntry.name == this.selectedCountry).states.find((stat: any) => stat.name == state.target.value).cities; 
	}

  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }
    
  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }
    
  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }
    
  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next();
  }
    
  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
  }
    
  /**************************************************/
    
  // EVENTS
  // callback on gallery opened
  galleryOpened(index:number) {
    console.info('Gallery opened at index ', index);
  }
 
  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }
 
  // callback on gallery image clicked
  galleryImageClicked(index:number) {
    console.info('Gallery image clicked with index ', index);
  }
  
  // callback on gallery image changed
  galleryImageChanged(index:number) {
    console.info('Gallery image changed to index ', index);
  }
 
  // callback on user clicked delete button
  deleteImage(index:number) {
    console.info('Delete image at index ', index);
  }  
}
