# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/8eb92ecb-59d4-44cd-8c94-68df5f981e4d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8eb92ecb-59d4-44cd-8c94-68df5f981e4d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Environment

Create a `.env` file in project root for the backend server:

```env
MONGO_URI=mongodb+srv://rakesh883872_db_user:rakesh_sand@cluster0.t4edtbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=change_me_secret
GOOGLE_CLIENT_ID=your-google-oauth-web-client-id.apps.googleusercontent.com
PORT=4000
```

For the frontend (Vite), create `.env.local` in the root:

```env
VITE_API_BASE=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=your-google-oauth-web-client-id.apps.googleusercontent.com
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8eb92ecb-59d4-44cd-8c94-68df5f981e4d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
