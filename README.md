Reastaurant training App

You will need to add your own firebase config file.

Everything else is included and works.  This project connects to Firebase and creates a new company on first login.  The key for that company is stored locally as well as the database.  All uploads are stored under that users key.  

Currently working section is under wines.  This connects to snooth wine api to pull wine bottles on a search.  Once searched the api can be called again to get more details by ID.  Once selected the user can select which wine notes they want to use.  They can also select a new image locally.  (Currently working on adding the firebase storage url to the database, upload is now working). Once selected they can add that wine to the database.  The sorting under the wine page breaks each wine out into categories under their varietals.  

TODO- Create a wines by the glass page and a by the bottles page ( TABS maybe? )

TODO
Add a way to invite users under the specific company ID.

Most likely this will need to be passsing a var through a download with that specific key.
