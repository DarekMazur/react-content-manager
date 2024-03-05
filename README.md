# React Content Manager for Strapi
<p align="center">
<img alt="" src="https://res.cloudinary.com/ddyqnp7pp/image/upload/v1709547170/eb28315b_730c_4204_ba10_3c277d069f7e_960c443a7a.png" align="center" width="400" />
</p>

## Table of content
1. Introduction
2. Requirement
3. Technologies
4. Installation
5. Running
6. Project Structure
7. API schema
8. Testing
9. Production Version


## 1. Introduction
The React Content Manager for Strapi (RCM4S) application is a tool designed to streamline content management tasks with Strapi. Built using ReactJS, this application provides a seamless user experience for managing content efficiently. It leverages various libraries and tools including React Router, Redux Toolkit, Redux Toolkit Query, Styled Components, and CKEditor to enhance functionality and user interface.

## 2. Requirement

* npm (9.6.7 or higher)


## 3. Technologies
The application utilizes the following technologies:

* ReactJS (18.2.0)
* Vite (5.0.0)
* React Router ()
* Redux Toolkit (2.0.1)
* ckeditor5-react (6.2.0)
* Mock Service Worker (2.0.11)
* TypeScript (5.2.2)
* styled-components (6.1.1)
* i18next (23.8.2)
* auth0 (2.2.4)

## 4. Installation
To install the application, follow these steps:

1. Clone the repository with the application source code to your local computer:

```bash
git clone https://github.com/DarekMazur/react-content-manager.git
```

2. Navigate to the application directory:
```bash
    cd rcm4s
```
3. Install dependencies using npm:
```bash
   npm install
```

## 5. Running
To run the development version of the application, execute the following command:
```bash
   npm run dev
```
The application will be available at http://localhost:5173.
Before running please check your .env file.

In main directory you can find .env.example file with all variables needed to connect RCM4S with your Strapi backend.

## 6. Project Structure
```
react-content-manager/
  ├── src/
  │   ├── assets/           # Application assets
  │   ├── components/       # Application components
  │   ├── i18n/             # Translation files
  │   ├── mocks/            # Mocking data
  │   ├── pages/            # Application pages (views)
  │   ├── store/            # Application store
  │   ├── styles/           # Global styles
  │   ├── types/            # Types
  │   ├── utils/            # Application components
  │   │   ├── helpers       # Application helpers
  │   │   ├── hooks         # Application custom hooks
  │   │   ├── methods       # Custom methods
  │   │   ├── providers     # Application providers
  │   │   ├── themes        # Style themes
  │   │   └── data.ts       # Application data
  │   ├── main.tsx          # Main react ts file
  │   ├── setupTest.ts      # Tests config file
  │   ├── vite-env.d.ts     # Configuration for Vite env
  │   └── App.ts            # Main application component
  ├── .env.example          # example env file
  ├── .eslintrc             # Linter configuration
  ├── .gitignore            # Ignore list for git
  ├── .lintstagedrc.json    # Lint Staged configuration
  ├── .prettioerignore      # Ignore list for Prettier
  ├── .prettierrc           # Prettier configuration
  ├── index.html            # Entry file
  ├── package.json          # A manifest file for Node.js projects
  ├── package-lock.json     # npm dependencies (You won’t change this file directly!)
  ├── README.md             # Application documentation (current file)
  ├── tsconfig.json         # TypeScript configuration
  ├── tsconfig.node.json    # TypeScript configuration
  └── vite.config.js        # Vite configuration
```

## 7. API schema
```
article
  ├── uuid                  # uniqe uuid (string)
  ├── cover                 # Media field
  ├── isSticky              # boolean
  ├── title                 # text field (string)
  ├── description           # text field (string)
  ├── likes                 # Number
  ├── categories            # relation with Category
  ├── tags                  # text field (string)
  ├── author                # relation with User (from users-permissions)
  ├── body                  # rich text (Markdown) - string
  └── comments              # relation with Comment
  
category
  ├── uuid                  # uniqe uuid (string)
  ├── title                 # text field (string)
  ├── description           # text field (string)
  └── articles              # relation with Article
  
comment
  ├── uuid                  # uniqe uuid (string)
  ├── shadowed              # boolean
  ├── author                # relation with User (from users-permissions)
  ├── body                  # rich text (Markdown) - string
  └── article               # relation with Article
  
user
  ├── username              # default Strapi field
  ├── email                 # default Strapi field
  ├── provider              # default Strapi field
  ├── password              # default Strapi field
  ├── resetPasswordToken    # default Strapi field
  ├── confirmationToken     # default Strapi field
  ├── confirmed             # default Strapi field
  ├── blocked               # default Strapi field
  ├── role                  # default Strapi field
  ├── uuid                  # uniqe uuid (string)
  ├── articles              # relation with Article
  ├── comments              # relation with Comment
  └── avatar                # Media field
```

## 8. Testing
To run unit tests, execute the following command:
```bash
    npm run test
```

## 9. Production Version
To build the production version of the application, use the following command:
```bash
    npm run build
```
The resulting files will be available in the `dist` directory, ready for deployment on a production server.


_Thank you for using our application!_