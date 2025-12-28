# Metronome Web App

## Approach to Project
### A brief overview of your approach.
I wanted to begin by making a metronome to look at as I had one growing up. So I started with a visual putting shapes together. Then to begin I read through the Web Audio API to learn more about it as I have never used it before. From the documenation I was able to implement a start/stop button easily with a ticking mp3 I randomly found on the internet.

### Instructions on how to install dependencies, build, and run the project locally. Deployment.
Node wil need to be installed for this project. After opening in VS Code you will need switch the node version. This project uses version 24.12.0; I read there have been some recent issues with downloading dependencies so I wanted to go with an older version I knew worked just incase. So, install node and the node modules:
- npm i
- and check/change the npm verion to 11.6.2
Then, navigate to where you can run the project:
- cd src
- cd public
- run: npm run dev

### Any design decisions or trade-offs you want to highlight.
I guess the look of the metronome and the swinging..maybe. Maybe getting the playback so I could understand how frequency works.

### Any additional features you think would be useful for users, if any.
It can be used as a case study for web apps where audio timing is key. It’s an accessible and responsive application that degrades gracefully, allowing any browser that supports the API to use it. [Javascript’s Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

### Any additional notes or clarifications you think are useful for reviewing your solution.


Remove node modules?

# Authors
• Samantha Cayla Bajis - _Initial work_ - SamBajis

# Acknowledgments
To make **_Metronome Web App_** possible:
[Javascript’s Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
Add audio source