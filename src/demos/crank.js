
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

var crank = Class(function() {} );

crank.initWorld = function(world) {
	var ground = world.m_groundBody;

	// Define crank.
	var sd = new b2BoxDef();
	sd.extents.Set(5, 25);
	sd.density = 1.0;

	var bd = new b2BodyDef();
	bd.AddShape(sd);
	
	var rjd = new b2RevoluteJointDef();

	var prevBody = ground;
	var x = 150;

	bd.position.Set(x, 210);
	var body = world.CreateBody(bd);

	rjd.anchorPoint.Set(x, 235);
	rjd.body1 = prevBody;
	rjd.body2 = body;
	rjd.motorSpeed = -1.0 * Math.PI;
	rjd.motorTorque = 500000000.0;
	rjd.enableMotor = true;
	world.CreateJoint(rjd);

	prevBody = body;

	// Define follower.
	sd.extents.Set(5, 45);
	bd.position.Set(x, 140);
	body = world.CreateBody(bd);

	rjd.anchorPoint.Set(x, 185);
	rjd.body1 = prevBody;
	rjd.body2 = body;
	rjd.enableMotor = false;
	world.CreateJoint(rjd);

	prevBody = body;

	// Define piston
	sd.extents.Set(20, 20);
	bd.position.Set(x, 95);
	body = world.CreateBody(bd);

	rjd.anchorPoint.Set(x, 95);
	rjd.body1 = prevBody;
	rjd.body2 = body;
	world.CreateJoint(rjd);

	var pjd = new b2PrismaticJointDef();
	pjd.anchorPoint.Set(x, 95);
	pjd.body1 = ground;
	pjd.body2 = body;
	pjd.axis.Set(0.0, 1.0);
	pjd.motorSpeed = 0.0; // joint friction
	pjd.motorForce = 100000.0;
	pjd.enableMotor = true;

	world.CreateJoint(pjd);

	// Create a payload
	sd.density = 2.0;
	bd.position.Set(x, 10);
	world.CreateBody(bd);
}

exports = crank;
