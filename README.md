# Metronome Web App
This project is hosted on GitHub Pages here: [Sam Bajis Metronome App.](https://www.youtube.com/watch?v=V_CQ3XSHMOA&t=4s "GitHub Pages")

## Approach to Project A brief overview of your approach.
This Metronome App was made in Visual Studio Code in Node.js and Typescript using the Web Audio API. It was mostly created and tested in Chrome but also tested in Microsoft Edge, Firefox and Safari. I wanted to begin by making a metronome to look at as I had one growing up. So I started with a visual putting shapes together. Then to begin I read through the Web Audio API to learn more about it as I have never used it before. From the documenation I was able to implement a start/stop button easily with a ticking mp3 I randomly found on the internet.

## Instructions: How to install and run app dependencies, build, and run the project locally. Deployment.
You will need to get the repository on your Desktop through downloading a ZIP file or by Cloning the project. Go to the ```<> Code``` button on the repo and either click the "Download ZIP" option and open it in your desktop then an IDE, like VS Code, or Clone using the web URL by opening you Command Prompt, or Terminal, and run the command:<br />
```git clone https://github.com/SamanthaCBajis/sambajis-metronome-web-app.git```<br /> 
Next, you will want to make sure Node is installed and you have the right version; or just the one I used to make this. For the node version please check and change the verion to 24.12.0.<br />
```node -v nvm use 24.12.0```<br /> then install node dependencies and make sure you are on the same npm version as well which is 11.6.2.<br />
```npm i npm use 11.6.2```<br />
Once that is done we can run the project in your terminal navigate to the public folder<br />
```cd src cd public```<br />
and run npm run dev command and it should come up in ```http://localhost:3000```<br />
```npm run dev```<br /> CTRL + click on the ```
http://localhost:3000``` link to open the project in the browser.

## How to use the Metronome App
This app allows you to:
- Set the Tempo (or BPM ex. 120, 200)
- Set the Time signature (ex. 4/4, 3/4, 6/8)
- Play/Pause the Metronome/ticking noise
How you do so is select any option shown in the dropdowns and then click to play and/or pause the metronome.

## Design decisions
I designed the app mobile first. Breakpoint(Screen Sizes) are: 480px > 768px > 1024px > 1300px and went with a purple theme. I wanted to have an actual metronome in the design as I had an exact one like that growing up; I play piano, it just wasn't purple. I also wanted a swinging animation for the user to know that the metronome is currently running, or not running, and their tempo is set.

## Any additional features you think would be useful for users, if any.

## Any additional notes or clarifications you think are useful for reviewing your solution.


# Authors
• Samantha Cayla Bajis - _Initial work_ - SamBajis

# Acknowledgments
To make **_Metronome Web App_** possible:

-[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) For Documentation

- [Pxabay](https://pixabay.com/) for Audio Source (Ticking noise)