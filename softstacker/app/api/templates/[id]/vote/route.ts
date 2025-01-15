import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { headers } from 'next/headers';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const templateId = params.id;

    // Check if user has already voted
    const { data: existingVote } = await supabase
      .from('votes')
      .select()
      .eq('template_id', templateId)
      .eq('user_ip', ip)
      .single();

    if (existingVote) {
      // Remove vote if already voted
      const { error: deleteError } = await supabase
        .from('votes')
        .delete()
        .eq('template_id', templateId)
        .eq('user_ip', ip);

      if (deleteError) throw deleteError;
      return NextResponse.json({ message: 'Vote removed' });
    }

    // Add new vote
    const { error: insertError } = await supabase
      .from('votes')
      .insert([{ template_id: templateId, user_ip: ip }]);

    if (insertError) throw insertError;

    // Get updated vote count
    const { data: voteCount } = await supabase
      .from('votes')
      .select('id', { count: 'exact' })
      .eq('template_id', templateId);

    return NextResponse.json({ 
      message: 'Vote added',
      votes: voteCount?.length || 0
    });

  } catch (error) {
    console.error('Voting error:', error);
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    );
  }
} 