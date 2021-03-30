# FACTORY FLOOR
Mobile app to manage workshop equipments data, technical data, safety information and procedures.

# Colors theme
Primary:    #05445E
Secondary:  #189AB4
Terceary:   #75E6DA
Light:      #D4F1F4

Summer Splash (canvas.com)

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
To build and publish the app to firebase you need to have Android Studio for Android compilation and XCode for iOS


```bash
ionic capacitor build android
ionic capacitor build ios
```

Then compile the project in the correct software.