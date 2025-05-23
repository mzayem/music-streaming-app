import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import {headers, cookies} from "next/headers";
import { NextResponse } from "next/server";

import{stripe} from "@/libs/stripe";
import { getURL } from "@/libs/helpers";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";

export async function POST (
    request: Request,
) {
    const {price, quantity=1, metadata = {}} = await request.json();

    try {
        const supabase = createRouteHandlerClient({
            cookies,
        });

        const {data: {user}} = await supabase.auth.getUser();

        const customer = await createOrRetrieveCustomer({
            uuid: user?.id || '',
            email: user?.email ||'',
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'] as any,
            billing_address_collection: 'required',
            customer,
            line_items:[{ price:price.id, quantity}],
            mode: 'subscription',
            allow_promotion_codes: true,
            subscription_data:{
                trial_from_plan: true,
                metadata,
            },
            // success_url: 'http://localhost:3000/account',
            // cancel_url: 'http://localhost:3000',
            success_url: 'https://beat-stream-nu.vercel.app/account',
            cancel_url: 'https://beat-stream-nu.vercel.app'
        }as any);
        return NextResponse.json({sessionId: session.id});
    } catch (error :any) {
        console.error(error);
        return NextResponse.json('Internal Error', {status: 500});
    }
}




