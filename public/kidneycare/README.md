# Kidney Care Landing Page

Static landing page for the Kidney Care Flutter app. Astro copies everything in `public/` to the site root on build, so this is served at:

- `https://chinmaysingh.me/kidneycare/`
- APK: `https://chinmaysingh.me/kidneycare/downloads/kidney-care-v1.0.0.apk`

## Add the APK

Build the Android release from the app repo:

```bash
cd /path/to/kidney-care/app
flutter build apk --release
```

Copy the output here:

```bash
cp build/app/outputs/flutter-apk/app-release.apk \
  public/kidneycare/downloads/kidney-care-v1.0.0.apk
```

Update the version in `index.html` when you ship a new build.

## Local preview

Run the Astro dev server from the repo root:

```bash
npm run dev
```

Open `http://localhost:4321/kidneycare/`.
