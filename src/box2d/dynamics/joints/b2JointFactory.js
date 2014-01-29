
import .b2Joint as b2Joint;
import .b2DistanceJoint as b2DistanceJoint;
import .b2GearJoint as b2GearJoint;
import .b2MouseJoint as b2MouseJoint;
import .b2PrismaticJoint as b2PrismaticJoint;
import .b2PulleyJoint as b2PulleyJoint;
import .b2RevoluteJoint as b2RevoluteJoint;

exports.Create = function(def, allocator){
		var joint = null;

		switch (def.type)
		{
		case b2Joint.e_distanceJoint:
			{
				//void* mem = allocator->Allocate(sizeof(b2DistanceJoint));
				joint = new b2DistanceJoint(def);
			}
			break;

		case b2Joint.e_mouseJoint:
			{
				//void* mem = allocator->Allocate(sizeof(b2MouseJoint));
				joint = new b2MouseJoint(def);
			}
			break;

		case b2Joint.e_prismaticJoint:
			{
				//void* mem = allocator->Allocate(sizeof(b2PrismaticJoint));
				joint = new b2PrismaticJoint(def);
			}
			break;

		case b2Joint.e_revoluteJoint:
			{
				//void* mem = allocator->Allocate(sizeof(b2RevoluteJoint));
				joint = new b2RevoluteJoint(def);
			}
			break;

		case b2Joint.e_pulleyJoint:
			{
				//void* mem = allocator->Allocate(sizeof(b2PulleyJoint));
				joint = new b2PulleyJoint(def);
			}
			break;

		case b2Joint.e_gearJoint:
			{
				//void* mem = allocator->Allocate(sizeof(b2GearJoint));
				joint = new b2GearJoint(def);
			}
			break;

		default:
			//b2Settings.b2Assert(false);
			break;
		}

		return joint;
	};
