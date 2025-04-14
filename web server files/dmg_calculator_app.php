<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style media="screen"></style>

        <title>Stardew-Valley-Weapon-Damage-Calculator</title>

        <link rel="stylesheet" href="CSS_Sheets/mainStyle.css">
        <link rel="stylesheet" href="CSS_Sheets/dropdown_wep.css">
        <link rel="stylesheet" href="CSS_Sheets/dropdown_gem.css">
        <link rel="stylesheet" href="CSS_Sheets/dropdown_innate.css">
        <link rel="stylesheet" href="CSS_Sheets/dropdown_ring.css">
        <link rel="stylesheet" href="CSS_Sheets/dropdown_skill.css">
        <link rel="stylesheet" href="CSS_Sheets/blessingStyle.css">
        <link rel="stylesheet" href="CSS_Sheets/resultStyle.css">

        <?php include "dbconn.php"; ?>

        <script src="JS_Modules/js_modules_wep.js" async></script>
        <script src="JS_Modules/js_modules_gem.js" async></script>
        <script src="JS_Modules/js_modules_innate.js" async></script>
        <script src="JS_Modules/js_modules_ring.js" async></script>
        <script src="JS_Modules/js_modules_skill.js" async></script>
        <script src="JS_Modules/js_modules_blessing.js" async></script>
        <script src="JS_Modules/js_modules_result.js" async></script>

    </head>

    <body>  
    
        <?php
            if (!$ODBC_Conn) {
                echo "An error occured.\n";
                exit;
            }

            $sql_sword = "SELECT * FROM weapon_info WHERE [type] = 0 OR [type] = 3 ORDER BY ((minDamage + maxDamage)/2) DESC";
            $sql_dagger = "SELECT * FROM weapon_info WHERE [type] = 1 ORDER BY ((minDamage + maxDamage)/2) DESC";
            $sql_club = "SELECT * FROM weapon_info WHERE [type] = 2 ORDER BY ((minDamage + maxDamage)/2) DESC";

            # odbc_exec directly execute our SQL statement and returns an ODBC object
            $result_sword = odbc_exec($ODBC_Conn, $sql_sword);
            $result_dagger = odbc_exec($ODBC_Conn, $sql_dagger);
            $result_club = odbc_exec($ODBC_Conn, $sql_club);

            # make nested array variables to store our SQL results.
            $sword_list = array(
                "name" => array(),
                "type" => array(),
                "minDamage" => array(),
                "maxDamage" => array(),
                "critChance" => array(),
                "critPower" => array(),
                "speed" => array(),
                "default_dps" => array()
            );

            $dagger_list = array(
                "name" => array(),
                "type" => array(),
                "minDamage" => array(),
                "maxDamage" => array(),
                "critChance" => array(),
                "critPower" => array(),
                "speed" => array(),
                "default_dps" => array()
            );

            $club_list = array(
                "name" => array(),
                "type" => array(),
                "minDamage" => array(),
                "maxDamage" => array(),
                "critChance" => array(),
                "critPower" => array(),
                "speed" => array(),
                "default_dps" => array()
            );

            # odbc_fetch_row(odbc_object, row_num) fetches a row of the data from odbc_exec() and Returns True or False. 
            # If row is not specified, it will fetch the next row each time. But this means row 1 is skipped. So we specify when iterating.
            for ($x = 0; $x <= 6; $x++) {
                $row_index = 1;
                while(odbc_fetch_row($result_sword, $row_index)) {      # Same as -> while(True) but for our row results.
                    # odbc_result(odbc_object, field) -> field can be an integer for the column number or the name of the field. 
                    $sword_list[$x][] = odbc_result($result_sword, $x + 1);
                    $row_index++;
                }
                $row_index = 1;
                while(odbc_fetch_row($result_dagger, $row_index)) {
                    $dagger_list[$x][] = odbc_result($result_dagger, $x + 1);
                    $row_index++;
                }
                $row_index = 1;
                while(odbc_fetch_row($result_club, $row_index)) {
                    $club_list[$x][] = odbc_result($result_club, $x + 1);
                    $row_index++;
                }
            }

            # Fill in default_dps 
            $all_weapons = array($dagger_list, $sword_list, $club_list);
            $count = 1;
            foreach ($all_weapons as $wep) {
                for ($i = 0, $length = count($wep[0]); $i < $length; $i++) {
                    $minDamage = $wep[2][$i];
                    $maxDamage = $wep[3][$i];
                    $chc = $wep[4][$i];
                    $crit_power = $wep[5][$i];
                    $speed = $wep[6][$i];
                    $chd_min = $minDamage * (3 + $crit_power/50);
                    $chd_max = $maxDamage * (3 + $crit_power/50);
                    $final_damage_min = ( ($chd_min - $minDamage) * $chc ) + $minDamage;
                    $final_damage_max = ( ($chd_max - $maxDamage) * $chc ) + $maxDamage;
   
                    if ($count == 1) {
                        $action_per_second = 1000 / (125 + ($speed * -40));
                        if ($action_per_second > 8) {
                            $action_per_second = 8;
                        }
                        $dagger_list[7][] = ($final_damage_min + $final_damage_max) / 2 * $action_per_second; 
                    } elseif ($count == 2) {
                        $action_per_second = 1000 / (400 + ($speed * -40));
                        $sword_list[7][] = ($final_damage_min + $final_damage_max) / 2 * $action_per_second; 
                    } else {
                        $action_per_second = 1000 / (720 + ($speed * -40));
                        $club_list[7][] = ($final_damage_min + $final_damage_max) / 2 * $action_per_second; 
                    }
                    
                }
                $count += 1;
            }

        ?>

        <?php
            $gem_list = array( 
                "Aquamarine" => "Crit Chance: +0.046", 
                "Emerald" => "Speed: +2", 
                "Jade" => "Crit Power: +5", 
                "Ruby" => "Damage: +10%"
            );
        ?>

        <?php
            $innate_list = array(
                "Attack" => array("+1", "+2", "+3", "+4", "+5"),
                "Crit. Power" => array("+25", "+50", "+75"),
                "Crit. Chance" => array("+1", "+2", "+3"),
                "Speed" => array("+1", "+2", "+3", "+4")
            );
        ?>

        <?php 
            $ring_list = array(
                "Iridium Band" => "Damage: +10%",
                "Ruby Ring" => "Damage: +10%",
                "Aquamarine Ring" => "Crit Chance: +10%",
                "Jade Ring" => "Crit Damage: +10%",
                "Emerald Ring" => "Speed: +10%",
                "Lucky Ring" => "Luck: +1"
            );
        ?>

        <!-- Send our PHP weapon arrays to be used by any of our linked Javascript files -->
        <script type="text/javascript">
            let dagger_list = <?php echo json_encode($dagger_list); ?>;
            let sword_list = <?php echo json_encode($sword_list); ?>;
            let club_list = <?php echo json_encode($club_list); ?>;
        </script>

        
        <div class="div1">

            <div class="div2">
                <div class="div2_1">
                    <p class="p1">Stardew Valley Weapon Damage Calculator</p>
                </div>
                <div class="div2_2">
                    <div class="div2_2_1">
                        <form action="/dmg_calculator_app.php">
                            <input onclick="window.location.reload();" type="reset" value="Reset" style="font-size: 20px;">
                        </form>
                    </div>
                </div>
            </div>

            <div class="div3">
                <div class="div3_1">
                    <div class="div3_1_1">
                        <p class="p2">Weapon</p>
                    </div>
                    
                    <div class="dropdown">
                        <button onclick="showMainDropdown(); highlightMain()" class="dropbtn">Rusty Sword</button>
                        <div id="myDropdown" class="dropdown-content">  <!-- the id is simply to point to myFunction() so we can show -->
                            <!-- I think having two divs to contain the dagger/sword/club btn is redudant. But not changing now -->
                            <div class="dropdown_2">
                                <button id="daggerBtn" class="dropbtn_2">Daggers</button>
                                <div class="dropdown-content_dagger">
                                    <?php for($i = 0, $length = count($dagger_list[0]); $i < $length; $i++):?>
                                        <div onclick="changeDropdownName(this)" class="dropdown-content_text_div">
                                            <p class="dropdown-content_text1">
                                                <?php echo $dagger_list[0][$i]; ?>
                                            </p>
                                            <p class="dropdown-content_text2">
                                                <?php echo $dagger_list[2][$i] . "-" . $dagger_list[3][$i]; ?>
                                            </p>
                                        </div>
                                    <?php endfor;?>
                                </div>

                                <button id="swordBtn" class="dropbtn_2">Swords</button>
                                <div class="dropdown-content_sword">
                                    <?php for($i = 0, $length = count($sword_list[0]); $i < $length; $i++):?>
                                        <div onclick="changeDropdownName(this)" class="dropdown-content_text_div">
                                            <p class="dropdown-content_text1">
                                                <?php echo $sword_list[0][$i]; ?>
                                            </p>
                                            <p class="dropdown-content_text2">
                                                <?php echo $sword_list[2][$i] . "-" . $sword_list[3][$i]; ?>
                                            </p>
                                        </div>
                                    <?php endfor;?>
                                </div>

                                <button id="clubBtn" class="dropbtn_2">Clubs</button>
                                <div class="dropdown-content_club">
                                    <?php for($i = 0, $length = count($club_list[0]); $i < $length; $i++):?>
                                        <div onclick="changeDropdownName(this)" class="dropdown-content_text_div">
                                            <p class="dropdown-content_text1">
                                                <?php echo $club_list[0][$i]; ?>
                                            </p>
                                            <p class="dropdown-content_text2">
                                                <?php echo $club_list[2][$i] . "-" . $club_list[3][$i]; ?>
                                            </p>
                                        </div>
                                    <?php endfor;?>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                                         
                    <div class="div3_1_2">
                        <p class="p3">Gem Forging</p>
                    </div>

                    <div class="gemdropdown1">
                        <button onclick="showGemDropdown1()" class="gembtn"></button>
                        <div id="myGems1" class="gem-content">
                            <div onclick="changeGemdrop1(this)" class="gem-content_div">
                                <div class="gempic">
                                    <img src="../images/gems/Diamond.png"></img>
                                </div>
                                <div class="nogem">
                                    No Gem
                                </div>
                            </div>
                            <?php foreach(array(0,1,2,3) as $i):?>
                                <div onclick="changeGemdrop1(this)" class="gem-content_div">
                                    <?php $gem_text = "../images/gems/" . array_keys($gem_list)[$i] . ".png"; ?>
                                    <div class="gempic">
                                        <img src="<?php echo $gem_text; ?>" ></img>
                                    </div>
                                    <div class="gemtext1">
                                        <p>
                                            <?php echo array_keys($gem_list)[$i]; ?>
                                        </p>
                                    </div>  
                                    <div class="gemtext2">
                                        <p>
                                            <?php echo $gem_list[array_keys($gem_list)[$i]]; ?>
                                        </p>
                                    </div>      
                                </div>
                            <?php endforeach;?> 
                        </div>
                    </div>
                    <div class="gemdropdown2">
                        <button onclick="showGemDropdown2()" class="gembtn"></button>
                        <div id="myGems2" class="gem-content">
                            <div onclick="changeGemdrop2(this)" class="gem-content_div">
                                <div class="gempic">
                                    <img src="../images/gems/Diamond.png"></img>
                                </div>
                                <div class="nogem">
                                    No Gem
                                </div>
                            </div>
                            <?php foreach(array(0,1,2,3) as $i):?>
                                <div onclick="changeGemdrop2(this)" class="gem-content_div">
                                    <?php $gem_text = "../images/gems/" . array_keys($gem_list)[$i] . ".png"; ?>
                                    <div class="gempic">
                                        <img src="<?php echo $gem_text; ?>" ></img>
                                    </div>
                                    <div class="gemtext1">
                                        <p>
                                            <?php echo array_keys($gem_list)[$i]; ?>
                                        </p>
                                    </div>  
                                    <div class="gemtext2">
                                        <p>
                                            <?php echo $gem_list[array_keys($gem_list)[$i]]; ?>
                                        </p>
                                    </div>      
                                </div>
                            <?php endforeach;?> 
                        </div>
                    </div>
                    <div class="gemdropdown3">
                        <button onclick="showGemDropdown3()" class="gembtn"></button>
                        <div id="myGems3" class="gem-content">
                            <div onclick="changeGemdrop3(this)" class="gem-content_div">
                                <div class="gempic">
                                    <img src="../images/gems/Diamond.png"></img>
                                </div>
                                <div class="nogem">
                                    No Gem
                                </div>
                            </div>
                            <?php foreach(array(0,1,2,3) as $i):?>
                                <div onclick="changeGemdrop3(this)" class="gem-content_div">
                                    <?php $gem_text = "../images/gems/" . array_keys($gem_list)[$i] . ".png"; ?>
                                    <div class="gempic">
                                        <img src="<?php echo $gem_text; ?>" ></img>
                                    </div>
                                    <div class="gemtext1">
                                        <p>
                                            <?php echo array_keys($gem_list)[$i]; ?>
                                        </p>
                                    </div>  
                                    <div class="gemtext2">
                                        <p>
                                            <?php echo $gem_list[array_keys($gem_list)[$i]]; ?>
                                        </p>
                                    </div>      
                                </div>
                            <?php endforeach;?> 
                        </div>
                    </div>
                    
                    <div class="div3_1_3">
                        <p class="p3">Innate Enchantment</p>
                    </div>

                    <div class="innatedropdown">
                        <button onclick="showInnateDropdown()" class="innatebtn">No Enchantment</button>
                        <div id="myinnate" class="innate-content">
                            <div onclick="changeInnatedrop(this)" class="innate-content_div1">
                                <div class="noinnate">
                                    <p>No Enchantment</p>
                                </div>
                            </div>
                            <div class="innate-content_div2">
                                <div class="innatetext1">
                                    <p>
                                        <?php echo array_keys($innate_list)[0]; ?>
                                    </p>
                                </div>
                                <div class="innatetext2">
                                <?php foreach($innate_list["Attack"] as $attack):?>
                                    <div onclick="changeInnatedrop(this)">
                                        <p>
                                            <?php echo $attack; ?>
                                        </p>
                                    </div>
                                <?php endforeach;?>
                                </div>
                            </div>
                            <div class="innate-content_div2">
                                <div class="innatetext1">
                                    <p>
                                        <?php echo array_keys($innate_list)[1]; ?>
                                    </p>
                                </div>
                                <div class="innatetext2">
                                <?php foreach($innate_list["Crit. Power"] as $critpower):?>
                                    <div onclick="changeInnatedrop(this)">
                                        <p>
                                            <?php echo $critpower; ?>
                                        </p>
                                    </div>
                                <?php endforeach;?>
                                </div>
                            </div>
                            <div class="innate-content_div2">
                                <div class="innatetext1">
                                    <p>
                                        <?php echo array_keys($innate_list)[2]; ?>
                                    </p>
                                </div>
                                <div class="innatetext2">
                                <?php foreach($innate_list["Crit. Chance"] as $critchance):?>
                                    <div onclick="changeInnatedrop(this)">
                                        <p>
                                            <?php echo $critchance; ?>
                                        </p>
                                    </div>
                                <?php endforeach;?>
                                </div>
                            </div>
                            <div class="innate-content_div2">
                                <div class="innatetext1">
                                    <p>
                                        <?php echo array_keys($innate_list)[3]; ?>
                                    </p>
                                </div>
                                <div class="innatetext2">
                                <?php foreach($innate_list["Speed"] as $speed):?>
                                    <div onclick="changeInnatedrop(this)">
                                        <p>
                                            <?php echo $speed; ?>
                                        </p>
                                    </div>
                                <?php endforeach;?>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>


                <div class="div3_2">
                    <div class="div3_2_1">
                        <p class="p4">Rings</p>
                    </div>   
                    <div class="ring_container">
                        <div class="ringdrop1">
                            <button onclick="showringdrop1()" class="ringbtn"></button>
                            <div id="ring1" class="ring-content">
                                <div onclick="changeRingdrop1(this)" class="ring-content_div">
                                    <div class="ringpic">
                                        <img src="../images/rings/No Ring.png"></img>
                                    </div>
                                    <div class="noring">
                                        No Ring
                                    </div>
                                </div>
                                <?php foreach(array(0,1,2,3,4,5) as $i):?>
                                    <div onclick="changeRingdrop1(this)" class="ring-content_div">
                                        <?php $ring_text = "../images/rings/" . array_keys($ring_list)[$i] . ".png"; ?>
                                        <div class="ringpic">
                                            <img src="<?php echo $ring_text; ?>" ></img>
                                        </div>
                                        <div class="ringtext1">
                                            <p>
                                                <?php echo array_keys($ring_list)[$i]; ?>
                                            </p>
                                        </div>  
                                        <div class="ringtext2">
                                            <p>
                                                <?php echo $ring_list[array_keys($ring_list)[$i]]; ?>
                                            </p>
                                        </div>      
                                    </div>
                                <?php endforeach;?> 
                            </div>
                        </div>
                        <div class="ringdrop2">
                            <button onclick="showringdrop2()" class="ringbtn"></button>
                            <div id="ring2" class="ring-content">
                                <div onclick="changeRingdrop2(this)" class="ring-content_div">
                                    <div class="ringpic">
                                        <img src="../images/rings/No Ring.png"></img>
                                    </div>
                                    <div class="noring">
                                        No Ring
                                    </div>
                                </div>
                                <?php foreach(array(0,1,2,3,4,5) as $i):?>
                                    <div onclick="changeRingdrop2(this)" class="ring-content_div">
                                        <?php $ring_text = "../images/rings/" . array_keys($ring_list)[$i] . ".png"; ?>
                                        <div class="ringpic">
                                            <img src="<?php echo $ring_text; ?>" ></img>
                                        </div>
                                        <div class="ringtext1">
                                            <p>
                                                <?php echo array_keys($ring_list)[$i]; ?>
                                            </p>
                                        </div>  
                                        <div class="ringtext2">
                                            <p>
                                                <?php echo $ring_list[array_keys($ring_list)[$i]]; ?>
                                            </p>
                                        </div>      
                                    </div>
                                <?php endforeach;?> 
                            </div>
                        </div>
                        <div class="ringdrop3">
                            <button onclick="showringdrop3()" class="ringbtn"></button>
                            <div id="ring3" class="ring-content">
                                <div onclick="changeRingdrop3(this)" class="ring-content_div">
                                    <div class="ringpic">
                                        <img src="../images/rings/No Ring.png"></img>
                                    </div>
                                    <div class="noring">
                                        No Ring
                                    </div>
                                </div>
                                <?php foreach(array(0,1,2,3,4,5) as $i):?>
                                    <div onclick="changeRingdrop3(this)" class="ring-content_div">
                                        <?php $ring_text = "../images/rings/" . array_keys($ring_list)[$i] . ".png"; ?>
                                        <div class="ringpic">
                                            <img src="<?php echo $ring_text; ?>" ></img>
                                        </div>
                                        <div class="ringtext1">
                                            <p>
                                                <?php echo array_keys($ring_list)[$i]; ?>
                                            </p>
                                        </div>  
                                        <div class="ringtext2">
                                            <p>
                                                <?php echo $ring_list[array_keys($ring_list)[$i]]; ?>
                                            </p>
                                        </div>      
                                    </div>
                                <?php endforeach;?> 
                            </div>
                        </div>
                        <div class="ringdrop4">
                            <button onclick="showringdrop4()" class="ringbtn"></button>
                            <div id="ring4" class="ring-content">
                                <div onclick="changeRingdrop4(this)" class="ring-content_div">
                                    <div class="ringpic">
                                        <img src="../images/rings/No Ring.png"></img>
                                    </div>
                                    <div class="noring">
                                        No Ring
                                    </div>
                                </div>
                                <?php foreach(array(0,1,2,3,4,5) as $i):?>
                                    <div onclick="changeRingdrop4(this)" class="ring-content_div">
                                        <?php $ring_text = "../images/rings/" . array_keys($ring_list)[$i] . ".png"; ?>
                                        <div class="ringpic">
                                            <img src="<?php echo $ring_text; ?>" ></img>
                                        </div>
                                        <div class="ringtext1">
                                            <p>
                                                <?php echo array_keys($ring_list)[$i]; ?>
                                            </p>
                                        </div>  
                                        <div class="ringtext2">
                                            <p>
                                                <?php echo $ring_list[array_keys($ring_list)[$i]]; ?>
                                            </p>
                                        </div>      
                                    </div>
                                <?php endforeach;?> 
                            </div>
                        </div>
                    </div>
                </div>


                <div class="div3_3">
                    <div class="div3_3_1">
                        <p class="p4">Skills</p>
                    </div>   
                    <div class="skill_container">
                        <div class="skilldrop1">
                            <button onclick="showskilldrop1()" class="skillbtn1">Level 5</button>
                            <div id="skill1" class="skill-content">
                                <div onclick="resetSkilldrop1()" class="noskill-content_div">
                                    <div class="noskill">No Skill</div>
                                </div>
                                <div onclick="changeSkilldrop1(this)" class="skill-content_div">
                                    <div class="skillpic">
                                        <img src="../images/skills/Fighter.png"></img>
                                    </div>
                                    <div class="skilltext1">
                                        <p>Fighter</p>
                                    </div>
                                    <div class="skilltext2">
                                        <p>Deal 10% more damage</p>
                                    </div>
                                </div>
                                <div onclick="changeSkilldrop1(this)" class="skill-content_div">
                                    <div class="skillpic">
                                        <img src="../images/skills/Scout.png"></img>
                                    </div>
                                    <div class="skilltext1">
                                        <p>Scout</p>
                                    </div>
                                    <div class="skilltext2">
                                        <p>Critical strike chance increased by 50%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="skilldrop2">
                            <button onclick="showskilldrop2()" class="skillbtn2_empty">Level 10</button>
                            <div id="skill2" class="skill-content">
                                <div onclick="resetSkilldrop2()" class="noskill-content_div">
                                    <div class="noskill">No Skill</div>
                                </div>
                                <div onclick="changeSkilldrop2(this)" class="skill-content_div">
                                    <div class="skillpic">
                                        <img src=""></img>
                                    </div>
                                    <div class="skilltext1">
                                        <p></p>
                                    </div>
                                    <div class="skilltext2">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="div3_4">
                    <div class="blessing_text">Select a Blessing</div>
                    <div class="blessing_container">
                        <button onclick="changeBlessing(this)" class="blessing_fangs">

                        </button>
                        <button onclick="changeBlessing(this)" class="blessing_speed">

                        </button>
                        <button onclick="changeBlessing(this)" class="blessing_luck">

                        </button>
                    </div>
                </div>
            </div>


            <div class="div4">
                <div class="result_container">
                    <div class="result_title">Results</div>
                    <div class="calculation_container">

                        <div class="stat_div_first">
                            <div class="stat_pic" style="background-image: url(../images/results/Attack.png);"></div>
                            <div class="stat_text">
                                Base Dmg: 2-5
                            </div>
                            <div class="stat_bar_container">
                                <div class="stat_bar" style="background-color: #C6011F;";></div>
                            </div>
                        </div>

                        <div class="stat_div">
                            <div class="stat_pic" style="background-image: url(../images/results/Crit._Power.png);"></div>
                            <div class="stat_text">
                                Crit. Dmg: 6-15
                            </div>
                            <div class="stat_bar_container">
                                <div class="stat_bar" style="background-color: #32CD32"></div>
                            </div>
                        </div>

                        <div class="stat_div">
                            <div class="stat_pic" style="background-image: url(../images/results/Crit._Chance.png);"></div>
                            <div class="stat_text">
                                Crit. Chance: 2%
                            </div>
                            <div class="stat_bar_container">
                                <div class="stat_bar" style="background-color: #00BFFF"></div>
                            </div>
                        </div>

                        <div class="stat_div">
                            <div class="stat_pic" style="background-image: url(../images/results/Speed_w.png);"></div>
                            <div class="stat_text">
                                Speed: 2.5 actions/s
                            </div>
                            <div class="stat_bar_container">
                                <div class="stat_bar_speed" style="background-color: #FFFF00"></div>
                            </div>
                        </div>

                        <div class="stat_div_last">
                            <div class="stat_pic_dps" style="background-image: url(../images/results/sum.png);"></div>
                            <div class="stat_text">
                                Dps (Dmg/s): 9.1
                            </div>
                            <div class="stat_bar_container">
                                <div class="stat_bar" style="background-color: #4B0082"></div>
                            </div>
                        </div>

                    </div>
                </div>
                
            </div>

        </div>



    </body>

</html>