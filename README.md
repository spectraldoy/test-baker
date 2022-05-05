# test-baker
A [small web app](https://www.testbaker.com/) for making and taking timed tests.

## Setting up

First you have to install Node, which you can download [here](https://nodejs.org/en/download/). Once you have Node, you will also have `npm` installed, which is required to run this React app. Now, clone this repository, `cd` into it if necessary, and install the required packages as follows:

```sh
git clone https://github.com/spectraldoy/test-baker
cd test-taker
npm install
```

## Building the app

Now that you have everything installed, you need to build it. To do that, all you need is run the following from the `test-baker` directory:
```sh
npm run build
```
This will create a `build` directory within the project containing an optimized production build of the app. If you're on Windows you'll probably need Git bash or another Unix-like Terminal to do this.

## Running the app

Now that you have the optimized production build, you're ready to run the app. First, install `serve` if needed:
```sh
npm install -g serve
```
Then, serve the app.
```sh
serve -s build
```
This should copy the address where the app is being served to your clipboard, which you can just paste into your browser. And thusly, you're running the app. 

### Acknowledgements

This app was made at the request of Juee. This acknowledgement is here made to publicly draw attention to her. Now go check out [her instagram](https://www.instagram.com/zuu_xzsf/).
