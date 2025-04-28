let audio: HTMLAudioElement = undefined;

function getAudio() {
	let _audio: HTMLAudioElement;

	if (!audio) {
		audio = new Audio("http://www.soundjay.com/communication/sounds/tape-recorder-eject-1.mp3");
		audio.load();
	}

	if (!_audio) {
		_audio = audio.cloneNode() as HTMLAudioElement;
		_audio.volume = 0.1;
	}

	return _audio;
}
getAudio();
export const TapticEngineMock = () => {
	getAudio();
	return {
		// tslint:disable-next-line:object-literal-shorthand
		impact: (obj: any) =>  getAudio().play(),
		notification: (obj: any) =>  getAudio().play(),
		selection: () => getAudio().play(),
		gestureSelectionStart: () => getAudio().play()

	};

};

