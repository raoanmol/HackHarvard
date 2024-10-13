# CrisisCompanion

## Description
React-native based mobile app to assist in natural disasteer situations with a Flask backend running on Defang.

## Functionalities
- Track Food Distribution Sites
- Track Health stations
- Track Disaster Recovery Centers (DRCs)
- Track Emergency Shelters
- Weather alerts and news articles
- First Aid and Emergency information

## Setup
To run this project, you need to have the following installed:
- Python 3.6 or higher

Start off by cloning the repo:
```bash
git clone https://github.com/raoanmol/HackHarvard.git
```
### Host Backend Locally
*Optional: Setup a virtualenv*
```bash
pip install virtualenv
cd #path-to-project -> Backend
python3 -m venv venv
```
*Go to your project directory and run the following based on your environment*

*On Windows:*
```shell
# on command prompt
venv\Scripts\activate
# on 
.\venv\Scripts\activate
```

*On Unix based terminals:*
```bash
source venv/bin/activate
```


Install the required packages from the `requirements.txt`:
```bash
pip install -r requirements.txt
```

Enter your API keys in the variables *(.env files cming soon.... trust)*

Run the backend:
```bash
python3 app.py
```
Voila!

## Notes
For the purpose of this hackathon, there are a few caveats:
- Since the app tracks your current location and there's no natural disaster in Boston right now *(fortunately)*, we're setting the current location to somewhere in **Florida**.
- Since supply drops can vary and there is no single API (that we know of) that keeps track of them, we are web scraping them and have currently cached Florida for a faster demo.
- Our current implementation of the Backend deployment of Defang isn't super fast so we are using Linode as a backup server to reduce wait times.
- This app doesn't have the Android SDK yet (internet was a little too slow to download and set that up) so that support will be added post-hackathon.

## License
This project is licensed under the MIT License. Feel free to read the `LICENSE` for all the specifics.

Feel free to read `DOCS.md` for further information on the endpoints