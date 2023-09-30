LEARNOVA 
learnova is a learning management system made by Abed el salam Mahari,Mohamad Fawaz, Wafik Safa, and Ali Nahle.
This system allows us to have students,instructors,and admins and onesuper admin where we can create,buy,edit and 
upload courses alongside loginand logout and many other functionalities.


1-To use our website use git bash  or any other cmd to clone the project using the link:https://github.com/AbdelsalamMahari/Learnova.git
(git clone https://github.com/AbdelsalamMahari/Learnova.git)

2-after cloning the website, enter the client folder using "cd client" and type in "npm install",
similarly open another cmd and type in "cd server" and also type in "npm install" to download the
required dependencies to run the project

3-in the client folder,add in a .env file and this .env we require:
"REACT_APP_PUBLIC_KEY:"  where you add your own react public key after ":"


4-in the server folder, also create a .env file where in this file we require:

MONGODB_URL="your mongodb connection linl"
PORT = 5000
SECRET_KEY = "a secret key for using jwt you can get from reading the documentation at :https://jwt.io/introduction"

BASE_URL = http://localhost:3000

HOST = smtp.gmail.com
SERVICE = gmail
EMAIL_PORT = 465
SECURE = true
USER = "add in your email where you can send and recieve emails from users using learnova"
PASS = "your email's password"

#google id and passport
CLIENT_ID = "using google authentication use the provided id provided by google"
CLIENT_SECRET ="google will also provide a secret key u can put in here"
STRIPE_SECRET_TEST = "to make stripe function correctly use it'skey provided by stripe that u can get from reading the documentation at :https://stripe.com/docs/keys"


NOTE: when typing the different values please get rid of the double quotes where all the values are typed without the quoters("")