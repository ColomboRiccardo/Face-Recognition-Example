import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
	apiKey: '2afd7870a1534f04ac114fb047c7aac6',
});

const particlesOptions = {
	particles: {
		number: {
			value: 50,
			density: {
				enable: true,
				value_area: 1000,
			},
		},
	},
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signIn',
			isSignedIn: false,
		};
	}

	calculateFaceLocation = data => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		console.log(width, height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	displayFaceBox = box => {
		this.setState({ box: box }, console.log(box));
	};

	onInputChange = event => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		console.log('click');
		app.models
			.predict(
				'c0c0ac362b03416da06ab3fa36fb58e3',
				// THE JPG
				this.state.input
			)
			.then(response => {
				console.log(
					response.outputs[0].data.regions[0].region_info.bounding_box
				);
				this.displayFaceBox(this.calculateFaceLocation(response));
			})
			.catch(err => {
				console.log(err);
			});
	};

	onRouteChange = route => {
		if (route === 'signOut') {
			this.setState({ isSignedIn: false });
		} else if (route === 'home') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
		return (
			<div className='App'>
				<Particles className='particles' params={particlesOptions} />
				<Navigation
					onRouteChange={this.onRouteChange}
					isSignedIn={isSignedIn}
				/>
				{route === 'home' ? (
					<div>
						<Logo />
						<Rank />
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</div>
				) : route === 'signIn' ? (
					<SignIn onRouteChange={this.onRouteChange} />
				) : (
					<Register onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;
