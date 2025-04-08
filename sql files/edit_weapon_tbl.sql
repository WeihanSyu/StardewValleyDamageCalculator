USE StardewValley;
GO

-- Set both critPower and speed attributes to equal 0 by default. 
-- We don't use a DEFAULT constraint for this because we don't want to generate a constraint for our table.

UPDATE weapon_info
SET critPower = 0, speed = 0;
GO

UPDATE weapon_info
SET speed = 2
WHERE [name] IN ('Steel Smallsword', 'Pirate''s Sword', 'Cutlass', 'Forest Sword', 'Insect Head',
	'Dwarf Sword', 'Femur', 'Wood Mallet', 'Galaxy Hammer', 'Infinity Gavel')
GO

UPDATE weapon_info
SET speed = -2
WHERE [name] IN ('Iron Edge', 'Ossified Blade', 'The Slammer', 'Alex''s Bat', 'Harvey''s Mallet',
	'Maru''s Wrench', 'Penny''s Fryer', 'Sam''s Old Guitar', 'Seb''s Lost Mace')
GO

UPDATE weapon_info
SET speed = 4
WHERE [name] IN ('Bone Sword', 'Holy Blade', 'Steel Falchion', 'Galaxy Sword', 'Infinity Blade', 'Meowmere')
GO

UPDATE weapon_info
SET speed = -4
WHERE [name] IN ('Claymore', 'Lead Rod')
GO

UPDATE weapon_info
SET speed = -1
WHERE [name] IN ('Neptune''s Glaive', 'Obsidian Edge', 'Haley''s Iron', 'Leah''s Whittler', 'Kudgel')
GO

UPDATE weapon_info
SET speed = -3
WHERE [name] IN ('Tempered Broadsword')
GO

UPDATE weapon_info
SET speed = -5
WHERE [name] IN ('Dark Sword')
GO

UPDATE weapon_info
SET critPower = 10
WHERE [name] IN ('Obsidian Edge', 'Yeti Tooth', 'Haley''s Iron', 'Leah''s Whittler', 'Wind Spire')
GO

UPDATE weapon_info
SET critPower = 20
WHERE [name] IN ('Steel Falchion')
GO

UPDATE weapon_info
SET critPower = 25
WHERE [name] IN ('Lava Katana', 'Burglar''s Shank')
GO

UPDATE weapon_info
SET critPower = 50
WHERE [name] IN ('Dragontooth Cutlass', 'Crystal Dagger', 'Kudgel', 'Dragontooth Club')
GO

UPDATE weapon_info 
SET critPower = 100
WHERE [name] IN ('Dragontooth Shiv')
GO

UPDATE weapon_info
SET critPower = 200
WHERE [name] IN ('Iridium Needle')
GO

UPDATE weapon_info
SET speed = 1
WHERE [name] IN ('Galaxy Dagger', 'Dwarf Dagger', 'Infinity Dagger')
GO

