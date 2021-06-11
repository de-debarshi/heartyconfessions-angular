export class Confession {
    _id: string;
    age: number;
    sex: string;
    content: string;
    status: string;
    categories: [string];
    likes: number;
    comments : [{
        username : string;
        comment : string;
        date: Date
    }]
}
