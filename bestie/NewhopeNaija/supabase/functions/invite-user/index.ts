import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error("Missing Authorization header");

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify the user calling this is an admin
    const token = authHeader.replace('Bearer ', '').trim();
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) throw new Error("Unauthorized: " + (userError?.message || "No user"));

    const { data: profile } = await supabaseClient.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') throw new Error("Only admins can invite new users.");

    // Get the email and player name from the request body
    const { email, full_name } = await req.json();
    console.log(`Attempting to invite user: ${email}, name: ${full_name}`);
    if (!email) throw new Error("Email is required");

    // Initialize Admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    let invitedUser;

    if (RESEND_API_KEY) {
      console.log('Resend API key found. Using Resend for invitation email to bypass Supabase rate limits.');
      // 1. Generate the invitation link
      const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
        type: 'invite',
        email: email,
        options: {
          redirectTo: `${req.headers.get('origin') || ''}/#setup-password`,
          data: { full_name: full_name || '', role: 'player' }
        }
      });

      if (linkError) {
        console.error('Generate Link Error:', linkError);
        throw linkError;
      }

      invitedUser = linkData.user;
      const inviteLink = linkData.properties.action_link;

      // 2. Send the email via Resend
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'NewHope Naija FC <no-reply@newhopenaijafc.com>',
          to: [email],
          subject: 'Welcome to NewHope Naija FC!',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f5; width: 100%; margin: 0; padding: 40px 0;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08); max-width: 600px; margin: 0 auto;">
                      
                      <!-- Header -->
                      <tr>
                        <td style="background-color: #001f5b; padding: 40px 30px; text-align: center;">
                          <h1 style="color: #ffffff; font-size: 28px; line-height: 1.2; margin: 0; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Welcome to <span style="color: #cc0000;">NewHope</span> Naija FC</h1>
                        </td>
                      </tr>

                      <!-- Body -->
                      <tr>
                        <td style="padding: 40px 40px 30px; background-color: #ffffff;">
                          <h2 style="color: #001f5b; font-size: 22px; font-weight: 600; margin: 0 0 20px; text-align: center;">You've Been Invited to the Club! ⚽</h2>
                          
                          <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px; text-align: center;">
                            We are excited to invite you to join the official <strong>NewHope Naija FC</strong> digital platform. Your player profile is ready to be claimed.
                          </p>
                          
                          <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px; text-align: center;">
                            Click the button below to securely set up your password, access your personalized dashboard, and stay updated with the latest club news, match fixtures, and your personal performance stats.
                          </p>
                          
                          <!-- CTA Button -->
                          <div style="text-align: center; margin: 35px 0 30px;">
                            <a href="${inviteLink}" style="display: inline-block; background-color: #cc0000; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 16px 36px; border-radius: 8px; box-shadow: 0 4px 6px rgba(204,0,0,0.25);">
                              Accept Invitation &amp; Set Password
                            </a>
                          </div>
                          
                          <p style="color: #718096; font-size: 13px; line-height: 1.5; margin: 0; text-align: center;">
                            <em>For your security, this invitation link will expire in 24 hours.</em><br>
                            If the button above does not work, copy and paste this link into your browser:<br>
                            <a href="${inviteLink}" style="color: #001f5b; word-break: break-all;">${inviteLink}</a>
                          </p>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f7fafc; padding: 30px 40px; border-top: 1px solid #edf2f7; text-align: center;">
                          <p style="color: #a0aec0; font-size: 13px; line-height: 1.5; margin: 0 0 10px;">
                            <strong>NewHope Naija Football Club</strong><br>
                            No.111 Ejinrin road, Orunfan Junction,<br>
                            Ijebu-Ode, Ogun State, Nigeria
                          </p>
                          <p style="color: #cbd5e0; font-size: 12px; margin: 0;">
                            If you weren't expecting this invitation, simply ignore this email.<br>
                            &copy; 2026 NewHope Naija FC. All rights reserved.
                          </p>
                        </td>
                      </tr>
                      
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        }),
      });

      if (!res.ok) {
        const resData = await res.json();
        console.error('Resend API Error:', resData);
        throw new Error(resData.message || 'Failed to send invitation via Resend');
      }
      console.log('Resend invitation sent successfully.');
    } else {
      console.log('No RESEND_API_KEY secret found. Falling back to default Supabase invitation (subject to rate limits).');
      const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
        data: { full_name: full_name || '', role: 'player' }
      });
      if (error) throw error;
      invitedUser = data.user;
    }

    return new Response(JSON.stringify({ success: true, user: invitedUser }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Edge Function Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
