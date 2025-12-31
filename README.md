# Metronome App
![Sam Bajis Metronome](assetsREADME/titlephoto.png){width=50% height=auto}

This app is hosted on GitHub Pages: [Sam Bajis Metronome App.](https://samanthacbajis.github.io/sambajis-metronome-web-app/src/public/index.html "GitHub Pages")

## Approach to Metronome App
This app was made in Visual Studio Code using Node.js, Typescript and the Web Audio API. It was mostly developed and tested in Chrome, but also tested in Microsoft Edge, Firefox and Safari. I wanted to begin with a visual so I made a metronome that looked like one I had one growing up. So I started with a visual and then put shapes together. 
![Sam Bajis Metronome](assetsREADME/oldmetronome.jpeg){width=50% height=auto}
Then to begin I read through the Web Audio API documentation to learn more about it as I have never used it before. From the documenation I was able to implement a start/stop button easily with a ticking mp3 I randomly found on the internet; and then I went from there getting the BPM and time signature.

## Instructions: How to Install and Run App
You will need to have this repository on your Desktop through either downloading a ZIP file or by Cloning the project. Go to the ```<> Code``` button on the repo and either click the "Download ZIP" option and open it in your Desktop then an IDE, like VS Code, or Clone it using the web URL by opening you Command Prompt, or Terminal, and run the command:<br />
```git clone https://github.com/SamanthaCBajis/sambajis-metronome-web-app.git```<br /> 
Next, you will want to make sure Node is installed and you have the right version; the one I used to make this.<br/>
This app is hosted on GitHub Pages: [Node.js Download.](https://nodejs.org/en/download "Node.js")
Then open a terminal in your VS Code and check and change the Node Verion to 24.12.0.<br />
```node -v nvm use 24.12.0```<br /> then install node dependencies and make sure you are on the same npm version as well which is 11.6.2.<br />
```npm i npm use 11.6.2```<br />
Once all that is done we can run the project! In your terminal navigate to the public folder<br />
```cd src cd public```<br />
and run npm run dev command and it should come up as ```http://localhost:3000```<br />
```npm run dev```<br /> 
CTRL + click on the ```http://localhost:3000``` link to open the project in the browser.

## How to use the Metronome App
This app allows you to:
- Set the Tempo (or BPM ex. 120, 200)
- Set the Time signature (ex. 4/4, 3/4, 6/8)
- Play/Pause the Metronome/ticking noise
How you do so is select any option shown in the dropdowns and then click to play and/or pause the metronome.

## Design decisions
I designed this app mobile first. Breakpoint(Screen Sizes) are: 480px > 768px > 1024px > 1300px I also wanted a swinging animation for the user to know that the metronome is currently running, or not running, and their tempo/timesignature is set.

# Authors
• Samantha Cayla Bajis - _Initial work_ - SamBajis

# Acknowledgments
To make **_Metronome Web App_** possible:

-[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) For Documentation

-[Pxabay](https://pixabay.com/) for Audio Source (Ticking noise)