export class Job { 
    name: string;
    description: string; 
    cat: Array<string>;
    photo:string;
    listingTime:number;
    cost:number;
    location:string;
    phoneNumber:number;
    creator:string;

  constructor(
    name: string, 
    description: string, 
    cat: Array<string>, 
    photo: string, 
    listingTime: number, 
    cost: number, 
    location: string, 
    phoneNumber: number,
    creator:string
) {
    this.name = name
    this.description = description
    this.cat = cat
    this.photo = photo
    this.listingTime = listingTime
    this.cost = cost
    this.location = location
    this.phoneNumber = phoneNumber
    this.creator = creator
  }

    
} 