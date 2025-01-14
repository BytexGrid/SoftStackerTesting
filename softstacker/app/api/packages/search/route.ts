import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const os = searchParams.get('os');

  if (!query || !os) {
    return NextResponse.json({ error: 'Missing query or OS parameter' }, { status: 400 });
  }

  try {
    // Handle each OS separately
    switch (os) {
      case 'windows': {
        const url = `https://community.chocolatey.org/api/v2/Search()?$filter=IsLatestVersion&$skip=0&$top=10&searchTerm='${query}'&targetFramework=''&includePrerelease=false`;
        console.log('Fetching from Chocolatey:', url);
        
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'SoftStacker/1.0'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch Chocolatey data: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
      }

      case 'macos': {
        const url = 'https://formulae.brew.sh/api/formula.json';
        console.log('Fetching from Homebrew:', url);
        
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'SoftStacker/1.0'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch Homebrew data: ${response.status}`);
        }

        const data = await response.json();
        
        // Score and sort results
        const scoredResults = data
          .map((formula: any) => {
            const nameLower = formula.name.toLowerCase();
            const queryLower = query.toLowerCase();
            let score = 0;
            
            if (nameLower === queryLower) score += 100;
            else if (nameLower.startsWith(queryLower)) score += 50;
            else if (nameLower.includes(queryLower)) score += 25;
            else if (formula.desc?.toLowerCase().includes(queryLower)) score += 10;
            
            return { formula, score };
          })
          .filter((item: any) => item.score > 0)
          .sort((a: any, b: any) => b.score - a.score)
          .slice(0, 10)
          .map((item: any) => item.formula);

        return NextResponse.json(scoredResults);
      }

      case 'linux': {
        const pkgManager = searchParams.get('pkgManager') || 'apt';
        
        // Mock data for development/demo
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

        const searchLower = query.toLowerCase();
        let results;

        switch (pkgManager) {
          case 'apt':
          case 'dnf':
          case 'pacman':
            results = mockData[pkgManager as keyof typeof mockData]
              .filter(pkg => 
                pkg.name.toLowerCase().includes(searchLower) || 
                pkg.description.toLowerCase().includes(searchLower)
              );
            break;
          default:
            return NextResponse.json({ error: 'Unsupported package manager' }, { status: 400 });
        }

        console.log(`${pkgManager.toUpperCase()} search results:`, results);
        return NextResponse.json(results);
      }

      default:
        return NextResponse.json({ error: 'Unsupported OS' }, { status: 400 });
    }
  } catch (error) {
    console.error('Package search error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch package data' },
      { status: 500 }
    );
  }
} 