# React 19 Full Course (2025)

JavaScript Mastery: https://www.youtube.com/watch?v=dCLhUialKPQ  
prerequisite = a solid understanding of JavaScript  
objective = building a movie application

---

# What is React?

A JS library created by facebook that powers some of the world's most dynamic UIs (user interfaces).  
Initially, it was only used for front-end development.  

It's maintained by a strong open-source community constantly innovating with new features.  
One of these features is **server components**, they simplify your backend workflow by running React on the server side.  

Of course, React isn't alone. Frameworks like Vue.js, Svelte, Astro or Angular are also making waves.  
But when it comes to popularity, React dominates.  

![image](https://github.com/user-attachments/assets/da62c98b-d005-49bb-8230-c0e980043b80)

React is the backbone of key stacks like **MERN** and **PERN**.  
It extends to mobile development with **React Native**.  
And it integrates seamlessly with modern frameworks like **Next.js** for full-stack development.  

With React, you won't see a single page reload or a loading spinner, even when browsing different sections.  
Everything happens dynamically on one page (SPA = single page application).  
To make it possible, React uses JavaScript (JS) and the **Virtual DOM**.  

The virtual DOM is like a simplified map of your webpage, a JS object that mirrors the real DOM.  
When something changes, React creates a new virtual DOM element, then compares it to the old one to pinpoint the difference,  
and only the changed part of the real DOM is updated, making React blazingly fast.

---

# React Setup

## Node & npm

Before creating a React project, you need **Node.js** installed on your machine.  
Node is a JS runtime that allows you to run JS code outside of a browser.  
This is essential because React development involves running tools and scripts on your local machine, and these tools require Node.js.  

When you install Node.js on your machine, you also get a handy tool called **npm** (node package manager).  
In some cases, you might need to install npm separately.  

Instead of writing everything from scratch, you can use npm to quickly add features like animations, form handling,  
or even full frameworks by pulling them from its massive collection of ready-to-use libraries.  
And it also makes it super easy to keep your tools and code up-to-date, ensuring everything works smoothly together.  

In simple terms, npm will save you time and effort by giving you access to a lot of packages to help you build your modern apps more efficiently.

## Pick an IDE

Now that you have Node.js and npm installed, you need a place to write your React code.  
There are many code editors out there, but I prefer **WebStorm**, as it's a fully-fledged IDE (integrated dev environment) designed specifically for React.  
As of recently, WebStorm became completely free for non-commercial use.  
WebStorm offers you everything you need, from a quick project setup, error reporting, an integrated Git system, and more...  

## Git

While it's not mandatory to have Git installed to start learning React, it's absolutely essential for your growth as a developer.  

---

# Create a React project

There are different ways to create a React app, but **Vite** has quickly become a new norm and an industry's favorite.  
Vite offers faster build times, improved performance, and modern tooling.

To quickly start a new React project with Vite:
- Open a terminal window within your code editor
- `cd `into the folder where you host your Dev projects
- run `npm create vite@latest`
- name your project (this creates a folder after that name)
- choose the React framework
- choose JavaScript or TypeScript (depending on your needs and TypeScript knowledge)
- `cd` into your freshly created project folder
- run `npm i` to install all the dependencies needed to run your app
- then `npm run dev` if you want to run your starter app (accessible at http://localhost:5173/)

## Starter files & folders

Let's see which files and folders have been generated:
- at the bottom, we have the `vite.config.js` file, which allows you to **customize the build process**, such as adding plugins, 
configuring the server settings, and more.

- the `package.json` file contains the **metadata** of our project, such as its **name**, **scripts**, and **dependencies** needed to run our app.
  - the dev script starts the development server
  - the build script creates a production-ready build of our app.
  - you can run these script by running `npm run dev` or `npm run build` in the terminal.

- the `package-lock.json` file is automatically generated when your run `npm i`. It **locks down the versions of the dependencies** installed in our project, ensuring that every project installation, regardless of its location, uses the same versions.

- the `index.html` file is the **entry point** of our app. It contains the HTML structure of our app, in particular, the `<div>` element with the `id="root"` attribute.
```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

- the `main.jsx` file is also the **entry point** of our React app. It's where the <App /> component is rendered.
```jsx	
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- the `App.jsx` file is the **parent component** of our app. It contains the **JSX** (JavaScript XML) code that defines the structure of our app.

React will infuse the `<div id="root">` element of our `index.html` file with our entire application, meaning the <App /> component.  
The `App.jsx` file will contain the different components (the **child** components) that we will create later on.  

- The `eslint.config.js` file is used to configure the ESLint (JavaScript Linter) tool.  
  - ESLint is a popular linting tool that helps you find and fix problems in your code, such as coding style violations, errors, and potential bugs.

- after that, we have `.gitignore`, which is a file used to **exclude certain files and directories** from being tracked by Git.
  - the most important files to exclude are the `node_modules` folder, and the `.env` file (which contains environment variables).

- the `node_modules` folder contains all the **dependencies** needed to run our app, it gets created when we run `npm i`.
  - this folder is completely managed by npm, and we should not modify it manually.

- the `public` folder contains static assets such as images, icons and other files that don't need to go through Vite's bundler. 

- the `src` folder contains all our React components (.jsx or .tsx files), and might also contain .css files for styling.

- `App.jsx` is where the main UI of your app will be defined.

---

##  Connect our React App to an Appwrite backend

We're going to use Appwrite. It's an open-source backend for your React apps.  
Just like **Firebase**, Appwrite provides a **backend-as-a-service** solution so you don't have to manage your own servers or databases.  

Go to their website and choose their free plan: https://cloud.appwrite.io/console/onboarding  

We'll use Appwrite to develop a simple algorithm that tracks what our users are searching for on our movie app,  
and then suggest the top 5 trending movies based on their search history.  

---

# Components

There are 2 ways in which we can define components in React:
- Class components, not widely used anymore
- **Functional** components, the recommended modern way

The power of React lies in its component-based architecture.  
A component is a reusable piece of code that encapsulates a specific functionality or UI element.  
Components can be nested, meaning a component can contain other components.  

But writing components is not enough, sometimes we want to pass data from one component to another.  
We can do that by using **props**, which is short for **properties**.  
Props are a way to pass data from a parent component to a child component.  
Think of props as arguments you pass to a function.  

---

# Styling our app

There's a lot of ways to style your React app:
- inline styles
- CSS 
- Tailwind CSS
- Bootstrap
- Material UI
- Sass
- CSS in JS
- CSS modules
- ...

The default index.css file is imported within our main.jsx file.  






@20/127
---
EOF