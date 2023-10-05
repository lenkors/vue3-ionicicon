[![License](https://img.shields.io/github/license/Lenkors/vue3-ionicicon.svg?maxAge=3600)](https://github.com/Lenkors/vue3-ionicicon)

# Vue3 IonicIcon
Icons package for Vue 3 made with typescript and IonicIcons. <br>
Icons from [IonicTeam/IonicIcons](https://github.com/ionic-team/ionicons)


## Getting Started
 Install the package.
- npm
```
npm install --save @lenkors/vue3-ionicicon
```

- Yarn
```
yarn add @lenkors/vue3-ionicicon
```

## Setup

#### Global:

```
// ./src/main.(ts/js)

import { createApp } from "vue";
import App from "./App.vue";
import { useIconIon } from '@lenkors/vue3-ionicicon';

const app = createApp(App);
app.use(useIconIon);

app.mount("#app");
```

#### In component:

```
<template>
    <div>
        <IconIon size="small" name="heart" color="red"></IconIon>
    </div>
<template>

<script>
import { IconIon } from '@lenkors/vue3-ionicicon';
<script>
```
