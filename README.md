# CoffeeQuiz
CoffeeQuiz is an iPad app, created with the Ionic framework.
It is designed to display a question, an image and 3 alternative answers.
CoffeeQuiz will record all responses (for statistics).
A new question is displayed every week day until the last question in the quiz is reached.


### Publishing a new version
When ready to publish a new version, remember to:
- Update version number in config.xml
- Update version number on splash screen, and run `ionic cordova resources`


### Deployment instructions
Build project by running `ionic build --prod`
Open project in XCode
Build project
Archive project
  - Select distribute for development
  - Extract .ipa file
Place the ipa in the `mad-ipa-resign-coffee-quiz` GitHub repo for automatic signing
Download the production ipa from `https://rink.hockeyapp.net`
Submit a request for deployment in Services@Equinor