export type MiLBLevel = 'AAA' | 'AA' | 'A+' | 'A';

export interface Affiliate {
  name: string;
  level: MiLBLevel;
}

export interface BaseballTeam {
  name: string;
  division: 'al' | 'nl';
  affiliates: Affiliate[];
}

export const BaseballTeams: BaseballTeam[] = [
  {
    name: 'Baltimore Orioles',
    division: 'al',
    affiliates: [
      { name: 'Norfolk Tides', level: 'AAA' },
      { name: 'Bowie Baysox', level: 'AA' },
      { name: 'Aberdeen IronBirds', level: 'A+' },
      { name: 'Delmarva Shorebirds', level: 'A' },
    ],
  },
  {
    name: 'Boston Red Sox',
    division: 'al',
    affiliates: [
      { name: 'Worcester Red Sox', level: 'AAA' },
      { name: 'Portland Sea Dogs', level: 'AA' },
      { name: 'Greenville Drive', level: 'A+' },
      { name: 'Salem Red Sox', level: 'A' },
    ],
  },
  {
    name: 'New York Yankees',
    division: 'al',
    affiliates: [
      { name: 'Scranton/Wilkes-Barre RailRiders', level: 'AAA' },
      { name: 'Somerset Patriots', level: 'AA' },
      { name: 'Hudson Valley Renegades', level: 'A+' },
      { name: 'Tampa Tarpons', level: 'A' },
    ],
  },
  {
    name: 'Tampa Bay Rays',
    division: 'al',
    affiliates: [
      { name: 'Durham Bulls', level: 'AAA' },
      { name: 'Montgomery Biscuits', level: 'AA' },
      { name: 'Bowling Green Hot Rods', level: 'A+' },
      { name: 'Charleston RiverDogs', level: 'A' },
    ],
  },
  {
    name: 'Toronto Blue Jays',
    division: 'al',
    affiliates: [
      { name: 'Buffalo Bisons', level: 'AAA' },
      { name: 'New Hampshire Fisher Cats', level: 'AA' },
      { name: 'Vancouver Canadians', level: 'A+' },
      { name: 'Dunedin Blue Jays', level: 'A' },
    ],
  },
  {
    name: 'Chicago White Sox',
    division: 'al',
    affiliates: [
      { name: 'Charlotte Knights', level: 'AAA' },
      { name: 'Birmingham Barons', level: 'AA' },
      { name: 'Winston-Salem Dash', level: 'A+' },
      { name: 'Kannapolis Cannon Ballers', level: 'A' },
    ],
  },
  {
    name: 'Cleveland Guardians',
    division: 'al',
    affiliates: [
      { name: 'Columbus Clippers', level: 'AAA' },
      { name: 'Akron RubberDucks', level: 'AA' },
      { name: 'Lake County Captains', level: 'A+' },
      { name: 'Lynchburg Hillcats', level: 'A' },
    ],
  },
  {
    name: 'Detroit Tigers',
    division: 'al',
    affiliates: [
      { name: 'Toledo Mud Hens', level: 'AAA' },
      { name: 'Erie SeaWolves', level: 'AA' },
      { name: 'West Michigan Whitecaps', level: 'A+' },
      { name: 'Lakeland Flying Tigers', level: 'A' },
    ],
  },
  {
    name: 'Kansas City Royals',
    division: 'al',
    affiliates: [
      { name: 'Omaha Storm Chasers', level: 'AAA' },
      { name: 'Northwest Arkansas Naturals', level: 'AA' },
      { name: 'Quad Cities River Bandits', level: 'A+' },
      { name: 'Columbia Fireflies', level: 'A' },
    ],
  },
  {
    name: 'Minnesota Twins',
    division: 'al',
    affiliates: [
      { name: 'St. Paul Saints', level: 'AAA' },
      { name: 'Wichita Wind Surge', level: 'AA' },
      { name: 'Cedar Rapids Kernels', level: 'A+' },
      { name: 'Fort Myers Mighty Mussels', level: 'A' },
    ],
  },
  {
    name: 'Oakland Athletics',
    division: 'al',
    affiliates: [
      { name: 'Las Vegas Aviators', level: 'AAA' },
      { name: 'Midland RockHounds', level: 'AA' },
      { name: 'Lansing Lugnuts', level: 'A+' },
      { name: 'Stockton Ports', level: 'A' },
    ],
  },
  {
    name: 'Houston Astros',
    division: 'al',
    affiliates: [
      { name: 'Sugar Land Space Cowboys', level: 'AAA' },
      { name: 'Corpus Christi Hooks', level: 'AA' },
      { name: 'Asheville Tourists', level: 'A+' },
      { name: 'Fayetteville Woodpeckers', level: 'A' },
    ],
  },
  {
    name: 'Los Angeles Angels',
    division: 'al',
    affiliates: [
      { name: 'Salt Lake Bees', level: 'AAA' },
      { name: 'Rocket City Trash Pandas', level: 'AA' },
      { name: 'Tri-City Dust Devils', level: 'A+' },
      { name: 'Inland Empire 66ers', level: 'A' },
    ],
  },
  {
    name: 'Seattle Mariners',
    division: 'al',
    affiliates: [
      { name: 'Tacoma Rainiers', level: 'AAA' },
      { name: 'Arkansas Travelers', level: 'AA' },
      { name: 'Everett AquaSox', level: 'A+' },
      { name: 'Modesto Nuts', level: 'A' },
    ],
  },
  {
    name: 'Texas Rangers',
    division: 'al',
    affiliates: [
      { name: 'Round Rock Express', level: 'AAA' },
      { name: 'Frisco RoughRiders', level: 'AA' },
      { name: 'Hickory Crawdads', level: 'A+' },
      { name: 'Down East Wood Ducks', level: 'A' },
    ],
  },
  {
    name: 'Atlanta Braves',
    division: 'nl',
    affiliates: [
      { name: 'Gwinnett Stripers', level: 'AAA' },
      { name: 'Mississippi Braves', level: 'AA' },
      { name: 'Rome Emperors', level: 'A+' },
      { name: 'Augusta GreenJackets', level: 'A' },
    ],
  },
  {
    name: 'Miami Marlins',
    division: 'nl',
    affiliates: [
      { name: 'Jacksonville Jumbo Shrimp', level: 'AAA' },
      { name: 'Pensacola Blue Wahoos', level: 'AA' },
      { name: 'Beloit Sky Carp', level: 'A+' },
      { name: 'Jupiter Hammerheads', level: 'A' },
    ],
  },
  {
    name: 'New York Mets',
    division: 'nl',
    affiliates: [
      { name: 'Syracuse Mets', level: 'AAA' },
      { name: 'Binghamton Rumble Ponies', level: 'AA' },
      { name: 'Brooklyn Cyclones', level: 'A+' },
      { name: 'St. Lucie Mets', level: 'A' },
    ],
  },
  {
    name: 'Philadelphia Phillies',
    division: 'nl',
    affiliates: [
      { name: 'Lehigh Valley IronPigs', level: 'AAA' },
      { name: 'Reading Fightin Phils', level: 'AA' },
      { name: 'Jersey Shore BlueClaws', level: 'A+' },
      { name: 'Clearwater Threshers', level: 'A' },
    ],
  },
  {
    name: 'Washington Nationals',
    division: 'nl',
    affiliates: [
      { name: 'Rochester Red Wings', level: 'AAA' },
      { name: 'Harrisburg Senators', level: 'AA' },
      { name: 'Wilmington Blue Rocks', level: 'A+' },
      { name: 'Fredericksburg Nationals', level: 'A' },
    ],
  },
  {
    name: 'Chicago Cubs',
    division: 'nl',
    affiliates: [
      { name: 'Iowa Cubs', level: 'AAA' },
      { name: 'Tennessee Smokies', level: 'AA' },
      { name: 'South Bend Cubs', level: 'A+' },
      { name: 'Myrtle Beach Pelicans', level: 'A' },
    ],
  },
  {
    name: 'Cincinnati Reds',
    division: 'nl',
    affiliates: [
      { name: 'Louisville Bats', level: 'AAA' },
      { name: 'Chattanooga Lookouts', level: 'AA' },
      { name: 'Dayton Dragons', level: 'A+' },
      { name: 'Daytona Tortugas', level: 'A' },
    ],
  },
  {
    name: 'Milwaukee Brewers',
    division: 'nl',
    affiliates: [
      { name: 'Nashville Sounds', level: 'AAA' },
      { name: 'Biloxi Shuckers', level: 'AA' },
      { name: 'Wisconsin Timber Rattlers', level: 'A+' },
      { name: 'Carolina Mudcats', level: 'A' },
    ],
  },
  {
    name: 'Pittsburgh Pirates',
    division: 'nl',
    affiliates: [
      { name: 'Indianapolis Indians', level: 'AAA' },
      { name: 'Altoona Curve', level: 'AA' },
      { name: 'Greensboro Grasshoppers', level: 'A+' },
      { name: 'Bradenton Marauders', level: 'A' },
    ],
  },
  {
    name: 'St. Louis Cardinals',
    division: 'nl',
    affiliates: [
      { name: 'Memphis Redbirds', level: 'AAA' },
      { name: 'Springfield Cardinals', level: 'AA' },
      { name: 'Peoria Chiefs', level: 'A+' },
      { name: 'Palm Beach Cardinals', level: 'A' },
    ],
  },
  {
    name: 'Arizona Diamondbacks',
    division: 'nl',
    affiliates: [
      { name: 'Reno Aces', level: 'AAA' },
      { name: 'Amarillo Sod Poodles', level: 'AA' },
      { name: 'Hillsboro Hops', level: 'A+' },
      { name: 'Visalia Rawhide', level: 'A' },
    ],
  },
  {
    name: 'Colorado Rockies',
    division: 'nl',
    affiliates: [
      { name: 'Albuquerque Isotopes', level: 'AAA' },
      { name: 'Hartford Yard Goats', level: 'AA' },
      { name: 'Spokane Indians', level: 'A+' },
      { name: 'Fresno Grizzlies', level: 'A' },
    ],
  },
  {
    name: 'Los Angeles Dodgers',
    division: 'nl',
    affiliates: [
      { name: 'Oklahoma City Baseball Club', level: 'AAA' },
      { name: 'Tulsa Drillers', level: 'AA' },
      { name: 'Great Lakes Loons', level: 'A+' },
      { name: 'Rancho Cucamonga Quakes', level: 'A' },
    ],
  },
  {
    name: 'San Diego Padres',
    division: 'nl',
    affiliates: [
      { name: 'El Paso Chihuahuas', level: 'AAA' },
      { name: 'San Antonio Missions', level: 'AA' },
      { name: 'Fort Wayne TinCaps', level: 'A+' },
      { name: 'Lake Elsinore Storm', level: 'A' },
    ],
  },
  {
    name: 'San Francisco Giants',
    division: 'nl',
    affiliates: [
      { name: 'Sacramento River Cats', level: 'AAA' },
      { name: 'Richmond Flying Squirrels', level: 'AA' },
      { name: 'Eugene Emeralds', level: 'A+' },
      { name: 'San Jose Giants', level: 'A' },
    ],
  },
];
