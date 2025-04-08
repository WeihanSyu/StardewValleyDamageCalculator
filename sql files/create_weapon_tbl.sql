USE StardewValley;
GO

DROP TABLE IF EXISTS weapon_info;
GO
CREATE TABLE weapon_info (
	[name] VARCHAR(50),
	[type] INT,
	minDamage INT,
	maxDamage INT,
	critChance DECIMAL(20,19),
);
GO

