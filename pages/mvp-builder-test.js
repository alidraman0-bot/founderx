import React from 'react'

export default function MVPBuilderTest() {
  console.log('Simple test component rendering')
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'red', fontSize: '2rem', textAlign: 'center' }}>
        🚀 MVP Builder Test Page
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>
        If you can see this, the page is working!
      </p>
      <div style={{ 
        backgroundColor: 'blue', 
        color: 'white', 
        padding: '20px', 
        margin: '20px',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h2>Test Content Area</h2>
        <p>This is a simple test to see if the page loads correctly.</p>
      </div>
    </div>
  )
}
