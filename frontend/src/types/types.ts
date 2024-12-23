export type User = {
    _id : string;
    username : string;
    email : string;
}

export type Listing = {
    title : string;
    description : string;
    image : {
        filename : string;
        url : string;
    },
    price : number;
    location : string;
    owner : string;
    category : string;
    country : string;
    review : Review[];
    _id : string;
}

export type Review = {
    username : string;
    comment : string;
    rating : number;
    author : User | string;
}
