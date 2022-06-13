
# Food Qwest
As most army camps are relatively remote, most food deliverers require a minimum order before delivering to the camps, hence,
Food Qwest is a react-native app build to connect NSmen in the same camp to help collate orders to buy food/supper. This can reduce the order fees for small orders and makes delivery drivers will need to make fewer trips.

## Features
- Chat feature to facilitate meetup points and other details
- Meter bar for participants to view target amount
- Login authentication
  
## Tech
- React Native
- Firebase

## Installation
- Food Qwest requires [Node.js] and React Native

### Initialising React Native App
```sh
git clone https://github.com/jinyangp/codeexp_2022.git
npm install
npm run ios / npm run 
```

### Setting up Firebase
1. To set up Firebase free tier project, visit the Firebase Console and click "ADD PROJECT" button
![pic1](https://github.com/jinyangp/codeexp_2022/blob/00e322e4bae483b4902b68baa8d4bdad870b936d/assets/add.png)

2. Click Authentication tab and enable email/password, press "SAVE" button
![pic2](https://github.com/jinyangp/codeexp_2022/blob/9ee54e66a881b966c897f29ae0a167d45eab923c/assets/auth.png)
3. In left side menu, click settings icon, go to Project Settings page > General > Your apps > Web App

4. create ```.env``` file in the root directory/same directory as app.json and paste the following. Replace the Xs with the actual keys from Firebase.
![pic3](https://github.com/jinyangp/codeexp_2022/blob/9ee54e66a881b966c897f29ae0a167d45eab923c/assets/apikey.png)

## Challenges/Future Implementation
- Scalability: 
  -  We plan to expand the app beyond food outlets, in the future, the app should facilitate group buys for other products in the neighbourhood and help reduce overall transportation fees for consumers.
  - Integration of other food services like grabdelivery to facilitate purchases
  
 
- Challenges: 
  - Monetary transfers (Stripe libraries)
  - Duration that the chats should last (Last 24hr/ allow hosts to set)
  - Harrassment issues (Bans)
  - Online instigators (verification, and deposits in each account)
