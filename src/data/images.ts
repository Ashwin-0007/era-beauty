const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

export const images = {
  // Institute
  instituteHero: unsplash('1787496994867-939269b4d323', 2000),
  reception: unsplash('1763873993447-1d0be71a96d9', 1600),
  archShelves: unsplash('1786937680099-779e1da6f7f7', 1600),
  instituteRoom: unsplash('1693578538512-fc66f318c833', 1400),
  instituteLounge: unsplash('1773924093206-9a433a14bb44', 1400),
  instituteTable: unsplash('1787651343620-8d5303006ecb', 1200),
  instituteInterior: unsplash('1560750588-73207b1ef5b8', 1400),

  // Laser
  laserLeg: unsplash('1700760933574-9f0f4ea9aa3b', 1400),
  laserFace: unsplash('1785861775561-c6db7da314a0', 1000),
  laserArm: unsplash('1785861433534-8cd4c7b994fa', 1000),

  // Regard
  eyeLashes: unsplash('1639629509821-c54cdd984227', 1600),
  eyeClosed: unsplash('1778517436057-4ed5f9fe95bd', 1000),
  lashTreatment: unsplash('1589710751893-f9a6770ad71b', 1000),
  lashTech: unsplash('1772236617396-2f8460293c07', 1000),
  lashBrowCare: unsplash('1718720410649-7524fcb0f0a5', 1000),
  browTweezers: unsplash('1792679430669-caa0d70a9c52', 1000),
  browCare: unsplash('1785860945533-918a531bcdeb', 1000),
  eyeBrow: unsplash('1516220362602-dba5272034e7', 1000),
  browPortrait: unsplash('1785559628246-d1530927c2ab', 1000),

  // Visage & head spa
  headSpa: unsplash('1775133263816-8b2a1c5d13e8', 1400),
  facialMassage: unsplash('1706795033728-9232ef548a16', 1000),
  facialCream: unsplash('1761718210089-ba3bb5ccb54f', 1000),
  facialMask: unsplash('1570172619644-dfd03ed5d881', 1000),
  facialSkin: unsplash('1616394584738-fc6e612e71b9', 1000),

  // Sourire
  smile: unsplash('1769559893692-c6d0623bf8e4', 1400),
  smileProfile: unsplash('1677026010083-78ec7f1b84ed', 1000),
  smileLaugh: unsplash('1489278353717-f64c6ee8a4d2', 1000),

  // UV
  uvGlow: unsplash('1778517436057-4ed5f9fe95bd', 1400),
  uvBody: unsplash('1777900201261-bed34749d294', 1000),

  // Portraits
  portrait: unsplash('1531746020798-e6953c6e8e04', 1400),
  portraitSkin: unsplash('1552693673-1bf958298935', 1200),
} as const
