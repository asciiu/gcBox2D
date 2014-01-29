
import ..box2d.common.math.b2Math as b2Math;
import ..box2d.common.math.b2Mat22 as b2Mat22;
import ..box2d.common.math.b2Vec2 as b2Vec2;
import ..box2d.dynamics.joints.b2Joint as b2Joint;
import ..box2d.dynamics.joints.b2PrismaticJointDef as b2PrismaticJointDef;
import ..box2d.dynamics.joints.b2RevoluteJointDef as b2RevoluteJointDef;
import ..box2d.dynamics.b2BodyDef as b2BodyDef;
import ..box2d.collision.shapes.b2CircleDef as b2CircleDef;
import ..box2d.collision.shapes.b2PolyDef as b2PolyDef;
import ..box2d.collision.shapes.b2Shape as b2Shape;
import ..box2d.collision.shapes.b2BoxDef as b2BoxDef;

var stack = Class(function() {});

stack.initWorld = function(world) {
	var sd = new b2BoxDef();
	var bd = new b2BodyDef();
	bd.AddShape(sd);
	sd.density = 1.0;
	sd.friction = 0.5;
	sd.extents.Set(10, 10);

	var x = 150;
	var y = 430;
	var i;
	for (i = 0; i < 8; i++) {
		bd.position.Set(x-Math.random()*2-1, (y-5-i*22));
		world.CreateBody(bd);
	}
	for (i = 0; i < 8; i++) {
		bd.position.Set(x-100-Math.random()*5+i, (y-5-i*22));
		world.CreateBody(bd);
	}
	for (i = 0; i < 8; i++) {
		bd.position.Set(x+100+Math.random()*5-i, (y-5-i*22));
		world.CreateBody(bd);
	}
}

exports = stack;


