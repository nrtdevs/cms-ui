'use client'
import React from 'react'

const Page: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to My Page</h1>
      <p>This is a simple example of a `page.tsx` component.</p>
      <button
        onClick={() => alert('Button clicked!')}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Click Me
      </button>
    </div>
  )
}

export default Page
