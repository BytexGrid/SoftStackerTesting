import { NextResponse } from 'next/server';
import { PackageInfo, MacPackage, LinuxPackage, AURPackage } from '@/types/package';

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
        
        interface ScoredFormula {
          formula: MacPackage;
          score: number;
        }

        const scoredResults = brewData
          .map((formula: MacPackage) => {
            const nameLower = formula.name.toLowerCase();
            const queryLower = query.toLowerCase();
            let score = 0;
            
            if (nameLower === queryLower) {
              score += 100;
            }
            else if (nameLower.startsWith(queryLower)) {
              score += 50;
            }
            else if (nameLower.includes(queryLower)) {
              score += 25;
            }
            else if (formula.desc?.toLowerCase().includes(queryLower)) {
              score += 10;
            }
            
            return { formula, score };
          })
          .filter((item: ScoredFormula) => item.score > 0)
          .sort((a: ScoredFormula, b: ScoredFormula) => b.score - a.score)
          .slice(0, 10)
          .map((item: ScoredFormula) => item.formula);

        return NextResponse.json(scoredResults);

      case 'linux':
        const pkgManager = searchParams.get('pkgManager') || 'apt';
        let transformedData: PackageInfo[] = [];
        
        try {
          switch (pkgManager) {
            case 'apt':
              url = `https://sources.debian.org/api/search/${encodeURIComponent(query)}/`;
              const aptResponse = await fetch(url);
              
              if (!aptResponse.ok) {
                throw new Error(`Failed to fetch APT data: ${aptResponse.status}`);
              }
              
              const aptData = await aptResponse.json();
              transformedData = (aptData.results?.exact || aptData.results?.substring || [])
                .map((pkg: LinuxPackage) => ({
                  name: pkg.name,
                  description: pkg.description?.split(/[.!?](?:\s|$)/)[0] || pkg.name,
                  version: 'latest',
                  website: `https://packages.debian.org/stable/${pkg.name}`,
                  aptPackage: pkg.name
                }))
                .slice(0, 10);
              break;

            case 'dnf':
              url = `https://pkgs.org/api/packages/?q=${encodeURIComponent(query)}&distribution=fedora`;
              const dnfResponse = await fetch(url);
              
              if (!dnfResponse.ok) {
                throw new Error(`Failed to fetch DNF data: ${dnfResponse.status}`);
              }
              
              const dnfData = await dnfResponse.json();
              transformedData = (dnfData.results || [])
                .map((pkg: LinuxPackage) => ({
                  name: pkg.name,
                  description: pkg.description?.split(/[.!?](?:\s|$)/)[0] || pkg.name,
                  version: pkg.version || 'latest',
                  website: `https://packages.fedoraproject.org/pkgs/${pkg.name}`,
                  dnfPackage: pkg.name
                }))
                .slice(0, 10);
              break;

            case 'pacman':
              url = `https://aur.archlinux.org/rpc/v5/search/${encodeURIComponent(query)}`;
              const pacmanResponse = await fetch(url);
              
              if (!pacmanResponse.ok) {
                throw new Error(`Failed to fetch Pacman data: ${pacmanResponse.status}`);
              }
              
              const pacmanData = await pacmanResponse.json();
              if (pacmanData.type === 'error') {
                throw new Error(`AUR error: ${pacmanData.error}`);
              }
              
              transformedData = (pacmanData.results || [])
                .map((pkg: AURPackage) => ({
                  name: pkg.Name,
                  description: pkg.Description?.split(/[.!?](?:\s|$)/)[0] || pkg.Name,
                  version: pkg.Version,
                  website: pkg.URL || `https://aur.archlinux.org/packages/${pkg.Name}`,
                  pacmanPackage: pkg.Name
                }))
                .slice(0, 10);
              break;

            default:
              throw new Error('Unsupported package manager');
          }

          if (transformedData.length === 0) {
            console.log(`No packages found for ${pkgManager} with query: ${query}`);
          } else {
            console.log(`${pkgManager.toUpperCase()} search results:`, transformedData.slice(0, 2));
          }

          return NextResponse.json(transformedData);
        } catch (error) {
          console.error(`${pkgManager} search error:`, error);
          return NextResponse.json({ error: `Failed to fetch ${pkgManager} package data` }, { status: 500 });
        }

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