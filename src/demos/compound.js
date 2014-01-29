
import ..box2d.common.math.b2Math as b2Math;
import ..box2d.common.math.b2Mat22 as b2Mat22;
import ..box2d.common.math.b2Vec2 as b2Vec2;
import ..box2d.dynamics.joints.b2Joint as b2Joint;
import ..box2d.dynamics.joints.b2RevoluteJointDef as b2RevoluteJointDef;
import ..box2d.dynamics.b2BodyDef as b2BodyDef;
import ..box2d.collision.shapes.b2CircleDef as b2CircleDef;
import ..box2d.collision.shapes.b2PolyDef as b2PolyDef;
import ..box2d.collision.shapes.b2Shape as b2Shape;
import ..box2d.collision.shapes.b2BoxDef as b2BoxDef;

var compound = Class(function() {});

compound.createCompoundCircle = function(world, x, y) {
	var ballSd1 = new b2CircleDef();
	ballSd1.density = 1.0;
	ballSd1.radius = 20;
	ballSd1.restitution = 0.2;
	ballSd1.localPosition.Set(-20, 0);
	var ballSd2 = new b2CircleDef();
	ballSd2.density = 1.0;
	ballSd2.radius = 20;
	ballSd2.restitution = 0.2;
	ballSd2.localPosition.Set(20, 0);
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd1);
	ballBd.AddShape(ballSd2);
	ballBd.position.Set(x, y);
	return world.CreateBody(ballBd);
}

compound.createCompoundPoly = function(world, x, y) {
	var points = [[-30, 0], [30, 0], [0, 15]];
	var polySd1 = new b2PolyDef();
	polySd1.vertexCount = points.length;
	for (var i = 0; i < points.length; i++) {
		polySd1.vertices[i].Set(points[i][0], points[i][1]);
	}
	polySd1.localRotation = 0.3524 * Math.PI;
	var R1 = new b2Mat22(polySd1.localRotation);
	polySd1.localPosition = b2Math.b2MulMV(R1, new b2Vec2(30, 0));
	polySd1.density = 1.0;
	var polySd2 = new b2PolyDef();
	polySd2.vertexCount = points.length;
	for (var i = 0; i < points.length; i++) {
		polySd2.vertices[i].Set(points[i][0], points[i][1]);
	}
	polySd2.localRotation = -0.3524 * Math.PI;
	var R2 = new b2Mat22(polySd2.localRotation);
	polySd2.localPosition = b2Math.b2MulMV(R2, new b2Vec2(-30, 0));
	var polyBd = new b2BodyDef();
	polyBd.AddShape(polySd1);
	polyBd.AddShape(polySd2);
	polyBd.position.Set(x,y);
	return world.CreateBody(polyBd)
}

compound.initWorld = function(world) {
	var i;
	for (i = 1; i <= 4; i++) {
		compound.createCompoundPoly(world, 50 + 3 * Math.random(), 40 * i);
	}
	for (i = 1; i <= 4; i++) {
		compound.createCompoundCircle(world, 200 + 3 * Math.random(), 45 * i);
	}
}

exports = compound; 
