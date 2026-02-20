import React from 'react';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout title="Start" description="BGA Lernplattform">
      <main style={{padding: '2rem'}}>
        <h1>BGA Interpretation</h1>
        <p>
          Praxisnahe Anleitung zur strukturierten Interpretation der Blutgasanalyse.
          <br /><br /><h2>CAVE:</h2>
          Diese Website ist ein studentisches Lernprojekt. Sie soll beim Verständnis der Blutgasanalyse helfen &ndash; nicht bei der Versorgung realer Patienten. Für echte klinische Entscheidungen gelten Leitlinien, klinischer Kontext und ärztliche Expertise &ndash; nicht meine Lernnotizen.
        </p>
      </main>
    </Layout>
  );
}
