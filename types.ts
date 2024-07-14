import Stripe from "stripe";

export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    avatar_url?: string;
    billing_address?: Stripe.Address;
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Product {
    id: string;
    active?: boolean;
    name?: string;
    description?: string;
    image?: string;
    metadata?: Stripe.Metadata;
}

export interface Price {
    id: string;
    product_id?: string;
    active?: boolean;
    desxcription?: string;
    currency?: string;
    unit_amount?: number;
    type?: Stripe.Price.Type;
    interval?: Stripe.Price.Recurring.Interval;
    interval_count?: number;
    trial_period_days?: number;
    metadata?: Stripe.Metadata;
    product? : Product;
}

export interface Subscription {
    id: string;
    user_id: string;
    status?:Stripe.Subscription.Status;
    metadta?:Stripe.Metadata;
    price_id?:string;
    quantity?:number;
    cancel_at_period_end?:boolean;
    created:string;
    current_period_start:string;
    current_period_end:string;
    ended_at?:string;
    cancel_at?:string;
    canceled_at?:string;
    trial_start?:string;
    trial_end?:string;
    prices?:Price;
}