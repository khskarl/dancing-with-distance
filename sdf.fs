precision highp int;
precision highp float;

uniform float time;
uniform vec2 resolution;

float sdCircle (vec2 p, float s ) {
	return length(p) - s;
}

float opUnion (float a, float b) { 
	return min(a, b);
}

float opSub (float a, float b) {
	return max(-a, b);
}

float opInter (float a, float b) {
	return max(a, b);
}

float opBlend(float a, float b, float k) {
	float h = max(k - abs(a - b), 0.0);
	return min(a, b) - h * h * 0.25 / k;
}

vec3 getColor (float d) {
	
	if (d > 1.0) {
		return vec3(0.01, 0.01, 0.05);	
	}
	else {
		d = 1.0 - d;
		return vec3(d, d, d);
	}
}

void main()	{
	vec2 coord = vec2(gl_FragCoord.xy);
	
	float dist = 200.0;
	for (int i = 0; i < 4; i++) {
		float x = float(i);
		vec2 position = vec2(100.0 * (x + sin(time * 0.05 + x)) + 200.0, 300.0);
		float d = sdCircle(coord - position, 10.0);
		dist = opBlend(dist, d, 20.0);
	}

	// float dist = opBlend(d1, d2, 20.0);

	vec3 color = getColor(dist);
	gl_FragColor = vec4(color, 1.0);
}