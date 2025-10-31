
export const getSkillset = ()=>([
    { id: 'Igbo', title: 'Igbo' },
    { id: 'Hausa', title: 'Hausa' },
    { id: 'Yoruba', title: 'Yoruba' },
    { id: 'Swahili', title: 'Swahili' },
    { id: 'Twi', title: 'Twi' },
])


export const getStates = () => ([
    {
      "id": "Alabama",
      "title": "Alabama"
    },
    {
      "id": "Alaska",
      "title": "Alaska"
    },
    {
      "id": "Arizona",
      "title": "Arizona"
    },
    {
      "id": "Arkansas",
      "title": "Arkansas"
    },
    {
      "id": "California",
      "title": "California"
    },
    {
      "id": "Colorado",
      "title": "Colorado"
    },
    {
      "id": "Connecticut",
      "title": "Connecticut"
    },
    {
      "id": "Delaware",
      "title": "Delaware"
    },
    {
      "id": "Florida",
      "title": "Florida"
    },
    {
      "id": "Georgia",
      "title": "Georgia"
    },
    {
      "id": "Hawaii",
      "title": "Hawaii"
    },
    {
      "id": "Idaho",
      "title": "Idaho"
    },
    {
      "id": "Illinois",
      "title": "Illinois"
    },
    {
      "id": "Indiana",
      "title": "Indiana"
    },
    {
      "id": "Iowa",
      "title": "Iowa"
    },
    {
      "id": "Kansas",
      "title": "Kansas"
    },
    {
      "id": "Kentucky",
      "title": "Kentucky"
    },
    {
      "id": "Louisiana",
      "title": "Louisiana"
    },
    {
      "id": "Maine",
      "title": "Maine"
    },
    {
      "id": "Maryland",
      "title": "Maryland"
    },
    {
      "id": "Massachusetts",
      "title": "Massachusetts"
    },
    {
      "id": "Michigan",
      "title": "Michigan"
    },
    {
      "id": "Minnesota",
      "title": "Minnesota"
    },
    {
      "id": "Mississippi",
      "title": "Mississippi"
    },
    {
      "id": "Missouri",
      "title": "Missouri"
    },
    {
      "id": "Montana",
      "title": "Montana"
    },
    {
      "id": "Nebraska",
      "title": "Nebraska"
    },
    {
      "id": "Nevada",
      "title": "Nevada"
    },
    {
      "id": "New Hampshire",
      "title": "New Hampshire"
    },
    {
      "id": "New Jersey",
      "title": "New Jersey"
    },
    {
      "id": "New Mexico",
      "title": "New Mexico"
    },
    {
      "id": "New York",
      "title": "New York"
    },
    {
      "id": "North Carolina",
      "title": "North Carolina"
    },
    {
      "id": "North Dakota",
      "title": "North Dakota"
    },
    {
      "id": "Ohio",
      "title": "Ohio"
    },
    {
      "id": "Oklahoma",
      "title": "Oklahoma"
    },
    {
      "id": "Oregon",
      "title": "Oregon"
    },
    {
      "id": "Pennsylvania",
      "title": "Pennsylvania"
    },
    {
      "id": "Rhode Island",
      "title": "Rhode Island"
    },
    {
      "id": "South Carolina",
      "title": "South Carolina"
    },
    {
      "id": "South Dakota",
      "title": "South Dakota"
    },
    {
      "id": "Tennessee",
      "title": "Tennessee"
    },
    {
      "id": "Texas",
      "title": "Texas"
    },
    {
      "id": "Utah",
      "title": "Utah"
    },
    {
      "id": "Vermont",
      "title": "Vermont"
    },
    {
      "id": "Virginia",
      "title": "Virginia"
    },
    {
      "id": "Washington",
      "title": "Washington"
    },
    {
      "id": "West Virginia",
      "title": "West Virginia"
    },
    {
      "id": "Wisconsin",
      "title": "Wisconsin"
    },
    {
      "id": "Wyoming",
      "title": "Wyoming"
    }
  ]);
  
  export const getCities = (stateId) => {
    const unsortedCities = [
    {
      "id": "Birmingham",
      "stateId": "Alabama",
      "title": "Birmingham"
    },
    {
      "id": "Montgomery",
      "stateId": "Alabama",
      "title": "Montgomery"
    },
    {
      "id": "Mobile",
      "stateId": "Alabama",
      "title": "Mobile"
    },
    {
      "id": "Huntsville",
      "stateId": "Alabama",
      "title": "Huntsville"
    },
    {
      "id": "Tuscaloosa",
      "stateId": "Alabama",
      "title": "Tuscaloosa"
    },
    {
      "id": "Hoover",
      "stateId": "Alabama",
      "title": "Hoover"
    },
    {
      "id": "Dothan",
      "stateId": "Alabama",
      "title": "Dothan"
    },
    {
      "id": "Auburn",
      "stateId": "Alabama",
      "title": "Auburn"
    },
    {
      "id": "Decatur",
      "stateId": "Alabama",
      "title": "Decatur"
    },
    {
      "id": "Madison",
      "stateId": "Alabama",
      "title": "Madison"
    },
    {
      "id": "Anchorage",
      "stateId": "Alaska",
      "title": "Anchorage"
    },
    {
      "id": "Fairbanks",
      "stateId": "Alaska",
      "title": "Fairbanks"
    },
    {
      "id": "Juneau",
      "stateId": "Alaska",
      "title": "Juneau"
    },
    {
      "id": "Sitka",
      "stateId": "Alaska",
      "title": "Sitka"
    },
    {
      "id": "Ketchikan",
      "stateId": "Alaska",
      "title": "Ketchikan"
    },
    {
      "id": "Wasilla",
      "stateId": "Alaska",
      "title": "Wasilla"
    },
    {
      "id": "Kenai",
      "stateId": "Alaska",
      "title": "Kenai"
    },
    {
      "id": "Kodiak",
      "stateId": "Alaska",
      "title": "Kodiak"
    },
    {
      "id": "Bethel",
      "stateId": "Alaska",
      "title": "Bethel"
    },
    {
      "id": "Palmer",
      "stateId": "Alaska",
      "title": "Palmer"
    },
    {
      "id": "Phoenix",
      "stateId": "Arizona",
      "title": "Phoenix"
    },
    {
      "id": "Tucson",
      "stateId": "Arizona",
      "title": "Tucson"
    },
    {
      "id": "Mesa",
      "stateId": "Arizona",
      "title": "Mesa"
    },
    {
      "id": "Chandler",
      "stateId": "Arizona",
      "title": "Chandler"
    },
    {
      "id": "Glendale",
      "stateId": "Arizona",
      "title": "Glendale"
    },
    {
      "id": "Scottsdale",
      "stateId": "Arizona",
      "title": "Scottsdale"
    },
    {
      "id": "Gilbert",
      "stateId": "Arizona",
      "title": "Gilbert"
    },
    {
      "id": "Tempe",
      "stateId": "Arizona",
      "title": "Tempe"
    },
    {
      "id": "Peoria",
      "stateId": "Arizona",
      "title": "Peoria"
    },
    {
      "id": "Surprise",
      "stateId": "Arizona",
      "title": "Surprise"
    },
    {
      "id": "Little Rock",
      "stateId": "Arkansas",
      "title": "Little Rock"
    },
    {
      "id": "Fort Smith",
      "stateId": "Arkansas",
      "title": "Fort Smith"
    },
    {
      "id": "Fayetteville",
      "stateId": "Arkansas",
      "title": "Fayetteville"
    },
    {
      "id": "Springdale",
      "stateId": "Arkansas",
      "title": "Springdale"
    },
    {
      "id": "Jonesboro",
      "stateId": "Arkansas",
      "title": "Jonesboro"
    },
    {
      "id": "North Little Rock",
      "stateId": "Arkansas",
      "title": "North Little Rock"
    },
    {
      "id": "Conway",
      "stateId": "Arkansas",
      "title": "Conway"
    },
    {
      "id": "Rogers",
      "stateId": "Arkansas",
      "title": "Rogers"
    },
    {
      "id": "Bentonville",
      "stateId": "Arkansas",
      "title": "Bentonville"
    },
    {
      "id": "Pine Bluff",
      "stateId": "Arkansas",
      "title": "Pine Bluff"
    },
    {
      "id": "Los Angeles",
      "stateId": "California",
      "title": "Los Angeles"
    },
    {
      "id": "San Diego",
      "stateId": "California",
      "title": "San Diego"
    },
    {
      "id": "San Jose",
      "stateId": "California",
      "title": "San Jose"
    },
    {
      "id": "San Francisco",
      "stateId": "California",
      "title": "San Francisco"
    },
    {
      "id": "Fresno",
      "stateId": "California",
      "title": "Fresno"
    },
    {
      "id": "Sacramento",
      "stateId": "California",
      "title": "Sacramento"
    },
    {
      "id": "Long Beach",
      "stateId": "California",
      "title": "Long Beach"
    },
    {
      "id": "Oakland",
      "stateId": "California",
      "title": "Oakland"
    },
    {
      "id": "Bakersfield",
      "stateId": "California",
      "title": "Bakersfield"
    },
    {
      "id": "Anaheim",
      "stateId": "California",
      "title": "Anaheim"
    },
    {
      "id": "Denver",
      "stateId": "Colorado",
      "title": "Denver"
    },
    {
      "id": "Colorado Springs",
      "stateId": "Colorado",
      "title": "Colorado Springs"
    },
    {
      "id": "Aurora",
      "stateId": "Colorado",
      "title": "Aurora"
    },
    {
      "id": "Fort Collins",
      "stateId": "Colorado",
      "title": "Fort Collins"
    },
    {
      "id": "Lakewood",
      "stateId": "Colorado",
      "title": "Lakewood"
    },
    {
      "id": "Thornton",
      "stateId": "Colorado",
      "title": "Thornton"
    },
    {
      "id": "Arvada",
      "stateId": "Colorado",
      "title": "Arvada"
    },
    {
      "id": "Westminster",
      "stateId": "Colorado",
      "title": "Westminster"
    },
    {
      "id": "Pueblo",
      "stateId": "Colorado",
      "title": "Pueblo"
    },
    {
      "id": "Centennial",
      "stateId": "Colorado",
      "title": "Centennial"
    },
    {
      "id": "Bridgeport",
      "stateId": "Connecticut",
      "title": "Bridgeport"
    },
    {
      "id": "New Haven",
      "stateId": "Connecticut",
      "title": "New Haven"
    },
    {
      "id": "Stamford",
      "stateId": "Connecticut",
      "title": "Stamford"
    },
    {
      "id": "Hartford",
      "stateId": "Connecticut",
      "title": "Hartford"
    },
    {
      "id": "Waterbury",
      "stateId": "Connecticut",
      "title": "Waterbury"
    },
    {
      "id": "Norwalk",
      "stateId": "Connecticut",
      "title": "Norwalk"
    },
    {
      "id": "Danbury",
      "stateId": "Connecticut",
      "title": "Danbury"
    },
    {
      "id": "New Britain",
      "stateId": "Connecticut",
      "title": "New Britain"
    },
    {
      "id": "Bristol",
      "stateId": "Connecticut",
      "title": "Bristol"
    },
    {
      "id": "Meriden",
      "stateId": "Connecticut",
      "title": "Meriden"
    },
    {
      "id": "Wilmington",
      "stateId": "Delaware",
      "title": "Wilmington"
    },
    {
      "id": "Dover",
      "stateId": "Delaware",
      "title": "Dover"
    },
    {
      "id": "Newark",
      "stateId": "Delaware",
      "title": "Newark"
    },
    {
      "id": "Middletown",
      "stateId": "Delaware",
      "title": "Middletown"
    },
    {
      "id": "Smyrna",
      "stateId": "Delaware",
      "title": "Smyrna"
    },
    {
      "id": "Milford",
      "stateId": "Delaware",
      "title": "Milford"
    },
    {
      "id": "Seaford",
      "stateId": "Delaware",
      "title": "Seaford"
    },
    {
      "id": "Georgetown",
      "stateId": "Delaware",
      "title": "Georgetown"
    },
    {
      "id": "Elsmere",
      "stateId": "Delaware",
      "title": "Elsmere"
    },
    {
      "id": "New Castle",
      "stateId": "Delaware",
      "title": "New Castle"
    },
    {
      "id": "Jacksonville",
      "stateId": "Florida",
      "title": "Jacksonville"
    },
    {
      "id": "Miami",
      "stateId": "Florida",
      "title": "Miami"
    },
    {
      "id": "Tampa",
      "stateId": "Florida",
      "title": "Tampa"
    },
    {
      "id": "Orlando",
      "stateId": "Florida",
      "title": "Orlando"
    },
    {
      "id": "St. Petersburg",
      "stateId": "Florida",
      "title": "St. Petersburg"
    },
    {
      "id": "Hialeah",
      "stateId": "Florida",
      "title": "Hialeah"
    },
    {
      "id": "Tallahassee",
      "stateId": "Florida",
      "title": "Tallahassee"
    },
    {
      "id": "Fort Lauderdale",
      "stateId": "Florida",
      "title": "Fort Lauderdale"
    },
    {
      "id": "Port St. Lucie",
      "stateId": "Florida",
      "title": "Port St. Lucie"
    },
    {
      "id": "Cape Coral",
      "stateId": "Florida",
      "title": "Cape Coral"
    },
    {
      "id": "Atlanta",
      "stateId": "Georgia",
      "title": "Atlanta"
    },
    {
      "id": "Augusta",
      "stateId": "Georgia",
      "title": "Augusta"
    },
    {
      "id": "Columbus",
      "stateId": "Georgia",
      "title": "Columbus"
    },
    {
      "id": "Macon",
      "stateId": "Georgia",
      "title": "Macon"
    },
    {
      "id": "Savannah",
      "stateId": "Georgia",
      "title": "Savannah"
    },
    {
      "id": "Athens",
      "stateId": "Georgia",
      "title": "Athens"
    },
    {
      "id": "Sandy Springs",
      "stateId": "Georgia",
      "title": "Sandy Springs"
    },
    {
      "id": "Roswell",
      "stateId": "Georgia",
      "title": "Roswell"
    },
    {
      "id": "Albany",
      "stateId": "Georgia",
      "title": "Albany"
    },
    {
      "id": "Johns Creek",
      "stateId": "Georgia",
      "title": "Johns Creek"
    },
    {
      "id": "Honolulu",
      "stateId": "Hawaii",
      "title": "Honolulu"
    },
    {
      "id": "East Honolulu",
      "stateId": "Hawaii",
      "title": "East Honolulu"
    },
    {
      "id": "Pearl City",
      "stateId": "Hawaii",
      "title": "Pearl City"
    },
    {
      "id": "Hilo",
      "stateId": "Hawaii",
      "title": "Hilo"
    },
    {
      "id": "Kailua",
      "stateId": "Hawaii",
      "title": "Kailua"
    },
    {
      "id": "Waipahu",
      "stateId": "Hawaii",
      "title": "Waipahu"
    },
    {
      "id": "Kaneohe",
      "stateId": "Hawaii",
      "title": "Kaneohe"
    },
    {
      "id": "Mililani Town",
      "stateId": "Hawaii",
      "title": "Mililani Town"
    },
    {
      "id": "Ewa Gentry",
      "stateId": "Hawaii",
      "title": "Ewa Gentry"
    },
    {
      "id": "Kihei",
      "stateId": "Hawaii",
      "title": "Kihei"
    },
    {
      "id": "Boise",
      "stateId": "Idaho",
      "title": "Boise"
    },
    {
      "id": "Meridian",
      "stateId": "Idaho",
      "title": "Meridian"
    },
    {
      "id": "Nampa",
      "stateId": "Idaho",
      "title": "Nampa"
    },
    {
      "id": "Idaho Falls",
      "stateId": "Idaho",
      "title": "Idaho Falls"
    },
    {
      "id": "Pocatello",
      "stateId": "Idaho",
      "title": "Pocatello"
    },
    {
      "id": "Caldwell",
      "stateId": "Idaho",
      "title": "Caldwell"
    },
    {
      "id": "Coeur d'Alene",
      "stateId": "Idaho",
      "title": "Coeur d'Alene"
    },
    {
      "id": "Twin Falls",
      "stateId": "Idaho",
      "title": "Twin Falls"
    },
    {
      "id": "Lewiston",
      "stateId": "Idaho",
      "title": "Lewiston"
    },
    {
      "id": "Post Falls",
      "stateId": "Idaho",
      "title": "Post Falls"
    },
    {
      "id": "Chicago",
      "stateId": "Illinois",
      "title": "Chicago"
    },
    {
      "id": "Aurora",
      "stateId": "Illinois",
      "title": "Aurora"
    },
    {
      "id": "Naperville",
      "stateId": "Illinois",
      "title": "Naperville"
    },
    {
      "id": "Joliet",
      "stateId": "Illinois",
      "title": "Joliet"
    },
    {
      "id": "Rockford",
      "stateId": "Illinois",
      "title": "Rockford"
    },
    {
      "id": "Springfield",
      "stateId": "Illinois",
      "title": "Springfield"
    },
    {
      "id": "Elgin",
      "stateId": "Illinois",
      "title": "Elgin"
    },
    {
      "id": "Peoria",
      "stateId": "Illinois",
      "title": "Peoria"
    },
    {
      "id": "Champaign",
      "stateId": "Illinois",
      "title": "Champaign"
    },
    {
      "id": "Waukegan",
      "stateId": "Illinois",
      "title": "Waukegan"
    },
    {
      "id": "Indianapolis",
      "stateId": "Indiana",
      "title": "Indianapolis"
    },
    {
      "id": "Fort Wayne",
      "stateId": "Indiana",
      "title": "Fort Wayne"
    },
    {
      "id": "Evansville",
      "stateId": "Indiana",
      "title": "Evansville"
    },
    {
      "id": "South Bend",
      "stateId": "Indiana",
      "title": "South Bend"
    },
    {
      "id": "Carmel",
      "stateId": "Indiana",
      "title": "Carmel"
    },
    {
      "id": "Bloomington",
      "stateId": "Indiana",
      "title": "Bloomington"
    },
    {
      "id": "Hammond",
      "stateId": "Indiana",
      "title": "Hammond"
    },
    {
      "id": "Gary",
      "stateId": "Indiana",
      "title": "Gary"
    },
    {
      "id": "Lafayette",
      "stateId": "Indiana",
      "title": "Lafayette"
    },
    {
      "id": "Muncie",
      "stateId": "Indiana",
      "title": "Muncie"
    },
    {
      "id": "Des Moines",
      "stateId": "Iowa",
      "title": "Des Moines"
    },
    {
      "id": "Cedar Rapids",
      "stateId": "Iowa",
      "title": "Cedar Rapids"
    },
    {
      "id": "Davenport",
      "stateId": "Iowa",
      "title": "Davenport"
    },
    {
      "id": "Sioux City",
      "stateId": "Iowa",
      "title": "Sioux City"
    },
    {
      "id": "Iowa City",
      "stateId": "Iowa",
      "title": "Iowa City"
    },
    {
      "id": "Waterloo",
      "stateId": "Iowa",
      "title": "Waterloo"
    },
    {
      "id": "Ames",
      "stateId": "Iowa",
      "title": "Ames"
    },
    {
      "id": "West Des Moines",
      "stateId": "Iowa",
      "title": "West Des Moines"
    },
    {
      "id": "Council Bluffs",
      "stateId": "Iowa",
      "title": "Council Bluffs"
    },
    {
      "id": "Dubuque",
      "stateId": "Iowa",
      "title": "Dubuque"
    },
    {
      "id": "Wichita",
      "stateId": "Kansas",
      "title": "Wichita"
    },
    {
      "id": "Overland Park",
      "stateId": "Kansas",
      "title": "Overland Park"
    },
    {
      "id": "Kansas City",
      "stateId": "Kansas",
      "title": "Kansas City"
    },
    {
      "id": "Olathe",
      "stateId": "Kansas",
      "title": "Olathe"
    },
    {
      "id": "Topeka",
      "stateId": "Kansas",
      "title": "Topeka"
    },
    {
      "id": "Lawrence",
      "stateId": "Kansas",
      "title": "Lawrence"
    },
    {
      "id": "Shawnee",
      "stateId": "Kansas",
      "title": "Shawnee"
    },
    {
      "id": "Manhattan",
      "stateId": "Kansas",
      "title": "Manhattan"
    },
    {
      "id": "Lenexa",
      "stateId": "Kansas",
      "title": "Lenexa"
    },
    {
      "id": "Salina",
      "stateId": "Kansas",
      "title": "Salina"
    },
    {
      "id": "Louisville",
      "stateId": "Kentucky",
      "title": "Louisville"
    },
    {
      "id": "Lexington",
      "stateId": "Kentucky",
      "title": "Lexington"
    },
    {
      "id": "Bowling Green",
      "stateId": "Kentucky",
      "title": "Bowling Green"
    },
    {
      "id": "Owensboro",
      "stateId": "Kentucky",
      "title": "Owensboro"
    },
    {
      "id": "Covington",
      "stateId": "Kentucky",
      "title": "Covington"
    },
    {
      "id": "Richmond",
      "stateId": "Kentucky",
      "title": "Richmond"
    },
    {
      "id": "Georgetown",
      "stateId": "Kentucky",
      "title": "Georgetown"
    },
    {
      "id": "Florence",
      "stateId": "Kentucky",
      "title": "Florence"
    },
    {
      "id": "Hopkinsville",
      "stateId": "Kentucky",
      "title": "Hopkinsville"
    },
    {
      "id": "Nicholasville",
      "stateId": "Kentucky",
      "title": "Nicholasville"
    },
    {
      "id": "New Orleans",
      "stateId": "Louisiana",
      "title": "New Orleans"
    },
    {
      "id": "Baton Rouge",
      "stateId": "Louisiana",
      "title": "Baton Rouge"
    },
    {
      "id": "Shreveport",
      "stateId": "Louisiana",
      "title": "Shreveport"
    },
    {
      "id": "Lafayette",
      "stateId": "Louisiana",
      "title": "Lafayette"
    },
    {
      "id": "Lake Charles",
      "stateId": "Louisiana",
      "title": "Lake Charles"
    },
    {
      "id": "Kenner",
      "stateId": "Louisiana",
      "title": "Kenner"
    },
    {
      "id": "Bossier City",
      "stateId": "Louisiana",
      "title": "Bossier City"
    },
    {
      "id": "Monroe",
      "stateId": "Louisiana",
      "title": "Monroe"
    },
    {
      "id": "Alexandria",
      "stateId": "Louisiana",
      "title": "Alexandria"
    },
    {
      "id": "Houma",
      "stateId": "Louisiana",
      "title": "Houma"
    },
    {
      "id": "Portland",
      "stateId": "Maine",
      "title": "Portland"
    },
    {
      "id": "Lewiston",
      "stateId": "Maine",
      "title": "Lewiston"
    },
    {
      "id": "Bangor",
      "stateId": "Maine",
      "title": "Bangor"
    },
    {
      "id": "South Portland",
      "stateId": "Maine",
      "title": "South Portland"
    },
    {
      "id": "Auburn",
      "stateId": "Maine",
      "title": "Auburn"
    },
    {
      "id": "Biddeford",
      "stateId": "Maine",
      "title": "Biddeford"
    },
    {
      "id": "Sanford",
      "stateId": "Maine",
      "title": "Sanford"
    },
    {
      "id": "Saco",
      "stateId": "Maine",
      "title": "Saco"
    },
    {
      "id": "Augusta",
      "stateId": "Maine",
      "title": "Augusta"
    },
    {
      "id": "Westbrook",
      "stateId": "Maine",
      "title": "Westbrook"
    },
    {
      "id": "Baltimore",
      "stateId": "Maryland",
      "title": "Baltimore"
    },
    {
      "id": "Columbia",
      "stateId": "Maryland",
      "title": "Columbia"
    },
    {
      "id": "Germantown",
      "stateId": "Maryland",
      "title": "Germantown"
    },
    {
      "id": "Silver Spring",
      "stateId": "Maryland",
      "title": "Silver Spring"
    },
    {
      "id": "Waldorf",
      "stateId": "Maryland",
      "title": "Waldorf"
    },
    {
      "id": "Glen Burnie",
      "stateId": "Maryland",
      "title": "Glen Burnie"
    },
    {
      "id": "Ellicott City",
      "stateId": "Maryland",
      "title": "Ellicott City"
    },
    {
      "id": "Frederick",
      "stateId": "Maryland",
      "title": "Frederick"
    },
    {
      "id": "Dundalk",
      "stateId": "Maryland",
      "title": "Dundalk"
    },
    {
      "id": "Rockville",
      "stateId": "Maryland",
      "title": "Rockville"
    },
    {
      "id": "Boston",
      "stateId": "Massachusetts",
      "title": "Boston"
    },
    {
      "id": "Worcester",
      "stateId": "Massachusetts",
      "title": "Worcester"
    },
    {
      "id": "Springfield",
      "stateId": "Massachusetts",
      "title": "Springfield"
    },
    {
      "id": "Cambridge",
      "stateId": "Massachusetts",
      "title": "Cambridge"
    },
    {
      "id": "Lowell",
      "stateId": "Massachusetts",
      "title": "Lowell"
    },
    {
      "id": "Brockton",
      "stateId": "Massachusetts",
      "title": "Brockton"
    },
    {
      "id": "Quincy",
      "stateId": "Massachusetts",
      "title": "Quincy"
    },
    {
      "id": "Lynn",
      "stateId": "Massachusetts",
      "title": "Lynn"
    },
    {
      "id": "New Bedford",
      "stateId": "Massachusetts",
      "title": "New Bedford"
    },
    {
      "id": "Fall River",
      "stateId": "Massachusetts",
      "title": "Fall River"
    },
    {
      "id": "Detroit",
      "stateId": "Michigan",
      "title": "Detroit"
    },
    {
      "id": "Grand Rapids",
      "stateId": "Michigan",
      "title": "Grand Rapids"
    },
    {
      "id": "Warren",
      "stateId": "Michigan",
      "title": "Warren"
    },
    {
      "id": "Sterling Heights",
      "stateId": "Michigan",
      "title": "Sterling Heights"
    },
    {
      "id": "Ann Arbor",
      "stateId": "Michigan",
      "title": "Ann Arbor"
    },
    {
      "id": "Lansing",
      "stateId": "Michigan",
      "title": "Lansing"
    },
    {
      "id": "Flint",
      "stateId": "Michigan",
      "title": "Flint"
    },
    {
      "id": "Dearborn",
      "stateId": "Michigan",
      "title": "Dearborn"
    },
    {
      "id": "Livonia",
      "stateId": "Michigan",
      "title": "Livonia"
    },
    {
      "id": "Troy",
      "stateId": "Michigan",
      "title": "Troy"
    },
    {
      "id": "Minneapolis",
      "stateId": "Minnesota",
      "title": "Minneapolis"
    },
    {
      "id": "St. Paul",
      "stateId": "Minnesota",
      "title": "St. Paul"
    },
    {
      "id": "Rochester",
      "stateId": "Minnesota",
      "title": "Rochester"
    },
    {
      "id": "Duluth",
      "stateId": "Minnesota",
      "title": "Duluth"
    },
    {
      "id": "Bloomington",
      "stateId": "Minnesota",
      "title": "Bloomington"
    },
    {
      "id": "Brooklyn Park",
      "stateId": "Minnesota",
      "title": "Brooklyn Park"
    },
    {
      "id": "Plymouth",
      "stateId": "Minnesota",
      "title": "Plymouth"
    },
    {
      "id": "Maple Grove",
      "stateId": "Minnesota",
      "title": "Maple Grove"
    },
    {
      "id": "Woodbury",
      "stateId": "Minnesota",
      "title": "Woodbury"
    },
    {
      "id": "Eagan",
      "stateId": "Minnesota",
      "title": "Eagan"
    },
    {
      "id": "Jackson",
      "stateId": "Mississippi",
      "title": "Jackson"
    },
    {
      "id": "Gulfport",
      "stateId": "Mississippi",
      "title": "Gulfport"
    },
    {
      "id": "Southaven",
      "stateId": "Mississippi",
      "title": "Southaven"
    },
    {
      "id": "Hattiesburg",
      "stateId": "Mississippi",
      "title": "Hattiesburg"
    },
    {
      "id": "Biloxi",
      "stateId": "Mississippi",
      "title": "Biloxi"
    },
    {
      "id": "Meridian",
      "stateId": "Mississippi",
      "title": "Meridian"
    },
    {
      "id": "Tupelo",
      "stateId": "Mississippi",
      "title": "Tupelo"
    },
    {
      "id": "Olive Branch",
      "stateId": "Mississippi",
      "title": "Olive Branch"
    },
    {
      "id": "Greenville",
      "stateId": "Mississippi",
      "title": "Greenville"
    },
    {
      "id": "Horn Lake",
      "stateId": "Mississippi",
      "title": "Horn Lake"
    },
    {
      "id": "Kansas City",
      "stateId": "Missouri",
      "title": "Kansas City"
    },
    {
      "id": "St. Louis",
      "stateId": "Missouri",
      "title": "St. Louis"
    },
    {
      "id": "Springfield",
      "stateId": "Missouri",
      "title": "Springfield"
    },
    {
      "id": "Columbia",
      "stateId": "Missouri",
      "title": "Columbia"
    },
    {
      "id": "Independence",
      "stateId": "Missouri",
      "title": "Independence"
    },
    {
      "id": "Lee's Summit",
      "stateId": "Missouri",
      "title": "Lee's Summit"
    },
    {
      "id": "O'Fallon",
      "stateId": "Missouri",
      "title": "O'Fallon"
    },
    {
      "id": "St. Joseph",
      "stateId": "Missouri",
      "title": "St. Joseph"
    },
    {
      "id": "St. Charles",
      "stateId": "Missouri",
      "title": "St. Charles"
    },
    {
      "id": "Blue Springs",
      "stateId": "Missouri",
      "title": "Blue Springs"
    },
    {
      "id": "Billings",
      "stateId": "Montana",
      "title": "Billings"
    },
    {
      "id": "Missoula",
      "stateId": "Montana",
      "title": "Missoula"
    },
    {
      "id": "Great Falls",
      "stateId": "Montana",
      "title": "Great Falls"
    },
    {
      "id": "Bozeman",
      "stateId": "Montana",
      "title": "Bozeman"
    },
    {
      "id": "Butte",
      "stateId": "Montana",
      "title": "Butte"
    },
    {
      "id": "Helena",
      "stateId": "Montana",
      "title": "Helena"
    },
    {
      "id": "Kalispell",
      "stateId": "Montana",
      "title": "Kalispell"
    },
    {
      "id": "Havre",
      "stateId": "Montana",
      "title": "Havre"
    },
    {
      "id": "Anaconda",
      "stateId": "Montana",
      "title": "Anaconda"
    },
    {
      "id": "Miles City",
      "stateId": "Montana",
      "title": "Miles City"
    },
    {
      "id": "Omaha",
      "stateId": "Nebraska",
      "title": "Omaha"
    },
    {
      "id": "Lincoln",
      "stateId": "Nebraska",
      "title": "Lincoln"
    },
    {
      "id": "Bellevue",
      "stateId": "Nebraska",
      "title": "Bellevue"
    },
    {
      "id": "Grand Island",
      "stateId": "Nebraska",
      "title": "Grand Island"
    },
    {
      "id": "Kearney",
      "stateId": "Nebraska",
      "title": "Kearney"
    },
    {
      "id": "Fremont",
      "stateId": "Nebraska",
      "title": "Fremont"
    },
    {
      "id": "Hastings",
      "stateId": "Nebraska",
      "title": "Hastings"
    },
    {
      "id": "North Platte",
      "stateId": "Nebraska",
      "title": "North Platte"
    },
    {
      "id": "Norfolk",
      "stateId": "Nebraska",
      "title": "Norfolk"
    },
    {
      "id": "Columbus",
      "stateId": "Nebraska",
      "title": "Columbus"
    },
    {
      "id": "Las Vegas",
      "stateId": "Nevada",
      "title": "Las Vegas"
    },
    {
      "id": "Henderson",
      "stateId": "Nevada",
      "title": "Henderson"
    },
    {
      "id": "Reno",
      "stateId": "Nevada",
      "title": "Reno"
    },
    {
      "id": "North Las Vegas",
      "stateId": "Nevada",
      "title": "North Las Vegas"
    },
    {
      "id": "Sparks",
      "stateId": "Nevada",
      "title": "Sparks"
    },
    {
      "id": "Carson City",
      "stateId": "Nevada",
      "title": "Carson City"
    },
    {
      "id": "Elko",
      "stateId": "Nevada",
      "title": "Elko"
    },
    {
      "id": "Mesquite",
      "stateId": "Nevada",
      "title": "Mesquite"
    },
    {
      "id": "Boulder City",
      "stateId": "Nevada",
      "title": "Boulder City"
    },
    {
      "id": "Fernley",
      "stateId": "Nevada",
      "title": "Fernley"
    },
    {
      "id": "Manchester",
      "stateId": "New Hampshire",
      "title": "Manchester"
    },
    {
      "id": "Nashua",
      "stateId": "New Hampshire",
      "title": "Nashua"
    },
    {
      "id": "Concord",
      "stateId": "New Hampshire",
      "title": "Concord"
    },
    {
      "id": "Derry",
      "stateId": "New Hampshire",
      "title": "Derry"
    },
    {
      "id": "Dover",
      "stateId": "New Hampshire",
      "title": "Dover"
    },
    {
      "id": "Rochester",
      "stateId": "New Hampshire",
      "title": "Rochester"
    },
    {
      "id": "Salem",
      "stateId": "New Hampshire",
      "title": "Salem"
    },
    {
      "id": "Merrimack",
      "stateId": "New Hampshire",
      "title": "Merrimack"
    },
    {
      "id": "Hudson",
      "stateId": "New Hampshire",
      "title": "Hudson"
    },
    {
      "id": "Keene",
      "stateId": "New Hampshire",
      "title": "Keene"
    },
    {
      "id": "Newark",
      "stateId": "New Jersey",
      "title": "Newark"
    },
    {
      "id": "Jersey City",
      "stateId": "New Jersey",
      "title": "Jersey City"
    },
    {
      "id": "Paterson",
      "stateId": "New Jersey",
      "title": "Paterson"
    },
    {
      "id": "Elizabeth",
      "stateId": "New Jersey",
      "title": "Elizabeth"
    },
    {
      "id": "Edison",
      "stateId": "New Jersey",
      "title": "Edison"
    },
    {
      "id": "Woodbridge",
      "stateId": "New Jersey",
      "title": "Woodbridge"
    },
    {
      "id": "Lakewood",
      "stateId": "New Jersey",
      "title": "Lakewood"
    },
    {
      "id": "Toms River",
      "stateId": "New Jersey",
      "title": "Toms River"
    },
    {
      "id": "Clifton",
      "stateId": "New Jersey",
      "title": "Clifton"
    },
    {
      "id": "Trenton",
      "stateId": "New Jersey",
      "title": "Trenton"
    },
    {
      "id": "Albuquerque",
      "stateId": "New Mexico",
      "title": "Albuquerque"
    },
    {
      "id": "Las Cruces",
      "stateId": "New Mexico",
      "title": "Las Cruces"
    },
    {
      "id": "Rio Rancho",
      "stateId": "New Mexico",
      "title": "Rio Rancho"
    },
    {
      "id": "Santa Fe",
      "stateId": "New Mexico",
      "title": "Santa Fe"
    },
    {
      "id": "Roswell",
      "stateId": "New Mexico",
      "title": "Roswell"
    },
    {
      "id": "Farmington",
      "stateId": "New Mexico",
      "title": "Farmington"
    },
    {
      "id": "Clovis",
      "stateId": "New Mexico",
      "title": "Clovis"
    },
    {
      "id": "Hobbs",
      "stateId": "New Mexico",
      "title": "Hobbs"
    },
    {
      "id": "Alamogordo",
      "stateId": "New Mexico",
      "title": "Alamogordo"
    },
    {
      "id": "Carlsbad",
      "stateId": "New Mexico",
      "title": "Carlsbad"
    },
    {
      "id": "New York City",
      "stateId": "New York",
      "title": "New York City"
    },
    {
      "id": "Buffalo",
      "stateId": "New York",
      "title": "Buffalo"
    },
    {
      "id": "Rochester",
      "stateId": "New York",
      "title": "Rochester"
    },
    {
      "id": "Yonkers",
      "stateId": "New York",
      "title": "Yonkers"
    },
    {
      "id": "Syracuse",
      "stateId": "New York",
      "title": "Syracuse"
    },
    {
      "id": "Albany",
      "stateId": "New York",
      "title": "Albany"
    },
    {
      "id": "New Rochelle",
      "stateId": "New York",
      "title": "New Rochelle"
    },
    {
      "id": "Mount Vernon",
      "stateId": "New York",
      "title": "Mount Vernon"
    },
    {
      "id": "Schenectady",
      "stateId": "New York",
      "title": "Schenectady"
    },
    {
      "id": "Utica",
      "stateId": "New York",
      "title": "Utica"
    },
    {
      "id": "Charlotte",
      "stateId": "North Carolina",
      "title": "Charlotte"
    },
    {
      "id": "Raleigh",
      "stateId": "North Carolina",
      "title": "Raleigh"
    },
    {
      "id": "Greensboro",
      "stateId": "North Carolina",
      "title": "Greensboro"
    },
    {
      "id": "Durham",
      "stateId": "North Carolina",
      "title": "Durham"
    },
    {
      "id": "Winston-Salem",
      "stateId": "North Carolina",
      "title": "Winston-Salem"
    },
    {
      "id": "Fayetteville",
      "stateId": "North Carolina",
      "title": "Fayetteville"
    },
    {
      "id": "Cary",
      "stateId": "North Carolina",
      "title": "Cary"
    },
    {
      "id": "Wilmington",
      "stateId": "North Carolina",
      "title": "Wilmington"
    },
    {
      "id": "High Point",
      "stateId": "North Carolina",
      "title": "High Point"
    },
    {
      "id": "Greenville",
      "stateId": "North Carolina",
      "title": "Greenville"
    },
    {
      "id": "Fargo",
      "stateId": "North Dakota",
      "title": "Fargo"
    },
    {
      "id": "Bismarck",
      "stateId": "North Dakota",
      "title": "Bismarck"
    },
    {
      "id": "Grand Forks",
      "stateId": "North Dakota",
      "title": "Grand Forks"
    },
    {
      "id": "Minot",
      "stateId": "North Dakota",
      "title": "Minot"
    },
    {
      "id": "West Fargo",
      "stateId": "North Dakota",
      "title": "West Fargo"
    },
    {
      "id": "Williston",
      "stateId": "North Dakota",
      "title": "Williston"
    },
    {
      "id": "Dickinson",
      "stateId": "North Dakota",
      "title": "Dickinson"
    },
    {
      "id": "Mandan",
      "stateId": "North Dakota",
      "title": "Mandan"
    },
    {
      "id": "Jamestown",
      "stateId": "North Dakota",
      "title": "Jamestown"
    },
    {
      "id": "Wahpeton",
      "stateId": "North Dakota",
      "title": "Wahpeton"
    },
    {
      "id": "Columbus",
      "stateId": "Ohio",
      "title": "Columbus"
    },
    {
      "id": "Cleveland",
      "stateId": "Ohio",
      "title": "Cleveland"
    },
    {
      "id": "Cincinnati",
      "stateId": "Ohio",
      "title": "Cincinnati"
    },
    {
      "id": "Toledo",
      "stateId": "Ohio",
      "title": "Toledo"
    },
    {
      "id": "Akron",
      "stateId": "Ohio",
      "title": "Akron"
    },
    {
      "id": "Dayton",
      "stateId": "Ohio",
      "title": "Dayton"
    },
    {
      "id": "Parma",
      "stateId": "Ohio",
      "title": "Parma"
    },
    {
      "id": "Canton",
      "stateId": "Ohio",
      "title": "Canton"
    },
    {
      "id": "Youngstown",
      "stateId": "Ohio",
      "title": "Youngstown"
    },
    {
      "id": "Lorain",
      "stateId": "Ohio",
      "title": "Lorain"
    },
    {
      "id": "Oklahoma City",
      "stateId": "Oklahoma",
      "title": "Oklahoma City"
    },
    {
      "id": "Tulsa",
      "stateId": "Oklahoma",
      "title": "Tulsa"
    },
    {
      "id": "Norman",
      "stateId": "Oklahoma",
      "title": "Norman"
    },
    {
      "id": "Broken Arrow",
      "stateId": "Oklahoma",
      "title": "Broken Arrow"
    },
    {
      "id": "Edmond",
      "stateId": "Oklahoma",
      "title": "Edmond"
    },
    {
      "id": "Lawton",
      "stateId": "Oklahoma",
      "title": "Lawton"
    },
    {
      "id": "Moore",
      "stateId": "Oklahoma",
      "title": "Moore"
    },
    {
      "id": "Midwest City",
      "stateId": "Oklahoma",
      "title": "Midwest City"
    },
    {
      "id": "Enid",
      "stateId": "Oklahoma",
      "title": "Enid"
    },
    {
      "id": "Stillwater",
      "stateId": "Oklahoma",
      "title": "Stillwater"
    },
    {
      "id": "Portland",
      "stateId": "Oregon",
      "title": "Portland"
    },
    {
      "id": "Salem",
      "stateId": "Oregon",
      "title": "Salem"
    },
    {
      "id": "Eugene",
      "stateId": "Oregon",
      "title": "Eugene"
    },
    {
      "id": "Gresham",
      "stateId": "Oregon",
      "title": "Gresham"
    },
    {
      "id": "Hillsboro",
      "stateId": "Oregon",
      "title": "Hillsboro"
    },
    {
      "id": "Beaverton",
      "stateId": "Oregon",
      "title": "Beaverton"
    },
    {
      "id": "Bend",
      "stateId": "Oregon",
      "title": "Bend"
    },
    {
      "id": "Medford",
      "stateId": "Oregon",
      "title": "Medford"
    },
    {
      "id": "Springfield",
      "stateId": "Oregon",
      "title": "Springfield"
    },
    {
      "id": "Corvallis",
      "stateId": "Oregon",
      "title": "Corvallis"
    },
    {
      "id": "Philadelphia",
      "stateId": "Pennsylvania",
      "title": "Philadelphia"
    },
    {
      "id": "Pittsburgh",
      "stateId": "Pennsylvania",
      "title": "Pittsburgh"
    },
    {
      "id": "Allentown",
      "stateId": "Pennsylvania",
      "title": "Allentown"
    },
    {
      "id": "Erie",
      "stateId": "Pennsylvania",
      "title": "Erie"
    },
    {
      "id": "Reading",
      "stateId": "Pennsylvania",
      "title": "Reading"
    },
    {
      "id": "Scranton",
      "stateId": "Pennsylvania",
      "title": "Scranton"
    },
    {
      "id": "Bethlehem",
      "stateId": "Pennsylvania",
      "title": "Bethlehem"
    },
    {
      "id": "Lancaster",
      "stateId": "Pennsylvania",
      "title": "Lancaster"
    },
    {
      "id": "Harrisburg",
      "stateId": "Pennsylvania",
      "title": "Harrisburg"
    },
    {
      "id": "Altoona",
      "stateId": "Pennsylvania",
      "title": "Altoona"
    },
    {
      "id": "Providence",
      "stateId": "Rhode Island",
      "title": "Providence"
    },
    {
      "id": "Cranston",
      "stateId": "Rhode Island",
      "title": "Cranston"
    },
    {
      "id": "Warwick",
      "stateId": "Rhode Island",
      "title": "Warwick"
    },
    {
      "id": "Pawtucket",
      "stateId": "Rhode Island",
      "title": "Pawtucket"
    },
    {
      "id": "East Providence",
      "stateId": "Rhode Island",
      "title": "East Providence"
    },
    {
      "id": "Woonsocket",
      "stateId": "Rhode Island",
      "title": "Woonsocket"
    },
    {
      "id": "Coventry",
      "stateId": "Rhode Island",
      "title": "Coventry"
    },
    {
      "id": "Cumberland",
      "stateId": "Rhode Island",
      "title": "Cumberland"
    },
    {
      "id": "North Providence",
      "stateId": "Rhode Island",
      "title": "North Providence"
    },
    {
      "id": "South Kingstown",
      "stateId": "Rhode Island",
      "title": "South Kingstown"
    },
    {
      "id": "Columbia",
      "stateId": "South Carolina",
      "title": "Columbia"
    },
    {
      "id": "Charleston",
      "stateId": "South Carolina",
      "title": "Charleston"
    },
    {
      "id": "North Charleston",
      "stateId": "South Carolina",
      "title": "North Charleston"
    },
    {
      "id": "Mount Pleasant",
      "stateId": "South Carolina",
      "title": "Mount Pleasant"
    },
    {
      "id": "Rock Hill",
      "stateId": "South Carolina",
      "title": "Rock Hill"
    },
    {
      "id": "Greenville",
      "stateId": "South Carolina",
      "title": "Greenville"
    },
    {
      "id": "Summerville",
      "stateId": "South Carolina",
      "title": "Summerville"
    },
    {
      "id": "Sumter",
      "stateId": "South Carolina",
      "title": "Sumter"
    },
    {
      "id": "Goose Creek",
      "stateId": "South Carolina",
      "title": "Goose Creek"
    },
    {
      "id": "Hilton Head Island",
      "stateId": "South Carolina",
      "title": "Hilton Head Island"
    },
    {
      "id": "Sioux Falls",
      "stateId": "South Dakota",
      "title": "Sioux Falls"
    },
    {
      "id": "Rapid City",
      "stateId": "South Dakota",
      "title": "Rapid City"
    },
    {
      "id": "Aberdeen",
      "stateId": "South Dakota",
      "title": "Aberdeen"
    },
    {
      "id": "Brookings",
      "stateId": "South Dakota",
      "title": "Brookings"
    },
    {
      "id": "Watertown",
      "stateId": "South Dakota",
      "title": "Watertown"
    },
    {
      "id": "Mitchell",
      "stateId": "South Dakota",
      "title": "Mitchell"
    },
    {
      "id": "Yankton",
      "stateId": "South Dakota",
      "title": "Yankton"
    },
    {
      "id": "Pierre",
      "stateId": "South Dakota",
      "title": "Pierre"
    },
    {
      "id": "Huron",
      "stateId": "South Dakota",
      "title": "Huron"
    },
    {
      "id": "Spearfish",
      "stateId": "South Dakota",
      "title": "Spearfish"
    },
    {
      "id": "Memphis",
      "stateId": "Tennessee",
      "title": "Memphis"
    },
    {
      "id": "Nashville",
      "stateId": "Tennessee",
      "title": "Nashville"
    },
    {
      "id": "Knoxville",
      "stateId": "Tennessee",
      "title": "Knoxville"
    },
    {
      "id": "Chattanooga",
      "stateId": "Tennessee",
      "title": "Chattanooga"
    },
    {
      "id": "Clarksville",
      "stateId": "Tennessee",
      "title": "Clarksville"
    },
    {
      "id": "Murfreesboro",
      "stateId": "Tennessee",
      "title": "Murfreesboro"
    },
    {
      "id": "Franklin",
      "stateId": "Tennessee",
      "title": "Franklin"
    },
    {
      "id": "Jackson",
      "stateId": "Tennessee",
      "title": "Jackson"
    },
    {
      "id": "Johnson City",
      "stateId": "Tennessee",
      "title": "Johnson City"
    },
    {
      "id": "Bartlett",
      "stateId": "Tennessee",
      "title": "Bartlett"
    },
    {
      "id": "Houston",
      "stateId": "Texas",
      "title": "Houston"
    },
    {
      "id": "San Antonio",
      "stateId": "Texas",
      "title": "San Antonio"
    },
    {
      "id": "Dallas",
      "stateId": "Texas",
      "title": "Dallas"
    },
    {
      "id": "Austin",
      "stateId": "Texas",
      "title": "Austin"
    },
    {
      "id": "Fort Worth",
      "stateId": "Texas",
      "title": "Fort Worth"
    },
    {
      "id": "El Paso",
      "stateId": "Texas",
      "title": "El Paso"
    },
    {
      "id": "Arlington",
      "stateId": "Texas",
      "title": "Arlington"
    },
    {
      "id": "Corpus Christi",
      "stateId": "Texas",
      "title": "Corpus Christi"
    },
    {
      "id": "Plano",
      "stateId": "Texas",
      "title": "Plano"
    },
    {
      "id": "Laredo",
      "stateId": "Texas",
      "title": "Laredo"
    },
    {
      "id": "Salt Lake City",
      "stateId": "Utah",
      "title": "Salt Lake City"
    },
    {
      "id": "West Valley City",
      "stateId": "Utah",
      "title": "West Valley City"
    },
    {
      "id": "Provo",
      "stateId": "Utah",
      "title": "Provo"
    },
    {
      "id": "West Jordan",
      "stateId": "Utah",
      "title": "West Jordan"
    },
    {
      "id": "Orem",
      "stateId": "Utah",
      "title": "Orem"
    },
    {
      "id": "Sandy",
      "stateId": "Utah",
      "title": "Sandy"
    },
    {
      "id": "St. George",
      "stateId": "Utah",
      "title": "St. George"
    },
    {
      "id": "Ogden",
      "stateId": "Utah",
      "title": "Ogden"
    },
    {
      "id": "Layton",
      "stateId": "Utah",
      "title": "Layton"
    },
    {
      "id": "South Jordan",
      "stateId": "Utah",
      "title": "South Jordan"
    },
    {
      "id": "Burlington",
      "stateId": "Vermont",
      "title": "Burlington"
    },
    {
      "id": "South Burlington",
      "stateId": "Vermont",
      "title": "South Burlington"
    },
    {
      "id": "Rutland",
      "stateId": "Vermont",
      "title": "Rutland"
    },
    {
      "id": "Barre",
      "stateId": "Vermont",
      "title": "Barre"
    },
    {
      "id": "Montpelier",
      "stateId": "Vermont",
      "title": "Montpelier"
    },
    {
      "id": "Essex Junction",
      "stateId": "Vermont",
      "title": "Essex Junction"
    },
    {
      "id": "St. Albans",
      "stateId": "Vermont",
      "title": "St. Albans"
    },
    {
      "id": "Winooski",
      "stateId": "Vermont",
      "title": "Winooski"
    },
    {
      "id": "Middlebury",
      "stateId": "Vermont",
      "title": "Middlebury"
    },
    {
      "id": "Brattleboro",
      "stateId": "Vermont",
      "title": "Brattleboro"
    },
    {
      "id": "Virginia Beach",
      "stateId": "Virginia",
      "title": "Virginia Beach"
    },
    {
      "id": "Norfolk",
      "stateId": "Virginia",
      "title": "Norfolk"
    },
    {
      "id": "Chesapeake",
      "stateId": "Virginia",
      "title": "Chesapeake"
    },
    {
      "id": "Richmond",
      "stateId": "Virginia",
      "title": "Richmond"
    },
    {
      "id": "Newport News",
      "stateId": "Virginia",
      "title": "Newport News"
    },
    {
      "id": "Alexandria",
      "stateId": "Virginia",
      "title": "Alexandria"
    },
    {
      "id": "Hampton",
      "stateId": "Virginia",
      "title": "Hampton"
    },
    {
      "id": "Roanoke",
      "stateId": "Virginia",
      "title": "Roanoke"
    },
    {
      "id": "Portsmouth",
      "stateId": "Virginia",
      "title": "Portsmouth"
    },
    {
      "id": "Suffolk",
      "stateId": "Virginia",
      "title": "Suffolk"
    },
    {
      "id": "Seattle",
      "stateId": "Washington",
      "title": "Seattle"
    },
    {
      "id": "Spokane",
      "stateId": "Washington",
      "title": "Spokane"
    },
    {
      "id": "Tacoma",
      "stateId": "Washington",
      "title": "Tacoma"
    },
    {
      "id": "Vancouver",
      "stateId": "Washington",
      "title": "Vancouver"
    },
    {
      "id": "Bellevue",
      "stateId": "Washington",
      "title": "Bellevue"
    },
    {
      "id": "Kent",
      "stateId": "Washington",
      "title": "Kent"
    },
    {
      "id": "Everett",
      "stateId": "Washington",
      "title": "Everett"
    },
    {
      "id": "Renton",
      "stateId": "Washington",
      "title": "Renton"
    },
    {
      "id": "Spokane Valley",
      "stateId": "Washington",
      "title": "Spokane Valley"
    },
    {
      "id": "Federal Way",
      "stateId": "Washington",
      "title": "Federal Way"
    },
    {
      "id": "Charleston",
      "stateId": "West Virginia",
      "title": "Charleston"
    },
    {
      "id": "Huntington",
      "stateId": "West Virginia",
      "title": "Huntington"
    },
    {
      "id": "Morgantown",
      "stateId": "West Virginia",
      "title": "Morgantown"
    },
    {
      "id": "Parkersburg",
      "stateId": "West Virginia",
      "title": "Parkersburg"
    },
    {
      "id": "Wheeling",
      "stateId": "West Virginia",
      "title": "Wheeling"
    },
    {
      "id": "Weirton",
      "stateId": "West Virginia",
      "title": "Weirton"
    },
    {
      "id": "Fairmont",
      "stateId": "West Virginia",
      "title": "Fairmont"
    },
    {
      "id": "Martinsburg",
      "stateId": "West Virginia",
      "title": "Martinsburg"
    },
    {
      "id": "Beckley",
      "stateId": "West Virginia",
      "title": "Beckley"
    },
    {
      "id": "Clarksburg",
      "stateId": "West Virginia",
      "title": "Clarksburg"
    },
    {
      "id": "Milwaukee",
      "stateId": "Wisconsin",
      "title": "Milwaukee"
    },
    {
      "id": "Madison",
      "stateId": "Wisconsin",
      "title": "Madison"
    },
    {
      "id": "Green Bay",
      "stateId": "Wisconsin",
      "title": "Green Bay"
    },
    {
      "id": "Kenosha",
      "stateId": "Wisconsin",
      "title": "Kenosha"
    },
    {
      "id": "Racine",
      "stateId": "Wisconsin",
      "title": "Racine"
    },
    {
      "id": "Appleton",
      "stateId": "Wisconsin",
      "title": "Appleton"
    },
    {
      "id": "Waukesha",
      "stateId": "Wisconsin",
      "title": "Waukesha"
    },
    {
      "id": "Eau Claire",
      "stateId": "Wisconsin",
      "title": "Eau Claire"
    },
    {
      "id": "Oshkosh",
      "stateId": "Wisconsin",
      "title": "Oshkosh"
    },
    {
      "id": "Janesville",
      "stateId": "Wisconsin",
      "title": "Janesville"
    },
    {
      "id": "Cheyenne",
      "stateId": "Wyoming",
      "title": "Cheyenne"
    },
    {
      "id": "Casper",
      "stateId": "Wyoming",
      "title": "Casper"
    },
    {
      "id": "Laramie",
      "stateId": "Wyoming",
      "title": "Laramie"
    },
    {
      "id": "Gillette",
      "stateId": "Wyoming",
      "title": "Gillette"
    },
    {
      "id": "Rock Springs",
      "stateId": "Wyoming",
      "title": "Rock Springs"
    },
    {
      "id": "Sheridan",
      "stateId": "Wyoming",
      "title": "Sheridan"
    },
    {
      "id": "Green River",
      "stateId": "Wyoming",
      "title": "Green River"
    },
    {
      "id": "Evanston",
      "stateId": "Wyoming",
      "title": "Evanston"
    },
    {
      "id": "Riverton",
      "stateId": "Wyoming",
      "title": "Riverton"
    },
    {
      "id": "Jackson",
      "stateId": "Wyoming",
      "title": "Jackson"
    }
  ]

  if(stateId){

    return unsortedCities.filter(city => city.stateId === stateId)
  }else{
    return []
  }
}
  ;
  

export const getFrequency = ()=>([
  { id: 'None', title: 'None' },
    { id: '1 Month', title: '1 Month' },
    { id: '2 Months', title: '2 Months' },
    { id: '3 Months', title: '3 Months' },
    { id: '4 Months', title: '4 Months' },
    { id: '6 Months', title: '6 Months' },
])
