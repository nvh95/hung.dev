---
template: post
title: Install older version of Create React App
slug: install-old-version-create-react-app
draft: true
date: 2022-05-20T03:35:23.605Z
description: |-
  Install older version of Create React App
  To update
category: Blog
tags:
  - create-react-app
---
Disclaimer: I do not advocate to use a lower version of CRA, you should always use newest version as CRA team suggests. But in some scenarios, you need to bootstrap a not-a-newest CRA app. For example, your app cannot work with newest CRA (ie: 5.0.1), you need 4.0.3. In my case, I'm developing Jest Preview and I need to bootstrap some CRA apps version 4 to make sure that Jest Preview supports CRA well.

```bash
npx create-react-app@4 my-app 
```

> npm WARN deprecated tar@2.2.2: This version of tar is no longer supported, and will not receive security updates. Please upgrade asap.
>
> You are running `create-react-app` 4.0.3, which is behind the latest release (5.0.1).
>
> We no longer support global installation of Create React App.
>
> Please remove any global installs with one of the following commands:
>
> * npm uninstall -g create-react-app
> * yarn global remove create-react-app
>
> The latest instructions for creating a new app can be found here: https://create-react-app.dev/docs/getting-started/

\=> error message => insert image

This is how I workaround (macOS) sudo npm install -g create-react-app@4

```bash
which create-react-app
```

```bash
/Users/username/.nvm/versions/node/v16.15.0/bin/create-react-app
```

```bash
open /Users/username/.nvm/versions/node/v16.15.0/bin/
```

create-react-app: symbolic link => Show original (Finder)

Modify createReactApp.js

check for `latest && semver.lt(packageJson.version, latest)` (or `checkForLatestVersion()`) modify

```diff
-      if (latest && semver.lt(packageJson.version, latest)) {
+      if (false && latest && semver.lt(packageJson.version, latest)) {
```

Re-run `create-react-app my-app`. It should work

Don't forget to remove global install create-react-app after you're done

```bash
sudo npm uninstall -g creact-react-app
```

## How it works

CRA always check the neest version of CRA. What we do is that we bypass that check, force CRA to create a new app

TODO: To insert more images.