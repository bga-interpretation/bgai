import React from 'react';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout
      title="BGA Lernplattform"
      description="Systematische Interpretation der Blutgasanalyse"
    >
      <main
        style={{
          backgroundImage: "url('/img/bga-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >

        {/* Glas-Balken */}
        <div
          style={{
            width: '100%',
            padding: '6rem 1rem',
            display: 'flex',
            justifyContent: 'center',

            /* Glassmorphism */
            background: 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(12px)',

            /* Optional für mehr Tiefe */
            borderTop: '1px solid rgba(255,255,255,0.4)',
            borderBottom: '1px solid rgba(255,255,255,0.4)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          }}
        >
          <div
            style={{
              maxWidth: '900px',
              textAlign: 'center',
              color: '#1a1a1a',
            }}
          >
            <h1
              style={{
                fontSize: '3rem',
                marginBottom: '1.5rem',
                fontWeight: '600',
              }}
            >
              BGAI
            </h1>

            <p
              style={{
                fontSize: '1.25rem',
                lineHeight: '1.7',
              }}
            >
              Erlerne die systematische Interpretation der Blutgasanalyse –
              strukturiert, logisch und klinisch relevant.
              <br />
              <br />
              <h2
              style={{
                fontSize: '1.8rem',
                marginBottom: '2rem',
                color: '#c62826',  // medizinisches Rot
                fontWeight: '500',
              }}
            >
              CAVE:
            </h2>
              Diese Website ist ein studentisches Lernprojekt. Sie soll beim Verständnis der Blutgasanalyse helfen &ndash; nicht bei der Versorgung realer Patienten. Für echte klinische Entscheidungen gelten Leitlinien, klinischer Kontext und ärztliche Expertise &ndash; nicht meine Lernnotizen.
            </p>

          </div>
        </div>

      </main>
    </Layout>
  );
}