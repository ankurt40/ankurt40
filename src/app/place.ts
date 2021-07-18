export class Place {

    id: number;
    image : string;
    name : string;
    displayname : string;
    city : string;
    address: string;
    type : string;
    country : string;
    place_id: string;
    lat : number;
    lng: number;
    is_active : number;
    duration_of_visit: number;
    googlerating : number;
    totalgoogletarings : number;
    distance_from_city_center_value: number;

    constructor(id: number,
        image : string,
        name : string,
        displayname : string,
        city : string,
        address: string,
        type : string,
        country : string,
        place_id: string,
        lat : number,
        lng: number,
        is_active : number,
        duration_of_visit: number,
        googlerating : number,
        totalgoogletarings : number,
        distance_from_city_center_value: number,
    ) {
        this.id= id;
        this.image = image;
    this.name = name;
    this.displayname = displayname;
    this.city = city;
    this.address= address;
    this.type = type;
    this.country=  country;
    this.place_id= place_id;
    this.lat = lat;
    this.lng=lng;
    this.is_active = is_active;
    this.duration_of_visit= duration_of_visit;
    this.googlerating = googlerating;
    this.totalgoogletarings = totalgoogletarings;
    this.distance_from_city_center_value= distance_from_city_center_value;

    }

}
