USE StardewValley;
GO

DECLARE @json_data VARCHAR(max);

SELECT @json_data = BulkColumn
FROM OPENROWSET
(
	BULK 'C:\Program Files (x86)\Steam\steamapps\common\Stardew Valley\Damage Calc Project\Weapons_edit.json', SINGLE_CLOB
) as datasource;

-- print @json_data;

INSERT INTO weapon_info
SELECT * FROM OPENJSON(@json_data)
WITH 
(
	[Name] VARCHAR(50),
	[Type] INT,
	MinDamage INT,
	MaxDamage INT,
	CritChance DECIMAL(20,19)
);
GO

-- Add columns that we will fill using the wiki
ALTER TABLE weapon_info
ADD critPower INT;
GO

ALTER TABLE weapon_info
ADD speed INT;
GO