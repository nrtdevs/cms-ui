'use client'
import React from 'react'

const Page: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1
        style={{
          transition: 'transform 0.5s ease-in-out'
        }}
        onMouseEnter={e => {
          ;(e.target as HTMLElement).style.transform = 'scale(3.5)'
        }}
        onMouseLeave={e => {
          ;(e.target as HTMLElement).style.transform = 'scale(1)'
        }}
      >
        Welcome to My Page
      </h1>
      <p
        style={{
          opacity: 0,
          animation: 'fadeIn 2s forwards'
        }}
      >
        This is a simple example of a `page.tsx` component.
      </p>
      <button
        onClick={() => alert('Button clicked!')}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, background-color 0.3s ease'
        }}
        onMouseEnter={e => {
          ;(e.target as HTMLElement).style.backgroundColor = '#0056b3'
          ;(e.target as HTMLElement).style.transform = 'scale(1.1)'
        }}
        onMouseLeave={e => {
          ;(e.target as HTMLElement).style.backgroundColor = '#007bff'
          ;(e.target as HTMLElement).style.transform = 'scale(1)'
        }}
      >
        Click Me
      </button>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default Page
