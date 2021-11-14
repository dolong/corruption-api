import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Demo Corruption App</title>
        <meta name="description" content="Corruption API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Corruption.js!</a>
        </h1>

        <p className={styles.description}>
          Try out querying a corruption NFT
        </p>
        <p>
          <a href="api/corruption/1">&#123;api-url&#125;/corruption/1</a></p>

        <div className={styles.grid}>
          <a href="https://www.npmjs.com/package/@whaledrop/corruptiontest" className={styles.card}>
            <h2>NPM Package&rarr;</h2>
            <p>Find in-depth information about Corruption.js features and API.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Written by Long Do          
        </a>
      </footer>
    </div>
  )
}
