const CLD = 'https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve';

export const homeStats = {
  familiesServed: 12480,
  languagesSupported: 6,
  volunteersActive: 340,
  yearsOfService: 18,
};

export const programDirectories = [
  {
    id: 'about-governance',
    titleKey: 'programs.directory1',
    descKey: 'programs.directory1Desc',
    image: `${CLD}/v1784298421/wori-awards-10-2048x1365_zzvzlm.jpg`,
    color: 'emerald',
  },
  {
    id: 'settlement-resources',
    titleKey: 'programs.directory2',
    descKey: 'programs.directory2Desc',
    image: `${CLD}/v1784649543/Arrived-Refugee-Photos-page-004_orwibh.jpg`,
    color: 'gold',
  },
  {
    id: 'wellbeing-empowerment',
    titleKey: 'programs.directory3',
    descKey: 'programs.directory3Desc',
    image: `${CLD}/v1784648610/yoga-session-img20_l4w0jx.jpg`,
    color: 'emerald',
  },
  {
    id: 'news-partnerships',
    titleKey: 'programs.directory4',
    descKey: 'programs.directory4Desc',
    image: `${CLD}/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg`,
    color: 'charcoal',
  },
];

export const resourceCards = [
  {
    id: 'ircc',
    titleKey: 'resources.cards.ircc',
    image: `${CLD}/v1784295067/IMG-20201006-WA0161_g4vz3n.jpg`,
    tag: 'IRCC',
  },
  {
    id: 'citizenship',
    titleKey: 'resources.cards.citizenship',
    image: `${CLD}/v1785062749/Wadi-Kaja-canada-day-2026_bwe3qt.jpg`,
  },
  {
    id: 'housing',
    titleKey: 'resources.cards.housing',
    image: `${CLD}/v1784649560/Arrived-Refugee-Photos-page-012_ocnovf.jpg`,
  },
  {
    id: 'language',
    titleKey: 'resources.cards.language',
    image: `${CLD}/v1784646872/Photo-1_idgega.jpg`,
  },
];

export const donationTiers = [
  { amount: 50, descKey: 'donate.tier1' },
  { amount: 150, descKey: 'donate.tier2' },
  { amount: 500, descKey: 'donate.tier3' },
];