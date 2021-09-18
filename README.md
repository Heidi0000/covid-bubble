# covid-bubble

## Adding remote git

Add remote git to the heroku server by running 
```
git remote add heroku https://git.heroku.com/covid19-bubble.git
```
This repo will be responsible for deploying the flask app on the web

## Commiting changes

Remember to test the changes on locally first, and then push to the heroku git. 
First, you must change the .env variable in react-flask-app to:
```
REACT_APP_TEST = https://covid19-bubble.herokuapp.com
```
Then, build react again using
```
npm run build
```
After that, push to heroku by:
```
git push heroku main
```
Otherwise, update the origin main by using 
```
git push origin main
```

## Running the server locally

To run the server locally, first change the .env file in the react-flask-app directory to:
```
REACT_APP_TEST = http://localhost:5000
```
Then, use the heroku command IN THE PIPENV SHELL:
```
heroku local web -f Procfile.windows
```
This will host the website on your localhost

