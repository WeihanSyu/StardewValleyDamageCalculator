# We will avoid food buffs for this iteration of the project
# RSV club type weapons have a critical hit damage formula of: Base x (2 + crit_power / 50)
# None of the 'Speed' numbers in the weapon.xnb file seem to make sense. Only use the file for critical hit chance. 

# Anything that is additive will apply first and be added to the base weapon stats. 
# Weapon forging enchantments are typically second and done before rings.
# Multiplicative bonuses are confusing and still needs to be tested, but will be explained in each section.



class damage_mod:
    def __init__(self, type_, min_dmg, max_dmg, crit_chance, crit_power, speed):
        self.type_ = type_
        self.min_dmg = min_dmg
        self.max_dmg = max_dmg
        self.crit_chance = crit_chance
        self.crit_power = crit_power
        self.speed = speed


    def dmg_bonus(self, ruby_level, ring_amount, innate, fighter=True, brute=True):

        # An innate Attack enchantment adds to a player's Attack stat so it should be calculated first. 
        # We can roll +1 -> +5 and +1 Attack = +3 Damage
        minimum, maximum = self.min_dmg, self.max_dmg
        minimum += innate * 3
        maximum += innate * 3

        # Each ruby_level from weapon enchantment adds 10% damage to both minimum and maximum weapon damage. 
        # This will be calculated consecutively until further testing
        for i in range(ruby_level):
            minimum += minimum * 0.10
            maximum += maximum * 0.10

        # Each ruby ring or iridium band increases attack by 10%. We believe this is done altogether rather than consecutively.
        # So if we have 2 iridium bands and one is combined with a ruby ring, we will have a 30% attack multiplier. 
        minimum += minimum * ring_amount / 10
        maximum += maximum * ring_amount / 10

        # Profession skills should be calculated last.
        if fighter == 1 and brute == 1:
            minimum += minimum * 0.25
            maximum += maximum * 0.25
        elif fighter == 1 and brute == 0:
            minimum += minimum * 0.10
            maximum += maximum * 0.10

        print(f'Raw Damage: {minimum} -> {maximum}')
        return minimum, maximum

    
    def chd_bonus(self, jade_level, jade_ring, innate, minimum, maximum, desperado=True):

        # critical hit damage = base damage * (3 + crit_power / 50)
        # Each jade_level from weapon enchantment adds +5 to crit_power (This is from reading the wiki and no real formula was given) 
        chd_min = minimum * (3 + (self.crit_power + jade_level * 5) / 50)
        chd_max = maximum * (3 + (self.crit_power + jade_level * 5) / 50)

        # jade_rings and innate enchantments multiply the critical hit damage after the initial calculation.
        # innate enchantments can be +25, +50, +75 crit_power. Each increment of 25 adds a 0.5 multiplier
        chd_min = chd_min * (1 + jade_ring/10 + innate/50)
        chd_max = chd_max * (1 + jade_ring/10 + innate/50)

        # Profession skills are calculated last here.
        if desperado == 1:
            chd_min = chd_min * 2
            chd_max = chd_max * 2

        print(f'Critical Hit Damage: {chd_min} -> {chd_max}')
        return chd_min, chd_max
    
    
    def chc_bonus(self, aqua_level, aqua_ring, innate, luck, scout=True, Blessing=False):
        
        # Critical hit chance is computed in a specific order as follows according to the wiki:

        # Each weapon has a base critical hit chance - usually 2% = 0.02. These values are stored in weapons.xnb file in the game data

        # Aquamarine forging increases crit chance additively by: += 0.046 * forgingLevel.
        chc = 0.046 * aqua_level + self.crit_chance

        # If a weapon is a dagger, then at this step apply: crit_chance = (crit_chance + 0.005) * 1.12
        if self.type_ == 'dagger':
            chc = (chc + 0.005) * 1.12

        # aqua_ring and innate enchantments increase crit_chance multiplicatively and are calculated together. 
        # Each ring is 10% and each innate level is 2%
        # With two rings and 3 innate levels, this gives us 26% or 1.26 multiplier
        chc = chc * ( ((aqua_ring/10) + (innate*2/100)) + 1 )

        # Blessing of Fangs is next. Adds a flat 10% to crit_chance
        if Blessing == 1:
            chc += 0.1

        # Profession skills are next, this time not last according to wiki
        if scout == 1:
            chc = chc * 1.5

        # Finally, each point of luck from food and rings increase crit_chance as follows:
        # crit_chance += luckLevel * crit_chance / 40
        # Note that lucky rings NEVER add more than aquamarine rings
        chc += luck * chc / 40

        print(f'Critical Hit Chance: {chc}')
        if chc > 1:
            chc = 1
        return chc
        

    def attack_speed(self, emerald_level, emerald_ring, innate):
        # There seems to be a soft cap of about 240 milliseconds for swords and clubs.
        # Dagger attack speeds are not listed on the wiki, but a fan-made dps calculator sets them at 8 hit/s which is 125 milliseconds.
        if self.type_ == 'dagger':
            action = 125
        elif self.type_ == 'sword':
            action = 400
        else:
            action = 720
        
        # Flat speed modifiers are added first. +1 Speed = -40 milliseconds
        action += self.speed * -40

        level_speed = [2, 3, 2]
        for i in range(0, emerald_level): 
            action += level_speed[i] * -40
        
        action += innate * -40

        # Emerald rings further increase weapon speed by a 10% multiplier each. Calculated together
        action += action * emerald_ring/10 * -1
        
        action_per_second = 1000/action
        print(f'Actions per second: {action_per_second}/s')
        return action_per_second
    


Tough_Love = ['club', 140, 170, 0.50, 0, 5]
Dragontooth_Cutlass = ['sword', 75, 90, 0.02, 50, 0]
Infinity_Blade = ['sword', 80, 100, 0.02, 0, 4]
SVE_Infinity_Blade = ['sword', 140, 160, 0.2, 0, 4]

wep = Infinity_Blade
weapon = damage_mod(wep[0], wep[1], wep[2], wep[3], wep[4], wep[5])
min_dmg, max_dmg = weapon.dmg_bonus(0, 2, 0, fighter=0)
chd_min, chd_max = weapon.chd_bonus(0, 0, 0, min_dmg, max_dmg, desperado=1)
chc = weapon.chc_bonus(3, 0, 0, 2, scout=1)
attack_per_second = weapon.attack_speed(0, 0, 0)

final_damage_min = ( (chd_min - min_dmg) * chc ) + min_dmg
final_damage_max = ( (chd_max - max_dmg) * chc ) + max_dmg
print(f'Damage Per Action: {final_damage_min} -> {final_damage_max}')

damage_per_second = (final_damage_min + final_damage_max) / 2 * attack_per_second
print(f'Damage Per Second: {damage_per_second}')

# RSV The Madame -> 1333 = 3332/s
# 3 ruby levels and rings + scout, desperado

# RSV The Prankster -> 1296 = 3600
# 3 ruby levels and rings + scout, desperado

# Dragontooth Cutlass -> 544 = 1360/s
# 2 ruby ring, 3 aquamarine level, 75 innate crit + scout, desperado

# Dragontooth Club -> 594 = 825/s
# 2 ruby ring, 3 aquamarine level, 75 innate crit + scout, desperado

# SVE Infinity Blade -> 636 = 2650/s
# 2 ruby ring, 3 aquamarine level + scout, desperado

# SVE Tempered Galaxy Sword -> 370 = 1156/s
# 2 ruby ring, 3 aquamarine level + scout, desperado