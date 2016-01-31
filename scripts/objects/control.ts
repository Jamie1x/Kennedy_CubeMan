module objects {
	export class Control {
		rotationSpeedx: number;
        rotationSpeedy: number;
        rotationSpeedz: number;
		opacity: number;
		color: number; // hexadecimal value of the color
		constructor(rotationSpeedx: number, rotationSpeedy: number,rotationSpeedz: number, color:number) {
			this.rotationSpeedx = rotationSpeedx;
            this.rotationSpeedy = rotationSpeedy;
            this.rotationSpeedz = rotationSpeedz;
			this.color = color;
		}
	}
}