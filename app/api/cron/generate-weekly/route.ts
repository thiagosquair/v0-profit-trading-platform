// app/api/cron/generate-weekly/route.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';          // <== generated in Milestone 1

// Optional: keep the function fast by running on the Edge runtime
export const runtime = 'edge';

export async function GET() {
  // 1.  Initialise Supabase *server‑side* with the service‑role key
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!   // NEVER expose this in the browser
  );

  // 2.  Grab the weekly cycle item(s)
  const { data: cycles, error: cycleErr } = await supabase
    .from('content_items')
    .select('id')
    .eq('type', 'cycle')
    .eq('cadence', '1 week');
  if (cycleErr) return new Response(cycleErr.message, { status: 500 });
  if (!cycles?.length) return new Response('no weekly cycle rows', { status: 200 });

  // 3.  Find "active" users – for now **all** users; refine later
  const { data: users, error: userErr } = await supabase
    .from('users')                // or your trades/user table
    .select('id');
  if (userErr) return new Response(userErr.message, { status: 500 });

  // 4.  Build the rows to insert
  const rows = users!.flatMap(u =>
    cycles.map(c => ({
      user_id: u.id,
      content_id: c.id,
      due_at: new Date().toISOString(),
      status: 'pending'
    }))
  );

  // 5.  Upsert to avoid duplicates
  const { error: insertErr } = await supabase
    .from('content_jobs')
    .upsert(rows, { ignoreDuplicates: true });
  if (insertErr) return new Response(insertErr.message, { status: 500 });

  return new Response(`queued ${rows.length} jobs`, { status: 200 });
}
