# Yashwanth Madipeddi — Python Full Stack Portfolio

A responsive, recruiter-focused portfolio built with React + JavaScript + Vite.

## Visual direction

- Editorial / industrial / professional layout
- Subtle grid background
- Strong typography and restrained accent color
- Responsive navigation and mobile layout
- Scroll reveal animations
- Alternating project showcases with looping demo video panels
- Live-demo and GitHub actions for each project
- Dark/light theme toggle

## Stack

- React
- JavaScript
- Vite
- CSS
- Vercel

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Add your project demo videos

Put your MP4 recordings in `public/videos/` using these names:

- `career-connect.mp4`
- `fieldflow.mp4`
- `servicedesk.mp4`
- `project-04.mp4`
- `project-05.mp4`

## Update project URLs

Edit `src/data.js` and set the final `live` URLs for each deployed app, plus GitHub URLs for projects 4 and 5.

## Resume

Drop your final PDF into `public/` using this exact filename:

`Yashwanth_Madipeddi_Python_Full_Stack_Developer_Resume_Updated.pdf`

## Deploy to Vercel

1. Push the project to a GitHub repository.
2. Import the repository into Vercel.
3. Preset: Vite.
4. Root: `./`
5. Build command: `npm run build`
6. Output: `dist`
7. No environment variables are required for the portfolio itself.
