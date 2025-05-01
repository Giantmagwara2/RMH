// pages/api/og.js
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'RocVille Blog Post';
    const author = searchParams.get('author') || 'RocVille Media';

    return new ImageResponse(
      (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f9ff', // Light blue background
          color: '#1e3a8a', // Dark blue text
          padding: '40px',
          textAlign: 'center',
          fontFamily: 'sans-serif', // Use a common sans-serif font
        }}>
          <h1 style={{ fontSize: '60px', fontWeight: 'bold', marginBottom: '20px', lineHeight: 1.2 }}>
            {title}
          </h1>
          <p style={{ fontSize: '32px', color: '#475569' }}>
            by <span style={{ fontWeight: 'bold' }}>{author}</span>
          </p>
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '24px', color: '#a1a1aa' }}>
            RocVille Media
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}