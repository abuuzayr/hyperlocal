[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Twitter][twitter-shield]][twitter-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/abuuzayr/hyperlocal/">
    <img src="public/logo_transparent.png" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">hyperlocal.sg</h3>
<p align="center">
    <a href="https://js-talks.netlify.com/" rel="nofollow" class="rich-diff-level-one"><img src="https://www.pwa-shields.com/1.0.0/series/classic/white/green.svg" alt="PWA Shields" style="max-width:100%;"></a>
</p>

  <p align="center">
    Awesome apps, services, products and communities made by Singaporeans
    <br />
    <a href="https://hyperlocal.sg"><strong>Go to hyperlocal.sg »</strong></a>
    <br />
    <br />
    <a href="https://github.com/abuuzayr/hyperlocal/issues">Report Bug</a>
    ·
    <a href="https://github.com/abuuzayr/hyperlocal/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![hyperlocal.sg Screen Shot 1][product-screenshot-1]](https://hyperlocal.sg)
[![hyperlocal.sg Screen Shot 2][product-screenshot-2]](https://hyperlocal.sg)

In April 2021, amidst the CoVID-19 pandemic there was a story about a retail chain (that rhymes with _nice_) and how it allegedly swindled several independent creators of their money. I felt for the creators and thought of how ultimately, the creators were at the losing end if a shop like that would have to close its stores, which it eventually did. Many of these shops already have their own web presence, but this retail chain gave them a physical space and some exposure. Then, someone started collating a list of these creators/vendors to help on an Airtable list and I felt that perhaps we could do better.

So I made [hyperlocal.sg](https://hyperlocal.sg) - to sort of aggregate all these listings and help them be discovered, by means of a combined marketing, content and exposure effort.

### Built With

This is a [Blitz.js](https://github.com/blitz-js/blitz) app.

<!-- GETTING STARTED -->

## Getting Started

Run your app in the development mode.

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Ensure the `.env.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/hyperlocal
```

Ensure the `.env.test.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/hyperlocal_test
```

## Tests

Runs your tests using Jest.

```
yarn test
```

Blitz comes with a test setup using [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

## Commands

Blitz comes with a powerful CLI that is designed to make development easy and fast. You can install it with `npm i -g blitz`

```
  blitz [COMMAND]

  dev       Start a development server
  build     Create a production build
  start     Start a production server
  export    Export your Blitz app as a static application
  prisma    Run prisma commands
  generate  Generate new files for your Blitz project
  console   Run the Blitz console REPL
  install   Install a recipe
  help      Display help for blitz
  test      Run project tests
```

You can read more about it on the [CLI Overview](https://blitzjs.com/docs/cli-overview) documentation.

## Learn more

Read the [Blitz.js Documentation](https://blitzjs.com/docs/getting-started) to learn more.

The Blitz community is warm, safe, diverse, inclusive, and fun! Feel free to reach out to us in any of our communication channels.

- [Website](https://blitzjs.com/)
- [Discord](https://discord.blitzjs.com/)
- [Report an issue](https://github.com/blitz-js/blitz/issues/new/choose)
- [Forum discussions](https://github.com/blitz-js/blitz/discussions)
- [How to Contribute](https://blitzjs.com/docs/contributing)
- [Sponsor or donate](https://github.com/blitz-js/blitz#sponsors-and-donations)

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/abuuzayr/hyperlocal/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Muhammad - abu.uzayr@builtforfifty.com

Project Link: [https://github.com/abuuzayr/hyperlocal/](https://github.com/abuuzayr/hyperlocal/)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- Secure, private email forwarding by [ForwardEmail](https://forwardemail.net/)
- Email newsletters by [Mail Octopus](https://connoratherton.com/loaders)
- Analytics by [Panelbear](https://kenwheeler.github.io/slick)
- CDN, DNS by [Cloudflare](https://github.com/cferdinandi/smooth-scroll)
- Database ORM by [Prisma](http://leafo.net/sticky-kit)
- Cloud hosting by [Vercel](https://vercel.com)
- PostgreSQL hosting by [Supabase](https://supabase.io)
- README template from [Best README Template](https://github.com/othneildrew/Best-README-Template/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/abuuzayr/hyperlocal.svg?style=for-the-badge
[contributors-url]: https://github.com/abuuzayr/hyperlocal/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/abuuzayr/hyperlocal.svg?style=for-the-badge
[forks-url]: https://github.com/abuuzayr/hyperlocal/network/members
[stars-shield]: https://img.shields.io/github/stars/abuuzayr/hyperlocal.svg?style=for-the-badge
[stars-url]: https://github.com/abuuzayr/hyperlocal/stargazers
[issues-shield]: https://img.shields.io/github/issues/abuuzayr/hyperlocal.svg?style=for-the-badge
[issues-url]: https://github.com/abuuzayr/hyperlocal/issues
[license-shield]: https://img.shields.io/github/license/abuuzayr/hyperlocal.svg?style=for-the-badge
[license-url]: https://github.com/abuuzayr/hyperlocal/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/muhammadfawwaz/
[twitter-shield]: https://img.shields.io/twitter/url?color=555&logo=twitter&style=for-the-badge&url=https%3A%2F%2Fhyperlocal.sg
[twitter-url]: https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fhyperlocal.sg
[product-screenshot-1]: public/screenshot1.png
[product-screenshot-2]: public/screenshot2.png
