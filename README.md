# SDJS-02 Exercise

### Installation

1. Clone the repository

```
  git@github.com:jgonzalez13/sdjs-02.git
```

2. Change directory

```
  cd sdjs-02
```

3. Add .env file to proyect with credentials

```
touch .env
# Credentials

  NX_APOLLO_SERVER_URL=http://localhost:3333/api/graphql
  
  MONGODB_URI=mongodb+srv://manny0014:3jwGkuKtaz9Vk1mh@cluster0.wefedep.mongodb.net/?retryWrites=true&w=majority

```

4. Install package.json modules and prepare husky/lint-stage configuration:

```
  yarn install
```

5. Start API

```
  yarn start:api
```

6. Start App

```
  yarn start:app
```

7. Access to local host

```
  https://localhost:4200/
```
