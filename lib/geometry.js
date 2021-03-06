
module.exports.Vector = Vector;
module.exports.vector = {random: randomVector, fromObject: vectorFromObject, fromAngle: vectorFromAngle};
module.exports.Line = Line;
module.exports.Circle = Circle;
//module.exports.randomVector = randomVector;
//module.exports.vectorFromObject = vectorFromObject;
//module.exports.vectorFromAngle = vectorFromAngle;
module.exports.TO_RADIANS = Math.PI/180;


function Vector(x, y) {
	this.x = x;
	this.y = y;
}

function randomVector(max) {return new Vector( Math.floor(Math.random() * max * 2) - max, Math.floor(Math.random() * max * 2) - max )}
function vectorFromObject(o) {return new Vector(o.x, o.y)};
function vectorFromAngle(angle) {return new Vector( Math.cos(angle), Math.sin(angle))}

Vector.prototype.plus = function(n) {return new Vector(this.x + n, this.y + n)}
Vector.prototype.minus = function(n) {return new Vector(this.x - n, this.y - n)}
Vector.prototype.add = function(v) {return new Vector(this.x + v.x, this.y + v.y)}
Vector.prototype.sub = function(v) {return new Vector(this.x - v.x, this.y - v.y)}
Vector.prototype.scale = function(n) {return new Vector(this.x * n, this.y * n)}

Vector.prototype.dot = function(v) {return (this.x*v.x+this.y*v.y)}
Vector.prototype.length = function() {return Math.sqrt(this.dot(this))}
Vector.prototype.distanceTo = function(v) {return this.sub(v).length()}

Vector.prototype.div = function(n) {return new Vector(this.x/n,this.y/n)}

Vector.prototype.magnitude = function () {return Math.sqrt(this.x * this.x + this.y * this.y)}
Vector.prototype.angle = function () {return Math.atan2(this.y,this.x)}

Vector.prototype.stringify = function (separator) {if(!separator) separator = ","; return this.x + separator +this.y}
Vector.prototype.sameAs = function (v) {return (this.x == v.x && this.y == v.y)}


Vector.prototype.angleTo = function(v) {return this.sub(v).angle()}

Vector.prototype.normalize = function() {var l = this.length(); this.x /= l; this.y /= l}
Vector.prototype.floor = function() {return new Vector(Math.floor(this.x), Math.floor(this.y))}
Vector.prototype.round = function() {return new Vector(Math.round(this.x), Math.round(this.y))}

Vector.prototype.inverse = function(n) {return new Vector(-this.x, -this.y)}

Vector.prototype.zero = function() {this.x=0;this.y=0;}
Vector.prototype.copy = function() {return new Vector(this.x, this.y)}

Vector.prototype.normalized = function() {var l = this.length(); return new Vector(this.x / l, this.y / l);}

Vector.prototype.directionTo = function(v) {return this.sub(v).normalized()};

Vector.prototype.isZero = function(v) {return (this.x==0 && this.y==0)};

Vector.prototype.area = function() {return (this.x * this.y)};

Vector.prototype.randomize = function(a) {return new Vector(this.x + this.x * Math.random() / a - this.x/a,  this.y + this.y * Math.random() / a - this.y / a)};

Vector.prototype.perp = function() {return new Vector(-this.y, this.x)};

Vector.prototype.isNaN = function() {return (isNaN(this.x) || isNaN(this.y))};

Vector.prototype.rotate = function(v) {	return new Vector(this.x * Math.cos(v) - this.y * Math.sin(v),  this.x * Math.sin(v) + this.y * Math.cos(v));}

Vector.prototype.mod = function(n) {return new Vector(this.x%n, this.y%n)}


Vector.prototype.inside = function(v, r) {
	var dx = this.x - v.x;
	var dy = this.y - v.y;
	
	return (dx*dx + dy*dy) < r*r
};


Vector.prototype.distance2 = function(v) {
	var dx = this.x - v.x;
	var dy = this.y - v.y;
	
	return (dx*dx + dy*dy);
}



Vector.prototype.closeTo = function(v) {
	// 30 times faster then Vector.distanceTo. Returns true/false
	
	var dx = this.x - v.x;
	var dy = this.y - v.y;

	if((dx*dx + dy*dy) < 16777216) return true
	else return false;
}




Point = Vector; // They share the same functions



function Line(p1, p2) {
	this.p1 = p1;
	this.p2 = p2;
}

Line.prototype.length = function() {return this.p2.sub(this.p1)};



Line.prototype.hit = function (circle) {
	var dir = this.p2.sub(this.p1); // Vector
	var diff = circle.center.sub(this.p1); // Vector
	var t = diff.dot(dir) / dir.dot(dir); // float
	if (t < 0) t = 0;
	if (t > 1) t = 1;
	var closest = this.p1.add(dir.scale(t)); // Vector
	
	var d = circle.center.sub(closest); // Vector
	var distsqr = d.dot(d); // float
	return distsqr <= circle.radius * circle.radius;
}


function Circle(center, radius) {
    this.center = center;
    this.radius = radius;
}

