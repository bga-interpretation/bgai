import React from 'react';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout title="Start" description="BGA Lernplattform">
      <main style={{padding: '2rem'}}>
        <h1>BGA Interpretation</h1>
        <p>
          Lerne die strukturierte Interpretation der Blutgasanalyse
          anhand klarer Algorithmen und praxisnaher Fallbeispiele.
        </p>
      </main>
    </Layout>
  );
}
