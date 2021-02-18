import Head from "next/head";
import Link from "next/link";

export default function Layout(props) {
  return (
    <div className="bg-gray-900">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="anime, series, movies"/>
<meta name="description" content="Watch and download free anime without ads"/>
<meta name="summary" content="Watch free anime"/>
<meta name="Classification" content="Entertainment"/>
<meta name="author" content="Linc Codes, linccodes@gmail.com"/>

<meta name="category" content="anime"/>
<meta name="coverage" content="Worldwide"/>
<meta name="distribution" content="Global"/>
<meta name="og:title" content="Animez"/>
<meta name="og:type" content="movie"/>
<meta name="og:image" content="/logo.png"/>
<meta name="og:description" content="Watch and download free anime without ads."/>
<meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:description"
    content="Watch and download free anime without ads."
  />
  <meta name="twitter:title" content="Animez" />
  <meta
    name="twitter:image"
    content="/logo.png"
  />
  <meta name="twitter:creator" content="@LincCodes" />

        <link rel="icon" sizes="192x192" href="/animez.ico" />
        <title>Unza Leaks</title>
      </Head>
      <nav className="bg-black text-white font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          <Link href="/">
            <a className="text-2xl no-underline text-grey-darkest hover:text-blue-300">Unza Leaks</a>
          </Link>
        </div>
        <div>
            <Link href="/">
              <a className="text-lg no-underline text-grey-darkest hover:text-blue-300 ml-2">Blogs</a>
            </Link>
            <Link  href="/about">
              <a className="text-lg no-underline text-grey-darkest hover:text-blue-300 ml-2">Contact</a>
            </Link>
            <Link  href="/contact">
              <a className="text-lg no-underline text-grey-darkest hover:text-blue-300 ml-2">About</a>
            </Link>
          </div>
      </nav>
      <div id="main">{props.children}</div>
      <footer className="p-4 flex flex-col justify-around items-center text-lg bg-black text-white">
        
        <h3>@2021 😍</h3><a href="https://linc-codes.web.app" className="text-blue-400 block">Designer</a>
      </footer>
    </div>
  );
}
