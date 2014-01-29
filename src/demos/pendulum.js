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

var pendulum = Class(function() {});

pendulum.createCircle = function(world, x, y, rad, fixed) {
	var ballSd = new b2CircleDef();
	if (!fixed) ballSd.density = 1.0;
	ballSd.radius = rad || 10;
	ballSd.restitution = 0.2;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	return world.CreateBody(ballBd);
};

pendulum.initWorld = function(world) {
	var ground = world.GetGroundBody();
	var jointDef = new b2RevoluteJointDef();
	var anchorPt1 = 70;
	var l = 100;
	var x = 150;
	var y = 300;
	var radius = 20;

	// swinging pendulum
	jointDef.anchorPoint.Set(x - radius*2, y-l);
	jointDef.body1 = ground;
	jointDef.body2 = pendulum.createCircle(world, x-radius*2-l, y-l, radius);
	world.CreateJoint(jointDef);

	// stationary pendulums
	for (var i = 0; i < 2; i++) {
		x = 150+(radius*2)*i;
		jointDef.anchorPoint.Set(x, y-l);
		jointDef.body1 = ground;
		jointDef.body2 = pendulum.createCircle(world, x, y, radius);
		world.CreateJoint(jointDef);
	}
}

exports = pendulum;
