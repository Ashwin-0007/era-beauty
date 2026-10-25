const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

export const images = {
  heroPortrait: unsplash('1531746020798-e6953c6e8e04', 1400),
  heroDetail: unsplash('1576426863848-c21f53c60b19', 700),
  aboutInterior: unsplash('1560750588-73207b1ef5b8', 1400),
  aboutTreatment: unsplash('1512290923902-8a9f81dc236c', 900),
  serviceFacial: unsplash('1570172619644-dfd03ed5d881', 900),
  serviceSkin: unsplash('1552693673-1bf958298935', 900),
  serviceLashBrow: unsplash('1487412947147-5cebf100ffc2', 900),
  serviceBody: unsplash('1600334129128-685c5582fd35', 900),
  serviceHandsFeet: unsplash('1610992015732-2449b76344bc', 900),
  serviceMakeup: unsplash('1515688594390-b649af70d282', 900),
  pricingFeature: unsplash('1601049541289-9b1b7bbbfe19', 1000),
  resultFace: unsplash('1616394584738-fc6e612e71b9', 1400),
  resultSkin: unsplash('1552693673-1bf958298935', 1400),
  resultPortrait: unsplash('1531746020798-e6953c6e8e04', 1400),
  ctaBand: unsplash('1515377905703-c4788e51af15', 1800),
  contactFeature: unsplash('1540555700478-4be289fbecef', 1000),
  faqFeature: unsplash('1620916566398-39f1143ab7be', 900),
  menuFeature: unsplash('1573461160327-b450ce3d8e7f', 700),
} as const
