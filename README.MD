# FACTORY FLOOR
Mobile app to manage workshop equipments data, technical data, safety information and procedures.

## Test
Install the node modules.

```bash
npm install
```

Run the code in the browser

```bash
ionic serve
```

## Usage
Adding new module

```bash
ionic generate service services/name_of_the_service
```

Adding new page

```bash
ionic generate page pages/name_of_the_page
```

Adding new component

```bash
ionic generate page components/name_of_the_component
```

# Build and Publish
To build and publish the app to firebase you need to have firebase-tools installed

```bash
npm install -g firebase-tools
```

```bash
ionic build --prod
firebase deploy
```