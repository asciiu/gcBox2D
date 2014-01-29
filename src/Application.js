import ui.TextView as TextView;
import src.box2d.common.math.b2Vec2 as b2Vec2;
import src.box2d.collision.b2AABB as b2AABB;
import src.box2d.collision.shapes.b2BoxDef as b2BoxDef;
import src.box2d.dynamics.b2World as b2World;
import src.box2d.dynamics.b2BodyDef as b2BodyDef;

import src.demos.util as util;
import src.demos.crank as crank;
import src.demos.compound as compound; 
import src.demos.pendulum as pendulum;
import src.demos.stack as stack;

exports = Class(GC.Application, function () {

	this.initUI = function () {
		//var textview = new TextView({
		//	superview: this.view,
		//	layout: "box",
		//	text: "Hello, world!",
		//	color: "white"
		//});
		this.initWorld();
		GC.app.engine.on('Render', this.render.bind(this));
		this.on('InputStart', this.drop.bind(this));
	};

	this.initWorld = function(did) {
		if (!did) did = 0;
		this._world = this.createWorld();
		//this._initId += did;
		//this._initId %= demos.InitWorlds.length;
		//if (this._initId < 0) 
		//	this._initId = demos.InitWorlds.length + initId;

		//demos.InitWorlds[this._initId](this._world);
		util.initWorld(this._world);
		//compound.initWorld(this._world);
		//crank.initWorld(this._world);
		//pendulum.initWorld(this._world);
		//stack.initWorld(this._world);
	};

	this.createWorld = function() {
		var worldAABB = new b2AABB();
		worldAABB.minVertex.Set(0, -this.style.height);
		worldAABB.maxVertex.Set(this.style.width, this.style.height);

		// gravity points down 
		var gravity = new b2Vec2(0, 300);
		var doSleep = true;

		var world = new b2World(worldAABB, gravity, doSleep);

		this.createGround(world);

		// left border
		util.createRect(world, 0, 0, 3, this.style.height);
		// right border
		util.createRect(world, this.style.width-3, 0, 3, this.style.height);
		return world;
	};

	this.createGround = function(world) {
		var groundSd = new b2BoxDef();
		// ground width and height
		groundSd.extents.Set(this.style.width, 3);
		groundSd.restitution = 0.2;
		var groundBd = new b2BodyDef();
		groundBd.AddShape(groundSd);
		groundBd.position.Set(0, this.style.height);
		return world.CreateBody(groundBd)
	};

	this.drop = function(event, point) {
		util.createCircle(this._world, point.x, point.y);
	};

	this.render = function(context) {
		util.drawWorld(this._world, context);
	};

	this.tick = function(dt) {
		var ts1 = 1.0/60;
		var ts2 = dt/1000;
		this._world.Step(ts2, 300);
	};
	
	this.launchUI = function () {};
});
