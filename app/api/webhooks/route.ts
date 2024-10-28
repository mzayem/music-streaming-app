import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import {stripe} from "@/libs/stripe"
import {
    upsertProductRecord,
    upsertPriceRecord,
    manageSubscriptionStatusChange,
} from "@/libs/supabaseAdmin";

const relevantEvents = new Set([
    'product.created',
    'product.updated',
    'price.created',
    'price.updated',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
]);

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get('Stripe-Signature');

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    try {
        if(!sig || !webhookSecret) {
            console.error("Missing Stripe signature or webhook secret");
            return new NextResponse("Webhook signature or secret missing", { status: 400 });
        }
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    
    } catch (error: any) {
        console.log('Error message sig:', error.message);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    if (relevantEvents.has(event.type)) {
        try {
            switch (event.type) {
                case 'product.created':
                case 'product.updated':
                    await upsertProductRecord(event.data.object as Stripe.Product);
                    break;
                case 'price.created':
                case 'price.updated':
                    await upsertPriceRecord(event.data.object as Stripe.Price);
                    break;
                case 'customer.subscription.created':
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted':
                    const subscription = event.data.object as Stripe.Subscription;
                    console.log("Subscription Event:", event.type, "Subscription ID:", subscription.id, "Customer ID:", subscription.customer);
                    await manageSubscriptionStatusChange(
                        subscription.id,
                        subscription.customer as string,
                        event.type === 'customer.subscription.created'
                    );
                    break;
                case 'checkout.session.completed':
                    const checkoutSession = event.data.object as Stripe.Checkout.Session;
                    console.log("Checkout Session:", checkoutSession.id, "Customer ID:", checkoutSession.customer, "Mode:", checkoutSession.mode);
                    if(checkoutSession.mode === 'subscription') {
                        const subscriptionId = checkoutSession.subscription;
                        await manageSubscriptionStatusChange(
                            subscriptionId as string,
                            checkoutSession.customer as string,
                            true
                        );
                    }
                    break;
                default:
                    throw new Error(`Unhandled event type: ${event.type}`);
            }

        }
         catch (error:any) {
            console.log('Error message switch:', error.message);
            return new NextResponse(`Webhook Error: ${error.message || 'Unknown error'}`, { status: 400 });
        }
    }
    return  NextResponse.json({ received: true }, { status: 200 });
}