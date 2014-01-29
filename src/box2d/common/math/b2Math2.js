

exports.b2IsValid = function(x)
	{
		return isFinite(x);
	};
exports.b2Dot = function(a, b)
	{
		return a.x * b.x + a.y * b.y;
	};
