<p align="center">
  <a href="https://ewacuna.github.io/pichunt/">
    <img src="https://github.com/ewacuna/pichunt/blob/main/src/assets/img/logo.png?raw=true" alt="PicHunt logo" width="96" height="96">
  </a>
</p>

<h3 align="center">PicHunt</h3>

## Overview

Discover images effortlessly with PicHunt, powered by the [Pexels](https://www.pexels.com/) API. Your hunting stops as your desired picture resides here.

#### :sparkles: [See Demo](https://ewacuna.github.io/pichunt/)

## Technologies Used
- [Ionic Framework](https://ionicframework.com/) SDK for hybrid mobile app development
- [Capacitor](https://capacitorjs.com/) cross-platform native runtime
- [@ngx-translate](https://github.com/ngx-translate/core) the internationalization (i18n)
- [@ionic/storage-angular](https://github.com/ionic-team/ionic-storage) the storage engine
- [Swiper](https://swiperjs.com) mobile touch slider
- [Prettier](https://prettier.io/) code formatter

## Development Server

Head over to [https://www.pexels.com/api/new/](https://www.pexels.com/api/new/) and create a new API key. Edit the [environment.ts](/src/environments/environment.ts) file with your Pexels API as follows:
```typescript
pexelsKey: 'your-pexels-api-key'
```

Run `npm install` and then `npm run dev` for a dev server. Navigate to `http://localhost:5600/`. The app will automatically reload if you change any of the source files.
