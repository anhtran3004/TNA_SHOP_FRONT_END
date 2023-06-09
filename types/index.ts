export type VotesType = {
    count: number;
    value: number;
}

export type PunctuationType = {
    countOpinions: number;
    punctuation: number;
    votes: VotesType[]
}

export type ReviewType = {
    name: string;
    avatar: string;
    description: string;
    punctuation: number;
}

export type ProductType = {
    id: string;
    name: string;
    thumb: string;
    price: string;
    count: number;
    color: string;
    size: string;
    images: string[];
    discount?: string;
    currentPrice: number;
    punctuation: PunctuationType;
    reviews: ReviewType[];
}

export type ProductTypeList = {
    id: string;
    name: string;
    price: string;
    color: string;
    images: string[];
    discount?: string;
    currentPrice?: number;
}

export type ProductStoreType = {
    id: string;
    name: string;
    thumb: string;
    price: number;
    originalPrice: number;
    count: number;
    color: string;
    size: string;
}

export type GtagEventType = {
    action: string;
    category: string;
    label: string;
    value: string
}
export type Category = {
    id: string,
    categoryName: string,
    sku: string,
    status: number

}
export type InputProduct = {
    filter: {
        search: string,
        product_id: number[],
        category_id: number[],
        campaign_id: number[],
        price: {
            min: number,
            max: number
        }
    },
    sort: {
        field: string,
        order: string
    },
    pagination: {
        page: number,
        perPage: number
    }
}
export type Product = {
    id: number,
    name: string,
    sku: string
    description: string,
    price: number,
    thumb: string,
    status: number,
    hot: number,
    category_id: number,
    campaign_id: number,
    discount_id: number,
    import_date: string,
    update_date: string,
    favorite: number,
    priority: number
}
export type Cart = {
    id: number
    product_id: number
}
export type Inventory = {
    id: number,
    name: string,
    size: string,
    quantity: number,
    size_id: number,
    color_id: number,
    product_id: number
}
export type Discount = {
    id: number,
    discount_code: string,
    discount_type: string,
    discount_value: number
}
export type Campaign = {
    id: number,
    name: string,
    sku: string,
    thumb: string,
    start_day: string,
    end_day: string,
    status: number,
    campaign_description: string
}
export  type InputLogin = {
    username: string,
    password: string
}
export type User = {
    id: number,
    username: string,
    email: string,
    name: string,
    phone: string,
    address: string
    birth_date: string
}
export type InputUser = {
    user_input: {
        email: string,
        name: string,
        phone: string,
        address: string,
        birth_date: string
    }
}
export type InputInsertUser = {
    user_input: {
        email: string,
        name: string,
        phone: string,
        address: string,
        username: string,
        password: string,
    }
}
export type InputOrder = {
    order_input: {
        name: string,
        email: string,
        address: string,
        phone: string,
        ship_name: string,
        method_delivery: string,
        user_id: number,
        shipping_fee: number,
        total_price: number
    }
}
export type Order = {
    id: number,
    name: string,
    email: string,
    address: string,
    phone: string,
    ship_name: string,
    method_delivery: string,
    user_id: number,
    shipping_fee: number,
    status: number,
    total_price: number
}
export type InputOrderProduct = {
    order_input: {
        order_id: number,
        product_id: number,
        price: number,
        quantity: number,
        name: string,
        thumb: string,
        color: string,
        size: string
    }
}
export type OrderProduct = {
    id: number,
    order_id: number,
    product_id: number,
    price: number,
    quantity: number,
    color: string,
    size: string,
    name: string,
    thumb: string,
}
export type InputInventory = {
    product_input: {
        color_name: string,
        size: string
    }
}
export type InputUpdateInventory = {
    product_input: {
        color_name: string,
        size: string,
        quantity: number
    }

}
export type InputComment = {
    comment_input: {
        content: string,
        rating: number,
        product_id: number,
    }
}
export type InputContact = {
    contact_input: {
        email: string,
        name: string,
        message: string,
        subject: string,
        phone: string
    }
}
export type Comment = {
    id: number,
    content: string,
    rating: number,
    product_id: number,
    username: string,
    user_id: number,
    comment_date: string,
}
export type ChildComments = {
    content: string,
    comment_date: string,
    comment_id: number
}
// export type Vote ={
//     index: number,
//     value: number
// }