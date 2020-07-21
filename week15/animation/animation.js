export class Timeline {
	constructor() {
		this.animations = [];
		this.requsetId = null;
		this.state = "inited";
	}
	tick() {
		// console.log("tick");
		let t = Date.now() - this.startTime;

		// console.log(t);

		let animations = this.animations.filter((animation) => !animation.finished);

		for (let animation of animations) {
			let {
				object,
				property,
				template,
				duration,
				delay,
				timingFunction,
				startTime,
			} = animation;
			// console.log(object);
			// console.log(property);

			let progression = timingFunction((t - delay - startTime) / duration); // 0-1之间的数

			if (t > duration + delay) {
				progression = 1;
				animation.finished = true;
			}

			let value = animation.valueFromProgression(progression); // value就是根据progression算出的当前值
			object[property] = template(value);
		}

		if (animations.length) {
			this.requsetId = requestAnimationFrame(() => this.tick());
		}
	}

	start() {
		if (this.state !== "inited") {
			return;
		}
		this.state = "playing";
		this.startTime = Date.now();
		this.tick();
	}

	restart() {
		if (this.state === "playing") {
			this.pause();
		}
		this.animations.forEach((animation) => (animation.finished = false));
		this.requsetId = null;
		this.state = "playing";
		this.startTime = Date.now();
		this.tick();
	}

	pause() {
		if (this.state !== "playing") {
			return;
		}
		if (this.requsetId != null) {
			this.state = "paused";
			this.pauseTime = Date.now();
			cancelAnimationFrame(this.requsetId);
		}
	}

	resume() {
		if (this.state !== "paused") {
			return;
		}
		this.state = "playing";
		this.startTime += Date.now() - this.pauseTime;
		this.tick();
	}

	add(animation, startTime) {
		animation.finished = false;
		if (this.state === "playing") {
			animation.startTime =
				startTime != null ? startTime : Date.now() - this.startTime;
		} else {
			animation.startTime = startTime != null ? startTime : 0;
		}

		this.animations.push(animation);
	}
}

export class Animation {
	constructor(
		object,
		property,
		start,
		end,
		duration,
		delay,
		timingFunction,
		template
	) {
		this.object = object;
		this.property = property;
		this.start = start;
		this.end = end;
		this.duration = duration;
		this.delay = delay || 0;
		this.timingFunction = timingFunction;
		this.template = template;
	}

	valueFromProgression(progression) {
		return this.start + progression * (this.end - this.start);
	}
}

export class ColorAnimation {
	constructor(
		object,
		property,
		start,
		end,
		duration,
		delay,
		timingFunction,
		template
	) {
		this.object = object;
		this.property = property;
		this.start = start;
		this.end = end;
		this.duration = duration;
		this.delay = delay || 0;
		this.timingFunction = timingFunction;
		this.template = template || ((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
	}

	valueFromProgression(progression) {
		return {
			r: this.start.r + progression * (this.end.r - this.start.r),
			g: this.start.g + progression * (this.end.g - this.start.g),
			b: this.start.b + progression * (this.end.b - this.start.b),
			a: this.start.a + progression * (this.end.a - this.start.a),
		};
	}
}

/*

let animation = new Animation(object, property, start, end, duration, delay, timingFunction)
let animation2 = new Animation(object2, property2, start, end, duration, delay, timingFunction)

let timeline = new Timeline()

timeline.add(animation)
timeline.add(animation2)

timeline.start()
timeline.pause()
timeline.resume()
timeline.stop()


*/
