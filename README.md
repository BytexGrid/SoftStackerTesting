# SoftStacker

A community-driven platform for discovering and sharing software templates across different operating systems.

## About

SoftStacker helps users find the right software setup based on their operating system and role. Whether you're a developer, designer, or content creator, you can find and share curated collections of tools that work best for your workflow.

## Features

- Find software collections specific to Windows, macOS, and Linux
- Browse templates based on professional roles and use cases
- Share your own setups and learn from others
- Quick template creation through system scanning
- Easy installation through package managers (Chocolatey, Homebrew, apt/dnf/pacman)

## Tech Stack

- Frontend: Next.js with TypeScript
- Styling: Tailwind CSS
- Deployment: GitHub Pages

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/BytexGrid/SoftStacker.git
   ```

2. Navigate to the project directory:
   ```bash
   cd SoftStacker/softstacker
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

The project structure is organized as follows:
```
SoftStacker/
├── .github/            # GitHub Actions workflows
├── softstacker/        # Next.js application
│   ├── app/           # Application source code
│   ├── public/        # Static assets
│   └── ...           # Configuration files
└── README.md
```

## Contributing

We welcome contributions from the community. Feel free to submit issues and pull requests.

## License

This project is open source under the MIT License. 