import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const os = searchParams.get('os');

  if (!query || !os) {
    return NextResponse.json({ error: 'Missing query or OS parameter' }, { status: 400 });
  }

  try {
    let url = '';
    switch (os) {
      case 'windows':
        url = `https://community.chocolatey.org/api/v2/Search()?$filter=IsLatestVersion&$skip=0&$top=10&searchTerm='${query}'&targetFramework=''&includePrerelease=false`;
        break;
      case 'macos':
        // Fetch all formulae and filter on the server side
        url = 'https://formulae.brew.sh/api/formula.json';
        const brewResponse = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'SoftStacker/1.0'
          }
        });
        
        if (!brewResponse.ok) {
          throw new Error(`Failed to fetch Homebrew data: ${brewResponse.status} ${brewResponse.statusText}`);
        }

        const brewData = await brewResponse.json();
        
        // Score and sort results by relevance
        interface ScoredFormula {
          formula: any;
          score: number;
        }

        const scoredResults = brewData
          .map((formula: any) => {
            const nameLower = formula.name.toLowerCase();
            const queryLower = query.toLowerCase();
            let score = 0;
            
            // Exact match gets highest score
            if (nameLower === queryLower) {
              score += 100;
            }
            // Starts with query gets high score
            else if (nameLower.startsWith(queryLower)) {
              score += 50;
            }
            // Contains query in name gets medium score
            else if (nameLower.includes(queryLower)) {
              score += 25;
            }
            // Contains query in description gets low score
            else if (formula.desc?.toLowerCase().includes(queryLower)) {
              score += 10;
            }
            
            return { formula, score };
          })
          .filter((item: ScoredFormula) => item.score > 0) // Only keep matches
          .sort((a: ScoredFormula, b: ScoredFormula) => b.score - a.score) // Sort by score descending
          .slice(0, 10) // Take top 10
          .map((item: ScoredFormula) => item.formula); // Extract formula data

        return NextResponse.json(scoredResults);

      case 'linux':
        const pkgManager = searchParams.get('pkgManager') || 'apt';
        let transformedData = [];
        
        // Mock data for development
        const mockData = {
          apt: [
            { name: 'git', description: 'fast, scalable, distributed revision control system', version: 'latest', aptPackage: 'git' },
            { name: 'git-all', description: 'fast, scalable, distributed revision control system (all subpackages)', version: 'latest', aptPackage: 'git-all' },
            { name: 'git-core', description: 'fast, scalable, distributed revision control system (core tools)', version: 'latest', aptPackage: 'git-core' }
          ],
          dnf: [
            { name: 'git', description: 'Fast Version Control System', version: 'latest', dnfPackage: 'git' },
            { name: 'git-all', description: 'Meta-package to pull in all git tools', version: 'latest', dnfPackage: 'git-all' },
            { name: 'git-core', description: 'Core package of git tools', version: 'latest', dnfPackage: 'git-core' }
          ],
          pacman: [
            { name: 'git', description: 'the fast distributed version control system', version: '2.43.0-1', pacmanPackage: 'git' },
            { name: 'git-lfs', description: 'Git extension for versioning large files', version: '3.4.1-1', pacmanPackage: 'git-lfs' },
            { name: 'git-extras', description: 'GIT utilities -- repo summary, repl, changelog population, author commit percentages and more', version: '7.1.0-1', pacmanPackage: 'git-extras' }
          ]
        };

        // Filter mock data based on search query
        const searchLower = query.toLowerCase();
        switch (pkgManager) {
          case 'apt':
            transformedData = mockData.apt
              .filter(pkg => pkg.name.toLowerCase().includes(searchLower) || pkg.description.toLowerCase().includes(searchLower));
            break;
          case 'dnf':
            transformedData = mockData.dnf
              .filter(pkg => pkg.name.toLowerCase().includes(searchLower) || pkg.description.toLowerCase().includes(searchLower));
            break;
          case 'pacman':
            transformedData = mockData.pacman
              .filter(pkg => pkg.name.toLowerCase().includes(searchLower) || pkg.description.toLowerCase().includes(searchLower));
            break;
          default:
            return NextResponse.json({ error: 'Unsupported package manager' }, { status: 400 });
        }

        console.log(`${pkgManager.toUpperCase()} search results:`, transformedData);
        return NextResponse.json(transformedData);

      default:
        return NextResponse.json({ error: 'Unsupported OS' }, { status: 400 });
    }

    console.log('Fetching from:', url);
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'SoftStacker/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch package data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data).slice(0, 200));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Package search error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch package data' },
      { status: 500 }
    );
  }
} 