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


        <script src="JS_Modules/js_modules_wep.js" async></script>
        <script src="JS_Modules/js_modules_gem.js" async></script>
        <script src="JS_Modules/js_modules_innate.js" async></script>
        <script src="JS_Modules/js_modules_ring.js" async></script>
        <script src="JS_Modules/js_modules_skill.js" async></script>
        <script src="JS_Modules/js_modules_blessing.js" async></script>
        <script src="JS_Modules/js_modules_result.js" async></script>

    </head>

    <body>  
        
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
                                    
                                </div>

                                <button id="swordBtn" class="dropbtn_2">Swords</button>
                                <div class="dropdown-content_sword">
                                    
                                </div>

                                <button id="clubBtn" class="dropbtn_2">Clubs</button>
                                <div class="dropdown-content_club">
                                    
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
                            <div id="attack" class="innate-content_div2">
                                
                            </div>
                            <div id="critPower" class="innate-content_div2">
                                
                            </div>
                            <div id="critChance" class="innate-content_div2">
                                
                            </div>
                            <div id="speed" class="innate-content_div2">
                                
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