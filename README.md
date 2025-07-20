# VueClip - Secure One-Time Text Sharing

A modern Vue.js application for sharing text securely with one-time access links that self-destruct after viewing.

## Features

- 🔒 **One-Time Access**: Links are automatically deleted after the first view
- 🎨 **Modern UI**: Beautiful, responsive design with glass-morphism effects
- 🚀 **Fast**: Built with Vue 3 and Vite for optimal performance
- 📱 **Mobile-First**: Fully responsive design that works on all devices
- 🔧 **Custom URLs**: Choose your own URL slug or get a random one
- 📋 **Copy to Clipboard**: Easy copying with visual feedback
- 🔄 **Smart Redirects**: Automatic redirect to create page for non-existent slugs

## Tech Stack

- **Frontend**: Vue 3, Vue Router, Tailwind CSS
- **Backend**: PocketBase
- **Build Tool**: Vite
- **Deployment**: Static hosting (Netlify, Vercel, etc.)

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- A PocketBase instance (local or hosted)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd vue-clip
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and set your PocketBase URL:
```
VITE_POCKETBASE_URL=http://localhost:8090
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## PocketBase Setup

### Database Schema

Create a collection named `clips` with the following fields:

- `slug` (Text, Required, Unique)
- `content` (Text, Required)

### API Rules

Set the following permissions for the `clips` collection:

- **List Records**: `""` (Nobody)
- **View Record**: `""` (Everybody)
- **Create Record**: `""` (Everybody)
- **Update Record**: `""` (Nobody)
- **Delete Record**: `""` (Everybody)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── assets/          # Static assets and global CSS
├── components/      # Reusable Vue components
│   └── LoadingSpinner.vue
├── views/           # Page components
│   ├── CreateView.vue
│   ├── ReadView.vue
│   ├── SuccessView.vue
│   └── NotFoundView.vue
├── router/          # Vue Router configuration
│   └── index.js
├── App.vue          # Main app component
└── main.js          # App entry point
```

## Deployment

### Building for Production

```bash
npm run build
```

This creates a `dist/` directory with optimized static files.

### Static Hosting

Deploy the `dist/` directory to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder or connect your Git repository
- **Vercel**: Import your project and deploy
- **GitHub Pages**: Upload the `dist` contents to your gh-pages branch

### Important: SPA Configuration

Since this is a Single Page Application (SPA), you need to configure your hosting provider to redirect all requests to `index.html`. This ensures that refreshing the page on routes like `/my-clip` works correctly.

#### Netlify
Create a `public/_redirects` file:
```
/*    /index.html   200
```

#### Vercel
Create a `vercel.json` file:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Environment Variables

- `VITE_POCKETBASE_URL` - Your PocketBase instance URL

## Security Features

- Content is immediately deleted after first access
- No server-side storage of sensitive data
- Client-side validation and sanitization
- Secure HTTP headers in HTML

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For questions or issues, please open an issue on GitHub.