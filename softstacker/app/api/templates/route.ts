import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, targetOS, apps } = body;

    // First, insert the template
    const { data: template, error: templateError } = await supabase
      .from('templates')
      .insert([
        { title, description, category, target_os: targetOS }
      ])
      .select()
      .single();

    if (templateError) throw templateError;

    // Then, insert the apps with the template_id
    const appsWithTemplateId = apps.map((app: any) => ({
      template_id: template.id,
      name: app.name,
      description: app.description,
      website: app.website,
      category: app.category,
      is_required: app.isRequired,
      chocolatey_package: app.chocolateyPackage,
      brew_package: app.brewPackage,
      apt_package: app.aptPackage,
      dnf_package: app.dnfPackage,
      pacman_package: app.pacmanPackage,
    }));

    const { error: appsError } = await supabase
      .from('apps')
      .insert(appsWithTemplateId);

    if (appsError) throw appsError;

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error('Template creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
} 