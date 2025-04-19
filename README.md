# Stardew Valley Weapon Damage Calculator
## Summary 
* Created a web app to calculate and display the weapon damage stats from the game "Stardew Valley" based on the bonuses that a user selects.
* The website can be accessed here [Stardew Valley Weapon Damage Calculator](https://weihansyu.github.io/StardewValleyDamageCalculator/web%20server%20files/)

## Note regarding branches and changing weapon data
* The **master** branch contains the project built on a PHP file which collects data from a SQL Server backend during runtime to get weapon info.
* Since I chose GitHub Pages to host my web app, I created a pure HTML/CSS & JavaScript branch for the static site -> branch_name = **zero_php**
<details>
<summary><b>Steps taken to get the game data to my PHP or JavaScript files:</b></summary>

* 1. Go to Stardew Valley Steam folder file where the ***Weapons.xnb*** file is found. Mine was in 'Program Files (x86)\Steam\steamapps\common\Stardew Valley\Content\Data'
  2. Make a copy of this file and convert it to a JSON file. I used some online xnb converter site.
  3. Run ***edit_json.py*** script which loads in the raw JSON file to Python, converts it into one continous string, perform RegEx on it to take out what we don't want without manually removing bits, and returns an outfile with the cleaner JSON file.
  4. Create a corresponding SQL table to store the columns that we have in the JSON file then run ***weapon_JSON_to_sql.sql*** script to take the edited JSON file and insert them into a SQL Server table.
  5. I had to manually edit some things -> ***edit_weapon_tbl_sql*** because the **Speed** values taken straight from the game XNB files made no sense when compared to the Stardew Valley wiki. Upon actual game testing, the wiki speeds will make this calculator app accurate so obviously there are underlying calculations in other game files that we don't see in just Weapons.xnb.
  6. If using the PHP version in **master** branch, the data colleciton/transform task is complete. Now you can change whatever you want in the SQL table or use an updated XNB file (going through the steps again) and the PHP file will establish an ODBC connection during runtime and grab the weapon table info from SQL Server.
  7. If using **zero_php**, I simply called the weapon info in a SELECT statement WITH AUTO JSON clause to create a JSON string. Then copy pasted the JSON string into ***js_modules_wep.js***

 * <details>
   <summary>Code snippet</summary>

   ```JavaScript
   const dagger_obj = JSON.parse('Valid JSON String Goes Here');
   ```
   </details>
 
</details>
