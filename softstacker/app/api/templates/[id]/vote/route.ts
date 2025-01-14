import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase configuration missing');
    return NextResponse.json({ error: 'Service not configured' }, { status: 503 });
  }

  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
      .from('votes')
      .insert([{ template_id: params.id }])
      .select();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json(
      { error: 'Failed to submit vote' },
      { status: 500 }
    );
  }
} 