import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Template, App } from '@/types/template';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetOS = searchParams.get('os');
    const category = searchParams.get('category');

    let query = supabase
      .from('templates')
      .select(`
        *,
        apps (*),
        votes (count)
      `);

    // Apply filters if provided
    if (targetOS) {
      query = query.eq('target_os', targetOS);
    }
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data: templates, error } = await query;

    if (error) throw error;

    // Transform the data to include vote count
    const transformedTemplates = templates.map(template => ({
      ...template,
      votes: template.votes?.length || 0,
      apps: template.apps.map((app: App) => ({
        name: app.name,
        description: app.description,
        website: app.website,
        category: app.category,
        subcategory: app.subcategory,
        isRequired: app.isRequired,
        chocolateyPackage: app.chocolateyPackage,
        brewPackage: app.brewPackage,
        aptPackage: app.aptPackage,
        dnfPackage: app.dnfPackage,
        pacmanPackage: app.pacmanPackage
      })),
    }));

    return NextResponse.json(transformedTemplates);
  } catch (error) {
    console.error('Failed to fetch templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

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
    const appsWithTemplateId = apps.map((app: App) => ({
      template_id: template.id,
      name: app.name,
      description: app.description,
      website: app.website,
      category: app.category,
      subcategory: app.subcategory,
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