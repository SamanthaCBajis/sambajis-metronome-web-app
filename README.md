# Metronome Web App
This project is hosted on GitHub Pages here: [Sam Bajis Metronome App.](https://www.youtube.com/watch?v=V_CQ3XSHMOA&t=4s "GitHub Pages")

## Approach to Project A brief overview of your approach.
This Metronome App was made in Visual Studio Code in Node.js and Typescript using the Web Audio API. It was mostly created and tested in Chrome. I wanted to begin by making a metronome to look at as I had one growing up. So I started with a visual putting shapes together. Then to begin I read through the Web Audio API to learn more about it as I have never used it before. From the documenation I was able to implement a start/stop button easily with a ticking mp3 I randomly found on the internet.

## Instructions: How to install and run app dependencies, build, and run the project locally. Deployment.
You will need to get the repository on your Desktop through downloading a ZIP file or by Cloning the project. Go to the ```<> Code``` button on the repo and either click the "Download ZIP" option and open it in your desktop then an IDE, like VS Code, or Clone using the web URL by opening you Command Prompt, or Terminal, and run the command: 
```git clone https://github.com/SamanthaCBajis/sambajis-metronome-web-app.git``` 
Next, you will want to make sure Node is installed and you have the right version; or just the one I used to make this. For the node version please check and change the verion to 24.12.0.
```node -v nvm use 24.12.0``` then install node dependencies and make sure you are on the same npm version as well which is 11.6.2.
```npm i npm use 11.6.2```
Once that is done we can run the project in your terminal navigate to the public folder
```cd src cd public```
and run npm run dev command and it should come up in localhost:3000
```npm run dev``` CTRL + click on the localhost: 3000 link to open the project in the browser.

## How to use the Metronome App

## Any design decisions or trade-offs you want to highlight.
I guess the look of the metronome and the swinging..maybe. Maybe getting the playback so I could understand how frequency works.

## Any additional features you think would be useful for users, if any.
It can be used as a case study for web apps where audio timing is key. It’s an accessible and responsive application that degrades gracefully, allowing any browser that supports the API to use it. [Javascript’s Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

## Any additional notes or clarifications you think are useful for reviewing your solution.


# Authors
• Samantha Cayla Bajis - _Initial work_ - SamBajis

# Acknowledgments
To make **_Metronome Web App_** possible:
[Javascript’s Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
Add audio source