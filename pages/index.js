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
          Welcome to <a href="#">Corruption API!</a>
        </h1>

        <p className={styles.description}>
          Try out querying a corruption NFT
        </p>
        <p>
          <a href="api/corruption/1">&#123;api-url&#125;/corruption/{id}</a></p>

        <div className={styles.grid}>
          <a href="https://thegraph.com/hosted-service/subgraph/shahruz/corruptions?version=current" className={styles.card}>
            <h2>Shahruz Graph&rarr;</h2>
            <p>Subgraph querying.</p>
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
